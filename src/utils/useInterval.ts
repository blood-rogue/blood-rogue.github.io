import { useRef, useEffect } from "react";

const useInterval = (callback:() => void, delay: number) => {
  const savedCallback = useRef<() => void>(() => {});
  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);
  useEffect(() => {
      const tick = () => savedCallback.current()
      let id = setInterval(tick, delay);
      return () => clearInterval(id);
  }, [delay]);
}

export default useInterval