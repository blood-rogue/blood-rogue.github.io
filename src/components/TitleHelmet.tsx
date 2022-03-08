import React from "react"
import { Helmet } from "react-helmet"

const TitleHelmet: React.FC<{ title: string }> = ({ title }) => {
  const getString = (str: string) => `${str} | Blood Rogue`
  
  return (
    <Helmet>
      <title>{getString(title)}</title>
      <meta name="description" content="Blood Rogue's info" />
      <meta property="og:title" content={getString(title)} />
      <meta property="og:description" content="Blood Rogue's info" />
      {/*<meta property="og:image" content="url_to_image"/>*/}
      <meta property="og:url" content="blood-rogue.github.io" />
      <meta property="og:site_name" content={getString(title)} />
      <meta property="og:locale" content="en_US" />
      <meta property="og:type" content="article" />
      <link rel="shortcut icon" href="favicon.ico" type="image/x-icon" />
    </Helmet>
  )
}

export default TitleHelmet