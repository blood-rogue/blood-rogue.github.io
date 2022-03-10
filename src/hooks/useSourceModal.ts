import * as React from "react";

const useSourceModal = () => {
  const [open, setOpen] = React.useState(false)
  const [forward, setForward] = React.useState(false)
  const handleKeyDown = (ev: KeyboardEvent) => {
    if (ev.ctrlKey && ev.code === "KeyU") {
      setOpen(!open)
      if (!forward) ev.preventDefault()
    }
  }
  React.useEffect(() => {
    document.addEventListener("keydown", handleKeyDown)
    return () => document.removeEventListener("keydown", handleKeyDown)
  })
  React.useEffect(() => {
    if (open) {
      document.body.classList.add("blur-sm")
    } else {
      document.body.classList.remove("blur-sm")
    }
  }, [open])
  const useForward = () => {
    setForward(true)
    setOpen(false)
  }
  const close = () => {
    setOpen(false)
    setForward(false)
    const a = document.createElement("a")
    a.href = "https://github.com/blood-rogue/blood-rogue.github.io"
    a.target = "_blank"
    a.rel = "noopener noreferrer"
    a.click()
  }
  return [open, close, useForward] as [boolean, () => void, () => void]
}

export default useSourceModal