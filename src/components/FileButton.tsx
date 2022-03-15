import * as React from "react"

const FileButton: React.FC<{ onClick: () => void, filename: string, active: boolean }> = ({ filename, active, onClick }) => {
  const [coords, setCoords] = React.useState({ x: -1, y: -1 });
  const [isRippling, setIsRippling] = React.useState(false);

  React.useEffect(() => {
    if (coords.x !== -1 && coords.y !== -1) {
      setIsRippling(true);
      setTimeout(() => setIsRippling(false), 300);
    } else setIsRippling(false);
  }, [coords]);

  React.useEffect(() => {
    if (!isRippling) setCoords({ x: -1, y: -1 });
  }, [isRippling]);

  return <button onClick={ev => {
    const rect = (ev.target as HTMLButtonElement).getBoundingClientRect();
    setCoords({ x: ev.clientX - rect.left, y: ev.clientY - rect.top });
    if (active) onClick()
  }} className="gist-code__filename-btn">
    {isRippling && (
    <span
      className="gist-code__filename-ripple"
      style={{
        left: coords.x,
        top: coords.y
      }}
    />
  )}<span className="gist-code__filename-content">{filename}</span></button>
}

export default FileButton