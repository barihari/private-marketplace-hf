import { useSmbStore } from "../store"

interface OnboardingStep {
  title: string
  fields: { label: string; placeholder: string }[]
}

const freeSteps: OnboardingStep[] = [
  {
    title: 'Service Area',
    fields: [
      { label: 'ZIP code', placeholder: '10011' },
      { label: 'Radius (miles)', placeholder: '25' },
    ],
  },
  {
    title: 'Agent Info',
    fields: [
      { label: 'Brokerage name', placeholder: 'Horizon Realty Group' },
      { label: 'Years of experience', placeholder: '5' },
    ],
  },
  {
    title: 'Portal Preferences',
    fields: [
      { label: 'Notification email', placeholder: 'daniel@horizonrealty.com' },
      { label: 'Preferred contact method', placeholder: 'Email' },
    ],
  },
  {
    title: 'Confirmation',
    fields: [],
  },
]

const premiumSteps: OnboardingStep[] = [
  {
    title: 'Verified Profile',
    fields: [
      { label: 'Full legal name', placeholder: 'Daniel Reyes' },
      { label: 'License number', placeholder: 'RE-2024-08172' },
      { label: 'State', placeholder: 'New York' },
    ],
  },
  {
    title: 'Agent Branding',
    fields: [
      { label: 'Headshot upload', placeholder: 'headshot.jpg' },
      { label: 'Agent ID / badge', placeholder: 'Upload file...' },
      { label: 'Bio (short)', placeholder: '10+ years in Manhattan residential' },
    ],
  },
  {
    title: 'Featured Placement',
    fields: [
      { label: 'Primary market area', placeholder: 'Manhattan, NY' },
      { label: 'Specialization', placeholder: 'First-time buyers' },
    ],
  },
  {
    title: 'Dedicated Support',
    fields: [
      { label: 'Preferred call time', placeholder: 'Mornings (9-11am)' },
      { label: 'Phone number', placeholder: '(212) 555-0142' },
    ],
  },
  {
    title: 'Confirmation',
    fields: [],
  },
]

