# Realtor Prototype Strategy Pivot Context

## Purpose

This document gives background context for the realtor prototype so implementation decisions stay aligned with the new strategy.

The goal is to prototype the **shift from an enterprise-first realtor acquisition model to an SMB-style self-serve agent signup model**.

This is not a production spec. It is a strategy prototype meant to help leadership understand the new direction.

---

## What changed

### Previous direction
The original concept focused on an **enterprise-style rollout**:
- sell into brokerages or franchise owners
- pursue MSA-style agreements
- onboard organizations from the top down
- treat admins or franchise owners as the main user

### New direction
Research and team discussions suggest that approach is too limiting.

The market appears to be:
- highly fragmented
- relationship-driven
- difficult to unlock through large enterprise deals alone

The new concept is a **bottom-up SMB agent opt-in model**:
- individual licensed agents can sign up directly
- onboarding is lightweight and self-serve
- value is shown quickly through a portal experience
- enterprise and franchise paths may still exist later, but they are no longer the only story

---

## Why the strategy changed

## Key research takeaways

### 1. Trust and execution matter more than marketing claims
Agents consistently care more about:
- reliability
- certainty of closing
- responsiveness
- having a named person they can call

A lender who closes on time beats a slightly lower rate that creates risk.

### 2. Clients still care about lowest rate
Agents said buyers often ask for the lowest rate first.

That means the product needs to support both:
- **trust and execution for the agent**
- **proof-backed rate competitiveness for the client**

### 3. Dedicated human support is table stakes
Agents do not want a faceless platform.
They want:
- a dedicated point of contact
- someone reachable by phone
- someone who can escalate issues when deals get stuck

### 4. Rate skepticism is real
Agents do not automatically trust claims about better rates.
They want:
- documentation
- proof points
- comparisons
- real examples

### 5. Appraisals are a major deal risk
Appraisal issues were called out as one of the biggest reasons deals fall apart.

That means the product story should show:
- escalation help
- guidance
- support when deals get blocked

### 6. Franchise and MSA paths are fragmented
MSA decisions often sit with owners and do not cover the whole market.
Many strong agents operate outside those agreements or rely on personal lender relationships.

This weakens an enterprise-only strategy.

### 7. Agents want a digital deal hub
A repeated pain point was the lack of one place to track mortgage progress.
Agents want:
- status visibility
- less paper/email chasing
- a central place for updates

### 8. Generic lead volume is not the value prop
Agents were skeptical of broad lead-generation models.
Low-quality leads were seen as near-negative value.

This should **not** be framed as a generic lead marketplace.

---

## Strategic hypothesis

If Bankrate offers a lightweight opt-in program for individual agents, it may be able to:

- validate agent demand faster
- gather product feedback sooner
- create proof points before scaling top-down
- attract high-intent agents who would never come in through MSA channels
- position Bankrate as a trusted lender partner, not just a lead seller

---

## Core product story

The prototype should communicate this:

> An individual realtor discovers a Bankrate agent program, signs up in a lightweight self-serve flow, gets access to trusted lender support and a simple digital hub, and can optionally upgrade into a premium tier.

This is the story to preserve across screens.

---

## What the prototype needs to prove

The prototype is meant to help leadership answer these questions:

1. What does an SMB-style agent signup flow look like?
2. Why would an individual realtor join?
3. What value do they get immediately after signup?
4. How is this different from the enterprise/franchise flow?
5. How could free and premium tiers work?
6. Why is this more compelling than a generic lead marketplace?

---

## What not to optimize for

Do not design this as:
- a pure lead-gen funnel
- a generic ad-to-form marketing flow
- an admin-heavy enterprise workflow
- a franchise-owner dashboard
- a rate-shopping experience only

The point is to show a **trusted agent support model**, not just demand capture.

---

## Target user

### Primary user
**Individual licensed realtor / real estate agent**

This user may:
- work independently
- work within a brokerage but make their own lender relationship decisions
- care about closing reliability more than abstract features
- want support they can trust
- want tools that help their buyers move forward

### Secondary user
Potential future:
- franchise owner
- brokerage leader
- organization admin

These users are not the center of this prototype.

---

## Value proposition to show

The strongest value proposition from research is not "cheap leads."

It is closer to:

- trusted lender support
- dedicated contact
- proof-backed rates
- certainty of execution
- one place to track deal progress
- educational tools and resources for buyers
- optional premium visibility / profile benefits

---

## Product positioning

The prototype should position Bankrate as:

- a trusted mortgage partner for agents
- a curated lender support experience
- a better operational experience for agents and buyers
- a product that combines rate transparency with execution confidence

