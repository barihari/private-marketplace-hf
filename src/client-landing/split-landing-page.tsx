import { useRef, useState } from "react"
import { Button } from "@/components/base/buttons/button"
import { usePrototypeStore } from "../marketplace/store/use-prototype-store"
import { cx } from "@/utils/cx"

const AGENT_NAME = "Daniel Reyes"
const AGENT_BROKERAGE = "Horizon Realty Group"
const AGENT_PREFERRED_PHONE_DISPLAY = "(415) 555-0148"
const AGENT_PREFERRED_PHONE_TEL = "+14155550148"

interface Question {
  id: string
  title: string
  subtitle?: string
  options: { label: string; value: string }[]
}

const questions: Question[] = [
  {
    id: "goal",
    title: "What are you looking to do?",
    subtitle: "(Select one)",
    options: [
      { label: "Purchase a home", value: "purchase" },
      { label: "Refinance my mortgage", value: "refinance" },
      { label: "Cash-out refinance", value: "cashout" },
      { label: "Home equity loan / HELOC", value: "heloc" },
    ],
  },
  {
    id: "property",
    title: "What type of property is this?",
    subtitle: "(Select one)",
    options: [
      { label: "Single family home", value: "single-family" },
      { label: "Condo / Co-op", value: "condo" },
      { label: "Townhouse", value: "townhouse" },
      { label: "Multi-family (2-4 units)", value: "multi-family" },
    ],
  },
  {
    id: "usage",
    title: "How will you use this property?",
    subtitle: "(Select one)",
    options: [
      { label: "Primary residence", value: "primary" },
      { label: "Second / vacation home", value: "second" },
      { label: "Investment / rental", value: "investment" },
    ],
  },
  {
    id: "credit",
    title: "What's your estimated credit score?",
    subtitle: "(Select one)",
    options: [
      { label: "Excellent (740+)", value: "740+" },
      { label: "Good (700–739)", value: "700-739" },
      { label: "Fair (660–699)", value: "660-699" },
      { label: "Below 660", value: "below-660" },
      { label: "Not sure", value: "unsure" },
    ],
  },
  {
    id: "stage",
    title: "Where are you in the process?",
    subtitle: "(Select one)",
    options: [
      { label: "Just researching rates", value: "researching" },
      { label: "Getting pre-approved", value: "pre-approval" },
      { label: "Found a home / making offers", value: "found-home" },
      { label: "Under contract", value: "under-contract" },
    ],
  },
]

const OptionCard = ({
  label,
  isSelected,
  onSelect,
}: {
  label: string
  isSelected: boolean
  onSelect: () => void
}) => (
  <button
    type="button"
    onClick={onSelect}
    className={cx(
      "relative flex w-full items-center rounded-xl px-5 py-4 text-left text-md font-medium ring-1 transition-all duration-150",
      isSelected
        ? "bg-brand-primary_alt text-brand-secondary ring-2 ring-brand"
        : "bg-primary text-primary ring-secondary hover:ring-brand hover:bg-primary_hover",
    )}
  >
    <span className="flex-1">{label}</span>
    {isSelected && (
      <svg
        className="size-5 shrink-0 text-brand-solid"
        viewBox="0 0 20 20"
        fill="currentColor"
      >
        <path
          fillRule="evenodd"
          d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z"
          clipRule="evenodd"
        />
      </svg>
    )}
  </button>
)

