import { StrictMode, useState, useEffect } from "react"
import { createRoot } from "react-dom/client"
import "../styles/globals.css"
import { MarketplaceApp } from "./marketplace/marketplace-app"
import { SmbApp } from "./smb/smb-app"

const Root = () => {
  const [isSmb, setIsSmb] = useState(window.location.hash === '#smb')

  useEffect(() => {
    const onHash = () => setIsSmb(window.location.hash === '#smb')
    window.addEventListener('hashchange', onHash)
    return () => window.removeEventListener('hashchange', onHash)
  }, [])

  return isSmb ? <SmbApp /> : <MarketplaceApp />
}

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Root />
  </StrictMode>,
)
