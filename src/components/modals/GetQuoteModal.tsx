import { useState } from 'react'
import { usePrototypeStore } from '../../store/usePrototypeStore'

const GetQuoteModal = () => {
  const modal = usePrototypeStore((state) => state.privateMarketplace.getQuoteModal)
  const offers = usePrototypeStore((state) => state.privateMarketplace.offers)
  const additionalOffers = usePrototypeStore((state) => state.privateMarketplace.additionalOffers)
  const buyerIdentity = usePrototypeStore((state) => state.privateMarketplace.buyerIdentity)
  const closeModal = usePrototypeStore((state) => state.closeGetQuoteModal)
  const setStep = usePrototypeStore((state) => state.setQuoteStep)
  const toggleLender = usePrototypeStore((state) => state.toggleLenderSelection)
  const updateField = usePrototypeStore((state) => state.updateQuoteField)
  const submitRequest = usePrototypeStore((state) => state.submitQuoteRequest)

  const [showMoreInModal, setShowMoreInModal] = useState(false)

  const prefillPhone = () => {
    updateField('phone', '(704) 555-0199')
  }

  if (!modal.isOpen) return null

  const allOffers = [...offers, ...additionalOffers]
  const visibleOffers = showMoreInModal ? allOffers : offers

  const handleStep1Continue = () => {
    if (modal.selectedLenders.length > 0) {
      setStep(2)
    }
  }

  const handleStep2Submit = () => {
    if (modal.phone.trim()) {
      submitRequest()
    }
  }

  const handleSelectAll = () => {
    const allVisibleIds = visibleOffers.map(o => o.id)
    const allSelected = allVisibleIds.every(id => modal.selectedLenders.includes(id))
    
    if (allSelected) {
      // Deselect all
      allVisibleIds.forEach(id => {
        if (modal.selectedLenders.includes(id)) {
          toggleLender(id)
        }
      })
    } else {
      // Select all that aren't already selected
      allVisibleIds.forEach(id => {
        if (!modal.selectedLenders.includes(id)) {
          toggleLender(id)
        }
      })
    }
  }

  const allVisibleSelected = visibleOffers.length > 0 && visibleOffers.every(o => modal.selectedLenders.includes(o.id))

  return (
    <div className="modal-overlay" onClick={closeModal}>
      <div 
        className="bg-white border-2 border-black p-4 w-full max-w-xl overflow-hidden flex flex-col" 
        onClick={(e) => e.stopPropagation()}
        style={{ maxHeight: modal.step === 3 ? '90vh' : '500px' }}
      >
        {/* Step 1: Select Lenders */}
        {modal.step === 1 && (
          <div className="flex flex-col h-full">
            {/* Header */}
            <h2 className="text-lg font-bold mb-3">Get Quote</h2>
            
            {/* Helper Row */}
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs text-wire-gray-dark">
                Select lenders to receive quotes from.
              </span>
              <button
                type="button"
                onClick={handleSelectAll}
                className="text-xs font-medium text-black hover:underline flex-shrink-0"
              >
                {allVisibleSelected ? 'Deselect all' : 'Select all'}
              </button>
            </div>

            {/* Scrollable Lender List */}
            <div className="overflow-y-auto flex-1 min-h-0 mb-3">
              <div className={showMoreInModal ? "grid grid-cols-2 gap-2" : "space-y-2"}>
                {visibleOffers.map((offer) => (
                  <label
                    key={offer.id}
                    className="flex items-center gap-2 p-3 border border-black cursor-pointer hover:bg-wire-gray-light"
                  >
                    <div className="flex-1 min-w-0">
                      <div className="font-medium text-sm truncate">{offer.lenderName}</div>
                      <div className="text-xs text-wire-gray-dark">NMLS: {offer.nmls}</div>
                    </div>
                    <input
                      type="checkbox"
                      checked={modal.selectedLenders.includes(offer.id)}
                      onChange={() => toggleLender(offer.id)}
                      className="w-4 h-4 flex-shrink-0"
                    />
                  </label>
                ))}
              </div>
            </div>

            {/* Fixed Footer Actions */}
            <div className="flex-shrink-0 border-t border-black pt-3 space-y-2">
              {additionalOffers.length > 0 && (
                <div className="flex justify-center">
                  <button
                    type="button"
                    onClick={() => setShowMoreInModal(!showMoreInModal)}
                    className="text-xs font-medium text-black hover:underline"
                  >
                    {showMoreInModal ? 'Show Less Offers' : 'Show More Offers'}
                  </button>
                </div>
              )}
              
              <div className="flex gap-2">
                <button
                  onClick={closeModal}
                  className="btn-secondary flex-1"
                >
                  Cancel
                </button>
                <button
                  onClick={handleStep1Continue}
                  className="btn-primary flex-1"
                  disabled={modal.selectedLenders.length === 0}
                >
                  Continue
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Step 2: Contact Form */}
        {modal.step === 2 && (
          <div className="flex flex-col h-full">
            {/* Header with Prefill button */}
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold">Request Quotes</h2>
              <button
                type="button"
                onClick={prefillPhone}
                className="btn-secondary text-xs px-3 py-1"
              >
                Prefill
              </button>
            </div>

            {/* Scrollable content area */}
            <div className="flex-1 overflow-y-auto min-h-0 mb-4">
              <form onSubmit={handleStep2Submit} className="space-y-4">
                {/* Name and Email - Read-only, same line */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm mb-1">Name</label>
                    <div className="font-bold text-sm">
                      {buyerIdentity.firstName} {buyerIdentity.lastName}
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm mb-1">Email</label>
                    <div className="font-bold text-sm">{modal.email}</div>
                  </div>
                </div>

                {/* Phone Number - Required Input */}
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Phone number <span className="text-wire-gray-dark">*</span>
                  </label>
                  <input
                    type="tel"
                    value={modal.phone}
                    onChange={(e) => updateField('phone', e.target.value)}
                    className="input-field"
                    placeholder="(555) 555-5555"
                    required
                  />
                </div>

                {/* Disclosure text (no checkbox) */}
                <div className="border-2 border-black p-4 bg-wire-gray-light">
                  <p className="text-xs text-wire-gray-dark">
                    <strong>Disclosure:</strong> By submitting this form, you agree to be contacted
                    by the selected lenders regarding your mortgage inquiry. Your information will
                    be shared with the lenders you've selected. Standard data rates may apply for
                    phone and text communications. You may opt out at any time. For more information,
                    please review our Privacy Policy and Terms of Service.
                  </p>
                </div>
              </form>
            </div>

            {/* Fixed Footer Actions */}
            <div className="flex-shrink-0 border-t border-black pt-3">
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="btn-secondary flex-1"
                  disabled={modal.isSubmitting}
                >
                  Back
                </button>
                <button
                  type="button"
                  onClick={handleStep2Submit}
                  className="btn-primary flex-1"
                  disabled={!modal.phone.trim() || modal.isSubmitting}
                >
                  {modal.isSubmitting ? 'Submitting…' : 'Agree & Submit'}
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Step 3: Confirmation */}
        {modal.step === 3 && (
          <>
            <div className="text-center mb-6">
              <h2 className="text-2xl font-bold mb-4">Your request has been sent.</h2>
              <p className="text-wire-gray-dark mb-2">
                A confirmation email has been sent to{' '}
                <strong>{modal.email}</strong>.
              </p>
              <p className="text-sm text-wire-gray-dark">
                You will be contacted directly by the selected lenders.
              </p>
            </div>

            <button
              onClick={closeModal}
              className="btn-primary w-full"
            >
              Close
            </button>
          </>
        )}
      </div>
    </div>
  )
}

export default GetQuoteModal
