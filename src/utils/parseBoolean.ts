const parseBoolean = (bool: string | number) => {
  if (typeof bool === "string") return bool === "true"
  else return bool === 1
}

export default parseBoolean