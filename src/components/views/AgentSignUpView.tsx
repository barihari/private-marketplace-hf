import { usePrototypeStore } from '../../store/usePrototypeStore'

const AgentSignUpView = () => {
  const form = usePrototypeStore((state) => state.agentSignupForm)
  const updateForm = usePrototypeStore((state) => state.updateAgentSignupForm)
  const submitForm = usePrototypeStore((state) => state.submitAgentSignup)
  const navigateToDashboard = usePrototypeStore((state) => state.navigateToAgentDashboard)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    submitForm()
  }

  if (form.isSubmitted) {
    return (
      <div className="max-w-2xl mx-auto p-8 mt-16">
        <div className="border-2 border-black p-8 text-center">
          <h1 className="text-2xl font-bold mb-4">Profile Created</h1>
          <p className="text-wire-gray-dark mb-6">
            Your agent profile has been successfully created.
          </p>
          <button
            onClick={navigateToDashboard}
            className="btn-primary"
          >
            Go to Dashboard
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-2xl mx-auto p-8 mt-16">
      <div className="border-2 border-black p-8">
        <h1 className="text-2xl font-bold mb-6">Create Your Agent Profile</h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">
              First Name <span className="text-wire-gray">*</span>
            </label>
            <input
              type="text"
              value={form.firstName}
              onChange={(e) => updateForm('firstName', e.target.value)}
              className="input-field"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">
              Last Name <span className="text-wire-gray">*</span>
            </label>
            <input
              type="text"
              value={form.lastName}
              onChange={(e) => updateForm('lastName', e.target.value)}
              className="input-field"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">
              Email <span className="text-wire-gray">*</span>
            </label>
            <input
              type="email"
              value={form.email}
              onChange={(e) => updateForm('email', e.target.value)}
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

          <button
            type="submit"
            className="btn-primary w-full mt-6"
          >
            Create Profile
          </button>
        </form>
      </div>
    </div>
  )
}

export default AgentSignUpView
