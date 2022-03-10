import * as React from "react";
import parseBoolean from "../utils/parseBoolean";
import useRefState from "./useRefState";

const useStorage = () => {
  const [loadedRef, setLoaded] = useRefState(0)
  const [error, setError] = React.useState(false)
  const handleLoaded = () => {
    const item = localStorage.getItem("loaded")
    if (item && parseInt(item) !== loadedRef.current) {
      setLoaded(parseInt(item))
    }
  }
  const handleError = () => {
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
  return [loadedRef, error] as [React.MutableRefObject<number>, boolean]
}

export default useStorage