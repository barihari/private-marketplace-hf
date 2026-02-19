import { useState } from "react"
import { Copy01, Check } from "@untitledui/icons"
import { Button } from "@/components/base/buttons/button"
import { Input } from "@/components/base/input/input"
import { FileTrigger } from "@/components/base/file-upload-trigger/file-upload-trigger"
import { usePrototypeStore } from "../store/use-prototype-store"

export const AgencyAdminView = () => {
  const form = usePrototypeStore((s) => s.agencyAdminForm)
  const updateForm = usePrototypeStore((s) => s.updateAgencyAdminForm)
  const submitForm = usePrototypeStore((s) => s.submitAgencyForm)
  const [copied, setCopied] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    submitForm()
  }

  const handleCopyLink = () => {
    navigator.clipboard.writeText('https://marketplace.bankrate.com/agency/invite/xyz789')
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  if (form.isSubmitted) {
    return (
      <div className="max-w-md mx-auto mt-12 px-4">
        <div className="rounded-xl bg-primary shadow-xs ring-1 ring-secondary p-6">
          <h1 className="text-lg font-semibold text-primary mb-1">Agency Account Created</h1>
          <p className="text-sm text-tertiary mb-6">
            Your agency account has been successfully created.
          </p>

          <div className="mb-4">
            <label className="block text-sm font-medium text-secondary mb-1.5">
              Agent Invite Link
            </label>
            <div className="rounded-lg bg-secondary p-3 text-sm font-mono text-secondary break-all">
              https://marketplace.bankrate.com/agency/invite/xyz789
            </div>
          </div>

          <Button
            color="secondary"
            size="md"
            iconLeading={copied ? Check : Copy01}
            onPress={handleCopyLink}
            className="w-full"
          >
            {copied ? 'Copied' : 'Copy Invite Link'}
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-md mx-auto mt-12 px-4">
      <div className="rounded-xl bg-primary shadow-xs ring-1 ring-secondary p-6">
        <h1 className="text-lg font-semibold text-primary mb-1">Create Agency Account</h1>
        <p className="text-sm text-tertiary mb-6">
          This is a private marketplace powered by Bankrate for partner agencies.
        </p>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <Input
            label="Agency Name"
            isRequired
            value={form.agencyName}
            onChange={(v) => updateForm('agencyName', v)}
            placeholder="Horizon Realty Group"
          />

          <Input
            label="Admin Name"
            isRequired
            value={form.adminName}
            onChange={(v) => updateForm('adminName', v)}
            placeholder="Sarah Mitchell"
          />

          <Input
            label="Admin Email"
            type="email"
            isRequired
            value={form.adminEmail}
            onChange={(v) => updateForm('adminEmail', v)}
            placeholder="sarah@agency.com"
          />

          <Input
            label="Password"
            type="password"
            isRequired
            value={form.password}
            onChange={(v) => updateForm('password', v)}
            placeholder="••••••••"
          />

          <div className="flex flex-col gap-1.5">
            <span className="text-sm font-medium text-secondary">Agency Logo</span>
            <FileTrigger
              acceptedFileTypes={['image/*']}
              onSelect={(files) => {
                const file = files?.[0]
                if (file) updateForm('logoFilename', file.name)
              }}
            >
              <Button color="secondary" size="sm" type="button">
                {form.logoFilename ? form.logoFilename : 'Choose file…'}
              </Button>
            </FileTrigger>
          </div>

          <Button
            type="submit"
            color="primary"
            size="md"
            className="w-full mt-2"
          >
            Create Agency Account
          </Button>
        </form>
      </div>
    </div>
  )
}
