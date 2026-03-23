const BlurLine = ({ w = 'w-full' }: { w?: string }) => (
  <div className={`${w} h-2 bg-gray-200 rounded-full`} />
)
const BlurBlock = ({ h = 'h-8' }: { h?: string }) => (
  <div className={`w-full ${h} bg-gray-100 rounded`} />
)

const BrowserFrame = ({ platform, children }: { platform: string; children: React.ReactNode }) => (
  <div className="border border-gray-300 rounded-lg overflow-hidden">
    <div className="bg-gray-100 border-b border-gray-200 px-3 py-1.5 flex items-center gap-2">
      <div className="flex gap-1">
        <span className="w-1.5 h-1.5 rounded-full bg-gray-300" />
        <span className="w-1.5 h-1.5 rounded-full bg-gray-300" />
        <span className="w-1.5 h-1.5 rounded-full bg-gray-300" />
      </div>
      <span className="text-[9px] text-gray-400 ml-1">{platform}</span>
    </div>
    <div className="p-3 bg-white">{children}</div>
  </div>
)

const Ad = ({ header, sub, cta }: { header: string; sub: string; cta: string }) => (
  <div className="border-2 border-gray-900 rounded p-2.5 bg-white">
    <div className="flex items-center gap-1.5 mb-1.5">
      <div className="w-4 h-4 rounded bg-gray-900" />
      <span className="text-[9px] font-bold">Bankrate</span>
      <span className="text-[8px] text-gray-400">Sponsored</span>
    </div>
    <p className="text-[10px] font-bold leading-tight mb-0.5">{header}</p>
    <p className="text-[9px] text-gray-500 leading-tight mb-2">{sub}</p>
    <div className="bg-gray-900 text-white text-[8px] font-medium text-center py-1 rounded">{cta}</div>
  </div>
)

const GoogleAdExample = () => (
  <BrowserFrame platform="google.com/search?q=mortgage+lender+partner">
    <div className="space-y-2 opacity-40 mb-2">
      <BlurLine w="w-3/4" />
      <BlurLine w="w-1/2" />
    </div>
    <Ad
      header="Bankrate Agent Program"
      sub="Trusted lender support for your buyers. Proof-backed rates."
      cta="Join the Program →"
    />
    <div className="space-y-2 opacity-30 mt-2">
      <BlurBlock />
      <BlurBlock />
    </div>
  </BrowserFrame>
)

const LinkedInAdExample = () => (
  <BrowserFrame platform="linkedin.com/feed">
    <div className="opacity-30 mb-2">
      <div className="flex items-center gap-1.5 mb-1">
        <div className="w-5 h-5 rounded-full bg-gray-200" />
        <BlurLine w="w-2/3" />
      </div>
      <BlurBlock h="h-6" />
    </div>
    <Ad
      header="Close With Confidence"
      sub="Dedicated mortgage support for licensed agents. Join 500+ in the pilot."
      cta="Learn More"
    />
    <div className="opacity-30 mt-2">
      <div className="flex items-center gap-1.5">
        <div className="w-5 h-5 rounded-full bg-gray-200" />
        <BlurLine w="w-1/2" />
      </div>
    </div>
  </BrowserFrame>
)

const EmailInviteExample = () => (
  <BrowserFrame platform="mail.google.com/inbox">
    <div className="opacity-30 space-y-1.5 mb-2">
      <div className="flex gap-2"><BlurLine w="w-1/4" /><BlurLine w="w-2/3" /></div>
      <div className="flex gap-2"><BlurLine w="w-1/3" /><BlurLine w="w-1/2" /></div>
    </div>
    <div className="border-2 border-gray-900 rounded p-2.5 bg-white">
      <p className="text-[9px] text-gray-500 mb-1">From: partnerships@bankrate.com</p>
      <p className="text-[10px] font-bold leading-tight mb-0.5">You're Invited to the Bankrate Agent Program</p>
      <p className="text-[9px] text-gray-500 leading-tight mb-2">Join the realtor partner network — trusted lender support, proof-backed rates.</p>
      <div className="bg-gray-900 text-white text-[8px] font-medium text-center py-1 rounded w-2/3">Accept Invitation →</div>
    </div>
    <div className="opacity-30 space-y-1.5 mt-2">
      <div className="flex gap-2"><BlurLine w="w-1/4" /><BlurLine w="w-1/2" /></div>
    </div>
  </BrowserFrame>
)

