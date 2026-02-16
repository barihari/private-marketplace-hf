import { useState } from 'react'
import { usePrototypeStore } from '../../store/usePrototypeStore'
import { Check } from 'lucide-react'

const AgencyAdminView = () => {
  const form = usePrototypeStore((state) => state.agencyAdminForm)
  const updateForm = usePrototypeStore((state) => state.updateAgencyAdminForm)
  const submitForm = usePrototypeStore((state) => state.submitAgencyForm)
  const [copied, setCopied] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    submitForm()
  }

  const handleCopyLink = () => {
    const link = 'https://marketplace.bankrate.com/agency/invite/xyz789'
    navigator.clipboard.writeText(link)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  if (form.isSubmitted) {
    return (
      <div className="max-w-2xl mx-auto p-8 mt-16">
        <div className="border-2 border-black p-8">
          <h1 className="text-2xl font-bold mb-6">Agency Account Created</h1>
          
          <div className="mb-6">
            <p className="text-wire-gray-dark mb-4">
              Your agency account has been successfully created.
            </p>
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">
              Agent Invite Link
            </label>
            <input
              type="text"
              value="https://marketplace.bankrate.com/agency/invite/xyz789"
              readOnly
              className="input-field"
            />
          </div>

          <button
            onClick={handleCopyLink}
            className="btn-primary w-full"
          >
            {copied ? (
              <span className="flex items-center justify-center gap-2">
                <Check size={16} />
                Copied
              </span>
            ) : (
              'Copy Invite Link'
            )}
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-2xl mx-auto p-8 mt-16">
      <div className="border-2 border-black p-8">
        <h1 className="text-2xl font-bold mb-2">Create Agency Account</h1>
        <p className="text-sm text-wire-gray-dark mb-6">
          This is a private marketplace powered by Bankrate for partner agencies.
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">
              Agency Name <span className="text-wire-gray">*</span>
            </label>
            <input
              type="text"
              value={form.agencyName}
              onChange={(e) => updateForm('agencyName', e.target.value)}
              className="input-field"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">
              Admin Name <span className="text-wire-gray">*</span>
            </label>
            <input
              type="text"
              value={form.adminName}
              onChange={(e) => updateForm('adminName', e.target.value)}
              className="input-field"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">
              Admin Email <span className="text-wire-gray">*</span>
            </label>
            <input
              type="email"
              value={form.adminEmail}
              onChange={(e) => updateForm('adminEmail', e.target.value)}
              className="input-field"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">
              Password <span className="text-wire-gray">*</span>
            </label>
            <input
              type="password"
              value={form.password}
              onChange={(e) => updateForm('password', e.target.value)}
              className="input-field"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">
              Agency Logo
            </label>
            <div className="border border-black p-4 bg-wire-gray-light">
              <input
                type="file"
                onChange={(e) => {
                  const file = e.target.files?.[0]
                  if (file) {
                    updateForm('logoFilename', file.name)
                  }
                }}
                className="text-sm"
                accept="image/*"
              />
              {form.logoFilename && (
                <p className="text-sm text-wire-gray-dark mt-2">
                  Selected: {form.logoFilename}
                </p>
              )}
            </div>
          </div>

          <button
            type="submit"
            className="btn-primary w-full mt-6"
          >
            Create Agency Account
          </button>
        </form>
      </div>
    </div>
  )
}

export default AgencyAdminView
