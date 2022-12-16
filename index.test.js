const push = require("./index");

push.pushMetrics({ users_total: 22}, { timeout: 1})

const config = {
  url: process.env.GRAFANA_PUSH_URL,
  auth: {
    username: process.env.GRAFANA_INSTANCE_ID,
    password: process.env.GRAFANA_API_KEY,
  },
  verbose: true,
  timing: true,
  labels: {
    service: "bar",
  },
};

push
  .pushTimeseries(
    {
      labels: {
        __name__: "test_exemplar_metric_total",
        instance: "localhost:8090",
        job: "prometheus",
      },
      samples: [
        {
          value: Math.random() * 10,
          timestamp: Date.now(),
        },
      ],
    },
    config
  )
  .then((r) => {
    console.info("Result", r);
  });

for (let i = 0; i < 100; i++) {
  push
    .pushTimeseries(
      {
        labels: {
          __name__: "test_exemplar_metric_total",
          instance: "localhost:8090",
          job: "prometheus"
        },
        samples: [
          {
            value: Math.random() * 10,
            timestamp: Date.now() + i,
          },
        ],
      },
      config
    )
    .then((r) => {
      console.info("Result", r);
    });
}

push.pushMetrics({ users_total: 11 })