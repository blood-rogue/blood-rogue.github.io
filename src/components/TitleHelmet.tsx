import React from "react"
import { Helmet } from "react-helmet"

const TitleHelmet: React.FC<{ title: string }> = ({ title }) => {
  const getString = (str: string) => `${str} | Blood Rogue`
  
  return (
    <Helmet>
      <title>{getString(title)}</title>
      <meta property="og:title" content={getString(title)} />
      <meta property="og:site_name" content={getString(title)} />
    </Helmet>
  )
}

export default TitleHelmet