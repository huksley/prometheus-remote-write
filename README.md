# Push timeseries to Prometheus via remote_write

<span class="badge-npmversion"><a href="https://npmjs.com/package/prometheus-remote-write" title="View this project on NPM"><img src="https://img.shields.io/npm/v/prometheus-remote-write.svg" alt="NPM version" /></a></span> <span class="badge-npmsize"><a href="https://npmjs.com/package/prometheus-remote-write" title="View this project on NPM"><img src="https://img.shields.io/bundlephobia/min/prometheus-remote-write.svg" alt="NPM Size" /></a></span> <span class="badge-npmstats"><a href="https://npmjs.com/package/prometheus-remote-write" title="View this project on NPM"><img src="https://img.shields.io/npm/dw/prometheus-remote-write.svg" alt="NPM Downloads" /></a></span>

Using remote_write facility (see https://prometheus.io/docs/prometheus/latest/configuration/configuration/#remote_write) to send metrics to remote Prometheus from NodeJS app.

Pretty much anything from https://prometheus.io/docs/operating/integrations/#remote-endpoints-and-storage should be supported, but tested only with Grafana Cloud, Grafana Mimir Prometheus, AWS AMP and VictoriaMetrics.

- [AppOptics](https://github.com/solarwinds/prometheus2appoptics)
- [AWS Timestream](https://github.com/dpattmann/prometheus-timestream-adapter)
- [AWS AMP - Managed Prometheus](https://aws.amazon.com/prometheus/) -  Use function "createSignedFetcher" from NPM package [aws-sigv4-fetch](https://www.npmjs.com/package/aws-sigv4-fetch) and provide it in options as customized fetcher.
- [Azure Data Explorer](https://github.com/cosh/PrometheusToAdx)
- [Azure Event Hubs](https://github.com/bryanklewis/prometheus-eventhubs-adapter)
- [Chronix](https://github.com/ChronixDB/chronix.ingester)
- [Cortex](https://github.com/cortexproject/cortex)
- [CrateDB](https://github.com/crate/crate_adapter)
- [Elasticsearch](https://www.elastic.co/guide/en/beats/metricbeat/master/metricbeat-metricset-prometheus-remote_write.html)
- [Gnocchi](https://gnocchi.xyz/prometheus.html)
- [Google BigQuery](https://github.com/KohlsTechnology/prometheus_bigquery_remote_storage_adapter)
- [Google Cloud Spanner](https://github.com/google/truestreet)
- [Graphite](https://github.com/prometheus/prometheus/tree/main/documentation/examples/remote_storage/remote_storage_adapter)
- [InfluxDB](https://docs.influxdata.com/influxdb/v1.8/supported_protocols/prometheus)
- [Instana](https://www.instana.com/docs/ecosystem/prometheus/#remote-write)
- [IRONdb](https://github.com/circonus-labs/irondb-prometheus-adapter)
- [Kafka](https://github.com/Telefonica/prometheus-kafka-adapter)
- [M3DB](https://m3db.io/docs/integrations/prometheus/)
- [New Relic](https://docs.newrelic.com/docs/set-or-remove-your-prometheus-remote-write-integration)
- [OpenTSDB](https://github.com/prometheus/prometheus/tree/main/documentation/examples/remote_storage/remote_storage_adapter)
- [PostgreSQL/TimescaleDB](https://github.com/timescale/promscale)
- [QuasarDB](https://doc.quasardb.net/master/user-guide/integration/prometheus.html)
- [SignalFx](https://github.com/signalfx/metricproxy#prometheus)
- [Splunk](https://github.com/kebe7jun/ropee)
- [Sysdig Monitor](https://docs.sysdig.com/en/docs/installation/prometheus-remote-write/)
- [TiKV](https://github.com/bragfoo/TiPrometheus)
- [Thanos](https://github.com/thanos-io/thanos)
- [VictoriaMetrics](https://github.com/VictoriaMetrics/VictoriaMetrics) - [docs](https://docs.victoriametrics.com/vmagent/#prometheus-remote_write-proxy)
- [Wavefront](https://github.com/wavefrontHQ/prometheus-storage-adapter)

(List copied from https://github.com/prometheus/docs/blob/main/content/docs/operating/integrations.md)

## Usage:

```js
import { pushTimeseries, pushMetrics } from "prometheus-remote-write";

// Just push some metrics metrics
await pushMetrics(
  {
    queue_depth_total: 100,
  },
  {
    url: process.env.GRAFANA_PUSH_URL || "http://localhost:9201",
    labels: { service: "queue-worker" },
  }
);

// Follows remote_write payload format (see https://github.com/prometheus/prometheus/blob/main/prompb/types.proto)
await pushTimeseries(
  {
    labels: {
      // Name should conform to https://prometheus.io/docs/practices/naming/
      __name__: "queue_depth_total",
      instance: "dev.example.com",
      service: "SQS",
    },
    samples: [
      {
        value: 150,
        timestamp: Date.now(),
      },
    ],
  },
  config
);


// Full config - only url is required
const config = {
  // Remote url
  url: "http://localhost:9201",
  // Auth settings
  auth: {
    username: "...",
    password: "...",
  },
  // Optional prometheus protocol descripton .proto/.json
  proto: undefined,
  // Override default console.name(...log) used
  console: undefined,
  // Be verbose
  verbose: false,
  timing: false,
  // Override used node-fetch
  fetch: undefined,
  // Additional labels to apply to each timeseries, i.e. [{ service: "SQS" }]
  labels: undefined,
  // Additional HTTP headers to send with each request
  headers: undefined
};
```

## Links

- https://prometheus.io/docs/prometheus/latest/configuration/configuration/#remote_write
- https://grafana.com/docs/grafana-cloud/metrics-prometheus/
- https://docs.newrelic.com/docs/infrastructure/prometheus-integrations/install-configure-remote-write/set-your-prometheus-remote-write-integration/
- https://prometheus.io/docs/operating/integrations/#remote-endpoints-and-storage
