import { usePrototypeStore } from '../../store/usePrototypeStore'
import { mortgageOptions } from '../../constants/mortgageOptions'

const LeadDetailModal = () => {
  const modal = usePrototypeStore((state) => state.agentDashboard.leadDetailModal)
  const leads = usePrototypeStore((state) => state.agentDashboard.leads)
  const closeModal = usePrototypeStore((state) => state.closeLeadDetail)

  if (!modal.isOpen || !modal.selectedLeadId) return null

  const lead = leads.find((l) => l.id === modal.selectedLeadId)
  if (!lead) return null

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    })
  }

  return (
    <div className="modal-overlay" onClick={closeModal}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <h2 className="text-xl font-bold mb-6">Lead Details</h2>

        <div className="space-y-4 mb-6">
          <div>
            <label className="block text-sm font-medium text-wire-gray mb-1">
              Buyer Email
            </label>
            <p className="text-black">{lead.email}</p>
          </div>

          <div>
            <label className="block text-sm font-medium text-wire-gray mb-1">
              Status
            </label>
            <span
              className={
                lead.status === 'Pending' ? 'badge-pending' : 'badge-completed'
              }
            >
              {lead.status}
            </span>
          </div>

          <div>
            <label className="block text-sm font-medium text-wire-gray mb-1">
              Link Created
            </label>
            <p className="text-black">{formatDate(lead.sentAt)}</p>
          </div>
        </div>

        <div className="border-t-2 border-black pt-6">
          <h3 className="font-bold mb-4">Form Snapshot</h3>
          <div className="space-y-3">
            {lead.formSnapshot.firstName && (
              <div className="grid grid-cols-2">
                <span className="text-sm text-wire-gray-dark">First Name:</span>
                <span className="text-sm">{lead.formSnapshot.firstName}</span>
              </div>
            )}
            {lead.formSnapshot.lastName && (
              <div className="grid grid-cols-2">
                <span className="text-sm text-wire-gray-dark">Last Name:</span>
                <span className="text-sm">{lead.formSnapshot.lastName}</span>
              </div>
            )}
            {lead.formSnapshot.zipCode && (
              <div className="grid grid-cols-2">
                <span className="text-sm text-wire-gray-dark">Zip Code:</span>
                <span className="text-sm">{lead.formSnapshot.zipCode}</span>
              </div>
            )}
            {lead.formSnapshot.propertyValue && (
              <div className="grid grid-cols-2">
                <span className="text-sm text-wire-gray-dark">Property Value:</span>
                <span className="text-sm">{lead.formSnapshot.propertyValue}</span>
              </div>
            )}
            {lead.formSnapshot.loanAmount && (
              <div className="grid grid-cols-2">
                <span className="text-sm text-wire-gray-dark">Loan Amount:</span>
                <span className="text-sm">{lead.formSnapshot.loanAmount}</span>
              </div>
            )}
            {lead.formSnapshot.downPayment && (
              <div className="grid grid-cols-2">
                <span className="text-sm text-wire-gray-dark">Down Payment:</span>
                <span className="text-sm">{lead.formSnapshot.downPayment}%</span>
              </div>
            )}
            <div className="grid grid-cols-2">
              <span className="text-sm text-wire-gray-dark">Credit Score:</span>
              <span className="text-sm">
                {lead.formSnapshot.creditScore || '(not provided)'}
              </span>
            </div>
            {lead.formSnapshot.loanTerm && (
              <div className="grid grid-cols-2">
                <span className="text-sm text-wire-gray-dark">Loan Term:</span>
                <span className="text-sm">{lead.formSnapshot.loanTerm}</span>
              </div>
            )}
            {lead.formSnapshot.militaryStatus && (
              <div className="grid grid-cols-2">
                <span className="text-sm text-wire-gray-dark">Military Status:</span>
                <span className="text-sm">{lead.formSnapshot.militaryStatus}</span>
              </div>
            )}
            {lead.formSnapshot.dtiRatio && (
              <div className="grid grid-cols-2">
                <span className="text-sm text-wire-gray-dark">DTI Ratio:</span>
                <span className="text-sm">
                  {lead.formSnapshot.dtiRatio === 'lt40'
                    ? mortgageOptions.dtiOptions.lessThan40
                    : lead.formSnapshot.dtiRatio === 'gte40'
                    ? mortgageOptions.dtiOptions.fortyAndAbove
                    : lead.formSnapshot.dtiRatio}
                </span>
              </div>
            )}
            {lead.formSnapshot.mortgagePoints && (
              <div className="grid grid-cols-2">
                <span className="text-sm text-wire-gray-dark">Mortgage Points:</span>
                <span className="text-sm">{lead.formSnapshot.mortgagePoints}</span>
              </div>
            )}
            {lead.formSnapshot.propertyType && (
              <div className="grid grid-cols-2">
                <span className="text-sm text-wire-gray-dark">Property Type:</span>
                <span className="text-sm">{lead.formSnapshot.propertyType}</span>
              </div>
            )}
            {lead.formSnapshot.propertyUse && (
              <div className="grid grid-cols-2">
                <span className="text-sm text-wire-gray-dark">Property Use:</span>
                <span className="text-sm">{lead.formSnapshot.propertyUse}</span>
              </div>
            )}
            {lead.formSnapshot.includeFHA !== undefined && (
              <div className="grid grid-cols-2">
                <span className="text-sm text-wire-gray-dark">Include FHA:</span>
                <span className="text-sm">
                  {lead.formSnapshot.includeFHA ? 'Yes' : 'No'}
                </span>
              </div>
            )}
          </div>
        </div>

        <button
          onClick={closeModal}
          className="btn-primary w-full mt-6"
        >
          Close
        </button>
      </div>
    </div>
  )
}

export default LeadDetailModal
