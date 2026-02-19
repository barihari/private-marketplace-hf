import { Button } from "@/components/base/buttons/button"
import { Input } from "@/components/base/input/input"
import { usePrototypeStore } from "../store/use-prototype-store"

export const AgentSignUpView = () => {
  const form = usePrototypeStore((s) => s.agentSignupForm)
  const updateForm = usePrototypeStore((s) => s.updateAgentSignupForm)
  const submitForm = usePrototypeStore((s) => s.submitAgentSignup)
  const navigateToDashboard = usePrototypeStore((s) => s.navigateToAgentDashboard)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    submitForm()
  }

  if (form.isSubmitted) {
    return (
      <div className="max-w-md mx-auto mt-12 px-4">
        <div className="rounded-xl bg-primary shadow-xs ring-1 ring-secondary p-6 text-center">
          <h1 className="text-lg font-semibold text-primary mb-2">Profile Created</h1>
          <p className="text-sm text-tertiary mb-6">
            Your agent profile has been successfully created.
          </p>
          <Button color="primary" size="md" onPress={navigateToDashboard}>
            Go to Dashboard
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-md mx-auto mt-12 px-4">
      <div className="rounded-xl bg-primary shadow-xs ring-1 ring-secondary p-6">
        <h1 className="text-lg font-semibold text-primary mb-6">Create Your Agent Profile</h1>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <Input
            label="First Name"
            isRequired
            value={form.firstName}
            onChange={(v) => updateForm('firstName', v)}
            placeholder="Daniel"
          />

          <Input
            label="Last Name"
            isRequired
            value={form.lastName}
            onChange={(v) => updateForm('lastName', v)}
            placeholder="Reyes"
          />

          <Input
            label="Email"
            type="email"
            isRequired
            value={form.email}
            onChange={(v) => updateForm('email', v)}
            placeholder="daniel@agency.com"
          />

          <Input
            label="Password"
            type="password"
            isRequired
            value={form.password}
            onChange={(v) => updateForm('password', v)}
            placeholder="••••••••"
          />

          <Button
            type="submit"
            color="primary"
            size="md"
            className="w-full mt-2"
          >
            Create Profile
          </Button>
        </form>
      </div>
    </div>
  )
}
