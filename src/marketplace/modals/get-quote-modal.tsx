import { useState } from "react"
import { CheckCircle } from "@untitledui/icons"
import { Button } from "@/components/base/buttons/button"
import { Input } from "@/components/base/input/input"
import { Dialog, Modal, ModalOverlay } from "@/components/application/modals/modal"
import { usePrototypeStore } from "../store/use-prototype-store"
import { cx } from "@/utils/cx"

export const GetQuoteModal = () => {
  const modal = usePrototypeStore((s) => s.privateMarketplace.getQuoteModal)
  const offers = usePrototypeStore((s) => s.privateMarketplace.offers)
  const additionalOffers = usePrototypeStore((s) => s.privateMarketplace.additionalOffers)
  const buyerIdentity = usePrototypeStore((s) => s.privateMarketplace.buyerIdentity)
  const closeModal = usePrototypeStore((s) => s.closeGetQuoteModal)
  const setStep = usePrototypeStore((s) => s.setQuoteStep)
  const toggleLender = usePrototypeStore((s) => s.toggleLenderSelection)
  const updateField = usePrototypeStore((s) => s.updateQuoteField)
  const submitRequest = usePrototypeStore((s) => s.submitQuoteRequest)

  const [showMoreInModal, setShowMoreInModal] = useState(false)

  const allOffers = [...offers, ...additionalOffers]
  const visibleOffers = showMoreInModal ? allOffers : offers
  const allVisibleSelected = visibleOffers.length > 0 && visibleOffers.every((o) => modal.selectedLenders.includes(o.id))

  const handleSelectAll = () => {
    const allIds = visibleOffers.map((o) => o.id)
    if (allVisibleSelected) {
      allIds.forEach((id) => { if (modal.selectedLenders.includes(id)) toggleLender(id) })
    } else {
      allIds.forEach((id) => { if (!modal.selectedLenders.includes(id)) toggleLender(id) })
    }
  }

  return (
    <ModalOverlay isOpen={modal.isOpen} onOpenChange={(open) => !open && closeModal()}>
      <Modal className="max-w-lg">
        <Dialog>
          <div className="rounded-xl bg-primary shadow-2xl ring-1 ring-secondary_alt w-full max-w-lg p-6 flex flex-col gap-4" style={{ maxHeight: modal.step === 3 ? '90vh' : '520px' }}>

            {/* Step 1: Select Lenders */}
            {modal.step === 1 && (
              <div className="flex flex-col gap-3 min-h-0 flex-1">
                <h2 className="text-lg font-semibold text-primary">Get Quote</h2>

                <div className="flex items-center justify-between">
                  <span className="text-sm text-tertiary">Select lenders to receive quotes from.</span>
                  <button
                    type="button"
                    onClick={handleSelectAll}
                    className="text-xs font-semibold text-brand-secondary hover:underline shrink-0"
                  >
                    {allVisibleSelected ? 'Deselect all' : 'Select all'}
                  </button>
                </div>

                <div className="overflow-y-auto flex-1 min-h-0">
                  <div className="flex flex-col gap-2">
                    {visibleOffers.map((offer) => (
                      <label
                        key={offer.id}
                        className={cx(
                          "flex items-center gap-3 p-3 rounded-lg ring-1 cursor-pointer transition-colors",
                          modal.selectedLenders.includes(offer.id)
                            ? "ring-brand bg-brand-primary_alt"
                            : "ring-secondary bg-primary hover:bg-secondary",
                        )}
                      >
                        <div className="flex-1 min-w-0">
                          <div className="text-sm font-medium text-primary truncate">{offer.lenderName}</div>
                          <div className="text-xs text-tertiary">NMLS: {offer.nmls}</div>
                        </div>
                        <input
                          type="checkbox"
                          checked={modal.selectedLenders.includes(offer.id)}
                          onChange={() => toggleLender(offer.id)}
                          className="size-4 shrink-0 rounded"
                        />
                      </label>
                    ))}
                  </div>
                </div>

                <div className="flex flex-col gap-2 border-t border-secondary pt-3">
                  {additionalOffers.length > 0 && (
                    <button
                      type="button"
                      onClick={() => setShowMoreInModal(!showMoreInModal)}
                      className="text-xs font-semibold text-brand-secondary hover:underline self-center"
                    >
                      {showMoreInModal ? 'Show Less Offers' : 'Show More Offers'}
                    </button>
                  )}
                  <div className="flex gap-3">
                    <Button color="secondary" size="md" onPress={closeModal} className="flex-1">
                      Cancel
                    </Button>
                    <Button
                      color="primary"
                      size="md"
                      onPress={() => { if (modal.selectedLenders.length > 0) setStep(2) }}
                      isDisabled={modal.selectedLenders.length === 0}
                      className="flex-1"
                    >
                      Continue
                    </Button>
                  </div>
                </div>
              </div>
            )}

            {/* Step 2: Contact Form */}
            {modal.step === 2 && (
              <div className="flex flex-col gap-4">
                <div className="flex items-center justify-between">
                  <h2 className="text-lg font-semibold text-primary">Request Quotes</h2>
                  <Button
                    color="secondary"
                    size="sm"
                    onPress={() => updateField('phone', '(704) 555-0199')}
                  >
                    Prefill
                  </Button>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="flex flex-col gap-0.5">
                    <span className="text-sm text-tertiary">Name</span>
                    <span className="text-sm font-semibold text-primary">
                      {buyerIdentity.firstName} {buyerIdentity.lastName}
                    </span>
                  </div>
                  <div className="flex flex-col gap-0.5">
                    <span className="text-sm text-tertiary">Email</span>
                    <span className="text-sm font-semibold text-primary">{modal.email}</span>
                  </div>
                </div>

                <Input
                  label="Phone number"
                  type="tel"
                  isRequired
                  value={modal.phone}
                  onChange={(v) => updateField('phone', v)}
                  placeholder="(555) 555-5555"
                  isDisabled={modal.isSubmitting}
                />

                <div className="rounded-lg bg-secondary p-4">
                  <p className="text-xs text-tertiary leading-relaxed">
                    <strong className="text-secondary">Disclosure:</strong> By submitting this form, you agree to be contacted
                    by the selected lenders regarding your mortgage inquiry. Your information will
                    be shared with the lenders you've selected. Standard data rates may apply.
                    You may opt out at any time.
                  </p>
                </div>

                <div className="flex gap-3 border-t border-secondary pt-3">
                  <Button
                    color="secondary"
                    size="md"
                    onPress={() => setStep(1)}
                    isDisabled={modal.isSubmitting}
                    className="flex-1"
                  >
                    Back
                  </Button>
                  <Button
                    color="primary"
                    size="md"
                    onPress={() => { if (modal.phone.trim()) submitRequest() }}
                    isDisabled={!modal.phone.trim() || modal.isSubmitting}
                    isLoading={modal.isSubmitting}
                    className="flex-1"
                  >
                    Agree &amp; Submit
                  </Button>
                </div>
              </div>
            )}

            {/* Step 3: Confirmation */}
            {modal.step === 3 && (
              <div className="flex flex-col items-center gap-5 text-center py-4">
                <div className="flex size-14 items-center justify-center rounded-full bg-utility-success-100">
                  <CheckCircle className="size-7 text-utility-success-600" />
                </div>
                <div>
                  <h2 className="text-xl font-semibold text-primary mb-2">Your request has been sent.</h2>
                  <p className="text-sm text-tertiary mb-1">
                    A confirmation email has been sent to{' '}
                    <strong className="text-secondary">james.walker@email.com</strong>.
                  </p>
                  <p className="text-sm text-tertiary">
                    You will be contacted directly by the selected lenders.
                  </p>
                </div>
                <Button color="primary" size="md" onPress={closeModal} className="w-full">
                  Close
                </Button>
              </div>
            )}

          </div>
        </Dialog>
      </Modal>
    </ModalOverlay>
  )
}
