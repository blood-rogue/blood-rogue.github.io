const delay = async <T>(promise: Promise<T>, delay: number) => {
  const [moduleImport] = await Promise.all([
    promise,
    new Promise((resolve) => setTimeout(resolve, delay))
  ])
  return moduleImport
}

export default delay