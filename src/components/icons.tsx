import { faSun, faMoon, faAt, faLink, faLocationDot, faBuilding, faThumbsUp, faThumbsDown } from "@fortawesome/free-solid-svg-icons";
import { faTwitter, faGithub, faInstagram, faFacebook } from "@fortawesome/free-brands-svg-icons"
import { FontAwesomeIcon, FontAwesomeIconProps } from "@fortawesome/react-fontawesome";
import React from "react";

type CustomFontAwesomeIcon = Omit<FontAwesomeIconProps, "icon"> 

const TwitterIcon: React.FC<CustomFontAwesomeIcon> = (props) => <FontAwesomeIcon {...props} icon={faTwitter} />
const GithubIcon: React.FC<CustomFontAwesomeIcon> = (props) => <FontAwesomeIcon {...props} icon={faGithub} />
const InstagramIcon: React.FC<CustomFontAwesomeIcon> = (props) => <FontAwesomeIcon {...props} icon={faInstagram} />
const FacebookIcon: React.FC<CustomFontAwesomeIcon> = (props) => <FontAwesomeIcon {...props} icon={faFacebook} />
const SunIcon: React.FC<CustomFontAwesomeIcon> = (props) => <FontAwesomeIcon {...props} icon={faSun} />
const MoonIcon: React.FC<CustomFontAwesomeIcon> = (props) => <FontAwesomeIcon {...props} icon={faMoon} />
const AtIcon: React.FC<CustomFontAwesomeIcon> = (props) => <FontAwesomeIcon {...props} icon={faAt} />
const LinkIcon: React.FC<CustomFontAwesomeIcon> = (props) => <FontAwesomeIcon {...props} icon={faLink} />
const LocationDotIcon: React.FC<CustomFontAwesomeIcon> = (props) => <FontAwesomeIcon {...props} icon={faLocationDot} />
const BuildingIcon: React.FC<CustomFontAwesomeIcon> = (props) => <FontAwesomeIcon {...props} icon={faBuilding} />
const ThumbsUpIcon: React.FC<CustomFontAwesomeIcon> = (props) => <FontAwesomeIcon {...props} icon={faThumbsUp} />
const ThumbsDownIcon: React.FC<CustomFontAwesomeIcon> = (props) => <FontAwesomeIcon {...props} icon={faThumbsDown} />

export { ThumbsDownIcon, ThumbsUpIcon, TwitterIcon, GithubIcon, InstagramIcon, FacebookIcon, SunIcon, MoonIcon, LinkIcon, LocationDotIcon, AtIcon, BuildingIcon }