Not as:
- a random lead marketplace
- a generic lender directory
- a vague partnership signup form

---

## Recommended prototype structure

The prototype should show the full journey, not just one page.

### Suggested flow
1. **Acquisition / entry point**
   - ad, promo, widget, or invitation for agents

2. **Landing page**
   - explain the agent program
   - communicate trust, support, proof, and simplicity

3. **Plan selection**
   - free tier
   - premium tier

4. **Signup**
   - lightweight self-serve form
   - tailored for individual agents

5. **Onboarding**
   - service area
   - agent info
   - schedule intro call
   - profile setup

6. **Portal home**
   - the core agent experience
   - should show immediate value

7. **Feature/detail views**
   - deal tracking
   - dedicated contact
   - rate proof / comparisons
   - appraisal escalation help

8. **Premium state**
   - upgraded visibility and support
   - verified profile, featured placement, or similar

---

## Free vs premium model

The exact business model is still being validated, so this prototype should present tiers as a concept rather than final pricing truth.

### Free tier
Possible value:
- join the pilot
- basic portal access
- buyer education resources
- access to deal tracking
- lender network access
- standard support

### Premium tier
Possible value:
- verified agent profile
- headshot and agent ID
- featured placement
- premium support
- co-branded marketing tools
- stronger visibility or lead-quality benefits

The purpose of showing both tiers is to help leadership understand monetization paths.

---

## Product principles for the prototype

### 1. Show immediate value
The user should not sign up and land in an empty shell.
The portal should quickly show:
- active support
- useful tools
- a real reason to keep using it

### 2. Make trust tangible
Trust should appear through:
- named contacts
- proof-backed rate messaging
- support language
- escalation pathways
- realistic status tracking

### 3. Avoid generic SaaS fluff
Do not lean on generic growth-product language that could apply to any startup.

The prototype should feel grounded in actual realtor pain points.

### 4. Reflect research literally where possible
Important themes to visualize:
- trust over pure rate for agents
- rate pressure from clients
- dedicated contact
- appraisal friction
- digital tracking gap
- skepticism toward low-quality leads

---

## UX themes to emphasize

### Dedicated contact
The product should show a named human support model.

### Deal tracking
The portal should feel like a central status hub.

### Proof-backed rates
Rate competitiveness should be shown with evidence, not empty claims.

### Appraisal support
The experience should acknowledge that deals often fail here.

### Lightweight onboarding
The signup path should feel fast and self-serve, unlike enterprise procurement.

---

## Messaging guidance

### Good message directions
- close with confidence
- trusted lender support for your buyers
- proven rates with real support
- one place to track mortgage progress
- dedicated help when deals hit friction

### Avoid message directions like
- unlimited leads
- growth hacks for agents
- lowest rates guaranteed without context
- marketplace volume over quality
- enterprise admin or contract language

---

## How this differs from the enterprise prototype

The enterprise version is centered on:
- organizations
- admins
- franchise agreements
- top-down rollout
- relationship selling at the business level

The SMB version should be centered on:
- individual agents
- direct signup
- immediate product value
- lightweight onboarding
- optional upsell into premium benefits

This is the core strategic switch.

---

## Implementation guidance for this codebase

The easiest approach is to **reuse the existing prototype shell** and add the SMB path as a parallel scenario.

Recommended structure:
- keep existing enterprise flow intact
- add a new top-level scenario for SMB Direct
- optionally add a Premium variant
- reuse the same layout, navigation, components, and helpers where possible
- swap the story, copy, forms, and portal modules

This is a story pivot, not a total rebuild.

### Good reuse candidates
- app shell
- tabs / scenario switcher
- form components
- cards
- dashboard patterns
- modals
- shared mock data structure

### Replace or rewrite
- org admin copy
- franchise setup flows
- enterprise-specific onboarding
- contract / MSA language
- team management assumptions

---

## Success criteria

The prototype is successful if a stakeholder can quickly understand:

1. why the company is exploring SMB agent signup
2. how an individual agent would enter the flow
3. what value the agent gets after signup
4. how free and premium tiers could work
5. how this differs from the existing enterprise path

---

## Summary

This prototype should tell a clear story:

- enterprise-only expansion is too narrow for this market
- the realtor market is fragmented and relationship-driven
- individual agents may be reachable through a lightweight opt-in model
- Bankrate can win by offering trusted support, proof-backed rates, and better deal visibility
- the product should feel like a support and execution platform, not just a lead machine

Use this as something like docs/realtor-strategy-pivot-context.md or prototype-context/realtor-smb-pivot.md.

I can also write a second markdown file for Cursor that is more tactical, like SCREEN_REQUIREMENTS.md, with exact screens, modules, and CTA paths.