import React from "react"
import { User } from "../api"
import { AtIcon, FacebookIcon, GithubIcon, InstagramIcon, LinkIcon, TwitterIcon } from "./icons"

interface SocialUrls {
  facebook: string;
  instagram: string;
  mail: string;
}

interface SocialAction {
  type: "instagram" | "mail" | "facebook",
  url: string
}

const Footer: React.FC<{
  socialUrls: { [key: string]: string },
  user: User, themeBtn: JSX.Element
}> = ({ socialUrls, user, themeBtn }) => {
  const urls = Object.keys(socialUrls)

  const initialArgs = {
    facebook: "",
    instagram: "",
    mail: ""
  }

  const reducer = (state: SocialUrls, action: SocialAction) => {
    switch (action.type) {
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

  const [state, dispatch] = React.useReducer(reducer, initialArgs)

  const githubRef = React.useRef<HTMLAnchorElement>(null)
  const instagramRef = React.useRef<HTMLAnchorElement>(null)
  const twitterRef = React.useRef<HTMLAnchorElement>(null)
  const facebookRef = React.useRef<HTMLAnchorElement>(null)
  const mailRef = React.useRef<HTMLAnchorElement>(null)
  const blogRef = React.useRef<HTMLAnchorElement>(null)

  React.useEffect(() => {
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
      {user.html_url !== "" && <div onClick={() => githubRef.current?.click()} className="footer__btn"><a ref={githubRef} target="_blank" rel="noopener noreferrer" href={user.html_url}><GithubIcon /></a></div>}
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