import * as React from "react"
import useInterval from "./hooks/useInterval";
import useStorage from "./hooks/useStorage";

const Loader: React.FC = () => {
  const [num, setNum] = React.useState(0)
  const [dots,setDots] = React.useState(0)
  const [width, setWidth] = React.useState(1)
  const [inc, setInc] = React.useState(true)
  const [loadedRef, error] = useStorage()

  const chars = "\\|/-"

  useInterval(() => setNum(num === 3 ? 0 : num + 1), 63)
  useInterval(() => setDots(dots === 3 ? 0 : dots + 1), 250)

  const increaseWidth = (load: number) => {
    setWidth(w => (inc && w < (30 * (load + 3))) ? w + 1 : w)
    if (width === 300) {
      localStorage.setItem("ended", "true")
      window.dispatchEvent(new Event("storage"))
      setInc(false)
    }
  }

  React.useEffect(() => {
    const id = setInterval(() => increaseWidth(loadedRef.current), 10)
    return () => clearInterval(id)
  }, [loadedRef, increaseWidth])

  return (
  <div className={`${inc ? "flex flex-col" : "hidden"} loader__container`}>
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
      {!error && <span className="loader__text-info">{(loadedRef.current !== 7) ? `Loading ${".".repeat(dots) + "\u00A0".repeat(3 - dots)} ${loadedRef.current}/7` : `Loaded. 7/7`}</span>}
      {error && <span className="loader__text-error">ERROR: Retrying {".".repeat(dots)}</span>}
    </div>
  </div>
  )
}

export default Loader