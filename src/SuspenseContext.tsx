import * as React from "react";

const SuspenseContext = React.createContext(true)
export const SuspenseContextProvider = SuspenseContext.Provider
export default SuspenseContext