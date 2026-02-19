import { Check, Copy01 } from "@untitledui/icons"
import { Button } from "@/components/base/buttons/button"
import { Input } from "@/components/base/input/input"
import { Dialog, Modal, ModalOverlay } from "@/components/application/modals/modal"
import { usePrototypeStore } from "../store/use-prototype-store"
import { mortgageOptions } from "../constants/mortgage-options"
import { handleCurrencyChange, formatCurrency } from "../utils/currency"
import { cx } from "@/utils/cx"

const ModalSelect = ({
  label,
  value,
  onChange,
  disabled,
  children,
}: {
  label: string
  value: string
  onChange: (v: string) => void
  disabled?: boolean
  children: React.ReactNode
}) => (
  <div className="flex flex-col gap-1.5">
    <span className="text-sm font-medium text-secondary">{label}</span>
    <div className="relative">
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        disabled={disabled}
        className={cx(
          "w-full appearance-none rounded-lg bg-primary px-3 py-2 pr-8 text-sm text-primary shadow-xs ring-1 ring-primary ring-inset outline-none",
          "focus:ring-2 focus:ring-brand transition-shadow duration-100",
          disabled && "cursor-not-allowed bg-disabled_subtle text-disabled ring-disabled",
        )}
      >
        {children}
      </select>
      <svg className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 size-4 text-fg-quaternary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
      </svg>
    </div>
  </div>
)

