import React, { createRef } from "react";
import { RepoList } from "../api"

const Repos = React.forwardRef<HTMLDivElement, {repos: RepoList[]}>(({ repos }, ref) => {
  const linkRefs = repos.map(() => createRef<HTMLAnchorElement>())
  
  return (
    <div ref={ref} id="repos" className="flex__col mt-16">
      <span className="sub-header__title">Repos</span>
      <div>
        {repos.map((el, i) => (
        <div key={i} onClick={() => linkRefs[i].current?.click()} className={el.description === null ? "sub-header__content-empty" : "sub-header__content"}>
          <a ref={linkRefs[i]} href={el.html_url} target="_blank" rel="noopener noreferrer">{el.description !== null ? el.description : "No Description."}</a>
        </div>))}
      </div>
    </div>
  )
})

export default Repos