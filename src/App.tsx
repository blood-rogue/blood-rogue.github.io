import React from "react";
import { MoonIcon, SunIcon } from "./components/icons";
import { urls, User, userUrl } from "./api";
import axios from "axios";
import ContextMenu from "./components/ContextMenu";
import SourceModal from "./components/SourceModal";
import Footer from "./components/Footer"
import retry from "./utils/retry";
import delay from "./utils/delay";
import useContextMenu from "./hooks/useContextMenu";
import useTheme from "./hooks/useTheme";

const Home = React.lazy(() => delay(() => retry(() => import("./pages/Home")), 500))
const GistCode = React.lazy(() => delay(() => retry(() => import("./pages/GistCode")), 500))

const App: React.FC = () => {
  const [open, setOpen] = React.useState(false)
  const [forward, setForward] = React.useState(false)
  const [user, setUser] = React.useState<User | null>(null)
  const [ctx, ctxEv] = useContextMenu()
  const [theme, setTheme] = useTheme()

  React.useLayoutEffect(() => {
    axios.get<User>(userUrl).then(res => setUser(res.data))
  }, [])

  const handleKeyDown = (ev: KeyboardEvent) => {
    if (ev.ctrlKey && ev.code === "KeyU") {
      setOpen(!open)
      if (!forward) ev.preventDefault()
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

  React.useEffect(() => {
    document.addEventListener("keydown", handleKeyDown)
    return () => document.removeEventListener("keydown", handleKeyDown)
  })

  const themeBtn = (ref: React.RefObject<HTMLButtonElement> | null) => <button ref={ref} onClick={setTheme}>{theme === "dark" ? <MoonIcon />: <SunIcon />}</button>

  React.useEffect(() => {
  if (open) {
    document.body.classList.add("blur-sm")
  } else {
    document.body.classList.remove("blur-sm")
  }}, [open])

  return (
    <>
      {user && <Home user={user}/>}
      {open && <SourceModal close={close} forward={useForward} />}
      {ctx && <ContextMenu open={ctx} ev={ctxEv ? ctxEv : new MouseEvent("contextmenu", { clientX: 0, clientY: 0 })} />}
      <GistCode gistId="269c8a512bcf6b4686e427ff864d7497"/>
      {user && <Footer socialUrls={urls} user={user} themeBtn={themeBtn} />}
    </>
  )
}

export default App