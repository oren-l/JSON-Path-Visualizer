declare module 'comlink-loader!*' {
  type Callback = (data: any) => void
  class WebpackWorker extends Worker {
    constructor();

    // Add any custom functions to this class.
    // Make note that the return type needs to be wrapped in a promise.
    processData(query: string, json: any, cb: Callback): Promise<void>;
  }

  export = WebpackWorker;
}
