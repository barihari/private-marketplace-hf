const BlurLine = ({ w = 'w-full' }: { w?: string }) => (
  <div className={`${w} h-1.5 bg-gray-200 rounded-full`} />
)

const LandingFrame = ({ children }: { children: React.ReactNode }) => (
  <div className="border border-gray-300 rounded-lg overflow-hidden">
    {/* Nav bar */}
    <div className="bg-gray-900 px-3 py-2 flex items-center justify-between">
      <div className="flex items-center gap-1.5">
        <div className="w-3 h-3 rounded bg-white/20" />
        <span className="text-[8px] text-white/60 font-medium">Bankrate</span>
      </div>
      <div className="flex gap-3">
        <BlurLine w="w-6" />
        <BlurLine w="w-6" />
        <BlurLine w="w-6" />
      </div>
    </div>
    <div className="p-4">{children}</div>
  </div>
)

const Landing1 = () => (
  <LandingFrame>
    <div className="text-center py-3">
      <p className="text-[10px] text-gray-400 uppercase tracking-wider mb-1">For Licensed Agents</p>
      <h2 className="text-sm font-bold leading-tight mb-1">Close With Confidence</h2>
      <p className="text-[9px] text-gray-500 mb-3">Trusted lender support backed by Bankrate</p>
      <div className="bg-gray-900 text-white text-[8px] font-medium py-1 px-4 rounded inline-block">Join the Program</div>
    </div>
    <div className="flex gap-2 mt-2 opacity-30">
      <div className="flex-1 h-6 bg-gray-100 rounded" />
      <div className="flex-1 h-6 bg-gray-100 rounded" />
      <div className="flex-1 h-6 bg-gray-100 rounded" />
    </div>
  </LandingFrame>
)

const Landing2 = () => (
  <LandingFrame>
    <div className="flex gap-3 py-2">
      <div className="flex-1">
        <p className="text-[10px] text-gray-400 mb-1">Agent Program</p>
        <h2 className="text-sm font-bold leading-tight mb-1">Your Buyers Deserve Better Rates</h2>
        <p className="text-[9px] text-gray-500 mb-3">Proof-backed pricing your clients can trust</p>
        <div className="bg-gray-900 text-white text-[8px] font-medium py-1 px-3 rounded inline-block">See Rate Proof</div>
      </div>
      <div className="w-[40%] bg-gray-100 rounded flex items-center justify-center">
        <span className="text-[9px] text-gray-400">6.875%</span>
      </div>
    </div>
  </LandingFrame>
)

const Landing3 = () => (
  <LandingFrame>
    <div className="text-center py-2">
      <h2 className="text-sm font-bold leading-tight mb-1">One Place For Deal Progress</h2>
      <p className="text-[9px] text-gray-500 mb-3">Track every mortgage from offer to close</p>
    </div>
    <div className="border border-gray-200 rounded p-2 space-y-1.5">
      {['Pre-approval', 'Underwriting', 'Closing'].map((s, i) => (
        <div key={i} className="flex items-center justify-between text-[9px]">
          <span className="text-gray-600">{s}</span>
          <div className={`w-10 h-1.5 rounded-full ${i === 0 ? 'bg-green-300' : i === 1 ? 'bg-yellow-300' : 'bg-gray-200'}`} />
        </div>
      ))}
    </div>
    <div className="text-center mt-3">
      <div className="bg-gray-900 text-white text-[8px] font-medium py-1 px-4 rounded inline-block">Get Started Free</div>
    </div>
  </LandingFrame>
)

const Landing4 = () => (
  <LandingFrame>
    <div className="flex gap-3 py-2">
      <div className="w-10 h-10 rounded-full bg-gray-200 shrink-0 mt-1" />
      <div className="flex-1">
        <h2 className="text-sm font-bold leading-tight mb-1">Dedicated Support, Not a Call Center</h2>
        <p className="text-[9px] text-gray-500 mb-2">A named contact who knows your deals</p>
        <div className="border border-gray-200 rounded p-2 text-[9px]">
          <p className="font-medium">Sarah Mitchell</p>
          <p className="text-gray-400">Sr. Loan Advisor &middot; 12 min avg. response</p>
        </div>
        <div className="bg-gray-900 text-white text-[8px] font-medium py-1 px-3 rounded inline-block mt-2">Join Now</div>
      </div>
    </div>
  </LandingFrame>
)

