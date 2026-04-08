import { StrictMode, useState, useEffect } from "react"
import { createRoot } from "react-dom/client"
import "../styles/globals.css"
import { MarketplaceApp } from "./marketplace/marketplace-app"
import { SmbApp } from "./smb/smb-app"
import { ClientLandingPage } from "./client-landing/client-landing-page"
import { SplitLandingPage } from "./client-landing/split-landing-page"

type AppRoute = "enterprise" | "smb" | "client-landing" | "split-landing" | "split-landing-gate"

const hashToRoute = (hash: string): AppRoute => {
  if (hash === "#smb") return "smb"
  if (hash === "#client-landing") return "client-landing"
  if (hash === "#split-landing") return "split-landing"
  if (hash === "#split-landing-gate") return "split-landing-gate"
  return "enterprise"
}

const Root = () => {
  const [route, setRoute] = useState<AppRoute>(hashToRoute(window.location.hash))

  useEffect(() => {
    const onHash = () => setRoute(hashToRoute(window.location.hash))
    window.addEventListener("hashchange", onHash)
    return () => window.removeEventListener("hashchange", onHash)
  }, [])

  if (route === "smb") return <SmbApp />
  if (route === "client-landing") return <ClientLandingPage />
  if (route === "split-landing") return <SplitLandingPage key="split-landing" />
  if (route === "split-landing-gate") return <SplitLandingPage key="split-landing-gate" showGate />
  return <MarketplaceApp />
}

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Root />
  </StrictMode>,
)
