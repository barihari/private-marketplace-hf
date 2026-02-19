import { usePrototypeStore } from '../../store/usePrototypeStore'
import { mortgageOptions } from '../../constants/mortgageOptions'
import { ChevronDown } from 'lucide-react'

const EntryModal = () => {
  const modal = usePrototypeStore((state) => state.privateMarketplace.entryModal)
  const buyerIdentity = usePrototypeStore((state) => state.privateMarketplace.buyerIdentity)
  const filters = usePrototypeStore((state) => state.privateMarketplace.filters)
  const updateCreditScore = usePrototypeStore((state) => state.updateEntryCreditScore)
  const findOffers = usePrototypeStore((state) => state.findOffers)

  if (!modal.isOpen) return null

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (modal.creditScore.trim()) {
      findOffers()
    }
  }

  return (
    <div className="modal-overlay">
      <div className="modal-content max-w-3xl" onClick={(e) => e.stopPropagation()}>
        <div className="text-center mb-4">
          <h2 className="text-2xl font-bold mb-1">
            Welcome {buyerIdentity.firstName}
          </h2>
          <p className="text-sm text-wire-gray-dark">
            Mortgage offers from Bankrate's private marketplace
          </p>
        </div>

        <form onSubmit={handleSubmit}>
          {/* Prefilled readonly fields */}
          <div className="border-2 border-black p-4 mb-4 bg-wire-gray-light">
            <h3 className="font-bold mb-3 text-sm">Your Details</h3>
            <div className="grid grid-cols-2 gap-x-6 gap-y-3">
              <div>
                <div className="text-xs text-wire-gray-dark">Name</div>
                <div className="font-bold text-sm">{`${buyerIdentity.firstName} ${buyerIdentity.lastName}`}</div>
              </div>
              <div>
                <div className="text-xs text-wire-gray-dark">Email</div>
                <div className="font-bold text-sm">{buyerIdentity.email}</div>
              </div>
              <div>
                <div className="text-xs text-wire-gray-dark">Zip Code</div>
                <div className="font-bold text-sm">{filters.zipCode}</div>
              </div>
              <div>
                <div className="text-xs text-wire-gray-dark">Property Value</div>
                <div className="font-bold text-sm">{filters.propertyValue || '—'}</div>
              </div>
              <div>
                <div className="text-xs text-wire-gray-dark">Loan Amount</div>
                <div className="font-bold text-sm">{filters.loanAmount || '—'}</div>
              </div>
              <div>
                <div className="text-xs text-wire-gray-dark">Down Payment</div>
                <div className="font-bold text-sm">{filters.downPayment ? `${filters.downPayment}%` : '—'}</div>
              </div>
              <div>
                <div className="text-xs text-wire-gray-dark">Loan Term</div>
                <div className="font-bold text-sm">{filters.loanTerm || '—'}</div>
              </div>
              <div>
                <div className="text-xs text-wire-gray-dark">Property Type</div>
                <div className="font-bold text-sm">{filters.propertyType || '—'}</div>
              </div>
              <div>
                <div className="text-xs text-wire-gray-dark">Property Use</div>
                <div className="font-bold text-sm">{filters.propertyUse || '—'}</div>
              </div>
              <div>
                <div className="text-xs text-wire-gray-dark">Military Status</div>
                <div className="font-bold text-sm">{filters.militaryStatus || '—'}</div>
              </div>
              <div>
                <div className="text-xs text-wire-gray-dark">DTI Ratio</div>
                <div className="font-bold text-sm">
                  {filters.dtiRatio === 'lt40' 
                    ? mortgageOptions.dtiOptions.lessThan40 
                    : filters.dtiRatio === 'gte40' 
                    ? mortgageOptions.dtiOptions.fortyAndAbove 
                    : '—'}
                </div>
              </div>
              <div>
                <div className="text-xs text-wire-gray-dark">Mortgage Points</div>
                <div className="font-bold text-sm">{filters.mortgagePoints || '—'}</div>
              </div>
            </div>
          </div>

          {/* Missing info section */}
          <div className="border-2 border-black p-4 mb-4">
            <h3 className="font-bold mb-3 text-sm">Add Missing Info</h3>
            <div>
              <label className="block text-sm font-medium mb-2">
                Credit Score <span className="text-wire-gray">*</span>
              </label>
              <div className="relative">
                <select
                  value={modal.creditScore}
                  onChange={(e) => updateCreditScore(e.target.value)}
                  className="input-field appearance-none pr-10"
                  required
                >
                  <option value="">Select credit score...</option>
                  {mortgageOptions.creditScoreOptions.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
                <ChevronDown size={18} className="absolute right-3 top-1/2 -translate-y-1/2 text-wire-gray-dark pointer-events-none" />
              </div>
            </div>
          </div>

          <button
            type="submit"
            className="btn-primary w-full"
          >
            Find Offers
          </button>
        </form>
      </div>
    </div>
  )
}

export default EntryModal
