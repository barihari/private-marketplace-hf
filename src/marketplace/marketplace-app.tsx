import { usePrototypeStore } from "./store/use-prototype-store"
import { PrototypeControlBar } from "./prototype-control-bar"
import { AgencyAdminView } from "./views/agency-admin-view"
import { AgentSignUpView } from "./views/agent-signup-view"
import { AgentDashboardView } from "./views/agent-dashboard-view"
import { PrivateMarketplaceView } from "./views/private-marketplace-view"

export const MarketplaceApp = () => {
  const currentTab = usePrototypeStore((s) => s.currentTab)

  return (
    <div className="min-h-screen bg-secondary">
      <PrototypeControlBar />
      <main>
        {currentTab === 'agency-admin' && <AgencyAdminView />}
        {currentTab === 'agent-signup' && <AgentSignUpView />}
        {currentTab === 'agent-dashboard' && <AgentDashboardView />}
        {currentTab === 'private-marketplace' && <PrivateMarketplaceView />}
      </main>
    </div>
  )
}
