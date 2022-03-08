import axios from "axios";
import React, { useEffect, useState } from "react";
import { Buffer } from "buffer";
import { User } from "../api";
import { BuildingIcon, LocationDotIcon } from "./icons";

const Details: React.FC<{ user: User }> = ({ user }) => {
  const [image, setImage] = useState<string | null>(null)
  useEffect(() => {
    axios
      .get(user.avatar_url, { responseType: 'blob' })
      .then(response =>  window.URL.createObjectURL(new Blob([response.data])))
      .then((base64) => setImage(base64))
  }, [user])
  return (
  <div id="details" className="details__container">
    <div className="flex__col items-start justify-center">
      <div className="details__name">{user.name}</div>
      {user.bio && <div className="details__bio">{user.bio}</div>}
    </div>
    <span className="details__info">
      {user.location && <div className="flex__centered"><LocationDotIcon size="2x" /><p className="ml-2 text-2xl">{user.location}</p></div>}
      {user.company && <div className="flex__centered"><BuildingIcon size="2x" /><p className="ml-2 text-2xl">{user.company}</p></div>}
    </span>
    <div className="details__avatar">
      {image !== null ? <img draggable={false} src={image} alt={user.name} className="rounded-full" /> : <div className="w-max h-max bg-neutral-700 rounded-full animate-pulse"></div>}
    </div>
  </div>)
}

export default Details