import { useState } from "react"

type DealStatus = 'Pre-approval' | 'Underwriting' | 'Appraisal' | 'Closing' | 'Closed'

interface Deal {
  id: string
  buyer: string
  property: string
  status: DealStatus
  lender: string
  amount: string
  alert?: string
}

const freeDeals: Deal[] = [
  { id: '1', buyer: 'James Walker', property: '45 W 21st St', status: 'Pre-approval', lender: 'First National Bank', amount: '$680,000' },
  { id: '2', buyer: 'Stacy Barnes', property: '88 Greenwich Ave', status: 'Underwriting', lender: 'Metro Mortgage Corp', amount: '$520,000' },
  { id: '3', buyer: 'Michael Tran', property: '12 Hudson Yards', status: 'Closed', lender: 'Coastal Credit Union', amount: '$910,000' },
]

const premiumDeals: Deal[] = [
  { id: '1', buyer: 'James Walker', property: '45 W 21st St', status: 'Pre-approval', lender: 'First National Bank', amount: '$680,000' },
  { id: '2', buyer: 'Stacy Barnes', property: '88 Greenwich Ave', status: 'Underwriting', lender: 'Metro Mortgage Corp', amount: '$520,000' },
  { id: '3', buyer: 'Lisa Chen', property: '123 Main St', status: 'Appraisal', lender: 'Horizon Home Lending', amount: '$750,000', alert: 'Appraisal gap — escalated to support' },
  { id: '4', buyer: 'Michael Tran', property: '12 Hudson Yards', status: 'Closed', lender: 'Coastal Credit Union', amount: '$910,000' },
]

const statusColor: Record<DealStatus, string> = {
  'Pre-approval': 'bg-blue-100 text-blue-700',
  'Underwriting': 'bg-yellow-100 text-yellow-700',
  'Appraisal': 'bg-orange-100 text-orange-700',
  'Closing': 'bg-purple-100 text-purple-700',
  'Closed': 'bg-green-100 text-green-700',
}

type FreeSection = 'deals' | 'lenders' | 'resources' | 'support'
type PremiumSection = 'deals' | 'contact' | 'profile' | 'rates' | 'marketing'

const MiniDashboard = ({
  tier,
  dark,
  children,
  nav,
}: {
  tier: string
  dark?: boolean
  children: React.ReactNode
  nav: React.ReactNode
}) => (
  <div className={`border rounded-lg overflow-hidden ${dark ? 'border-gray-900' : 'border-gray-300'}`}>
    <div className={`px-4 py-2.5 flex items-center justify-between ${dark ? 'bg-gray-900' : 'bg-gray-100 border-b border-gray-200'}`}>
      <span className={`text-xs font-semibold uppercase tracking-wider ${dark ? 'text-gray-300' : 'text-gray-500'}`}>
        Agent Portal — {tier}
      </span>
    </div>
    <div className="flex">
      <div className="w-36 shrink-0 border-r border-gray-200 bg-gray-50 py-2">
        {nav}
      </div>
      <div className="flex-1 p-4 min-h-[400px]">
        {children}
      </div>
    </div>
  </div>
)

const NavItem = ({ label, active, onClick }: { label: string; active: boolean; onClick: () => void }) => (
  <button
    onClick={onClick}
    className={`block w-full text-left px-3 py-1.5 text-xs ${active ? 'font-bold text-gray-900 bg-white' : 'text-gray-500 hover:text-gray-700 hover:bg-gray-100'}`}
  >
    {label}
  </button>
)

