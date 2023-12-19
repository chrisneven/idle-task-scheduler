type Options = {
  /**
   * The maximum amount of time in milliseconds that the promise should be allowed to run before returning.
   * @default 5000
   */
  timeout?: number;
};

/**
 * A higher-order function that wraps a promise in a requestIdleCallback or setTimeout to avoid blocking the main thread. This is useful for
 * preloading components or data that are not immediately needed. This is only used in the browser.
 */
export function idleTaskScheduler<Args extends unknown[], Return>(
  promiseFn: (...args: Args) => Promise<Return>,
  { timeout = 5000 }: Options = {},
) {
  if (typeof window === "undefined") return promiseFn;

  const promise = (...args: Args) =>
    new Promise<Return>((resolve, reject) => {
      try {
        const requestCallback =
          "requestIdleCallback" in window
            ? window.requestIdleCallback
            : requestIdleCallback;
        requestCallback(
          () => {
            void promiseFn(...args)
              .then(resolve)
              .catch(reject);
          },
          {
            timeout,
          },
        );
      } catch (error) {
        reject(error);
      }
    });

  return promise;
}

function requestIdleCallback(
  cb: IdleRequestCallback,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  options?: {
    timeout: number;
  },
) {
  const start = Date.now();
  return setTimeout(() => {
    cb({
      didTimeout: false,
      timeRemaining() {
        return Math.max(0, 50 - (Date.now() - start));
      },
    });
  }, 1);
}
