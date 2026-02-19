import { Button } from "@/components/base/buttons/button"
import { Tab, TabList, Tabs } from "@/components/application/tabs/tabs"
import { usePrototypeStore, type TabType } from "./store/use-prototype-store"

const TAB_ITEMS: { id: TabType; label: string }[] = [
  { id: 'agency-admin', label: 'Agency Admin' },
  { id: 'agent-signup', label: 'Agent Sign Up' },
  { id: 'agent-dashboard', label: 'Agent Dashboard' },
  { id: 'private-marketplace', label: 'Private Marketplace' },
]

export const PrototypeControlBar = () => {
  const currentTab = usePrototypeStore((s) => s.currentTab)
  const setCurrentTab = usePrototypeStore((s) => s.setCurrentTab)
  const prefillCurrentTab = usePrototypeStore((s) => s.prefillCurrentTab)
  const resetCurrentTab = usePrototypeStore((s) => s.resetCurrentTab)
  const allReset = usePrototypeStore((s) => s.allReset)

  return (
    <div className="sticky top-0 z-40 flex items-center gap-4 border-b border-secondary bg-primary px-6 py-3">
      <div className="flex flex-col mr-2">
        <span className="text-xs text-tertiary uppercase tracking-wider">Prototype</span>
        <span className="text-xs font-bold text-primary">High-Fidelity</span>
      </div>

      <Tabs
        selectedKey={currentTab}
        onSelectionChange={(key) => setCurrentTab(key as TabType)}
        className="!flex-row items-center flex-1"
      >
        <TabList
          type="button-border"
          size="sm"
          items={TAB_ITEMS}
          aria-label="Prototype tabs"
        >
          {(tab) => <Tab id={tab.id}>{tab.label}</Tab>}
        </TabList>
      </Tabs>

      <div className="flex items-center gap-2 ml-auto">
        <Button color="secondary" size="sm" onPress={prefillCurrentTab}>
          Prefill
        </Button>
        <Button color="secondary" size="sm" onPress={resetCurrentTab}>
          Reset
        </Button>
        <Button color="secondary" size="sm" onPress={allReset}>
          All Reset
        </Button>
      </div>
    </div>
  )
}
