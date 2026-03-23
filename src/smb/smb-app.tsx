import { useSmbStore } from "./store"
import { SmbControlBar } from "./smb-control-bar"
import { AcquisitionView } from "./views/acquisition-view"
import { LandingPageView } from "./views/landing-page-view"
import { SignupOnboardingView } from "./views/signup-onboarding-view"
import { PortalView } from "./views/portal-view"

export const SmbApp = () => {
  const currentTab = useSmbStore((s) => s.currentTab)

  return (
    <div className="min-h-screen bg-white">
      <SmbControlBar />
      <main className="pt-16">
        {currentTab === 'acquisition' && <AcquisitionView />}
        {currentTab === 'landing-page' && <LandingPageView />}
        {currentTab === 'signup-onboarding' && <SignupOnboardingView />}
        {currentTab === 'portal' && <PortalView />}
      </main>
    </div>
  )
}