const DealTable = ({ deals, showAlerts }: { deals: Deal[]; showAlerts?: boolean }) => {
  const [selected, setSelected] = useState<string | null>(null)
  const selectedDeal = deals.find((d) => d.id === selected)

  if (selectedDeal) {
    return (
      <div>
        <button onClick={() => setSelected(null)} className="text-xs text-gray-500 hover:text-gray-900 mb-3">
          ← Back to deals
        </button>
        <h4 className="text-sm font-bold mb-1">{selectedDeal.buyer}</h4>
        <p className="text-xs text-gray-500 mb-3">{selectedDeal.property}</p>
        <div className="space-y-2 text-xs">
          <div className="flex justify-between py-1.5 border-b border-gray-100">
            <span className="text-gray-500">Status</span>
            <span className={`px-2 py-0.5 rounded-full text-[10px] font-medium ${statusColor[selectedDeal.status]}`}>{selectedDeal.status}</span>
          </div>
          <div className="flex justify-between py-1.5 border-b border-gray-100">
            <span className="text-gray-500">Lender</span>
            <span>{selectedDeal.lender}</span>
          </div>
          <div className="flex justify-between py-1.5 border-b border-gray-100">
            <span className="text-gray-500">Loan amount</span>
            <span>{selectedDeal.amount}</span>
          </div>
          {showAlerts && selectedDeal.alert && (
            <div className="mt-3 bg-orange-50 border border-orange-200 rounded p-2 text-xs text-orange-700">
              {selectedDeal.alert}
            </div>
          )}
        </div>
      </div>
    )
  }

  return (
    <div>
      <h4 className="text-sm font-bold mb-3">Deal Tracker</h4>
      <div className="space-y-0">
        {deals.map((deal) => (
          <button
            key={deal.id}
            onClick={() => setSelected(deal.id)}
            className="w-full text-left flex items-center justify-between py-2 px-2 border-b border-gray-100 hover:bg-gray-50 rounded"
          >
            <div>
              <span className="text-xs font-medium">{deal.buyer}</span>
              <span className="text-[10px] text-gray-400 ml-2">{deal.property}</span>
            </div>
            <span className={`px-2 py-0.5 rounded-full text-[10px] font-medium shrink-0 ${statusColor[deal.status]}`}>
              {deal.status}
            </span>
          </button>
        ))}
      </div>
      {showAlerts && deals.some((d) => d.alert) && (
        <div className="mt-3 bg-orange-50 border border-orange-200 rounded p-2 text-xs text-orange-700">
          1 escalation active — click deal to view
        </div>
      )}
    </div>
  )
}

const FreeDashboard = () => {
  const [section, setSection] = useState<FreeSection>('deals')

  return (
    <MiniDashboard
      tier="Free"
      nav={
        <>
          <NavItem label="Deals" active={section === 'deals'} onClick={() => setSection('deals')} />
          <NavItem label="Lenders" active={section === 'lenders'} onClick={() => setSection('lenders')} />
          <NavItem label="Resources" active={section === 'resources'} onClick={() => setSection('resources')} />
          <NavItem label="Support" active={section === 'support'} onClick={() => setSection('support')} />
        </>
      }
    >
      {section === 'deals' && <DealTable deals={freeDeals} />}
      {section === 'lenders' && (
        <div>
          <h4 className="text-sm font-bold mb-3">Lender Network</h4>
          {[
            { name: 'First National Bank', rate: '6.875%', nmls: '#3304' },
            { name: 'Metro Mortgage Corp', rate: '6.950%', nmls: '#2156' },
            { name: 'Coastal Credit Union', rate: '7.000%', nmls: '#1789' },
          ].map((l, i) => (
            <div key={i} className="flex items-center justify-between py-2 border-b border-gray-100 text-xs">
              <div>
                <span className="font-medium">{l.name}</span>
                <span className="text-gray-400 ml-1.5">NMLS {l.nmls}</span>
              </div>
              <span className="font-medium">{l.rate}</span>
            </div>
          ))}
        </div>
      )}
      {section === 'resources' && (
        <div>
          <h4 className="text-sm font-bold mb-3">Buyer Resources</h4>
          {['Rate comparison guide', 'First-time buyer checklist', 'Mortgage glossary', 'Pre-approval explainer'].map((r, i) => (
            <div key={i} className="py-2 border-b border-gray-100 text-xs text-gray-600 flex items-center gap-2">
              <span className="text-gray-400">&#9658;</span> {r}
            </div>
          ))}
        </div>
      )}
      {section === 'support' && (
        <div>
          <h4 className="text-sm font-bold mb-3">Support</h4>
          <p className="text-xs text-gray-500 mb-3">Standard support access</p>
          {['Help center', 'Email support', 'FAQ & knowledge base'].map((s, i) => (
            <div key={i} className="py-2 border-b border-gray-100 text-xs text-gray-600">{s}</div>
          ))}
        </div>
      )}
    </MiniDashboard>
  )
}

