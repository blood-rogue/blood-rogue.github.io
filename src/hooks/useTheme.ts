import * as React from "react"

const useTheme = () => {
  const [theme, _setTheme] = React.useState<"dark" | "light">(("theme" in localStorage) ? localStorage.theme : window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light")
  React.useLayoutEffect(() => {
    document.documentElement.classList.add("scrollbar-thin", "scrollbar-track-zinc-900", "scrollbar-thumb-zinc-800", "hover:scrollbar-thumb-zinc-700")
    localStorage.theme = theme
    if (theme === "dark") {
      document.documentElement.classList.add("dark")
    } else {
      document.documentElement.classList.remove("dark")
    }
  }, [theme])
  const setTheme = () => theme === "dark" ? _setTheme("light") : _setTheme("dark")

  return [theme, setTheme] as [("dark" | "light"), () => void]
}

export default useTheme