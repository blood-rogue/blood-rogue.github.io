import timeout from "./timeout"

interface RetryOptions {
  retriesLeft?: number,
  interval?: number,
  increment?: number,
  onSuccess?: () => void,
  onError?: (error?: any) => void,
  retriesDone?: number
}

const defaultArgs: Required<RetryOptions> = {
  retriesLeft: 5,
  retriesDone: 0,
  get onError() {
    return (err: unknown) => {
      localStorage.setItem("error", "true")
      window.dispatchEvent(new Event("storage"))
    }
  },
  increment: 0,
  interval: 1000,
  get onSuccess() {
    return () => {
      const loaded = localStorage.getItem("loaded") || "0"
      localStorage.setItem("loaded", (parseInt(loaded) + 1).toString())
      window.dispatchEvent(new Event("storage"))
      console.log("success in", this.retriesDone, "tries")
    }
  }
}

const retry = <T>(promise: Promise<T>, retryOptions: RetryOptions = {}) => {
  const { retriesLeft, retriesDone, interval, increment, onError, onSuccess } = { ...defaultArgs, ...retryOptions } as Required<RetryOptions>
  return new Promise<T>((resolve, reject) => {
    timeout(promise, 500)
      .then((ret) => {
        onSuccess()
        return ret
      })
      .then(resolve)
      .catch((error) => {
        setTimeout(() => {
          if (retriesLeft === 1) {
            onError(error)
            return reject()
          }
          retry(promise, { increment, onError, onSuccess, retriesLeft: retriesLeft - 1, interval: interval + increment, retriesDone: retriesDone + 1}).then(resolve, reject)
        }, interval)
      })
  })
}

export default retry