import { create } from 'zustand'

export type SmbTabType = 'acquisition' | 'landing-page' | 'signup-onboarding' | 'portal'

interface SignupForm {
  name: string
  email: string
  license: string
  password: string
  isSubmitted: boolean
}

const initialSignup: SignupForm = {
  name: '',
  email: '',
  license: '',
  password: '',
  isSubmitted: false,
}

interface OnboardingState {
  freeStep: number
  premiumStep: number
}

const initialOnboarding: OnboardingState = {
  freeStep: 0,
  premiumStep: 0,
}

interface SmbStore {
  currentTab: SmbTabType
  signup: SignupForm
  onboarding: OnboardingState

  setCurrentTab: (tab: SmbTabType) => void
  prefillCurrentTab: () => void
  resetCurrentTab: () => void

  updateSignupField: (field: string, value: string) => void
  submitSignup: () => void

  setOnboardingStep: (tier: 'free' | 'premium', step: number) => void
}

export const useSmbStore = create<SmbStore>((set, get) => ({
  currentTab: 'acquisition',
  signup: initialSignup,
  onboarding: initialOnboarding,

  setCurrentTab: (tab) => set({ currentTab: tab }),

  prefillCurrentTab: () => {
    const { currentTab } = get()
    if (currentTab === 'signup-onboarding') {
      set({
        signup: {
          name: 'Daniel Reyes',
          email: 'daniel@horizonrealty.com',
          license: 'RE-2024-08172',
          password: 'Password123!',
          isSubmitted: false,
        },
      })
    }
  },

  resetCurrentTab: () => {
    const { currentTab } = get()
    if (currentTab === 'signup-onboarding') {
      set({ signup: initialSignup, onboarding: initialOnboarding })
    }
  },

  updateSignupField: (field, value) => {
    set({ signup: { ...get().signup, [field]: value } })
  },

  submitSignup: () => {
    set({ signup: { ...get().signup, isSubmitted: true } })
  },

  setOnboardingStep: (tier, step) => {
    set({
      onboarding: {
        ...get().onboarding,
        [tier === 'free' ? 'freeStep' : 'premiumStep']: step,
      },
    })
  },
}))
