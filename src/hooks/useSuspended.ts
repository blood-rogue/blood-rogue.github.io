import * as React from "react";
import SuspenseContext from "../SuspenseContext";

const useSuspended = () => {
  return React.useContext(SuspenseContext)
}

export default useSuspended