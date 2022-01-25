# Push timeseries to Prometheus via remote_write

<span class="badge-npmversion"><a href="https://npmjs.org/package/prometheus-remote-write" title="View this project on NPM"><img src="https://img.shields.io/npm/v/prometheus-remote-write.svg" alt="NPM version" /></a></span>

Using remote_write facility (see https://prometheus.io/docs/prometheus/latest/configuration/configuration/#remote_write) to send metrics to remote Prometheus from NodeJS app.

Pretty much anything from https://prometheus.io/docs/operating/integrations/#remote-endpoints-and-storage should be supported, but tested only with grafana.com:

  * [AppOptics](https://github.com/solarwinds/prometheus2appoptics)
  * [AWS Timestream](https://github.com/dpattmann/prometheus-timestream-adapter)
  * [Azure Data Explorer](https://github.com/cosh/PrometheusToAdx)
  * [Azure Event Hubs](https://github.com/bryanklewis/prometheus-eventhubs-adapter)
  * [Chronix](https://github.com/ChronixDB/chronix.ingester)
  * [Cortex](https://github.com/cortexproject/cortex)
  * [CrateDB](https://github.com/crate/crate_adapter)
  * [Elasticsearch](https://www.elastic.co/guide/en/beats/metricbeat/master/metricbeat-metricset-prometheus-remote_write.html)
  * [Gnocchi](https://gnocchi.xyz/prometheus.html)
  * [Google BigQuery](https://github.com/KohlsTechnology/prometheus_bigquery_remote_storage_adapter)
  * [Google Cloud Spanner](https://github.com/google/truestreet)
  * [Graphite](https://github.com/prometheus/prometheus/tree/main/documentation/examples/remote_storage/remote_storage_adapter)
  * [InfluxDB](https://docs.influxdata.com/influxdb/v1.8/supported_protocols/prometheus)
  * [Instana](https://www.instana.com/docs/ecosystem/prometheus/#remote-write)
  * [IRONdb](https://github.com/circonus-labs/irondb-prometheus-adapter)
  * [Kafka](https://github.com/Telefonica/prometheus-kafka-adapter)
  * [M3DB](https://m3db.io/docs/integrations/prometheus/)
  * [New Relic](https://docs.newrelic.com/docs/set-or-remove-your-prometheus-remote-write-integration)
  * [OpenTSDB](https://github.com/prometheus/prometheus/tree/main/documentation/examples/remote_storage/remote_storage_adapter)
  * [PostgreSQL/TimescaleDB](https://github.com/timescale/promscale)
  * [QuasarDB](https://doc.quasardb.net/master/user-guide/integration/prometheus.html)
  * [SignalFx](https://github.com/signalfx/metricproxy#prometheus)
  * [Splunk](https://github.com/kebe7jun/ropee)
  * [Sysdig Monitor](https://docs.sysdig.com/en/docs/installation/prometheus-remote-write/)
  * [TiKV](https://github.com/bragfoo/TiPrometheus)
  * [Thanos](https://github.com/thanos-io/thanos)
  * [VictoriaMetrics](https://github.com/VictoriaMetrics/VictoriaMetrics)
  * [Wavefront](https://github.com/wavefrontHQ/prometheus-storage-adapter)

(List copied from https://github.com/prometheus/docs/blob/main/content/docs/operating/integrations.md)

## Usage:

```js
import pushTimeseries from "prometheus-remote-write";

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
  // Logging & debugging, disabled by default
  console: undefined,
  verbose: false,
  timing: false,
};

pushTimeseries(
  {
    labels: {
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
)
```


[0]: https://prometheus.io/docs/prometheus/latest/configuration/configuration/#remote_write
[1]: https://grafana.com/docs/grafana-cloud/metrics-prometheus/
[2]: https://docs.newrelic.com/docs/infrastructure/prometheus-integrations/install-configure-remote-write/set-your-prometheus-remote-write-integration/
[3]: https://prometheus.io/docs/operating/integrations/#remote-endpoints-and-storage