const Landing5 = () => (
  <LandingFrame>
    <div className="text-center py-3">
      <div className="inline-block border border-gray-300 rounded-full px-2 py-0.5 text-[8px] text-gray-500 mb-2">Pilot Program</div>
      <h2 className="text-sm font-bold leading-tight mb-1">Join 500+ Agents in the Pilot</h2>
      <p className="text-[9px] text-gray-500 mb-3">Lightweight sign-up. Immediate value.</p>
      <div className="flex gap-2 justify-center">
        <div className="bg-gray-900 text-white text-[8px] font-medium py-1 px-3 rounded">Sign Up Free</div>
        <div className="border border-gray-300 text-[8px] font-medium py-1 px-3 rounded text-gray-600">Learn More</div>
      </div>
    </div>
    <div className="flex justify-center gap-4 mt-3 text-[8px] text-gray-400">
      <span>✓ No contracts</span>
      <span>✓ 2 min setup</span>
      <span>✓ Free tier</span>
    </div>
  </LandingFrame>
)

const Landing6 = () => (
  <LandingFrame>
    <div className="py-2">
      <h2 className="text-sm font-bold leading-tight mb-1">Stop Chasing Updates</h2>
      <p className="text-[9px] text-gray-500 mb-3">Real-time deal tracking for you and your buyers</p>
      <div className="bg-gray-50 border border-gray-200 rounded p-2 space-y-1">
        {[
          { label: 'James W.', status: 'Docs submitted', color: 'bg-green-400' },
          { label: 'Stacy B.', status: 'Appraisal scheduled', color: 'bg-yellow-400' },
          { label: 'Lisa C.', status: 'Pre-qual sent', color: 'bg-blue-400' },
        ].map((d, i) => (
          <div key={i} className="flex items-center justify-between text-[9px]">
            <div className="flex items-center gap-1.5">
              <span className={`w-1.5 h-1.5 rounded-full ${d.color}`} />
              <span className="font-medium">{d.label}</span>
            </div>
            <span className="text-gray-400">{d.status}</span>
          </div>
        ))}
      </div>
      <div className="text-center mt-3">
        <div className="bg-gray-900 text-white text-[8px] font-medium py-1 px-4 rounded inline-block">Try the Portal</div>
      </div>
    </div>
  </LandingFrame>
)

export const LandingPageView = () => (
  <div className="max-w-5xl mx-auto px-6 py-10">
    <h1 className="text-2xl font-bold mb-2">Landing Page Examples</h1>
    <p className="text-sm text-gray-500 mb-8">Above-the-fold hero variations</p>

    <div className="grid grid-cols-3 gap-6">
      <Landing1 />
      <Landing2 />
      <Landing3 />
      <Landing4 />
      <Landing5 />
      <Landing6 />
    </div>

    <hr className="my-10 border-gray-800" />

    <h2 className="text-xl font-bold text-center mb-8">Plan Selection</h2>
    <div className="grid grid-cols-2 gap-8">
      <div className="border border-gray-300 rounded-lg p-6">
        <h3 className="text-lg font-bold mb-4">Free tier example</h3>
        <div className="bg-gray-200 rounded h-40" />
        <ul className="mt-4 text-sm text-gray-600 space-y-1">
          <li>• Basic portal access</li>
          <li>• Buyer education resources</li>
          <li>• Deal tracking</li>
          <li>• Standard support</li>
        </ul>
      </div>
      <div className="border border-gray-300 rounded-lg p-6">
        <h3 className="text-lg font-bold mb-4">Premium tier example</h3>
        <div className="bg-gray-200 rounded h-40" />
        <ul className="mt-4 text-sm text-gray-600 space-y-1">
          <li>• Verified agent profile</li>
          <li>• Featured placement</li>
          <li>• Premium support</li>
          <li>• Co-branded marketing tools</li>
        </ul>
      </div>
    </div>
  </div>
)
