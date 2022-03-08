import { Helmet } from "react-helmet"

const DefaultHelmet = () => {
  return (
  <Helmet>
    <meta http-equiv="Cache-Control" content="no-cache, no-store, must-revalidate" />
    <meta http-equiv="Pragma" content="no-cache" />
    <meta http-equiv="Expires" content="0" />
    <meta name="description" content="Blood Rogue's info" />
    <meta property="og:description" content="Blood Rogue's info" />
    {/*<meta property="og:image" content="url_to_image"/>*/}
    <meta property="og:url" content="blood-rogue.github.io" />
    <meta property="og:locale" content="en_US" />
    <meta property="og:type" content="article" />
    <link rel="shortcut icon" href="favicon.ico" type="image/x-icon" />
  </Helmet>
  )
}

export default DefaultHelmet