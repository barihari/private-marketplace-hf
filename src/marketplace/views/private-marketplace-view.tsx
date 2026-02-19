import { Button } from "@/components/base/buttons/button"
import { Checkbox } from "@/components/base/checkbox/checkbox"
import { Badge } from "@/components/base/badges/badges"
import { Table, TableCard } from "@/components/application/table/table"
import { usePrototypeStore } from "../store/use-prototype-store"
import { mortgageOptions } from "../constants/mortgage-options"
import { handleCurrencyChange, formatCurrency } from "../utils/currency"
import { EntryModal } from "../modals/entry-modal"
import { GetQuoteModal } from "../modals/get-quote-modal"
import { cx } from "@/utils/cx"

const getCityState = (zip: string) => {
  const map: Record<string, string> = { '10011': 'New York, NY', '28233': 'Charlotte, NC' }
  return map[zip] || ''
}

const FilterLabel = ({ children }: { children: React.ReactNode }) => (
  <span className="text-xs font-medium text-secondary">{children}</span>
)

const FilterInput = ({
  value,
  onChange,
  onBlur,
  placeholder,
  disabled,
  trailingText,
}: {
  value: string
  onChange: (v: string) => void
  onBlur?: () => void
  placeholder?: string
  disabled?: boolean
  trailingText?: string
}) => (
  <div className="relative">
    <input
      type="text"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      onBlur={onBlur}
      placeholder={placeholder}
      disabled={disabled}
      className={cx(
        "w-full rounded-lg bg-primary px-3 py-2 text-sm text-primary shadow-xs ring-1 ring-primary ring-inset outline-none",
        "placeholder:text-placeholder focus:ring-2 focus:ring-brand transition-shadow duration-100",
        disabled && "cursor-not-allowed bg-disabled_subtle text-disabled ring-disabled",
        trailingText && "pr-20",
      )}
    />
    {trailingText && (
      <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-xs text-tertiary">
        {trailingText}
      </span>
    )}
  </div>
)

const FilterSelect = ({
  value,
  onChange,
  disabled,
  children,
}: {
  value: string
  onChange: (v: string) => void
  disabled?: boolean
  children: React.ReactNode
}) => (
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
)

