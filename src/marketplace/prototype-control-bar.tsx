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
        <select
          value="enterprise"
          onChange={(e) => {
            const v = e.target.value
            if (v === "enterprise") window.location.hash = ""
            if (v === "smb") window.location.hash = "#smb"
            if (v === "client-landing") window.location.hash = "#client-landing"
            if (v === "split-landing") window.location.hash = "#split-landing"
            if (v === "split-landing-gate") window.location.hash = "#split-landing-gate"
          }}
          className="text-xs font-bold text-primary bg-transparent border border-secondary rounded px-1.5 py-0.5 cursor-pointer"
        >
          <option value="enterprise">Enterprise</option>
          <option value="smb">SMB Pivot</option>
          <option value="client-landing">Client Landing Page</option>
          <option value="split-landing">Split landing</option>
          <option value="split-landing-gate">Split landing (gated)</option>
        </select>
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
