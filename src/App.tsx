import * as React from "react";
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
import useSourceModal from "./hooks/useSourceModal";
import useSuspended from "./hooks/useSuspended";

const Home = React.lazy(() => delay(retry(import("./pages/Home")), 1500))
const GistCode = React.lazy(() => delay(retry(import("./pages/GistCode")), 1500))

const App: React.FC = () => {
  const [user, setUser] = React.useState<User | null>(null)
  const [ctx, ctxEv] = useContextMenu()
  const [theme, setTheme] = useTheme()
  const [open, close, forward] = useSourceModal()
  const suspense = useSuspended()
  const [suspended, setSuspended] = React.useState(suspense)
  React.useEffect(() => {
    if (suspense !== suspended) setTimeout(() => setSuspended(suspense), 1000)
  }, [suspense])

  React.useLayoutEffect(() => {
    axios.get<User>(userUrl).then(res => setUser(res.data))
  }, [])

  const themeBtn = (ref: React.RefObject<HTMLButtonElement> | null) => <button ref={ref} onClick={setTheme}>{theme === "dark" ? <MoonIcon />: <SunIcon />}</button>

  return (
    <div className={suspended ? "hidden" : ""}>
      {user && <Home user={user}/>}
      {open && <SourceModal close={close} forward={forward} />}
      {ctx && <ContextMenu open={ctx} ev={ctxEv ? ctxEv : new MouseEvent("contextmenu", { clientX: 0, clientY: 0 })} />}
      <GistCode gistId="269c8a512bcf6b4686e427ff864d7497"/>
      {user && <Footer socialUrls={urls} user={user} themeBtn={themeBtn} />}
    </div>
  )
}

export default App