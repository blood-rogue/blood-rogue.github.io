import axios from "axios";
import * as React from "react";
import { Gist } from "../api";
import { getHtml } from "../highlighter/highlighter";
import retry from "../utils/retry";

const TitleHelmet = React.lazy(() => retry(() => import("../components/TitleHelmet")))

const GistCode: React.FC<{ gistId: string }> = ({ gistId }) => {
  const [gist, setGist] = React.useState<Gist | null>(null);
  const [html, setHtml] = React.useState<{ [key: string]: JSX.Element[] }>({})
  const [filenames, setFilenames] = React.useState<string[]>([]);
  const [active, setActive] = React.useState("")
  const [copyContents, setCopyContents] = React.useState("Copy")
  const [ripple, setRipple] = React.useState<JSX.IntrinsicElements["span"]>(<span />)
  
  React.useEffect(() => {
    axios.get<Gist>("https://api.github.com/gists/" + gistId)
      .then(res => {
        setGist(res.data);
        return res.data
      })
      .then((res) => {
        getHtml(res).then(res => setHtml(res))
        return res
      })
      .then((res) => {
        for (const { filename } of Object.values(res.files)) {
          setFilenames(fns => {
            fns.push(filename);
            return fns
          })
        }
        return filenames
      })
      .then((f) => setActive(f[0]))
  }, [gistId]);

  const createRipple: React.MouseEventHandler<HTMLButtonElement> = (ev) => {
    const button = ev.currentTarget
    const diameter = Math.max(button.clientWidth, button.clientHeight)
    const radius = diameter / 2

    setRipple(<span className="gist-code__filename-ripple" style={{
      width: `${diameter}px`,
      height: `${diameter}px`,
      left: `${ev.clientX - button.offsetLeft - radius}px`,
      top: `${ev.clientY - button.offsetTop - radius}px`
    }}></span>)
  }
  
  const FileButton: React.FC<{ filename: string, active: boolean }> = ({ filename, active }) => {
    if (active) return <button onClick={createRipple} className="gist-code__filename-btn">{filename}{ripple}</button>
    else return <button onClick={(ev) => { setActive(filename); createRipple(ev) }} className="gist-code__filename-btn">{filename}{ripple}</button>
  }
  
  const copy = () => {
    if (gist && navigator.clipboard) {
      setCopyContents("Copying...")
      navigator.clipboard.writeText(gist.files[active].content).then(() => {
        setTimeout(() => setCopyContents("Copied !"), 200)
      }).then(() => setTimeout(() => setCopyContents("Copy"), 200))
    } else {
      alert("Clipboard actions not permitted.")
    }
  }
  
  return (
  <>
    <TitleHelmet title={`${gistId} | Blood Rogue's Gist`} />    
    <div id={gistId} className="gist-code__parent">
      <div className="gist-code__container">
        <div className="gist-code__tab-bar">
          {filenames.map((filename) => <FileButton active={active === filename} filename={filename} />)}
        </div>
        <div className="gist-code__code-container">
          <pre>{html[active]}</pre>
        </div>
        <div className="gist-code__footer">
          <span className="gist-code__footer-last-updated">
            &nbsp;Last Updated: {gist?.updated_at}
          </span>
          <button onClick={copy} className="gist-code__footer-copy-btn">
            {copyContents}
          </button>
        </div>
      </div>
    </div>
  </>
)}

export default GistCode