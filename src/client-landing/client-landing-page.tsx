import { useState } from "react"
import { Button } from "@/components/base/buttons/button"
import { usePrototypeStore } from "../marketplace/store/use-prototype-store"

const AGENT_NAME = "Daniel Reyes"
const AGENT_BROKERAGE = "Horizon Realty Group"

const DISCLOSURE_SHORT =
  "Based on our best 2025 rates vs 300+ surveyed lenders for similar 30-year fixed loans."
const DISCLOSURE_FULL =
  "During 2025, Bankrate's top offer outperformed 99.75% of offers by 300+ banks and credit unions — surveyed weekly. Based on an 8-year cost-of-loan calculation (including interest payments, lender fees, and points). Comparison of Bankrate's best quoted offer clicked by a user each day in 2025 for a 30-year fixed purchase, $310k–$330k loan with 20% down, 700–780 FICO, primary residence, single family, against rates from all institutions surveyed by Bankrate for similar loans each applicable day (assuming $320k loan, 740 FICO). Bankrate is not a lender."

const steps = [
  {
    number: "1",
    title: "Your Agent Sends You an Invite",
    description:
      "Daniel shared a private link giving you access to a curated set of mortgage rates — from lenders already competing for your business.",
  },
  {
    number: "2",
    title: "Compare Your Options",
    description:
      "See real rates, monthly payments, and closing costs from multiple licensed lenders — all in one place, no searching required.",
  },
  {
    number: "3",
    title: "Connect When You're Ready",
    description:
      "Request a quote from any lender you like. No commitment, no spam — just a direct line when you decide to move forward.",
  },
]

const valueProps = [
  {
    label: "Rates That Beat 99.7% of Banks",
    detail:
      "This isn't a guess — Bankrate's top rate outperformed 99.7% of 300+ surveyed lenders in 2025.* Your agent's link gives you direct access.",
  },
  {
    label: "Curated Through Your Agent",
    detail:
      "These rates come through your agent's private link — lenders here are competing for your business, not just generating leads.",
  },
  {
    label: "Licensed, Competing Lenders",
    detail:
      "Every rate comes from a vetted, licensed lender actively competing for your business — not a lead farm.",
  },
  {
    label: "No Obligation, No Spam",
    detail:
      "Browse freely. You only share your contact info when you're ready to move forward.",
  },
]

