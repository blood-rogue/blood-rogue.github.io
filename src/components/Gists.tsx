import React from "react";
import { GistList } from "../api";

const Gists: React.FC<{ gists: GistList[] }> = ({ gists }) => {
  const linkRefs = gists.map(() => React.createRef<HTMLAnchorElement>())
  console.log(gists[0].html_url.split("/")[-1])
  return (
    <div id="gists" className="flex__col mt-6">
      <span className="sub-header__title">Gists</span>
      <div>
        {gists.map((el, i) => (
        <div key={i} onClick={() => linkRefs[i].current?.click()} className={el.description === null ? "sub-header__content-empty" : "sub-header__content"}>
          <a ref={linkRefs[i]} href={el.html_url} target="_blank" rel="noopener noreferrer">{el.description !== null ? el.description : `${el.html_url.split("/")[-1].substring(0, 7)}...: No Description.`}</a>
        </div>))}
      </div>
    </div>
  )
}

export default Gists