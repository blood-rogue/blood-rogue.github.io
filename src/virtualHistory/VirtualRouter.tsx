import React from "react";
import { useVirtualHistory } from "./useVirtualHistory";

export const VirtualRouter: React.FC = ({ children }) => {
  const { path } = useVirtualHistory()
  const [component, setComponent] = React.useState<React.ReactElement | null>(null)
  const [route, setRoute] = React.useState("")
  React.useEffect(() => {
    if (children instanceof Array) {
      for (var child of children) {
        if (path === (child as React.ReactElement).props["route"]) setComponent(child)
      }
    } else {
      if (children && path === (children as React.ReactElement).props["route"]) setComponent(child)
    }
    setRoute(component?.props["route"])
  }, [])
  if (component && path.split("/").filter((part) => part.startsWith(":")).length !== 0) {
    const { props } = component
    const vars = path.split("/").filter((part) => part.startsWith(":"))
    component.props = { ...props, vars }
  }
  return (
    <>{component}</>
  )
}