export const ClientLandingPage = () => {
  const setCurrentTab = usePrototypeStore((s) => s.setCurrentTab)
  const prefillCurrentTab = usePrototypeStore((s) => s.prefillCurrentTab)
  const [showDisclosure, setShowDisclosure] = useState(false)

  const handleCTA = () => {
    setCurrentTab("private-marketplace")
    prefillCurrentTab()
    window.location.hash = ""
  }

  return (
    <div className="min-h-screen bg-primary">
      {/* Minimal nav */}
      <header className="sticky top-0 z-20 flex w-full items-center justify-between gap-4 border-b border-secondary bg-primary px-6 py-3">
        <div className="flex min-w-0 flex-1 items-center gap-4">
          <div className="mr-2 flex shrink-0 flex-col">
            <span className="text-xs text-tertiary uppercase tracking-wider">
              Prototype
            </span>
            <select
              aria-label="Switch prototype route"
              value="client-landing"
              onChange={(e) => {
                const v = e.target.value
                if (v === "enterprise") window.location.hash = ""
                if (v === "smb") window.location.hash = "#smb"
                if (v === "client-landing") window.location.hash = "#client-landing"
                if (v === "split-landing") window.location.hash = "#split-landing"
              }}
              className="cursor-pointer rounded border border-secondary bg-transparent px-1.5 py-0.5 text-xs font-bold text-primary"
            >
              <option value="enterprise">Enterprise</option>
              <option value="smb">SMB Pivot</option>
              <option value="client-landing">Client Landing Page</option>
              <option value="split-landing">Split landing</option>
            </select>
          </div>
          <div className="flex items-center border-l border-secondary pl-4">
            <span className="text-sm font-semibold text-primary">Bankrate</span>
          </div>
        </div>
        <span className="shrink-0 text-xs text-tertiary">
          Sent by {AGENT_NAME} · {AGENT_BROKERAGE}
        </span>
      </header>

      {/* Hero */}
      <section className="max-w-3xl mx-auto px-6 pt-20 pb-16 text-center">
        <p className="text-sm font-medium text-brand-primary mb-3">
          {AGENT_NAME} invited you
        </p>
        <h1 className="text-display-lg font-semibold text-primary mb-4">
          Your bank has a mortgage rate. We have a better one.
        </h1>
        <p className="text-lg text-tertiary max-w-xl mx-auto mb-3">
          Bankrate's top rate beat 99.7% of 300+ surveyed lenders in 2025.{" "}
          {AGENT_NAME} is giving you direct access — no searching, no
          guessing, no obligation.
        </p>
        <p className="text-xs text-quaternary mb-10">
          *{DISCLOSURE_SHORT}{" "}
          <button
            className="underline hover:text-tertiary transition-colors"
            onClick={() => setShowDisclosure(true)}
          >
            See details
          </button>
        </p>
        <Button color="primary" size="xl" onPress={handleCTA}>
          View Rates
        </Button>
      </section>

      {/* Proof-point banner */}
      <section className="bg-brand_solid py-10">
        <div className="max-w-4xl mx-auto px-6 flex flex-col md:flex-row items-center justify-center gap-6 md:gap-12 text-center md:text-left">
          <div>
            <p className="text-display-md font-bold text-white">99.7%</p>
            <p className="text-sm text-white/80">
              of banks had a worse rate than ours*
            </p>
          </div>
          <div className="hidden md:block w-px h-12 bg-white/20" />
          <div>
            <p className="text-display-md font-bold text-white">300+</p>
            <p className="text-sm text-white/80">
              lenders surveyed weekly in 2025
            </p>
          </div>
          <div className="hidden md:block w-px h-12 bg-white/20" />
          <div>
            <p className="text-display-md font-bold text-white">45+</p>
            <p className="text-sm text-white/80">
              banks competing for your business
            </p>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="bg-secondary py-16">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-display-xs font-semibold text-primary text-center mb-12">
            How It Works
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {steps.map((step) => (
              <div key={step.number} className="flex flex-col gap-3">
                <div className="size-10 rounded-full bg-brand_solid text-white flex items-center justify-center text-sm font-bold">
                  {step.number}
                </div>
                <h3 className="text-md font-semibold text-primary">
                  {step.title}
                </h3>
                <p className="text-sm text-tertiary leading-relaxed">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Value props */}
      <section className="max-w-4xl mx-auto px-6 py-16">
        <h2 className="text-display-xs font-semibold text-primary text-center mb-4">
          Why Compare Rates Here?
        </h2>
        <p className="text-sm text-tertiary text-center mb-12 max-w-lg mx-auto">
          Shopping for a mortgage on your own means hours of research, spam
          calls, and rates that may not apply to you. This is different.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {valueProps.map((prop) => (
            <div
              key={prop.label}
              className="rounded-xl bg-primary ring-1 ring-secondary shadow-xs p-5 flex flex-col gap-2"
            >
              <h3 className="text-sm font-semibold text-primary">
                {prop.label}
              </h3>
              <p className="text-sm text-tertiary">{prop.detail}</p>
            </div>
          ))}
        </div>
        <p className="text-xs text-quaternary text-center mt-6">
          *{DISCLOSURE_SHORT}
        </p>
      </section>

      {/* Bottom CTA */}
      <section className="bg-secondary py-16">
        <div className="max-w-2xl mx-auto px-6 text-center">
          <h2 className="text-display-xs font-semibold text-primary mb-3">
            Still shopping rates the hard way?
          </h2>
          <p className="text-sm text-tertiary mb-8">
            Our top rate beat 99.7% of surveyed lenders in 2025.* Let your
            agent's link do the comparing for you — it takes less than a
            minute.
          </p>
          <Button color="primary" size="xl" onPress={handleCTA}>
            View Rates
          </Button>
        </div>
      </section>

      {/* Footer with full disclosure */}
      <footer className="border-t border-secondary px-6 py-6">
        <div className="max-w-5xl mx-auto flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <span className="text-xs text-quaternary">
              Powered by Bankrate. NMLS #1427381 | BR Tech Services, Inc. NMLS
              #1743443
            </span>
            <span className="text-xs text-quaternary">
              Rates shown are subject to change. Not a commitment to lend.
            </span>
          </div>
          <p className="text-xs text-quaternary leading-relaxed">
            *{DISCLOSURE_FULL}{" "}
            <a
              href="#methodology"
              className="underline hover:text-tertiary transition-colors"
            >
              Learn more about our methodology.
            </a>
          </p>
        </div>
      </footer>

      {/* Disclosure modal */}
      {showDisclosure && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
          onClick={() => setShowDisclosure(false)}
        >
          <div
            className="bg-primary rounded-xl shadow-lg max-w-lg w-full p-6"
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="text-md font-semibold text-primary mb-3">
              Rate Comparison Details
            </h3>
            <p className="text-sm text-tertiary leading-relaxed mb-4">
              {DISCLOSURE_FULL}
            </p>
            <a
              href="#methodology"
              className="text-sm text-brand-primary underline"
            >
              Learn more about our methodology
            </a>
            <div className="mt-5 flex justify-end">
              <Button
                color="secondary"
                size="sm"
                onPress={() => setShowDisclosure(false)}
              >
                Close
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
