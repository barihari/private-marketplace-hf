import { Check, Copy01 } from "@untitledui/icons"
import { Button } from "@/components/base/buttons/button"
import { Dialog, Modal, ModalOverlay } from "@/components/application/modals/modal"
import { usePrototypeStore } from "../store/use-prototype-store"

export const RegenerateModal = () => {
  const modal = usePrototypeStore((s) => s.agentDashboard.regenerateModal)
  const closeModal = usePrototypeStore((s) => s.closeRegenerateModal)
  const regenerateLink = usePrototypeStore((s) => s.regenerateLink)
  const copyLink = usePrototypeStore((s) => s.copyRegeneratedLink)

  const hasNewLink = modal.newLink !== ''

  return (
    <ModalOverlay isOpen={modal.isOpen} onOpenChange={(open) => !open && closeModal()}>
      <Modal className="max-w-md">
        <Dialog>
          <div className="rounded-xl bg-primary shadow-2xl ring-1 ring-secondary_alt w-full max-w-md p-6 flex flex-col gap-5">
            {!hasNewLink ? (
              <>
                <div>
                  <h2 className="text-lg font-semibold text-primary mb-2">Generate New Link?</h2>
                  <p className="text-sm text-tertiary">
                    This will create a new personalized link. The previous link will expire and no longer work.
                  </p>
                </div>
                <div className="flex gap-3">
                  <Button
                    color="secondary"
                    size="md"
                    onPress={closeModal}
                    isDisabled={modal.isLoading}
                    className="flex-1"
                  >
                    Cancel
                  </Button>
                  <Button
                    color="primary-destructive"
                    size="md"
                    onPress={regenerateLink}
                    isLoading={modal.isLoading}
                    className="flex-1"
                  >
                    {modal.isLoading ? 'Generating…' : 'Generate New Link'}
                  </Button>
                </div>
              </>
            ) : (
              <>
                <div>
                  <h2 className="text-lg font-semibold text-primary mb-2">New Link Generated</h2>
                  <div className="flex flex-col gap-1.5">
                    <span className="text-sm font-medium text-secondary">New Personalized Link</span>
                    <div className="rounded-lg bg-secondary p-3 text-sm font-mono text-secondary break-all">
                      {modal.newLink}
                    </div>
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
              </>
            )}
          </div>
        </Dialog>
      </Modal>
    </ModalOverlay>
  )
}
