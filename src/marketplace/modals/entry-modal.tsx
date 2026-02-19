import { Button } from "@/components/base/buttons/button"
import { Dialog, Modal, ModalOverlay } from "@/components/application/modals/modal"
import { usePrototypeStore } from "../store/use-prototype-store"
import { mortgageOptions } from "../constants/mortgage-options"
import { cx } from "@/utils/cx"

export const EntryModal = () => {
  const modal = usePrototypeStore((s) => s.privateMarketplace.entryModal)
  const buyerIdentity = usePrototypeStore((s) => s.privateMarketplace.buyerIdentity)
  const filters = usePrototypeStore((s) => s.privateMarketplace.filters)
  const updateCreditScore = usePrototypeStore((s) => s.updateEntryCreditScore)
  const findOffers = usePrototypeStore((s) => s.findOffers)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (modal.creditScore.trim()) findOffers()
  }

  const DetailRow = ({ label, value }: { label: string; value: string }) => (
    <div className="flex flex-col gap-0.5">
      <span className="text-xs text-tertiary">{label}</span>
      <span className="text-sm font-semibold text-primary">{value || '—'}</span>
    </div>
  )

  return (
    <ModalOverlay isOpen={modal.isOpen}>
      <Modal className="max-w-xl">
        <Dialog>
          <div className="rounded-xl bg-primary shadow-2xl ring-1 ring-secondary_alt w-full max-w-xl p-6 flex flex-col gap-5 max-h-[90vh] overflow-y-auto">
            <div className="text-center">
              <h2 className="text-xl font-semibold text-primary mb-1">
                Welcome {buyerIdentity.firstName}
              </h2>
              <p className="text-sm text-tertiary">
                Mortgage offers from Bankrate's private marketplace
              </p>
            </div>

            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              {/* Prefilled details */}
              <div className="rounded-lg bg-secondary p-4">
                <h3 className="text-xs font-semibold text-secondary uppercase tracking-wider mb-3">Your Details</h3>
                <div className="grid grid-cols-2 gap-x-6 gap-y-3">
                  <DetailRow label="Name" value={`${buyerIdentity.firstName} ${buyerIdentity.lastName}`} />
                  <DetailRow label="Email" value={buyerIdentity.email} />
                  <DetailRow label="Zip Code" value={filters.zipCode} />
                  <DetailRow label="Property Value" value={filters.propertyValue} />
                  <DetailRow label="Loan Amount" value={filters.loanAmount} />
                  <DetailRow label="Down Payment" value={filters.downPayment ? `${filters.downPayment}%` : ''} />
                  <DetailRow label="Loan Term" value={filters.loanTerm} />
                  <DetailRow label="Property Type" value={filters.propertyType} />
                  <DetailRow label="Property Use" value={filters.propertyUse} />
                  <DetailRow label="Military Status" value={filters.militaryStatus} />
                  <DetailRow
                    label="DTI Ratio"
                    value={
                      filters.dtiRatio === 'lt40'
                        ? mortgageOptions.dtiOptions.lessThan40
                        : filters.dtiRatio === 'gte40'
                        ? mortgageOptions.dtiOptions.fortyAndAbove
                        : ''
                    }
                  />
                  <DetailRow label="Mortgage Points" value={filters.mortgagePoints} />
                </div>
              </div>

              {/* Missing info */}
              <div className="rounded-lg ring-1 ring-secondary p-4 flex flex-col gap-3">
                <h3 className="text-xs font-semibold text-secondary uppercase tracking-wider">Add Missing Info</h3>
                <div className="flex flex-col gap-1.5">
                  <span className="text-sm font-medium text-secondary">
                    Credit Score <span className="text-tertiary">*</span>
                  </span>
                  <div className="relative">
                    <select
                      value={modal.creditScore}
                      onChange={(e) => updateCreditScore(e.target.value)}
                      required
                      className={cx(
                        "w-full appearance-none rounded-lg bg-primary px-3 py-2 pr-8 text-sm text-primary shadow-xs ring-1 ring-primary ring-inset outline-none",
                        "focus:ring-2 focus:ring-brand transition-shadow duration-100",
                      )}
                    >
                      <option value="">Select credit score…</option>
                      {mortgageOptions.creditScoreOptions.map((o) => (
                        <option key={o} value={o}>{o}</option>
                      ))}
                    </select>
                    <svg className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 size-4 text-fg-quaternary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </div>
              </div>

              <Button type="submit" color="primary" size="md" className="w-full">
                Find Offers
              </Button>
            </form>
          </div>
        </Dialog>
      </Modal>
    </ModalOverlay>
  )
}
