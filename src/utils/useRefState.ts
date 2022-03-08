import { useState, useRef, MutableRefObject } from "react";

const useRefState = <T>(val: T) => {
  const [value, original_setValue] = useState(val)
  const valueRef = useRef(value)
  const setValue = (data: T) => {
    valueRef.current = data
    original_setValue(data)
  }
  return [valueRef, setValue] as [MutableRefObject<T>, (data: T) => void]
}

export default useRefState