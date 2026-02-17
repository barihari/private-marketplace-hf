import { usePrototypeStore } from './store/usePrototypeStore'
import PrototypeControlBar from './components/PrototypeControlBar'
import AgencyAdminView from './components/views/AgencyAdminView'
import AgentSignUpView from './components/views/AgentSignUpView'
import AgentDashboardView from './components/views/AgentDashboardView'
import PrivateMarketplaceView from './components/views/PrivateMarketplaceView'

function App() {
  const currentTab = usePrototypeStore((state) => state.currentTab)

  return (
    <div className="min-h-screen bg-red-500">
      <PrototypeControlBar />
      <div className="pt-16">
        {currentTab === 'agency-admin' && <AgencyAdminView />}
        {currentTab === 'agent-signup' && <AgentSignUpView />}
        {currentTab === 'agent-dashboard' && <AgentDashboardView />}
        {currentTab === 'private-marketplace' && <PrivateMarketplaceView />}
      </div>
    </div>
  )
}

export default App
