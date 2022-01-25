const SnappyJS = require("snappyjs");
const fetch = require("node-fetch");
const protobuf = require("protobufjs");
const btoa = (s) => Buffer.from(s, "binary").toString("base64");
const prom = require("./prom");

const __holder = {
  type: null,
};

const kv = (o) =>
  Object.entries(o).map((e) => ({
    name: e[0],
    value: e[1],
  }));

/** Loads protocol definition, caches it */
async function loadProto(options) {
  if (__holder.root) {
    return __holder.type;
  }

  if (options?.proto) {
    const root = await protobuf.load(options?.proto);
    if (options?.verbose) {
      logger.info("Loaded protocol definitions", fileName, root);
    }
    const WriteRequest = root.lookupType("prometheus.WriteRequest");
    __holder.type = WriteRequest;
    return WriteRequest;
  }

  return prom.prometheus.WriteRequest;
}

/** Serializes JSON as protobuf buffer */
async function serialize(payload, options) {
  const type = await loadProto(options);
  const errMsg = type.verify(payload);
  if (errMsg) {
    throw new Error(errMsg);
  }
  const buffer = type.encode(payload).finish();
  return buffer;
}

/**
 * Sends metrics over HTTP(s)
 *
 * @param {Timeseries | Timeseries[]} samples
 */
async function pushTimeseries(timeseries, options) {
  const orig = timeseries;
  // Brush up a little
  timeseries = !Array.isArray(timeseries) ? [timeseries] : timeseries;

  const start1 = Date.now()
  const buffer = await serialize(
    {
      timeseries: timeseries.map((t) => ({
        labels: Array.isArray(t.labels) ? t.labels : kv(t.labels),
        samples: t.samples.map((s) => ({
          value: s.value,
          timestamp: s.timestamp ? s.timestamp : Date.now(),
        })),
      })),
    },
    options?.proto
  );

  const logger = options?.console || console;

  const start2 = Date.now()
  if (options?.timing) {
    logger.info("Serialized in", start2 - start1, "ms")
  }

  if (options?.url) {
    return fetch(options?.url, {
      method: "POST",
      headers: {
        "Content-Type": "application/vnd.google.protobuf",
        ...(options?.auth?.username && options?.auth?.password
          ? {
              Authorization: "Basic " + btoa(options?.auth.username + ":" + options?.auth?.password),
            }
          : undefined),
      },
      body: SnappyJS.compress(buffer),
    }).then(async (r) => {
      const text = await r.text();

      if (options?.verbose && r.status != 200) {
        logger.warn("Failed to send timeseries, error", r.status + " " + r.statusText + " " + text, orig);
      } else if (options?.verbose && !options?.timing) {
        logger.info("Timeseries sent", r.status + " " + r.statusText + " " + text, orig);
      } else if (options?.verbose && options?.timing) {
        logger.info("Timeseries sent", r.status + " " + r.statusText + " in", Date.now() - start2, "ms", orig);
      }

      return {
        status: r.status,
        statusText: r.statusText,
        errorMessage: r.status !== 200 ? text : undefined,
      };
    });
  } else {
    logger.warn("Unable to send timeseries, no endpoing configured", timeseries);
  }
}

module.exports = {
  serialize,
  loadProto,
  pushTimeseries,
};
