import React from "react"

const useContextMenu = <T extends HTMLElement>(ref?: React.RefObject<T>) => {
  const [ctx, setCtx] = React.useState(false)
  const [ctxEv, setCtxEv] = React.useState<MouseEvent | null>(null)
  const handleClick = (ev: MouseEvent) => {
    if (ctx) {
      ev.preventDefault()
      setCtxEv(null)
    }
  }
  const handleCtxMenu = (ev: MouseEvent) => {
    ev.preventDefault()
    if (!ctx) {
      setCtx(true)
      setCtxEv(ev)
    } else {
      setCtx(false)
      setCtxEv(null)
    }
  }
  React.useEffect(() => {
    if (ref) {
      ref.current?.addEventListener("contextmenu", handleCtxMenu)
      ref.current?.addEventListener("click", handleClick)
    }
    else {
      document.addEventListener("contextmenu", handleCtxMenu)
      document.addEventListener("contextmenu", handleClick)
    }
    return () => {
      if (ref) {
        ref.current?.removeEventListener("contextmenu", handleCtxMenu)
        ref.current?.removeEventListener("click", handleClick)
      }
      else {
        document.removeEventListener("contextmenu", handleCtxMenu)
        document.removeEventListener("contextmenu", handleClick)
      }
    }
  })
  return [ctx, ctxEv] as [boolean, MouseEvent | null]
}

export default useContextMenu