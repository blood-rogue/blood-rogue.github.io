import { useEffect, useState } from "react"

export const useVirtualHistory = () => {
  const [hist, setHist] = useState<string[]>([])
  const [path, setPath] = useState("")

  const handleClick = (ev: MouseEvent) => {
    const targets = ev.composedPath().map((et) => (et as HTMLElement)).filter((elem) => elem.tagName.toLowerCase() === "a")
    if (targets !== []) {
      ev.preventDefault()
      const { href } = targets[0] as HTMLAnchorElement
      setHist(hist.concat([href]))
      setPath(href)
    }
  }
  useEffect(() => {
    document.addEventListener("click", handleClick)
    return document.removeEventListener("click", handleClick)
  })
  return { hist, path }
}