const PremiumDashboard = () => {
  const [section, setSection] = useState<PremiumSection>('deals')

  return (
    <MiniDashboard
      tier="Premium"
      dark
      nav={
        <>
          <NavItem label="Deals" active={section === 'deals'} onClick={() => setSection('deals')} />
          <NavItem label="My Contact" active={section === 'contact'} onClick={() => setSection('contact')} />
          <NavItem label="Profile" active={section === 'profile'} onClick={() => setSection('profile')} />
          <NavItem label="Rate Proof" active={section === 'rates'} onClick={() => setSection('rates')} />
          <NavItem label="Marketing" active={section === 'marketing'} onClick={() => setSection('marketing')} />
        </>
      }
    >
      {section === 'deals' && <DealTable deals={premiumDeals} showAlerts />}
      {section === 'contact' && (
        <div>
          <h4 className="text-sm font-bold mb-3">Dedicated Contact</h4>
          <div className="border border-gray-200 rounded-lg p-3 mb-3">
            <p className="text-xs font-bold">Sarah Mitchell</p>
            <p className="text-[10px] text-gray-500">Sr. Loan Advisor</p>
          </div>
          <div className="space-y-2 text-xs">
            <div className="flex justify-between py-1.5 border-b border-gray-100">
              <span className="text-gray-500">Direct line</span><span>(212) 555-0199</span>
            </div>
            <div className="flex justify-between py-1.5 border-b border-gray-100">
              <span className="text-gray-500">Next check-in</span><span>Thursday 10am</span>
            </div>
            <div className="flex justify-between py-1.5 border-b border-gray-100">
              <span className="text-gray-500">Avg. response</span><span>12 min</span>
            </div>
          </div>
        </div>
      )}
      {section === 'profile' && (
        <div>
          <h4 className="text-sm font-bold mb-3">Verified Agent Profile</h4>
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-full bg-gray-200" />
            <div>
              <p className="text-xs font-bold">Daniel Reyes</p>
              <p className="text-[10px] text-gray-500">Manhattan, NY &middot; Verified</p>
            </div>
          </div>
          <div className="space-y-2 text-xs">
            <div className="flex justify-between py-1.5 border-b border-gray-100">
              <span className="text-gray-500">Status</span><span className="text-green-600 font-medium">Verified</span>
            </div>
            <div className="flex justify-between py-1.5 border-b border-gray-100">
              <span className="text-gray-500">Featured area</span><span>Manhattan, NY</span>
            </div>
            <div className="flex justify-between py-1.5 border-b border-gray-100">
              <span className="text-gray-500">Rating</span><span>4.9 (28 reviews)</span>
            </div>
          </div>
        </div>
      )}
      {section === 'rates' && (
        <div>
          <h4 className="text-sm font-bold mb-3">Rate Proof & Comparisons</h4>
          <div className="grid grid-cols-2 gap-3 mb-4">
            <div className="border border-gray-200 rounded p-2 text-center">
              <p className="text-lg font-bold text-green-600">-0.12%</p>
              <p className="text-[10px] text-gray-500">vs market avg.</p>
            </div>
            <div className="border border-gray-200 rounded p-2 text-center">
              <p className="text-lg font-bold">94%</p>
              <p className="text-[10px] text-gray-500">closing rate</p>
            </div>
          </div>
          {['Proof sheet generator', 'Co-branded rate flyer', 'Client-facing comparison PDF'].map((t, i) => (
            <div key={i} className="py-2 border-b border-gray-100 text-xs text-gray-600 flex items-center gap-2">
              <span className="text-gray-400">&#9658;</span> {t}
            </div>
          ))}
        </div>
      )}
      {section === 'marketing' && (
        <div>
          <h4 className="text-sm font-bold mb-3">Co-Branded Marketing</h4>
          {['Social media templates', 'Open house flyers', 'Email campaign builder', 'Landing page generator'].map((t, i) => (
            <div key={i} className="py-2 border-b border-gray-100 text-xs text-gray-600 flex items-center gap-2">
              <span className="text-gray-400">&#9658;</span> {t}
            </div>
          ))}
        </div>
      )}
    </MiniDashboard>
  )
}

export const PortalView = () => (
  <div className="max-w-[1500px] mx-auto px-6 py-10">
    <h1 className="text-2xl font-bold text-center mb-8">Portal</h1>

    <div className="grid grid-cols-2 gap-8">
      <div>
        <h2 className="text-lg font-bold text-center mb-4">Free</h2>
        <FreeDashboard />
      </div>
      <div>
        <h2 className="text-lg font-bold text-center mb-4">Premium</h2>
        <PremiumDashboard />
      </div>
    </div>

    {/* Feature summaries */}
    <div className="grid grid-cols-2 gap-8 mt-6">
      <div className="px-2">
        <h4 className="text-sm font-bold mb-2">Free tier includes</h4>
        <ul className="text-sm text-gray-600 space-y-1">
          <li>• Basic portal access</li>
          <li>• Deal tracking</li>
          <li>• Lender network access</li>
          <li>• Buyer education resources</li>
          <li>• Standard support</li>
        </ul>
      </div>
      <div className="px-2">
        <h4 className="text-sm font-bold mb-2">Premium tier includes</h4>
        <ul className="text-sm text-gray-600 space-y-1">
          <li>• Everything in Free</li>
          <li>• Dedicated contact with direct line</li>
          <li>• Verified agent profile & featured placement</li>
          <li>• Rate proof & comparison tools</li>
          <li>• Co-branded marketing tools</li>
          <li>• Priority appraisal escalation</li>
        </ul>
      </div>
    </div>
  </div>
)
