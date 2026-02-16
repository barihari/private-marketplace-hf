import { usePrototypeStore } from '../../store/usePrototypeStore'
import { Check, Loader2, ChevronDown } from 'lucide-react'
import { formatCurrency, handleCurrencyChange } from '../../utils/currency'
import { mortgageOptions } from '../../constants/mortgageOptions'

const CreateLinkModal = () => {
  const modal = usePrototypeStore((state) => state.agentDashboard.createLinkModal)
  const closeModal = usePrototypeStore((state) => state.closeCreateLinkModal)
  const updateField = usePrototypeStore((state) => state.updateCreateLinkField)
  const generateLink = usePrototypeStore((state) => state.generateLink)
  const copyLink = usePrototypeStore((state) => state.copyCreateLink)
  const prefillForm = usePrototypeStore((state) => state.prefillCreateLink)

  if (!modal.isOpen) return null

  const handleGenerateLink = (e: React.FormEvent) => {
    e.preventDefault()
    generateLink()
  }

  return (
    <div className="modal-overlay" onClick={closeModal}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-xl font-bold">Create Personalized Link</h2>
          {!modal.isSuccess && (
            <button
              onClick={prefillForm}
              className="btn-secondary text-sm"
              disabled={modal.isLoading}
            >
              Prefill
            </button>
          )}
        </div>

        {!modal.isSuccess ? (
          <form onSubmit={handleGenerateLink} className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">
                Buyer Email <span className="text-wire-gray">*</span>
              </label>
              <input
                type="email"
                value={modal.formFields.email}
                onChange={(e) => updateField('email', e.target.value)}
                className="input-field"
                required
                disabled={modal.isLoading}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">
                  First Name
                </label>
                <input
                  type="text"
                  value={modal.formFields.firstName}
                  onChange={(e) => updateField('firstName', e.target.value)}
                  className="input-field"
                  disabled={modal.isLoading}
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">
                  Last Name
                </label>
                <input
                  type="text"
                  value={modal.formFields.lastName}
                  onChange={(e) => updateField('lastName', e.target.value)}
                  className="input-field"
                  disabled={modal.isLoading}
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">
                  Zip Code
                </label>
                <input
                  type="text"
                  value={modal.formFields.zipCode}
                  onChange={(e) => updateField('zipCode', e.target.value)}
                  className="input-field"
                  disabled={modal.isLoading}
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">
                  Property Value
                </label>
                <input
                  type="text"
                  value={modal.formFields.propertyValue}
                  onChange={(e) => handleCurrencyChange(e.target.value, (val) => updateField('propertyValue', val))}
                  onBlur={(e) => {
                    const formatted = formatCurrency(e.target.value)
                    if (formatted) updateField('propertyValue', formatted)
                  }}
                  className="input-field"
                  placeholder="$850,000"
                  disabled={modal.isLoading}
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">
                  Loan Amount
                </label>
                <input
                  type="text"
                  value={modal.formFields.loanAmount}
                  onChange={(e) => handleCurrencyChange(e.target.value, (val) => updateField('loanAmount', val))}
                  onBlur={(e) => {
                    const formatted = formatCurrency(e.target.value)
                    if (formatted) updateField('loanAmount', formatted)
                  }}
                  className="input-field"
                  placeholder="$680,000"
                  disabled={modal.isLoading}
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">
                  Down Payment %
                </label>
                <input
                  type="text"
                  value={modal.formFields.downPayment}
                  onChange={(e) => updateField('downPayment', e.target.value)}
                  className="input-field"
                  placeholder="e.g., 20"
                  disabled={modal.isLoading}
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">
                  Credit Score
                </label>
                <div className="relative">
                  <select
                    value={modal.formFields.creditScore}
                    onChange={(e) => updateField('creditScore', e.target.value)}
                    className="input-field appearance-none pr-10"
                    disabled={modal.isLoading}
                  >
                    <option value="">Select...</option>
                    {mortgageOptions.creditScoreOptions.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                  <ChevronDown size={18} className="absolute right-3 top-1/2 -translate-y-1/2 text-wire-gray-dark pointer-events-none" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">
                  Loan Term
                </label>
                <div className="relative">
                  <select
                    value={modal.formFields.loanTerm}
                    onChange={(e) => updateField('loanTerm', e.target.value)}
                    className="input-field appearance-none pr-10"
                    disabled={modal.isLoading}
                  >
                    <option value="">Select...</option>
                    {mortgageOptions.loanTermOptions.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                  <ChevronDown size={18} className="absolute right-3 top-1/2 -translate-y-1/2 text-wire-gray-dark pointer-events-none" />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">
                  Military/Veteran Status
                </label>
                <div className="relative">
                  <select
                    value={modal.formFields.militaryStatus}
                    onChange={(e) => updateField('militaryStatus', e.target.value)}
                    className="input-field appearance-none pr-10"
                    disabled={modal.isLoading}
                  >
                    <option value="">Select...</option>
                    {mortgageOptions.militaryVeteranOptions.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                  <ChevronDown size={18} className="absolute right-3 top-1/2 -translate-y-1/2 text-wire-gray-dark pointer-events-none" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">
                  DTI Ratio
                </label>
                <div className="relative">
                  <select
                    value={modal.formFields.dtiRatio}
                    onChange={(e) => updateField('dtiRatio', e.target.value)}
                    className="input-field appearance-none pr-10"
                    disabled={modal.isLoading}
                  >
                    <option value="">Select...</option>
                    <option value="lt40">{mortgageOptions.dtiOptions.lessThan40}</option>
                    <option value="gte40">{mortgageOptions.dtiOptions.fortyAndAbove}</option>
                  </select>
                  <ChevronDown size={18} className="absolute right-3 top-1/2 -translate-y-1/2 text-wire-gray-dark pointer-events-none" />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">
                  Mortgage Points
                </label>
                <div className="relative">
                  <select
                    value={modal.formFields.mortgagePoints}
                    onChange={(e) => updateField('mortgagePoints', e.target.value)}
                    className="input-field appearance-none pr-10"
                    disabled={modal.isLoading}
                  >
                    {mortgageOptions.mortgagePointsOptions.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                  <ChevronDown size={18} className="absolute right-3 top-1/2 -translate-y-1/2 text-wire-gray-dark pointer-events-none" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">
                  Property Type
                </label>
                <div className="relative">
                  <select
                    value={modal.formFields.propertyType}
                    onChange={(e) => updateField('propertyType', e.target.value)}
                    className="input-field appearance-none pr-10"
                    disabled={modal.isLoading}
                  >
                    <option value="">Select...</option>
                    {mortgageOptions.propertyTypeOptions.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                  <ChevronDown size={18} className="absolute right-3 top-1/2 -translate-y-1/2 text-wire-gray-dark pointer-events-none" />
                </div>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">
                Property Use
              </label>
              <div className="relative">
                <select
                  value={modal.formFields.propertyUse}
                  onChange={(e) => updateField('propertyUse', e.target.value)}
                  className="input-field appearance-none pr-10"
                  disabled={modal.isLoading}
                >
                  <option value="">Select...</option>
                  {mortgageOptions.propertyUseOptions.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
                <ChevronDown size={18} className="absolute right-3 top-1/2 -translate-y-1/2 text-wire-gray-dark pointer-events-none" />
              </div>
            </div>

            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="includeFHA"
                checked={modal.formFields.includeFHA}
                onChange={(e) => updateField('includeFHA', e.target.checked)}
                className="w-4 h-4 border-black"
                disabled={modal.isLoading}
              />
              <label htmlFor="includeFHA" className="text-sm font-medium">
                Include FHA option
              </label>
            </div>

            <div className="flex gap-2 pt-4">
              <button
                type="button"
                onClick={closeModal}
                className="btn-secondary flex-1"
                disabled={modal.isLoading}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="btn-primary flex-1"
                disabled={modal.isLoading}
              >
                {modal.isLoading && (
                  <Loader2 size={16} className="inline mr-2 animate-spin" />
                )}
                Generate Link
              </button>
            </div>
          </form>
        ) : (
          <div className="space-y-4">
            <p className="text-wire-gray-dark">
              Link created successfully. Share this with your buyer.
            </p>
            
            <div>
              <label className="block text-sm font-medium mb-2">
                Personalized Link
              </label>
              <input
                type="text"
                value={modal.generatedLink}
                readOnly
                className="input-field"
              />
            </div>

            <div className="flex gap-2">
              <button
                onClick={closeModal}
                className="btn-secondary flex-1"
              >
                Close
              </button>
              <button
                onClick={copyLink}
                className="btn-primary flex-1"
              >
                {modal.copied ? (
                  <span className="flex items-center justify-center gap-2">
                    <Check size={16} />
                    Copied
                  </span>
                ) : (
                  'Copy Link'
                )}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default CreateLinkModal
