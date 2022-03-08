const delay = <T>(fn: () => Promise<T>, delay: number) => {
  return Promise.all([
    fn(),
    new Promise((resolve) => setTimeout(resolve, delay))
  ]).then(([moduleImport]) => moduleImport)
}

export default delay