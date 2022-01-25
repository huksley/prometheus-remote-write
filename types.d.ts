interface Sample {
    value: number,
    timestamp?: number
}

interface Timeseries {
    // Labels for every sample
    labels: {
        // Key for sample, should end with _totals, etc
        __name__: string,
        // Optional properties, i.e. instance, job, service
        [key:string]: string
    },
    // List of samples, timestamp is optional, will be set by pushTimeseries
    samples: Sample[]
}