const MiniFlow = ({
  tier,
  steps,
  currentStep,
  onStepChange,
}: {
  tier: string
  steps: OnboardingStep[]
  currentStep: number
  onStepChange: (step: number) => void
}) => {
  const step = steps[currentStep]
  const isLast = currentStep === steps.length - 1
  const isFirst = currentStep === 0

  return (
    <div className="border border-gray-300 rounded-lg overflow-hidden">
      {/* Modal header */}
      <div className="bg-gray-900 text-white px-5 py-3 flex items-center justify-between">
        <span className="text-sm font-semibold">{tier} Onboarding</span>
        <span className="text-xs text-gray-400">
          Step {currentStep + 1} of {steps.length}
        </span>
      </div>

      {/* Progress bar */}
      <div className="h-1 bg-gray-200">
        <div
          className="h-1 bg-gray-900 transition-all duration-300"
          style={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
        />
      </div>

      {/* Step content */}
      <div className="p-5 h-[395px] flex flex-col">
        <h3 className="text-base font-bold mb-4">{step.title}</h3>

        {isLast ? (
          <div className="flex-1 flex items-center justify-center">
            <div className="text-center">
              <div className="text-2xl mb-2">&#10003;</div>
              <p className="text-sm font-semibold">All set!</p>
              <p className="text-xs text-gray-500 mt-1">
                {tier} onboarding complete
              </p>
            </div>
          </div>
        ) : (
          <div className="flex flex-col gap-3 flex-1">
            {step.fields.map((f, i) => (
              <div key={i}>
                <label className="text-xs text-gray-500 mb-1 block">{f.label}</label>
                <div className="w-full border border-gray-300 rounded px-3 py-2 text-sm text-gray-400 bg-gray-50">
                  {f.placeholder}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Navigation */}
        <div className="flex justify-between mt-4 pt-3 border-t border-gray-200">
          <button
            onClick={() => onStepChange(currentStep - 1)}
            disabled={isFirst}
            className="text-sm text-gray-500 hover:text-gray-900 disabled:opacity-30 disabled:cursor-not-allowed"
          >
            ← Back
          </button>
          {!isLast ? (
            <button
              onClick={() => onStepChange(currentStep + 1)}
              className="text-sm bg-gray-900 text-white rounded px-4 py-1.5 hover:bg-gray-800"
            >
              Next →
            </button>
          ) : (
            <button
              onClick={() => onStepChange(0)}
              className="text-sm border border-gray-300 rounded px-4 py-1.5 hover:bg-gray-50"
            >
              Restart
            </button>
          )}
        </div>
      </div>
    </div>
  )
}

export const SignupOnboardingView = () => {
  const signup = useSmbStore((s) => s.signup)
  const updateSignupField = useSmbStore((s) => s.updateSignupField)
  const submitSignup = useSmbStore((s) => s.submitSignup)
  const onboarding = useSmbStore((s) => s.onboarding)
  const setOnboardingStep = useSmbStore((s) => s.setOnboardingStep)

  return (
    <div className="max-w-5xl mx-auto px-6 py-10">
      {/* Sign Up Card */}
      <div className="flex justify-center mb-10">
        <div className="border border-gray-300 rounded-lg p-8 w-full max-w-md">
          <h2 className="text-lg font-bold text-center mb-6">Sign up</h2>
          {signup.isSubmitted ? (
            <div className="text-center py-8">
              <p className="text-lg font-semibold text-green-700 mb-1">Account created</p>
              <p className="text-sm text-gray-500">Welcome to the Bankrate Agent Program</p>
            </div>
          ) : (
            <div className="flex flex-col gap-3">
              <input
                type="text"
                placeholder="Full name"
                value={signup.name}
                onChange={(e) => updateSignupField('name', e.target.value)}
                className="w-full border border-gray-300 rounded px-3 py-2 text-sm"
              />
              <input
                type="email"
                placeholder="Email"
                value={signup.email}
                onChange={(e) => updateSignupField('email', e.target.value)}
                className="w-full border border-gray-300 rounded px-3 py-2 text-sm"
              />
              <input
                type="text"
                placeholder="License number"
                value={signup.license}
                onChange={(e) => updateSignupField('license', e.target.value)}
                className="w-full border border-gray-300 rounded px-3 py-2 text-sm"
              />
              <input
                type="password"
                placeholder="Password"
                value={signup.password}
                onChange={(e) => updateSignupField('password', e.target.value)}
                className="w-full border border-gray-300 rounded px-3 py-2 text-sm"
              />
              <button
                onClick={submitSignup}
                className="mt-2 w-full bg-gray-900 text-white rounded py-2 text-sm font-medium hover:bg-gray-800"
              >
                Create account
              </button>
            </div>
          )}
        </div>
      </div>

      <hr className="border-gray-800 my-10" />

      {/* Onboarding Flows */}
      <h2 className="text-xl font-bold text-center mb-8">Onboarding flow</h2>
      <div className="grid grid-cols-2 gap-8">
        <MiniFlow
          tier="Free"
          steps={freeSteps}
          currentStep={onboarding.freeStep}
          onStepChange={(s) => setOnboardingStep('free', s)}
        />
        <MiniFlow
          tier="Premium"
          steps={premiumSteps}
          currentStep={onboarding.premiumStep}
          onStepChange={(s) => setOnboardingStep('premium', s)}
        />
      </div>

      {/* Feature summaries */}
      <div className="grid grid-cols-2 gap-8 mt-6">
        <div className="px-2">
          <h4 className="text-sm font-bold mb-2">Free tier includes</h4>
          <ul className="text-sm text-gray-600 space-y-1">
            <li>• Join the pilot program</li>
            <li>• Basic portal access</li>
            <li>• Buyer education resources</li>
            <li>• Deal tracking</li>
            <li>• Lender network access</li>
            <li>• Standard support</li>
          </ul>
        </div>
        <div className="px-2">
          <h4 className="text-sm font-bold mb-2">Premium tier includes</h4>
          <ul className="text-sm text-gray-600 space-y-1">
            <li>• Verified agent profile</li>
            <li>• Headshot & agent ID</li>
            <li>• Featured placement</li>
            <li>• Premium support</li>
            <li>• Co-branded marketing tools</li>
            <li>• Stronger visibility & lead-quality benefits</li>
            <li>• Dedicated contact & intro call</li>
          </ul>
        </div>
      </div>
    </div>
  )
}
