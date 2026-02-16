import { usePrototypeStore, TabType } from '../store/usePrototypeStore'

const PrototypeControlBar = () => {
  const currentTab = usePrototypeStore((state) => state.currentTab)
  const setCurrentTab = usePrototypeStore((state) => state.setCurrentTab)
  const prefillCurrentTab = usePrototypeStore((state) => state.prefillCurrentTab)
  const resetCurrentTab = usePrototypeStore((state) => state.resetCurrentTab)
  const allReset = usePrototypeStore((state) => state.allReset)

  const tabs: { id: TabType; label: string }[] = [
    { id: 'agency-admin', label: 'Agency Admin' },
    { id: 'agent-signup', label: 'Agent Sign Up' },
    { id: 'agent-dashboard', label: 'Agent Dashboard' },
    { id: 'private-marketplace', label: 'Private Marketplace' },
  ]

  return (
    <div className="fixed top-0 left-0 right-0 bg-white border-b-2 border-black z-50">
      <div className="px-6 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-6">
            <span className="text-xs text-wire-gray uppercase tracking-wider">
              Prototype Controls
            </span>
            <div className="flex gap-1">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setCurrentTab(tab.id)}
                  className={`px-4 py-2 text-sm font-medium border ${
                    currentTab === tab.id
                      ? 'bg-black text-white border-black'
                      : 'bg-white text-black border-black hover:bg-wire-gray-light'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>
          <div className="flex gap-2">
            <button
              onClick={prefillCurrentTab}
              className="btn-secondary text-sm"
            >
              Prefill
            </button>
            <button
              onClick={resetCurrentTab}
              className="btn-secondary text-sm"
            >
              Reset
            </button>
            <button
              onClick={allReset}
              className="btn-secondary text-sm"
            >
              All Reset
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PrototypeControlBar
