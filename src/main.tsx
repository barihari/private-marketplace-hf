import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import "../styles/globals.css"
import { MarketplaceApp } from "./marketplace/marketplace-app"

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <MarketplaceApp />
  </StrictMode>,
)
