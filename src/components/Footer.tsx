import React, { useEffect, useRef, useReducer } from "react"
import { User } from "../api"
import { AtIcon, FacebookIcon, GithubIcon, InstagramIcon, LinkIcon, TwitterIcon } from "./icons"

interface SocialUrls {
  github: string;
  facebook: string;
  instagram: string;
  mail: string;
}

interface SocialAction {
  type: "github" | "instagram" | "mail" | "facebook",
  url: string
}

const Footer: React.FC<{
  socialUrls: { [key: string]: string },
  user: User, themeBtn: JSX.Element
}> = ({ socialUrls, user, themeBtn }) => {
  const urls = Object.keys(socialUrls)

  const initialArgs = {
    github: "",
    facebook: "",
    instagram: "",
    mail: ""
  }

  const reducer = (state: SocialUrls, action: SocialAction) => {
    switch (action.type) {
      case "github":
        return { ...state, github: action.url}
      case "instagram":
        return { ...state, instagram: action.url}
      case "facebook":
        return { ...state, facebook: action.url}
      case "mail":
        return { ...state, mail: action.url}
      default:
        return state
    }
  }

  const [state, dispatch] = useReducer(reducer, initialArgs)

  const githubRef = useRef<HTMLAnchorElement>(null)
  const instagramRef = useRef<HTMLAnchorElement>(null)
  const twitterRef = useRef<HTMLAnchorElement>(null)
  const facebookRef = useRef<HTMLAnchorElement>(null)
  const mailRef = useRef<HTMLAnchorElement>(null)
  const blogRef = useRef<HTMLAnchorElement>(null)

  useEffect(() => {
    if (urls.includes("github")) dispatch({ type: "github", url: socialUrls["github"] })
    if (urls.includes("instagram")) dispatch({ type: "instagram", url: socialUrls["instagram"]})
    if (urls.includes("facebook")) dispatch({ type: "facebook", url: socialUrls["facebook"]})
    if (urls.includes("mail")) dispatch({ type: "mail", url: socialUrls["mail"]})
  }, [])
  
  return (
  <>
    <div className="footer__container">
      <div className="footer__btn">
        {themeBtn}
      </div>
      {state.github !== "" && <div onClick={() => githubRef.current?.click()} className="footer__btn"><a ref={githubRef} target="_blank" rel="noopener noreferrer" href={state.github}><GithubIcon /></a></div>}
      {user.twitter_username && <div onClick={() => twitterRef.current?.click()} className="footer__btn"><a ref={twitterRef} target="_blank" rel="noopener noreferrer" href={"https://twitter.com/" + user.twitter_username}><TwitterIcon /></a></div>}
      {state.instagram !== "" && <div onClick={() => instagramRef.current?.click()} className="footer__btn"><a ref={instagramRef} target="_blank" rel="noopener noreferrer" href={state.instagram}><InstagramIcon /></a></div>}
      {state.facebook !== "" && <div onClick={() => facebookRef.current?.click()} className="footer__btn"><a ref={facebookRef} target="_blank" rel="noopener noreferrer" href={state.facebook}><FacebookIcon /></a></div>}
      {state.mail !== "" && <div onClick={() => mailRef.current?.click()} className="footer__btn"><a ref={mailRef} target="_blank" rel="noopener noreferrer" href={state.mail}><AtIcon /></a></div>}
      {user.blog && <div onClick={() => blogRef.current?.click()} className="footer__btn"><a ref={blogRef} target="_blank" rel="noopener noreferrer" href={user.blog}><LinkIcon /></a></div>}      
    </div>
    <div className="footer__credits">Created By: Blood Rogue</div>
  </>
)}

export default Footer