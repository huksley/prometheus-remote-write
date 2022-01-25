const push = require("./index");

const config = {
  url: process.env.GRAFANA_PUSH_URL,
  auth: {
    username: process.env.GRAFANA_INSTANCE_ID,
    password: process.env.GRAFANA_API_KEY,
  },
  verbose: true,
  timing: true,
};

push
  .pushTimeseries(
    {
      labels: {
        __name__: "test_exemplar_metric_total",
        instance: "localhost:8090",
        job: "prometheus",
        service: "bar",
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
          job: "prometheus",
          service: "bar",
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
