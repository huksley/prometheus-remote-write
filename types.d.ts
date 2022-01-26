/// <reference types="node" />

interface Sample {
  value: number;
  timestamp?: number;
}

interface Timeseries {
  // Labels for every sample
  labels: {
    // Key for sample, should end with _totals, etc, see https://prometheus.io/docs/practices/naming/
    __name__: string;
    // Optional properties, i.e. instance, job, service
    [key: string]: string;
  };
  // List of samples, timestamp is optional, will be set by pushTimeseries
  samples: Sample[];
}

interface Options {
  url?: string;
  auth?: {
    username?: string;
    password?: string;
  };
  verbose?: boolean;
  timing?: boolean;
  proto?: string;
  labels?: { [key: string]: string };
  fetch?: typeof fetch
}

/** Push timeseries entries to Prometheus */
export function pushTimeseries(timeseries: Timeseries | Timeseries[], options?: Options);

/** Push simpler key:value metrics to Prometheus, additional labels can be provided via options */
export function pushMetrics(metrics: Record<string, number>, options?: Options);