import * as React from "react";

const useInterval = (callback:() => void, delay: number) => {
  const savedCallback = React.useRef<() => void>(() => {});
  React.useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);
  React.useEffect(() => {
      const tick = () => savedCallback.current()
      let id = setInterval(tick, delay);
      return () => clearInterval(id);
  }, [delay]);
}

export default useInterval