const delay = async <T>(fn: () => Promise<T>, delay: number) => {
  const [moduleImport] = await Promise.all([
    fn(),
    new Promise((resolve) => setTimeout(resolve, delay))
  ])
  return moduleImport
}

export default delay