export const PrivateMarketplaceView = () => {
  const marketplace = usePrototypeStore((s) => s.privateMarketplace)
  const editFilters = usePrototypeStore((s) => s.editFilters)
  const updateFilter = usePrototypeStore((s) => s.updateFilter)
  const updateOffers = usePrototypeStore((s) => s.updateOffers)
  const openGetQuoteModal = usePrototypeStore((s) => s.openGetQuoteModal)
  const toggleShowMoreOffers = usePrototypeStore((s) => s.toggleShowMoreOffers)

  const { filters, filtersLocked, isEditingFilters, isFindingOffers, isUpdatingOffers, offers, additionalOffers, showMoreOffers } = marketplace
  const displayedOffers = showMoreOffers ? [...offers, ...additionalOffers] : offers

  return (
    <div className="relative flex h-[calc(100vh-57px)]">
      {/* Left: Filters Panel */}
      <aside className="w-72 shrink-0 border-r border-secondary bg-primary overflow-y-auto">
        <div className="p-4">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-sm font-semibold text-primary">Your Criteria</h2>
            {filtersLocked && !isEditingFilters && (
              <Button color="secondary" size="sm" onPress={editFilters}>
                Edit
              </Button>
            )}
          </div>

          <div className="flex flex-col gap-3">
            {/* Zip Code */}
            <div className="flex flex-col gap-1">
              <FilterLabel>Zip Code</FilterLabel>
              <FilterInput
                value={filters.zipCode}
                onChange={(v) => updateFilter('zipCode', v)}
                placeholder="10011"
                disabled={filtersLocked}
                trailingText={getCityState(filters.zipCode) || undefined}
              />
            </div>

            {/* Property Value */}
            <div className="flex flex-col gap-1">
              <FilterLabel>Property Value</FilterLabel>
              <FilterInput
                value={filters.propertyValue}
                onChange={(v) => handleCurrencyChange(v, (val) => updateFilter('propertyValue', val))}
                onBlur={() => {
                  const formatted = formatCurrency(filters.propertyValue)
                  if (formatted) updateFilter('propertyValue', formatted)
                }}
                placeholder="$850,000"
                disabled={filtersLocked}
              />
            </div>

            {/* Loan Amount + Down */}
            <div className="grid grid-cols-2 gap-2">
              <div className="flex flex-col gap-1">
                <FilterLabel>Loan Amount</FilterLabel>
                <FilterInput
                  value={filters.loanAmount}
                  onChange={(v) => handleCurrencyChange(v, (val) => updateFilter('loanAmount', val))}
                  onBlur={() => {
                    const formatted = formatCurrency(filters.loanAmount)
                    if (formatted) updateFilter('loanAmount', formatted)
                  }}
                  placeholder="$680,000"
                  disabled={filtersLocked}
                />
              </div>
              <div className="flex flex-col gap-1">
                <FilterLabel>% Down</FilterLabel>
                <FilterInput
                  value={filters.downPayment}
                  onChange={(v) => updateFilter('downPayment', v)}
                  placeholder="20"
                  disabled={filtersLocked}
                  trailingText="%"
                />
              </div>
            </div>

            {/* Credit Score */}
            <div className="flex flex-col gap-1">
              <FilterLabel>Credit Score</FilterLabel>
              <FilterSelect
                value={filters.creditScore}
                onChange={(v) => updateFilter('creditScore', v)}
                disabled={filtersLocked}
              >
                <option value="">Select…</option>
                {mortgageOptions.creditScoreOptions.map((o) => (
                  <option key={o} value={o}>{o}</option>
                ))}
              </FilterSelect>
            </div>

            {/* Loan Term */}
            <div className="flex flex-col gap-1">
              <FilterLabel>Loan Term</FilterLabel>
              <FilterSelect
                value={filters.loanTerm}
                onChange={(v) => updateFilter('loanTerm', v)}
                disabled={filtersLocked}
              >
                <option value="">Select…</option>
                {mortgageOptions.loanTermOptions.map((o) => (
                  <option key={o} value={o}>{o}</option>
                ))}
              </FilterSelect>
            </div>

            {/* Military / Veteran */}
            <div className="flex flex-col gap-1">
              <FilterLabel>Military / Veteran</FilterLabel>
              <FilterSelect
                value={filters.militaryStatus}
                onChange={(v) => updateFilter('militaryStatus', v)}
                disabled={filtersLocked}
              >
                <option value="">Select…</option>
                {mortgageOptions.militaryVeteranOptions.map((o) => (
                  <option key={o} value={o}>{o}</option>
                ))}
              </FilterSelect>
            </div>

            {/* DTI Ratio */}
            <div className="flex flex-col gap-1">
              <FilterLabel>DTI Ratio</FilterLabel>
              <div className="grid grid-cols-2 rounded-lg ring-1 ring-primary ring-inset overflow-hidden shadow-xs">
                <button
                  type="button"
                  onClick={() => !filtersLocked && updateFilter('dtiRatio', 'lt40')}
                  disabled={filtersLocked}
                  className={cx(
                    "py-2 px-2 text-xs transition-colors",
                    filters.dtiRatio === 'lt40' ? "bg-active text-secondary font-semibold" : "bg-primary text-tertiary",
                    filtersLocked && "cursor-not-allowed",
                  )}
                >
                  {mortgageOptions.dtiOptions.lessThan40}
                </button>
                <button
                  type="button"
                  onClick={() => !filtersLocked && updateFilter('dtiRatio', 'gte40')}
                  disabled={filtersLocked}
                  className={cx(
                    "py-2 px-2 text-xs transition-colors border-l border-secondary",
                    filters.dtiRatio === 'gte40' ? "bg-active text-secondary font-semibold" : "bg-primary text-tertiary",
                    filtersLocked && "cursor-not-allowed",
                  )}
                >
                  {mortgageOptions.dtiOptions.fortyAndAbove}
                </button>
              </div>
            </div>

            {/* Mortgage Points */}
            <div className="flex flex-col gap-1">
              <FilterLabel>Mortgage Points</FilterLabel>
              <FilterSelect
                value={filters.mortgagePoints}
                onChange={(v) => updateFilter('mortgagePoints', v)}
                disabled={filtersLocked}
              >
                {mortgageOptions.mortgagePointsOptions.map((o) => (
                  <option key={o} value={o}>{o}</option>
                ))}
              </FilterSelect>
            </div>

            {/* Property Type */}
            <div className="flex flex-col gap-1">
              <FilterLabel>Property Type</FilterLabel>
              <FilterSelect
                value={filters.propertyType}
                onChange={(v) => updateFilter('propertyType', v)}
                disabled={filtersLocked}
              >
                <option value="">Select…</option>
                {mortgageOptions.propertyTypeOptions.map((o) => (
                  <option key={o} value={o}>{o}</option>
                ))}
              </FilterSelect>
            </div>

            {/* Property Use */}
            <div className="flex flex-col gap-1">
              <FilterLabel>Property Use</FilterLabel>
              <FilterSelect
                value={filters.propertyUse}
                onChange={(v) => updateFilter('propertyUse', v)}
                disabled={filtersLocked}
              >
                <option value="">Select…</option>
                {mortgageOptions.propertyUseOptions.map((o) => (
                  <option key={o} value={o}>{o}</option>
                ))}
              </FilterSelect>
            </div>

            {/* Include FHA */}
            <Checkbox
              isSelected={filters.includeFHA}
              isDisabled={filtersLocked}
              onChange={(checked) => updateFilter('includeFHA', checked)}
              label="Include FHA loan options"
            />

            {isEditingFilters && (
              <Button
                color="primary"
                size="sm"
                onPress={updateOffers}
                className="w-full mt-1"
              >
                Update Offers
              </Button>
            )}
          </div>
        </div>
      </aside>

      {/* Right: Offers Panel */}
      <main className="flex-1 overflow-y-auto p-6">
        <h2 className="text-lg font-semibold text-primary mb-4">Your Mortgage Offers</h2>

        {isFindingOffers || isUpdatingOffers ? (
          <div className="flex flex-col items-center justify-center py-20">
            <p className="text-sm text-tertiary">
              {isFindingOffers ? 'Finding your offers…' : 'Updating offers…'}
            </p>
          </div>
        ) : offers.length === 0 ? (
          <div className="rounded-xl bg-primary shadow-xs ring-1 ring-secondary p-12 text-center">
            <p className="text-sm text-tertiary">
              Complete the entry form to see your personalized offers.
            </p>
          </div>
        ) : (
          <div className="flex flex-col gap-4">
            <TableCard.Root>
              <Table selectionMode="none" aria-label="Mortgage offers">
                <Table.Header>
                  <Table.Head id="lender" label="Lender" isRowHeader />
                  <Table.Head id="rate" label="Rate" />
                  <Table.Head id="apr" label="APR" />
                  <Table.Head id="payment" label="Monthly Payment" />
                  <Table.Head id="type" label="Loan Type" />
                  <Table.Head id="costs" label="Closing Costs" />
                  <Table.Head id="action" label="" />
                </Table.Header>
                <Table.Body>
                  {displayedOffers.map((offer) => (
                    <Table.Row key={offer.id} id={offer.id}>
                      <Table.Cell className="text-primary font-medium">
                        <div>
                          <div>{offer.lenderName}</div>
                          <div className="text-xs text-tertiary font-normal">NMLS: {offer.nmls}</div>
                        </div>
                      </Table.Cell>
                      <Table.Cell>
                        <Badge type="pill-color" color="success" size="sm">{offer.rate}</Badge>
                      </Table.Cell>
                      <Table.Cell>{offer.apr}</Table.Cell>
                      <Table.Cell className="font-medium text-primary">{offer.monthlyPayment}</Table.Cell>
                      <Table.Cell>{offer.loanType}</Table.Cell>
                      <Table.Cell>{offer.closingCosts}</Table.Cell>
                      <Table.Cell>
                        <Button
                          color="primary"
                          size="sm"
                          onPress={() => openGetQuoteModal(offer.id)}
                        >
                          Get Quote
                        </Button>
                      </Table.Cell>
                    </Table.Row>
                  ))}
                </Table.Body>
              </Table>
            </TableCard.Root>

            <div className="flex justify-center">
              <Button color="tertiary" size="sm" onPress={toggleShowMoreOffers}>
                {showMoreOffers ? 'Show Less Offers' : 'Show More Offers'}
              </Button>
            </div>
          </div>
        )}
      </main>

      <EntryModal />
      <GetQuoteModal />
    </div>
  )
}