const BannerWidgetExample = () => (
  <BrowserFrame platform="realestatenews.com/market-update">
    <div className="flex gap-3">
      <div className="flex-1 opacity-30 space-y-1.5">
        <BlurLine w="w-3/4" />
        <BlurLine />
        <BlurLine w="w-5/6" />
        <BlurLine />
        <BlurLine w="w-2/3" />
        <BlurLine />
      </div>
      <div className="w-[45%] shrink-0">
        <Ad
          header="Partner With Bankrate"
          sub="Proof-backed rates. Real support for your buyers."
          cta="Get Started"
        />
      </div>
    </div>
  </BrowserFrame>
)

const ReferralLinkExample = () => (
  <BrowserFrame platform="messages">
    <div className="space-y-2">
      <div className="flex justify-end">
        <div className="bg-gray-100 rounded-lg px-2.5 py-1.5 max-w-[80%] opacity-40">
          <BlurLine w="w-full" />
        </div>
      </div>
      <div className="flex">
        <div className="border-2 border-gray-900 rounded-lg px-2.5 py-2 max-w-[85%] bg-white">
          <p className="text-[10px] font-bold leading-tight mb-0.5">Hey — check this out</p>
          <p className="text-[9px] text-gray-500 leading-tight mb-1.5">I joined the Bankrate agent program. Great lender support.</p>
          <div className="bg-gray-50 border border-gray-200 rounded p-1.5">
            <p className="text-[8px] text-blue-600 underline">bankrate.com/agent-invite/ref=dr82k</p>
          </div>
        </div>
      </div>
      <div className="flex justify-end">
        <div className="bg-gray-100 rounded-lg px-2.5 py-1.5 max-w-[80%] opacity-40">
          <BlurLine w="w-3/4" />
        </div>
      </div>
    </div>
  </BrowserFrame>
)

const WebinarCtaExample = () => (
  <BrowserFrame platform="bankrate.com/agent-webinar">
    <div className="opacity-30 mb-2">
      <BlurLine w="w-1/2" />
    </div>
    <div className="border-2 border-gray-900 rounded p-2.5 bg-white text-center">
      <div className="w-5 h-5 rounded bg-gray-900 mx-auto mb-1.5" />
      <p className="text-[10px] font-bold leading-tight mb-0.5">Free Training + Lender Access</p>
      <p className="text-[9px] text-gray-500 leading-tight mb-2">Live webinar: How top agents close faster with Bankrate</p>
      <div className="bg-gray-900 text-white text-[8px] font-medium text-center py-1 rounded w-3/4 mx-auto">Register Now →</div>
    </div>
    <div className="opacity-30 mt-2 space-y-1.5">
      <BlurBlock h="h-4" />
      <BlurBlock h="h-4" />
    </div>
  </BrowserFrame>
)

export const AcquisitionView = () => (
  <div className="max-w-5xl mx-auto px-6 py-10">
    <h1 className="text-2xl font-bold mb-2">Acquisition Examples</h1>
    <p className="text-sm text-gray-500 mb-8">Different entry points an agent might encounter</p>
    <div className="grid grid-cols-3 gap-6">
      <div>
        <p className="text-xs text-gray-500 mb-2 font-medium">Google Search Ad</p>
        <GoogleAdExample />
      </div>
      <div>
        <p className="text-xs text-gray-500 mb-2 font-medium">LinkedIn Sponsored Post</p>
        <LinkedInAdExample />
      </div>
      <div>
        <p className="text-xs text-gray-500 mb-2 font-medium">Email Invitation</p>
        <EmailInviteExample />
      </div>
      <div>
        <p className="text-xs text-gray-500 mb-2 font-medium">Blog Sidebar Widget</p>
        <BannerWidgetExample />
      </div>
      <div>
        <p className="text-xs text-gray-500 mb-2 font-medium">Agent Referral Link</p>
        <ReferralLinkExample />
      </div>
      <div>
        <p className="text-xs text-gray-500 mb-2 font-medium">Webinar CTA</p>
        <WebinarCtaExample />
      </div>
    </div>
  </div>
)
