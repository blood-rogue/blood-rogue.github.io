import React from "react"
import parseBoolean from "./utils/parseBoolean";
import useInterval from "./hooks/useInterval";
import useRefState from "./hooks/useRefState";

const Loader: React.FC = () => {
  const [num, setNum] = React.useState(0)
  const [dots,setDots] = React.useState(0)
  const [width, setWidth] = React.useState(1)
  const [inc, setInc] = React.useState(true)
  const [error, setError] = React.useState(false)
  const [loadedRef, setLoaded] = useRefState(0)

  const handleLoaded = (ev: StorageEvent) => {
    const item = localStorage.getItem("loaded")
    if (item && parseInt(item) !== loadedRef.current) {
      console.log(loadedRef.current, item, 30 * (loadedRef.current + 2))
      setLoaded(parseInt(item))
    }
  }

  const handleError = (ev: StorageEvent) => {
    const item = localStorage.getItem("error")
    if (item && parseBoolean(item) !== error) {
      setError(parseBoolean(item))
    }
  }

  React.useEffect(() => {
    window.addEventListener("storage", handleLoaded)
    window.addEventListener("storage", handleError)
    return () => {
      window.removeEventListener("storage", handleLoaded)
      window.removeEventListener("storage", handleError)
    }
  }, [handleError, handleLoaded])

  const chars = "\\|/-"

  useInterval(() => setNum(num === 3 ? 0 : num + 1), 63)
  useInterval(() => setDots(dots === 3 ? 0 : dots + 1), 250)

  const increaseWidth = (load: number) => {
    setWidth(w => (inc && w < (30 * (load + 2))) ? w + 1 : w)
    if (width === 300) setInc(false)
  }

  React.useEffect(() => {
    const id = setInterval(() => increaseWidth(loadedRef.current), 7)
    return () => clearInterval(id)
  }, [loadedRef])

  return (
  <div className="loader__container">
    <div className={error ? "loader__progress-error-bg" : "loader__progress-info-bg"}>
      <div
        style={{
          width: `${width}%`,
          borderTopRightRadius: inc ? "0px" : "6px",
          borderBottomRightRadius: inc ? "0px" : "6px" 
        }}
        className={error ? "loader__progress-error-fg" : "loader__progress-info-fg"}
      ></div>
      <div className="loader__percentage">{Math.round(width / 3)}%</div>
    </div>
    <div className="loader__text-container">
      {width < 300 && <span className="loader__text-spinner">{chars.charAt(num)}&nbsp;</span>}
      {!error && <span className="loader__text-info">{(loadedRef.current !== 8) ? `Loading ${".".repeat(dots) + "\u00A0".repeat(3 - dots)} ${loadedRef.current}/8` : `Loaded. 8/8`}</span>}
      {error && <span className="loader__text-error">ERROR: Retrying {".".repeat(dots)}</span>}
    </div>
  </div>
  )
}

export default Loader