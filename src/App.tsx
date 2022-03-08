import React, { lazy, useEffect, useLayoutEffect, useState } from "react";
import { MoonIcon, SunIcon } from "./components/icons";
import { urls, User, userUrl } from "./api";
import axios from "axios";
import ContextMenu from "./components/ContextMenu";
import SourceModal from "./components/SourceModal";
import retry from "./utils/retry";

const Footer = lazy(() => retry(() => import("./components/Footer")))
const Home = lazy(() => retry(() => import("./pages/Home")))
const GistCode = lazy(() => retry(() => import("./pages/GistCode")))

const App: React.FC = () => {
  const [open, setOpen] = useState(false)
  const [forward, setForward] = useState(false)
  const [user, setUser] = useState<User | null>(null)
  const [contextMenu, setContextMenu] = useState<{ open: boolean, ev: MouseEvent }>({ open: false, ev: new MouseEvent("contextmenu") })
  const [theme, setTheme] = useState<"dark" | "light">(("theme" in localStorage) ? localStorage.theme : window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light")

  useLayoutEffect(() => {
    document.documentElement.classList.add("scrollbar-thin", "scrollbar-track-zinc-900", "scrollbar-thumb-zinc-800", "hover:scrollbar-thumb-zinc-700")
    localStorage.theme = theme
    if (theme === "dark") {
      document.documentElement.classList.add("dark")
    } else {
      document.documentElement.classList.remove("dark")
    }
  }, [theme])

  useLayoutEffect(() => {
    axios.get<User>(userUrl).then(res => setUser(res.data))
  }, [])

  const handleContextMenu = (ev: MouseEvent) => {
    ev.preventDefault()
    if (!contextMenu.open) setContextMenu({ open: true, ev })
    else setContextMenu({ open: false, ev: new MouseEvent("contextmenu") })
  }

  const handleKeyDown = (ev: KeyboardEvent) => {
    if (ev.ctrlKey && ev.code === "KeyU") {
      setOpen(!open)
      if (!forward) ev.preventDefault()
    }
  }

  const handleClick = (ev: MouseEvent) => {
    if (contextMenu.open) {
      ev.preventDefault()
      setContextMenu({ open: false, ev: new MouseEvent("contextmenu") })
      return
    }
  }

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

  useEffect(() => {
    document.addEventListener("contextmenu", handleContextMenu)
    document.addEventListener("keydown", handleKeyDown)
    document.addEventListener("click", handleClick)
    return () => { 
      document.removeEventListener("contextmenu", handleContextMenu)
      document.removeEventListener("keydown", handleKeyDown)
      document.removeEventListener("click", handleClick)
    }
  })

  const themeBtn = <button onClick={() => theme === "dark" ? setTheme("light") : setTheme("dark")}>{theme === "dark" ? <MoonIcon />: <SunIcon />}</button>

  useEffect(() => {
  if (open) {
    document.body.classList.add("blur-sm")
  } else {
    document.body.classList.remove("blur-sm")
  }}, [open])

  return (
    <>
      {user && <Home user={user}/>}
      {open && <SourceModal close={close} forward={useForward} />}
      {contextMenu.open && <ContextMenu {...contextMenu} />}
      <GistCode gistId="269c8a512bcf6b4686e427ff864d7497"/>
      {user && <Footer socialUrls={urls} user={user} themeBtn={themeBtn} />}
    </>
  )
}

export default App