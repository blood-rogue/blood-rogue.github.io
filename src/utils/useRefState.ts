import React from "react";

const useRefState = <T>(val: T) => {
  const [value, original_setValue] = React.useState(val)
  const valueRef = React.useRef(value)
  const setValue = (data: T) => {
    valueRef.current = data
    original_setValue(data)
  }
  return [valueRef, setValue] as [React.MutableRefObject<T>, (data: T) => void]
}

export default useRefState