export const CreateLinkModal = () => {
  const modal = usePrototypeStore((s) => s.agentDashboard.createLinkModal)
  const closeModal = usePrototypeStore((s) => s.closeCreateLinkModal)
  const updateField = usePrototypeStore((s) => s.updateCreateLinkField)
  const generateLink = usePrototypeStore((s) => s.generateLink)
  const copyLink = usePrototypeStore((s) => s.copyCreateLink)
  const prefillForm = usePrototypeStore((s) => s.prefillCreateLink)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    generateLink()
  }

  return (
    <ModalOverlay isOpen={modal.isOpen} onOpenChange={(open) => !open && closeModal()}>
      <Modal className="max-w-2xl">
        <Dialog>
          <div className="rounded-xl bg-primary shadow-2xl ring-1 ring-secondary_alt w-full max-w-2xl p-6 flex flex-col gap-5 max-h-[90vh] overflow-y-auto">
            {/* Header */}
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-primary">Create Personalized Link</h2>
              {!modal.isSuccess && (
                <Button
                  color="secondary"
                  size="sm"
                  onPress={prefillForm}
                  isDisabled={modal.isLoading}
                >
                  Prefill
                </Button>
              )}
            </div>

            {!modal.isSuccess ? (
              <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <Input
                  label="Buyer Email"
                  type="email"
                  isRequired
                  value={modal.formFields.email}
                  onChange={(v) => updateField('email', v)}
                  placeholder="buyer@email.com"
                  isDisabled={modal.isLoading}
                />

                <div className="grid grid-cols-2 gap-4">
                  <Input
                    label="First Name"
                    value={modal.formFields.firstName}
                    onChange={(v) => updateField('firstName', v)}
                    placeholder="James"
                    isDisabled={modal.isLoading}
                  />
                  <Input
                    label="Last Name"
                    value={modal.formFields.lastName}
                    onChange={(v) => updateField('lastName', v)}
                    placeholder="Walker"
                    isDisabled={modal.isLoading}
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <Input
                    label="Zip Code"
                    value={modal.formFields.zipCode}
                    onChange={(v) => updateField('zipCode', v)}
                    placeholder="10011"
                    isDisabled={modal.isLoading}
                  />
                  <Input
                    label="Property Value"
                    value={modal.formFields.propertyValue}
                    onChange={(v) => handleCurrencyChange(v, (val) => updateField('propertyValue', val))}
                    onBlur={() => {
                      const formatted = formatCurrency(modal.formFields.propertyValue)
                      if (formatted) updateField('propertyValue', formatted)
                    }}
                    placeholder="$850,000"
                    isDisabled={modal.isLoading}
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <Input
                    label="Loan Amount"
                    value={modal.formFields.loanAmount}
                    onChange={(v) => handleCurrencyChange(v, (val) => updateField('loanAmount', val))}
                    onBlur={() => {
                      const formatted = formatCurrency(modal.formFields.loanAmount)
                      if (formatted) updateField('loanAmount', formatted)
                    }}
                    placeholder="$680,000"
                    isDisabled={modal.isLoading}
                  />
                  <Input
                    label="Down Payment %"
                    value={modal.formFields.downPayment}
                    onChange={(v) => updateField('downPayment', v)}
                    placeholder="20"
                    isDisabled={modal.isLoading}
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <ModalSelect
                    label="Credit Score"
                    value={modal.formFields.creditScore}
                    onChange={(v) => updateField('creditScore', v)}
                    disabled={modal.isLoading}
                  >
                    <option value="">Select…</option>
                    {mortgageOptions.creditScoreOptions.map((o) => (
                      <option key={o} value={o}>{o}</option>
                    ))}
                  </ModalSelect>
                  <ModalSelect
                    label="Loan Term"
                    value={modal.formFields.loanTerm}
                    onChange={(v) => updateField('loanTerm', v)}
                    disabled={modal.isLoading}
                  >
                    <option value="">Select…</option>
                    {mortgageOptions.loanTermOptions.map((o) => (
                      <option key={o} value={o}>{o}</option>
                    ))}
                  </ModalSelect>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <ModalSelect
                    label="Military/Veteran Status"
                    value={modal.formFields.militaryStatus}
                    onChange={(v) => updateField('militaryStatus', v)}
                    disabled={modal.isLoading}
                  >
                    <option value="">Select…</option>
                    {mortgageOptions.militaryVeteranOptions.map((o) => (
                      <option key={o} value={o}>{o}</option>
                    ))}
                  </ModalSelect>
                  <ModalSelect
                    label="DTI Ratio"
                    value={modal.formFields.dtiRatio}
                    onChange={(v) => updateField('dtiRatio', v)}
                    disabled={modal.isLoading}
                  >
                    <option value="">Select…</option>
                    <option value="lt40">{mortgageOptions.dtiOptions.lessThan40}</option>
                    <option value="gte40">{mortgageOptions.dtiOptions.fortyAndAbove}</option>
                  </ModalSelect>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <ModalSelect
                    label="Mortgage Points"
                    value={modal.formFields.mortgagePoints}
                    onChange={(v) => updateField('mortgagePoints', v)}
                    disabled={modal.isLoading}
                  >
                    {mortgageOptions.mortgagePointsOptions.map((o) => (
                      <option key={o} value={o}>{o}</option>
                    ))}
                  </ModalSelect>
                  <ModalSelect
                    label="Property Type"
                    value={modal.formFields.propertyType}
                    onChange={(v) => updateField('propertyType', v)}
                    disabled={modal.isLoading}
                  >
                    <option value="">Select…</option>
                    {mortgageOptions.propertyTypeOptions.map((o) => (
                      <option key={o} value={o}>{o}</option>
                    ))}
                  </ModalSelect>
                </div>

                <ModalSelect
                  label="Property Use"
                  value={modal.formFields.propertyUse}
                  onChange={(v) => updateField('propertyUse', v)}
                  disabled={modal.isLoading}
                >
                  <option value="">Select…</option>
                  {mortgageOptions.propertyUseOptions.map((o) => (
                    <option key={o} value={o}>{o}</option>
                  ))}
                </ModalSelect>

                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={modal.formFields.includeFHA}
                    onChange={(e) => updateField('includeFHA', e.target.checked)}
                    disabled={modal.isLoading}
                    className="size-4 rounded"
                  />
                  <span className="text-sm font-medium text-secondary">Include FHA option</span>
                </label>

                <div className="flex gap-3 pt-2">
                  <Button color="secondary" size="md" onPress={closeModal} isDisabled={modal.isLoading} className="flex-1">
                    Cancel
                  </Button>
                  <Button type="submit" color="primary" size="md" isLoading={modal.isLoading} className="flex-1">
                    Generate Link
                  </Button>
                </div>
              </form>
            ) : (
              <div className="flex flex-col gap-4">
                <p className="text-sm text-tertiary">
                  Link created successfully. Share this with your buyer.
                </p>

                <div className="flex flex-col gap-1.5">
                  <span className="text-sm font-medium text-secondary">Personalized Link</span>
                  <div className="rounded-lg bg-secondary p-3 text-sm font-mono text-secondary break-all">
                    {modal.generatedLink}
                  </div>
                </div>

                <div className="flex gap-3">
                  <Button color="secondary" size="md" onPress={closeModal} className="flex-1">
                    Close
                  </Button>
                  <Button
                    color="primary"
                    size="md"
                    iconLeading={modal.copied ? Check : Copy01}
                    onPress={copyLink}
                    className="flex-1"
                  >
                    {modal.copied ? 'Copied' : 'Copy Link'}
                  </Button>
                </div>
              </div>
            )}
          </div>
        </Dialog>
      </Modal>
    </ModalOverlay>
  )
}
