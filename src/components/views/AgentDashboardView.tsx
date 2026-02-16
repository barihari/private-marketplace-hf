import { usePrototypeStore } from '../../store/usePrototypeStore'
import { Copy, RefreshCw, Check } from 'lucide-react'
import CreateLinkModal from '../modals/CreateLinkModal'
import RegenerateModal from '../modals/RegenerateModal'
import LeadDetailModal from '../modals/LeadDetailModal'

const AgentDashboardView = () => {
  const leads = usePrototypeStore((state) => state.agentDashboard.leads)
  const copiedLeadId = usePrototypeStore((state) => state.agentDashboard.copiedLeadId)
  const openCreateLinkModal = usePrototypeStore((state) => state.openCreateLinkModal)
  const copyLeadLink = usePrototypeStore((state) => state.copyLeadLink)
  const openRegenerateModal = usePrototypeStore((state) => state.openRegenerateModal)
  const openLeadDetail = usePrototypeStore((state) => state.openLeadDetail)

  const formatTimeAgo = (date: Date) => {
    const now = new Date()
    const diffMs = now.getTime() - date.getTime()
    const diffMins = Math.floor(diffMs / 60000)
    const diffHours = Math.floor(diffMs / 3600000)
    const diffDays = Math.floor(diffMs / 86400000)

    if (diffMins < 60) {
      return diffMins <= 1 ? 'sent just now' : `sent ${diffMins} minutes ago`
    } else if (diffHours < 24) {
      return `sent ${diffHours} ${diffHours === 1 ? 'hour' : 'hours'} ago`
    } else {
      return `sent ${diffDays} ${diffDays === 1 ? 'day' : 'days'} ago`
    }
  }

  return (
    <div className="max-w-7xl mx-auto p-8 mt-16">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-3">
          <div className="border-2 border-black px-3 py-2">
            <span className="text-sm font-medium">Horizon Agency</span>
          </div>
          <span className="text-sm">x Bankrate</span>
        </div>
        <h1 className="text-2xl font-bold">Agent Dashboard</h1>
        <button
          onClick={openCreateLinkModal}
          className="btn-primary"
        >
          + Create
        </button>
      </div>

      {/* Table */}
      {leads.length === 0 ? (
        <div className="border-2 border-black p-12 text-center">
          <p className="text-wire-gray-dark">No leads yet. Click "+ Create" to generate a buyer link.</p>
        </div>
      ) : (
        <div className="border-2 border-black">
          <table className="w-full">
            <thead>
              <tr className="border-b-2 border-black bg-wire-gray-light">
                <th className="text-left p-4 font-medium">Buyer Name</th>
                <th className="text-left p-4 font-medium">Buyer Email</th>
                <th className="text-left p-4 font-medium">Status</th>
                <th className="text-left p-4 font-medium">Sent</th>
                <th className="text-left p-4 font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {leads.map((lead) => (
                <tr
                  key={lead.id}
                  className="border-b border-black hover:bg-wire-gray-light cursor-pointer"
                  onClick={() => openLeadDetail(lead.id)}
                >
                  <td className="p-4">
                    {lead.firstName && lead.lastName
                      ? `${lead.firstName} ${lead.lastName}`
                      : '—'}
                  </td>
                  <td className="p-4">{lead.email}</td>
                  <td className="p-4">
                    <span
                      className={
                        lead.status === 'Pending'
                          ? 'badge-pending'
                          : 'badge-completed'
                      }
                    >
                      {lead.status}
                    </span>
                  </td>
                  <td className="p-4 text-wire-gray-dark">
                    {formatTimeAgo(lead.sentAt)}
                  </td>
                  <td className="p-4">
                    <div className="flex gap-2" onClick={(e) => e.stopPropagation()}>
                      <button
                        onClick={() => copyLeadLink(lead.id)}
                        className="p-2 border border-black hover:bg-wire-gray-light"
                        title="Copy link"
                      >
                        {copiedLeadId === lead.id ? (
                          <Check size={16} />
                        ) : (
                          <Copy size={16} />
                        )}
                      </button>
                      <button
                        onClick={() => openRegenerateModal(lead.id)}
                        className="p-2 border border-black hover:bg-wire-gray-light"
                        title="Regenerate link"
                      >
                        <RefreshCw size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Modals */}
      <CreateLinkModal />
      <RegenerateModal />
      <LeadDetailModal />
    </div>
  )
}

export default AgentDashboardView
