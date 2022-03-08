import React from "react";
import { GistList } from "../api";

const Gists: React.FC<{ gists: GistList[] }> = ({ gists }) => {
  const linkRefs = gists.map(() => React.createRef<HTMLAnchorElement>())
  
  return (
    <div id="gists" className="flex__col mt-6">
      <span className="sub-header__title">Gists</span>
      <div>
        {gists.map((el, i) => (
        <div key={i} onClick={() => linkRefs[i].current?.click()} className="sub-header__content">
          <a ref={linkRefs[i]} href={el.html_url} target="_blank" rel="noopener noreferrer">{el.description}</a>
        </div>))}
      </div>
    </div>
  )
}

export default Gists