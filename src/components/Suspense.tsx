import * as React from "react";
import { SuspenseContextProvider } from "../SuspenseContext";

const Suspense: React.FC  = ({ children }) => {
  const [suspended, setSuspended] = React.useState(true)
  const Fallback: React.FC = ({ children }) => {
    React.useEffect(() => {
      setSuspended(true)
      return () => setSuspended(false)
    }, [])
    return <>{children}</>
  }
  return (
    <React.Suspense fallback={<Fallback />}>
      <SuspenseContextProvider value={suspended}>
        {children}
      </SuspenseContextProvider>
    </React.Suspense>
  )
}

export default Suspense