export const SplitLandingPage = ({ showGate = false }: { showGate?: boolean }) => {
  const setCurrentTab = usePrototypeStore((s) => s.setCurrentTab)
  const prefillCurrentTab = usePrototypeStore((s) => s.prefillCurrentTab)

  const [answers, setAnswers] = useState<Record<string, string>>({})
  const [hasUnlockedRatesForm, setHasUnlockedRatesForm] = useState(!showGate)
  const fieldsetRefs = useRef<Record<string, HTMLFieldSetElement | null>>({})

  const allAnswered = questions.every((q) => answers[q.id] !== undefined)

  const scrollToNextUnanswered = (currentQuestionId: string, updatedAnswers: Record<string, string>) => {
    const currentIndex = questions.findIndex((q) => q.id === currentQuestionId)
    // Find the next question that still has no answer
    const nextQuestion = questions.slice(currentIndex + 1).find((q) => updatedAnswers[q.id] === undefined)
    if (!nextQuestion) return
    const el = fieldsetRefs.current[nextQuestion.id]
    if (!el) return
    const rect = el.getBoundingClientRect()
    const isFullyVisible = rect.top >= 61 && rect.bottom <= window.innerHeight
    if (!isFullyVisible) {
      // Offset: sticky header (~49px) + breathing room (34px)
      const targetY = window.scrollY + rect.top - 49 - 34
      window.scrollTo({ top: targetY, behavior: "smooth" })
    }
  }

  const handleSelect = (questionId: string, value: string) => {
    setAnswers((prev) => {
      // Toggle off if same value clicked again
      if (prev[questionId] === value) {
        const next = { ...prev }
        delete next[questionId]
        return next
      }
      const next = { ...prev, [questionId]: value }
      // Only auto-scroll if this is a fresh answer (not changing an existing one)
      if (prev[questionId] === undefined) {
        // Defer so the state update renders first
        setTimeout(() => scrollToNextUnanswered(questionId, next), 80)
      }
      return next
    })
  }

  const handleSubmit = () => {
    setCurrentTab("private-marketplace")
    prefillCurrentTab()
    window.location.hash = ""
  }

  return (
    <div className="flex min-h-screen flex-col bg-primary">
      {/* Top bar */}
      <header className="sticky top-0 z-20 flex w-full items-center justify-between gap-4 border-b border-secondary bg-primary px-6 py-3">
        <div className="flex min-w-0 flex-1 items-center gap-4">
          <div className="mr-2 flex shrink-0 flex-col">
            <span className="text-xs text-tertiary uppercase tracking-wider">
              Prototype
            </span>
            <select
              aria-label="Switch prototype route"
              value={showGate ? "split-landing-gate" : "split-landing"}
              onChange={(e) => {
                const v = e.target.value
                if (v === "enterprise") window.location.hash = ""
                if (v === "smb") window.location.hash = "#smb"
                if (v === "client-landing") window.location.hash = "#client-landing"
                if (v === "split-landing") window.location.hash = "#split-landing"
                if (v === "split-landing-gate") window.location.hash = "#split-landing-gate"
              }}
              className="cursor-pointer rounded border border-secondary bg-transparent px-1.5 py-0.5 text-xs font-bold text-primary"
            >
              <option value="enterprise">Enterprise</option>
              <option value="smb">SMB Pivot</option>
              <option value="client-landing">Client Landing Page</option>
              <option value="split-landing">Split landing</option>
              <option value="split-landing-gate">Split landing (gated)</option>
            </select>
          </div>
          <div className="flex items-center border-l border-secondary pl-4">
            <span className="text-sm font-semibold text-primary">Bankrate</span>
          </div>
        </div>
        <p className="hidden text-xs text-tertiary sm:block">
          Sent by{" "}
          <span className="font-semibold text-primary">{AGENT_NAME}</span>
          {" "}· {AGENT_BROKERAGE}
        </p>
      </header>

      {/* Split layout */}
      <div className="flex flex-1 flex-col lg:flex-row">
        {/* LEFT — sticky hero / branding */}
        <div className="bg-secondary lg:w-1/2">
          <div className="lg:sticky lg:top-[49px] flex flex-col justify-between px-8 pt-[1.3rem] pb-8.5 lg:px-14 lg:pt-12 lg:min-h-[calc(100vh-49px)]">
            <div>
              <p className="mb-3 text-sm font-medium text-brand-secondary">
                You were invited by your realtor
              </p>
              <h1 className="text-display-sm font-semibold text-primary lg:text-display-md">
                Find a better mortgage rate — in minutes
              </h1>
              <p className="mt-4 max-w-md text-md text-tertiary leading-relaxed">
                Answer a few quick questions and we'll match you with
                personalized rates from 45+ competing lenders. No obligation, no
                spam.
              </p>

              {/* Trust stats */}
              <div className="mt-10 flex flex-wrap gap-6">
                <div>
                  <p className="text-display-xs font-bold text-primary">
                    99.7%
                  </p>
                  <p className="text-xs text-tertiary">of banks beaten*</p>
                </div>
                <div className="hidden w-px bg-tertiary sm:block" />
                <div>
                  <p className="text-display-xs font-bold text-primary">300+</p>
                  <p className="text-xs text-tertiary">lenders surveyed</p>
                </div>
                <div className="hidden w-px bg-tertiary sm:block" />
                <div>
                  <p className="text-display-xs font-bold text-primary">$0</p>
                  <p className="text-xs text-tertiary">cost to you</p>
                </div>
              </div>

              {/* Promo card */}
              <div className="mt-10 flex max-w-md items-start gap-3 rounded-xl bg-primary p-4 ring-1 ring-secondary shadow-xs">
                <span className="text-xl">★</span>
                <div>
                  <p className="text-sm font-semibold text-primary">
                    Save an average of $3,400/year
                  </p>
                  <p className="text-sm text-tertiary">
                    Homebuyers using Bankrate's rate comparison save thousands
                    versus going with their bank's first offer.
                  </p>
                </div>
              </div>
              <p className="mt-5 max-w-md text-sm text-tertiary">
                Prefer to call?{" "}
                <a
                  href={`tel:${AGENT_PREFERRED_PHONE_TEL}`}
                  className="font-semibold text-brand-secondary underline underline-offset-2 hover:text-brand-secondary_hover"
                >
                  {AGENT_PREFERRED_PHONE_DISPLAY}
                </a>
              </p>

            </div>

            {/* Illustration placeholder */}
            <div className="mt-12 hidden lg:block">
              <div className="flex items-end gap-4">
                <div className="h-28 w-20 rounded-lg bg-brand-primary_alt" />
                <div className="h-36 w-20 rounded-lg bg-brand-primary_alt" />
                <div className="h-24 w-20 rounded-lg bg-brand-primary_alt" />
                <div className="h-32 w-20 rounded-lg bg-brand-primary_alt" />
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT — scrollable form with all questions */}
        <div className="relative flex min-w-0 flex-col lg:w-1/2 lg:min-h-[calc(100vh-49px)]">

          <div
            className={cx(
              "relative mx-auto w-full max-w-lg px-8 pt-[1.3rem] pb-[3.4rem] lg:px-14 lg:pt-12",
              !hasUnlockedRatesForm &&
                "max-lg:min-h-[calc(100dvh-12rem)]",
            )}
          >
            <div
              className={cx(
                "transition-[filter] duration-200",
                !hasUnlockedRatesForm &&
                  "pointer-events-none select-none blur-[10px]",
              )}
              aria-hidden={!hasUnlockedRatesForm}
            >
              <h2 className="text-display-xs font-semibold text-primary">
                Tell us a little about yourself
              </h2>
              <p className="mt-1 text-sm text-tertiary">
                We'll use this to find the best rates for you.
              </p>

              {/* All questions */}
              <div className="mt-10 flex flex-col gap-10">
                {questions.map((q) => (
                  <fieldset key={q.id} ref={(el) => { fieldsetRefs.current[q.id] = el }}>
                    <legend className="text-md font-semibold text-primary">
                      {q.title}
                    </legend>
                    {q.subtitle && (
                      <p className="mt-0.5 text-sm text-tertiary">
                        {q.subtitle}
                      </p>
                    )}
                    <div className="mt-3 flex flex-col gap-2.5">
                      {q.options.map((opt) => (
                        <OptionCard
                          key={opt.value}
                          label={opt.label}
                          isSelected={answers[q.id] === opt.value}
                          onSelect={() => handleSelect(q.id, opt.value)}
                        />
                      ))}
                    </div>
                  </fieldset>
                ))}
              </div>

              {/* Submit */}
              <div className="mt-10">
                <Button
                  color="primary"
                  size="xl"
                  onPress={handleSubmit}
                  isDisabled={!allAnswered}
                  className="w-full"
                >
                  View My Rates
                </Button>
              </div>

              {/* Fine print */}
              <p className="mt-6 text-xs text-quaternary leading-relaxed">
                By continuing, you agree to Bankrate's{" "}
                <a href="#terms" className="underline hover:text-tertiary">
                  Terms of Use
                </a>{" "}
                and{" "}
                <a href="#privacy" className="underline hover:text-tertiary">
                  Privacy Policy
                </a>
                . We won't share your info without your permission. NMLS #1427381.
              </p>
            </div>

            {!hasUnlockedRatesForm && (
              <div
                className={cx(
                  "pointer-events-none z-10 flex items-center justify-center px-4 sm:px-6",
                  "absolute inset-0",
                  "lg:fixed lg:bottom-0 lg:left-1/2 lg:right-0 lg:top-14 lg:z-30",
                )}
                aria-live="polite"
              >
                <div
                  className="pointer-events-auto mx-auto h-fit w-full max-w-sm rounded-2xl bg-primary p-6 text-center shadow-lg ring-1 ring-secondary"
                  role="dialog"
                  aria-modal="true"
                  aria-labelledby="split-landing-paywall-title"
                  aria-describedby="split-landing-paywall-desc"
                >
                  <h3
                    id="split-landing-paywall-title"
                    className="text-lg font-semibold text-primary"
                  >
                    Create a free Bankrate profile
                  </h3>
                  <p
                    id="split-landing-paywall-desc"
                    className="mt-1.5 text-sm text-tertiary leading-snug"
                  >
                    Beyond personalized mortgage rates, Bankrate also helps you
                    compare savings, CD rates,
                    <br />
                    and credit cards, with your finances in one place.
                  </p>
                  <Button
                    color="primary"
                    size="lg"
                    className="mt-5 w-full"
                    onPress={() => {
                      setHasUnlockedRatesForm(true)
                    }}
                  >
                    Sign up to get personalized rates
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
