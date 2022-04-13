import * as React from "react";
import useRefState from "./useRefState";

const useStorage = () => {
  const [loadedRef, setLoaded] = useRefState(0)
  const [error, setError] = React.useState(false)
  const [ended, setEnded] = React.useState(false)
  const handleLoaded = (ev: CustomEvent<number>) => {
    const loaded = ev.detail
    if (loaded && loaded !== loadedRef.current) setLoaded(loaded)
  }
  const handleError = (ev: CustomEvent<boolean>) => {
    const err = ev.detail
    if (err && err !== error) setError(err)
  }
  const handleEnded = (ev: CustomEvent) => {
    const end = ev.detail
    if (end && end !== ended) setEnded(end)
  }
  React.useEffect(() => {
    window.addEventListener("loaded", handleLoaded as EventListener)
    window.addEventListener("error", handleError as EventListener)    
    window.addEventListener("ended", handleEnded as EventListener)
    return () => {
      window.removeEventListener("loaded", handleLoaded as EventListener)
      window.removeEventListener("error", handleError as EventListener)
      window.removeEventListener("ended", handleEnded as EventListener)
    }
  }, [handleError, handleLoaded, handleEnded])
  return [loadedRef, error, ended] as [React.MutableRefObject<number>, boolean, boolean]
}

export default useStorage