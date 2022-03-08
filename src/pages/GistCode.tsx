import axios from "axios";
import React, { lazy, useEffect, useState } from "react";
import { Gist } from "../api";
import { getHtml } from "../highlighter";
import retry from "../utils/retry";

const TitleHelmet = lazy(() => retry(() => import("../components/TitleHelmet")))

const GistCode: React.FC<{ gistId: string }> = ({ gistId }) => {
  const [gist, setGist] = useState<Gist | null>(null);
  const [html, setHtml] = useState<{ [key: string]: JSX.Element[] }>({})
  const [filenames, setFilenames] = useState<string[]>([]);
  const [active, setActive] = useState("")
  const [copyContents, setCopyContents] = useState("Copy")
  
  useEffect(() => {
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
  
  const FileButton: React.FC<{ filename: string, active: boolean }> = ({ filename, active }) => active
    ? <button className="gist-code__filename-btn">{filename}</button>
    : <button onClick={() => setActive(filename)} className="gist-code__filename-btn">{filename}</button>
  
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