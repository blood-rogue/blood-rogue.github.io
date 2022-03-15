import * as React from "react"

const useTimeout = (callback: () => void, delay: number) => {
  const savedCallback = React.useRef(() => {});
  
  React.useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);
  
  React.useEffect(() => {
    const tick = () => savedCallback.current();
    if (delay !== null) {
      let id = setTimeout(tick, delay);
      return () => clearTimeout(id);
    }
  }, [delay]);
};

export default useTimeout