import * as React from "react";

export const RouterLink: React.FC<{ route: string, path: string, component: JSX.Element }> = ({ route, component, path }) => {
  const matches = (p: string, r: string) => {
    var match = false
    const ps = p.split("/")
    const rs = r.split("/")
    if (ps.length === rs.length) {
      ps.forEach((pv, pi) => { rs.forEach((rv, ri) => {
        if (pi === ri) {
          if (!rv.startsWith(":") && rv === pv) match = true
        }
      })})
    }
    return match
  }
  const pathParts = path.split("/")
  const [pathProps, setPathProps] = React.useState<{ [key: string] : string }>({})
  React.useEffect(() => {
    if (matches(path, route)) route
      .split("/")
      .forEach((part, idx) => setPathProps(p => {
        p[part.slice(1)] = pathParts[idx];
        return p
      }))
  }, [])
  return (
    <>{matches(path, route) && React.cloneElement(component, pathProps)}</>
  )
}