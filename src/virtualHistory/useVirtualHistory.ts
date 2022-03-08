import React from "react"

export const useVirtualHistory = () => {
  const [hist, setHist] = React.useState<string[]>([])
  const [path, setPath] = React.useState("")

  const handleClick = (ev: MouseEvent) => {
    const targets = ev.composedPath().map((et) => (et as HTMLElement)).filter((elem) => elem.tagName.toLowerCase() === "a")
    if (targets !== []) {
      ev.preventDefault()
      const { href } = targets[0] as HTMLAnchorElement
      setHist(hist.concat([href]))
      setPath(href)
    }
  }
  React.useEffect(() => {
    document.addEventListener("click", handleClick)
    return document.removeEventListener("click", handleClick)
  })
  return { hist, path }
}