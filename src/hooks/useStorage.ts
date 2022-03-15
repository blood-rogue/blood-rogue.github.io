import * as React from "react";
import parseBoolean from "../utils/parseBoolean";
import useRefState from "./useRefState";

const useStorage = () => {
  const [loadedRef, setLoaded] = useRefState(0)
  const [error, setError] = React.useState(false)
  const [ended, setEnded] = React.useState(false)
  const handleLoaded = () => {
    const item = localStorage.getItem("loaded")
    if (item && parseInt(item) !== loadedRef.current) setLoaded(parseInt(item))
  }
  const handleError = () => {
    const item = localStorage.getItem("error")
    if (item && parseBoolean(item) !== error) setError(parseBoolean(item))
  }
  const handleEnded = () => {
    const item = localStorage.getItem("ended")
    if (item && parseBoolean(item) !== ended) setEnded(parseBoolean(item))
  }
  React.useEffect(() => {
    window.addEventListener("storage", handleLoaded)
    window.addEventListener("storage", handleError)    
    window.addEventListener("storage", handleEnded)
    return () => {
      window.removeEventListener("storage", handleLoaded)
      window.removeEventListener("storage", handleError)
      window.removeEventListener("storage", handleEnded)
    }
  }, [handleError, handleLoaded, handleEnded])
  return [loadedRef, error, ended] as [React.MutableRefObject<number>, boolean, boolean]
}

export default useStorage