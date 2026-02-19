import { Button } from "@/components/base/buttons/button"
import { Badge } from "@/components/base/badges/badges"
import { Dialog, Modal, ModalOverlay } from "@/components/application/modals/modal"
import { usePrototypeStore } from "../store/use-prototype-store"
import { mortgageOptions } from "../constants/mortgage-options"

const DetailRow = ({ label, value }: { label: string; value: string }) => (
  <div className="grid grid-cols-2 gap-2">
    <span className="text-sm text-tertiary">{label}</span>
    <span className="text-sm text-primary">{value}</span>
  </div>
)

export const LeadDetailModal = () => {
  const modal = usePrototypeStore((s) => s.agentDashboard.leadDetailModal)
  const leads = usePrototypeStore((s) => s.agentDashboard.leads)
  const closeModal = usePrototypeStore((s) => s.closeLeadDetail)

  const lead = modal.selectedLeadId ? leads.find((l) => l.id === modal.selectedLeadId) : null

  const formatDate = (date: Date) =>
    date.toLocaleDateString('en-US', {
      year: 'numeric', month: 'long', day: 'numeric',
      hour: '2-digit', minute: '2-digit',
    })

  return (
    <ModalOverlay isOpen={modal.isOpen} onOpenChange={(open) => !open && closeModal()}>
      <Modal className="max-w-lg">
        <Dialog>
          <div className="rounded-xl bg-primary shadow-2xl ring-1 ring-secondary_alt w-full max-w-lg p-6 flex flex-col gap-5 max-h-[90vh] overflow-y-auto">
            <h2 className="text-lg font-semibold text-primary">Lead Details</h2>

            {lead ? (
              <>
                <div className="flex flex-col gap-3">
                  <DetailRow label="Buyer Email" value={lead.email} />

                  <div className="grid grid-cols-2 gap-2">
                    <span className="text-sm text-tertiary">Status</span>
                    <Badge
                      type="pill-color"
                      size="sm"
                      color={lead.status === 'Pending' ? 'warning' : 'success'}
                    >
                      {lead.status}
                    </Badge>
                  </div>

                  <DetailRow label="Link Created" value={formatDate(lead.sentAt)} />
                </div>

                <div className="border-t border-secondary pt-4 flex flex-col gap-3">
                  <h3 className="text-sm font-semibold text-primary">Form Snapshot</h3>
                  <div className="flex flex-col gap-2">
                    {lead.formSnapshot.firstName && <DetailRow label="First Name" value={lead.formSnapshot.firstName} />}
                    {lead.formSnapshot.lastName && <DetailRow label="Last Name" value={lead.formSnapshot.lastName} />}
                    {lead.formSnapshot.zipCode && <DetailRow label="Zip Code" value={lead.formSnapshot.zipCode} />}
                    {lead.formSnapshot.propertyValue && <DetailRow label="Property Value" value={lead.formSnapshot.propertyValue} />}
                    {lead.formSnapshot.loanAmount && <DetailRow label="Loan Amount" value={lead.formSnapshot.loanAmount} />}
                    {lead.formSnapshot.downPayment && <DetailRow label="Down Payment" value={`${lead.formSnapshot.downPayment}%`} />}
                    <DetailRow label="Credit Score" value={lead.formSnapshot.creditScore || '(not provided)'} />
                    {lead.formSnapshot.loanTerm && <DetailRow label="Loan Term" value={lead.formSnapshot.loanTerm} />}
                    {lead.formSnapshot.militaryStatus && <DetailRow label="Military Status" value={lead.formSnapshot.militaryStatus} />}
                    {lead.formSnapshot.dtiRatio && (
                      <DetailRow
                        label="DTI Ratio"
                        value={
                          lead.formSnapshot.dtiRatio === 'lt40'
                            ? mortgageOptions.dtiOptions.lessThan40
                            : mortgageOptions.dtiOptions.fortyAndAbove
                        }
                      />
                    )}
                    {lead.formSnapshot.mortgagePoints && <DetailRow label="Mortgage Points" value={lead.formSnapshot.mortgagePoints} />}
                    {lead.formSnapshot.propertyType && <DetailRow label="Property Type" value={lead.formSnapshot.propertyType} />}
                    {lead.formSnapshot.propertyUse && <DetailRow label="Property Use" value={lead.formSnapshot.propertyUse} />}
                    {lead.formSnapshot.includeFHA !== undefined && (
                      <DetailRow label="Include FHA" value={lead.formSnapshot.includeFHA ? 'Yes' : 'No'} />
                    )}
                  </div>
                </div>
              </>
            ) : (
              <p className="text-sm text-tertiary">Lead not found.</p>
            )}

            <Button color="secondary" size="md" onPress={closeModal} className="w-full">
              Close
            </Button>
          </div>
        </Dialog>
      </Modal>
    </ModalOverlay>
  )
}
