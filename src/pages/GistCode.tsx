import axios from "axios";
import * as React from "react";
import { Gist } from "../api";
import FileButton from "../components/FileButton";
import { getHtml } from "../highlighter/highlighter";
import retry from "../utils/retry";

const TitleHelmet = React.lazy(() => retry(import("../components/TitleHelmet")))

const GistCode: React.FC<{ gistId: string }> = ({ gistId }) => {
  const [gist, setGist] = React.useState<Gist | null>(null);
  const [html, setHtml] = React.useState<{ [key: string]: JSX.Element[] }>({})
  const [filenames, setFilenames] = React.useState<string[]>([]);
  const [active, setActive] = React.useState("")
  const [copyContents, setCopyContents] = React.useState("Copy")
  
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
  
  const copy = async () => {
    if (gist && navigator.clipboard) {
      setCopyContents("Copying...")
      await navigator.clipboard.writeText(gist.files[active].content)
      setTimeout(() => setCopyContents("Copied!"), 200)
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
          <div className="w-10 h-10 after:content-[\2022]"></div>
          <div className="w-10 h-10 after:content-[\2022]"></div>
          <div className="w-10 h-10 after:content-[\2022]"></div>
          {filenames.map((filename) => <FileButton onClick={() => setActive(filename)} active={active === filename} filename={filename} />)}
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