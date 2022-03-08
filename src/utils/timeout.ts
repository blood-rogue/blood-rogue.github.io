const timeout = <T>(promise: Promise<T>, delay: number) => {
  let id: NodeJS.Timeout
  return Promise.race([
    promise,
    new Promise<T>((resolve, reject) => {
      id = setTimeout(() => reject(null), delay)
    })
  ])
  .then((imp) => {
    clearTimeout(id)
    return imp
  })
  .catch(() => {
    clearTimeout(id)
    throw new Error
  })
}

export default timeout