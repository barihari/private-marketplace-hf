import { usePrototypeStore } from '../../store/usePrototypeStore'
import EntryModal from '../modals/EntryModal'
import GetQuoteModal from '../modals/GetQuoteModal'
import { formatCurrency, handleCurrencyChange } from '../../utils/currency'
import { mortgageOptions } from '../../constants/mortgageOptions'
import { DollarSign, Percent, MapPin, ChevronDown, Info } from 'lucide-react'

const PrivateMarketplaceView = () => {
  const marketplace = usePrototypeStore((state) => state.privateMarketplace)
  const editFilters = usePrototypeStore((state) => state.editFilters)
  const updateFilter = usePrototypeStore((state) => state.updateFilter)
  const updateOffers = usePrototypeStore((state) => state.updateOffers)
  const openGetQuoteModal = usePrototypeStore((state) => state.openGetQuoteModal)
  const toggleShowMoreOffers = usePrototypeStore((state) => state.toggleShowMoreOffers)

  const displayedOffers = marketplace.showMoreOffers 
    ? [...marketplace.offers, ...marketplace.additionalOffers]
    : marketplace.offers

  const isBlurred = marketplace.entryModal.isOpen

  // Get city/state from zip code (simple mapping for demo)
  const getCityState = (zip: string) => {
    const cityStateMap: { [key: string]: string } = {
      '10011': 'New York, NY',
      '28233': 'Charlotte, NC',
    }
    return cityStateMap[zip] || ''
  }

  return (
    <div className="relative min-h-screen">
      {/* Main Content */}
      <div className={`transition-all ${isBlurred ? 'blur-sm opacity-30' : ''}`}>
        <div className="flex h-[calc(100vh-64px)]">
          {/* Left: Filters Panel (30%) */}
          <div className="w-[30%] border-r-2 border-black p-5 overflow-y-auto">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-lg font-bold">Your Criteria</h2>
              {marketplace.filtersLocked && !marketplace.isEditingFilters && (
                <button
                  onClick={editFilters}
                  className="btn-secondary text-sm"
                >
                  Edit
                </button>
              )}
            </div>

            <div className="space-y-3">
              {/* Zip Code */}
              <div>
                <label className="block text-xs mb-1">Zip Code</label>
                <div className="relative">
                  <input
                    type="text"
                    value={marketplace.filters.zipCode}
                    onChange={(e) => updateFilter('zipCode', e.target.value)}
                    className="input-field pr-32"
                    disabled={marketplace.filtersLocked}
                  />
                  {marketplace.filters.zipCode && getCityState(marketplace.filters.zipCode) && (
                    <div className="absolute right-2.5 top-1/2 -translate-y-1/2 flex items-center gap-1.5 text-xs text-wire-gray-dark pointer-events-none">
                      <span>{getCityState(marketplace.filters.zipCode)}</span>
                      <MapPin size={14} className="text-black" />
                    </div>
                  )}
                </div>
              </div>

              {/* Property Value */}
              <div>
                <label className="block text-xs mb-1">Property Value</label>
                <div className="relative">
                  <DollarSign size={14} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-wire-gray-dark pointer-events-none" />
                  <input
                    type="text"
                    value={marketplace.filters.propertyValue}
                    onChange={(e) => handleCurrencyChange(e.target.value, (val) => updateFilter('propertyValue', val))}
                    onBlur={(e) => {
                      const formatted = formatCurrency(e.target.value)
                      if (formatted) updateFilter('propertyValue', formatted)
                    }}
                    className="input-field pl-8"
                    placeholder="$850,000"
                    disabled={marketplace.filtersLocked}
                  />
                </div>
              </div>

              {/* Loan Amount + Percent Down (two columns) */}
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-xs mb-1">Loan Amount</label>
                  <div className="relative">
                    <DollarSign size={14} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-wire-gray-dark pointer-events-none" />
                    <input
                      type="text"
                      value={marketplace.filters.loanAmount}
                      onChange={(e) => handleCurrencyChange(e.target.value, (val) => updateFilter('loanAmount', val))}
                      onBlur={(e) => {
                        const formatted = formatCurrency(e.target.value)
                        if (formatted) updateFilter('loanAmount', formatted)
                      }}
                      className="input-field pl-8"
                      placeholder="$680,000"
                      disabled={marketplace.filtersLocked}
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-xs mb-1">Percent Down</label>
                  <div className="relative">
                    <input
                      type="text"
                      value={marketplace.filters.downPayment}
                      onChange={(e) => updateFilter('downPayment', e.target.value)}
                      className="input-field pr-8"
                      placeholder="20"
                      disabled={marketplace.filtersLocked}
                    />
                    <Percent size={14} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-wire-gray-dark pointer-events-none" />
                  </div>
                </div>
              </div>

              {/* Credit Score */}
              <div>
                <label className="block text-xs mb-1">Credit Score</label>
                <div className="relative">
                  <select
                    value={marketplace.filters.creditScore}
                    onChange={(e) => updateFilter('creditScore', e.target.value)}
                    className="input-field appearance-none pr-10"
                    disabled={marketplace.filtersLocked}
                  >
                    <option value="">Select...</option>
                    {mortgageOptions.creditScoreOptions.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                  <ChevronDown size={14} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-wire-gray-dark pointer-events-none" />
                </div>
              </div>

              {/* Loan Term */}
              <div>
                <label className="block text-xs mb-1">Loan Term</label>
                <div className="relative">
                  <select
                    value={marketplace.filters.loanTerm}
                    onChange={(e) => updateFilter('loanTerm', e.target.value)}
                    className="input-field appearance-none pr-10"
                    disabled={marketplace.filtersLocked}
                  >
                    <option value="">Select...</option>
                    {mortgageOptions.loanTermOptions.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                  <ChevronDown size={14} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-wire-gray-dark pointer-events-none" />
                </div>
              </div>

              {/* Military / Veteran */}
              <div>
                <label className="text-xs mb-1 flex items-center gap-1">
                  Military / Veteran
                  <Info size={12} className="text-wire-gray-dark" />
                </label>
                <div className="relative">
                  <select
                    value={marketplace.filters.militaryStatus}
                    onChange={(e) => updateFilter('militaryStatus', e.target.value)}
                    className="input-field appearance-none pr-10"
                    disabled={marketplace.filtersLocked}
                  >
                    <option value="">Select...</option>
                    {mortgageOptions.militaryVeteranOptions.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                  <ChevronDown size={14} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-wire-gray-dark pointer-events-none" />
                </div>
              </div>

              {/* DTI Ratio (Segmented Control) */}
              <div>
                <label className="text-xs mb-1 flex items-center gap-1">
                  Debt-to-income (DTI) Ratio
                  <Info size={12} className="text-wire-gray-dark" />
                </label>
                <div className="border border-black flex">
                  <button
                    type="button"
                    onClick={() => !marketplace.filtersLocked && updateFilter('dtiRatio', 'lt40')}
                    className={`flex-1 py-1.5 px-2 text-xs transition-colors ${
                      marketplace.filters.dtiRatio === 'lt40'
                        ? 'bg-wire-gray-light border-r-2 border-black'
                        : 'bg-white border-r border-black'
                    } ${marketplace.filtersLocked ? 'cursor-not-allowed text-wire-gray' : ''}`}
                    disabled={marketplace.filtersLocked}
                  >
                    {mortgageOptions.dtiOptions.lessThan40}
                  </button>
                  <button
                    type="button"
                    onClick={() => !marketplace.filtersLocked && updateFilter('dtiRatio', 'gte40')}
                    className={`flex-1 py-1.5 px-2 text-xs transition-colors ${
                      marketplace.filters.dtiRatio === 'gte40'
                        ? 'bg-wire-gray-light'
                        : 'bg-white'
                    } ${marketplace.filtersLocked ? 'cursor-not-allowed text-wire-gray' : ''}`}
                    disabled={marketplace.filtersLocked}
                  >
                    {mortgageOptions.dtiOptions.fortyAndAbove}
                  </button>
                </div>
              </div>

              {/* Mortgage Points */}
              <div>
                <label className="text-xs mb-1 flex items-center gap-1">
                  Mortgage Points
                  <Info size={12} className="text-wire-gray-dark" />
                </label>
                <div className="relative">
                  <select
                    value={marketplace.filters.mortgagePoints}
                    onChange={(e) => updateFilter('mortgagePoints', e.target.value)}
                    className="input-field appearance-none pr-10"
                    disabled={marketplace.filtersLocked}
                  >
                    {mortgageOptions.mortgagePointsOptions.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                  <ChevronDown size={14} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-wire-gray-dark pointer-events-none" />
                </div>
              </div>

              {/* Property Type */}
              <div>
                <label className="block text-xs mb-1">Property Type</label>
                <div className="relative">
                  <select
                    value={marketplace.filters.propertyType}
                    onChange={(e) => updateFilter('propertyType', e.target.value)}
                    className="input-field appearance-none pr-10"
                    disabled={marketplace.filtersLocked}
                  >
                    <option value="">Select...</option>
                    {mortgageOptions.propertyTypeOptions.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                  <ChevronDown size={14} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-wire-gray-dark pointer-events-none" />
                </div>
              </div>

              {/* Property Use */}
              <div>
                <label className="block text-xs mb-1">Property Use</label>
                <div className="relative">
                  <select
                    value={marketplace.filters.propertyUse}
                    onChange={(e) => updateFilter('propertyUse', e.target.value)}
                    className="input-field appearance-none pr-10"
                    disabled={marketplace.filtersLocked}
                  >
                    <option value="">Select...</option>
                    {mortgageOptions.propertyUseOptions.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                  <ChevronDown size={14} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-wire-gray-dark pointer-events-none" />
                </div>
              </div>

              {/* Include FHA */}
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="includeFHA"
                  checked={marketplace.filters.includeFHA}
                  onChange={(e) => updateFilter('includeFHA', e.target.checked)}
                  className="w-3.5 h-3.5 border-black"
                  disabled={marketplace.filtersLocked}
                />
                <label htmlFor="includeFHA" className="text-xs flex items-center gap-1">
                  Include FHA loan options
                  <Info size={12} className="text-wire-gray-dark" />
                </label>
              </div>

              {marketplace.isEditingFilters && (
                <button
                  onClick={updateOffers}
                  className="btn-primary w-full mt-2"
                >
                  Update Offers
                </button>
              )}
            </div>
          </div>

          {/* Right: Rate Table (70%) */}
          <div className="w-[70%] p-6 overflow-y-auto">
            <h2 className="text-2xl font-bold mb-6">Your Mortgage Offers</h2>

            {marketplace.isFindingOffers || marketplace.isUpdatingOffers ? (
              <div className="border-2 border-black p-12 text-center">
                <p className="text-lg text-wire-gray-dark">
                  {marketplace.isFindingOffers ? 'Finding your offers…' : 'Updating offers…'}
                </p>
              </div>
            ) : marketplace.offers.length === 0 ? (
              <div className="border-2 border-black p-12 text-center">
                <p className="text-wire-gray-dark">
                  Complete the entry form to see your personalized offers.
                </p>
              </div>
            ) : (
              <div className="space-y-4 text-left">
                <div className="border-2 border-black">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b-2 border-black bg-wire-gray-light">
                        <th className="text-left p-4 font-medium">Lender</th>
                        <th className="text-left p-4 font-medium">Rate</th>
                        <th className="text-left p-4 font-medium">APR</th>
                        <th className="text-left p-4 font-medium">Monthly Payment</th>
                        <th className="text-left p-4 font-medium">Loan Type</th>
                        <th className="text-left p-4 font-medium">Closing Costs</th>
                        <th className="text-left p-4 font-medium"></th>
                      </tr>
                    </thead>
                    <tbody>
                      {displayedOffers.map((offer) => (
                        <tr key={offer.id} className="border-b border-black">
                          <td className="p-4 font-medium">
                            <div>
                              <div>{offer.lenderName}</div>
                              <div className="text-sm font-normal text-wire-gray-dark">NMLS: {offer.nmls}</div>
                            </div>
                          </td>
                          <td className="p-4">{offer.rate}</td>
                          <td className="p-4">{offer.apr}</td>
                          <td className="p-4">{offer.monthlyPayment}</td>
                          <td className="p-4">{offer.loanType}</td>
                          <td className="p-4">{offer.closingCosts}</td>
                          <td className="p-4">
                            <button
                              onClick={() => openGetQuoteModal(offer.id)}
                              className="btn-primary text-sm px-3 py-2 whitespace-nowrap min-w-[100px]"
                            >
                              Get Quote
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <div className="flex justify-center">
                  <button 
                    onClick={toggleShowMoreOffers}
                    className="btn-secondary"
                  >
                    {marketplace.showMoreOffers ? 'Show Less Offers' : 'Show More Offers'}
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Modals */}
      <EntryModal />
      <GetQuoteModal />
    </div>
  )
}

export default PrivateMarketplaceView
