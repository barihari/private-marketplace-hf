import { usePrototypeStore } from '../../store/usePrototypeStore'
import { Check } from 'lucide-react'

const RegenerateModal = () => {
  const modal = usePrototypeStore((state) => state.agentDashboard.regenerateModal)
  const closeModal = usePrototypeStore((state) => state.closeRegenerateModal)
  const regenerateLink = usePrototypeStore((state) => state.regenerateLink)
  const copyLink = usePrototypeStore((state) => state.copyRegeneratedLink)

  if (!modal.isOpen) return null

  const hasNewLink = modal.newLink !== ''

  return (
    <div className="modal-overlay" onClick={closeModal}>
      <div className="modal-content max-w-md" onClick={(e) => e.stopPropagation()}>
        {!hasNewLink ? (
          <>
            <h2 className="text-xl font-bold mb-4">Generate New Link?</h2>
            <p className="text-wire-gray-dark mb-6">
              This will create a new personalized link. The previous link will expire and no longer work.
            </p>
            <div className="flex gap-2">
              <button
                onClick={closeModal}
                className="btn-secondary flex-1"
                disabled={modal.isLoading}
              >
                Cancel
              </button>
              <button
                onClick={regenerateLink}
                className="btn-primary flex-1"
                disabled={modal.isLoading}
              >
                {modal.isLoading ? 'Generating…' : 'Generate New Link'}
              </button>
            </div>
          </>
        ) : (
          <>
            <h2 className="text-xl font-bold mb-4">New Link Generated</h2>
            <div className="mb-6">
              <label className="block text-sm font-medium mb-2">
                New Personalized Link
              </label>
              <input
                type="text"
                value={modal.newLink}
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
          </>
        )}
      </div>
    </div>
  )
}

export default RegenerateModal
