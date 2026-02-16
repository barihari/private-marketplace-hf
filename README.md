# Private Marketplace Prototype

A single-page, low-fidelity prototype demonstrating a complete end-to-end mortgage marketplace flow across 4 role-based surfaces with shared demo state.

## Overview

This is a proof-of-concept prototype built to demonstrate stakeholder value across different user roles:

- **Agency Admin**: Create agency accounts and generate agent invite links
- **Agent Sign Up**: Agent onboarding via invite link
- **Agent Dashboard**: Create personalized buyer links and track lead status
- **Private Marketplace**: Buyer experience for viewing mortgage offers and requesting quotes

## Key Features

- **Grayscale Wireframe Design**: Black/white/gray only, no brand colors, minimal styling
- **Global Prototype Controls**: Tab navigation, Prefill, and Reset functions for easy demoing
- **Cross-Tab State Sync**: When buyer submits quote request, agent dashboard updates in real-time
- **Zero Backend**: All state managed in-memory with Zustand
- **Image Placeholders**: Ready to swap in rate table and filter reference images

## Tech Stack

- **Vite**: Fast build tool and dev server
- **React 18**: UI library
- **TypeScript**: Type safety
- **Zustand**: Global state management
- **Tailwind CSS**: Utility-first styling
- **Lucide React**: Icon library

## Getting Started

### Prerequisites

- Node.js 18+ installed
- npm or yarn

### Installation

```bash
# Install dependencies
npm install

# Start development server
npm run dev
```

The app will open at `http://localhost:5173`

### Building for Production

```bash
npm run build
npm run preview
```

## Demo Flow

### Quick Start with Prefill

1. Click the **Prefill** button in the prototype controls
2. This populates all forms with demo data and creates James Walker as a Pending lead

### Complete End-to-End Flow

1. **Agency Admin Tab**
   - Click Prefill (or manually fill form)
   - Submit to create agency account
   - Copy the invite link

2. **Agent Sign Up Tab**
   - Click Prefill (or manually fill form)
   - Create profile
   - Click "Go to Dashboard"

3. **Agent Dashboard Tab**
   - Click "+ Create" to open modal
   - Click modal "Prefill" button to populate James Walker data (note: credit score is blank)
   - Generate Link
   - Copy the link
   - Notice James appears in table with "Pending" status

4. **Private Marketplace Tab**
   - Entry modal appears automatically with "Welcome, James"
   - All prefilled data is shown (readonly)
   - Enter credit score (required field that was blank)
   - Click "Find Offers"
   - Wait 3 seconds for loading
   - View offers in the rate table
   - Click "Get Quote" on any offer
   - Select lender(s) (up to 3)
   - Continue to contact form
   - Check disclosure agreement
   - Click "Agree & Submit"
   - See confirmation message

5. **Verify Cross-Tab Update**
   - Switch back to Agent Dashboard tab
   - Notice James Walker's status changed from "Pending" to "Completed"
   - This demonstrates real-time cross-surface state synchronization

6. **Reset Everything**
   - Click the **Reset** button in prototype controls
   - All state returns to initial defaults

## Acceptance Criteria Checklist

- ✅ Global Prefill fills all forms and creates James as Pending with no credit score
- ✅ Private Marketplace entry modal blurs background and greets "Welcome, James"
- ✅ Entry modal requires credit score input
- ✅ After "Find Offers", 3-second loading then offers appear
- ✅ Filters lock until Edit button clicked
- ✅ Update Offers shows 3-second loading and re-locks
- ✅ Get Quote confirmation shows "A confirmation email has been sent to james.walker@email.com"
- ✅ After "Agree & Submit", Agent Dashboard shows James status as Completed
- ✅ Global Reset returns everything to initial state
- ✅ All Copy buttons show "Copied ✓" for 2 seconds

## Image Placeholders

To add reference images for the rate table and filters:

1. Open `src/components/views/PrivateMarketplaceView.tsx`
2. Update the constants at the top:
   ```typescript
   const RATE_TABLE_REF_SRC = '/path/to/rate-table-image.png'
   const FILTERS_REF_SRC = '/path/to/filters-image.png'
   ```
3. Place images in the `public` folder
4. Images will automatically replace the placeholder rectangles

## Project Structure

```
private-marketplace/
├── src/
│   ├── store/
│   │   └── usePrototypeStore.ts       # Zustand global state
│   ├── components/
│   │   ├── PrototypeControlBar.tsx    # Top navigation
│   │   ├── views/
│   │   │   ├── AgencyAdminView.tsx
│   │   │   ├── AgentSignUpView.tsx
│   │   │   ├── AgentDashboardView.tsx
│   │   │   └── PrivateMarketplaceView.tsx
│   │   └── modals/
│   │       ├── CreateLinkModal.tsx
│   │       ├── RegenerateModal.tsx
│   │       ├── LeadDetailModal.tsx
│   │       ├── EntryModal.tsx
│   │       └── GetQuoteModal.tsx
│   ├── App.tsx
│   ├── main.tsx
│   └── index.css
├── package.json
├── tailwind.config.js
├── vite.config.ts
└── tsconfig.json
```

## Design Decisions

### Why Separate Surfaces?

Each view represents a different role and moment in the buyer journey, demonstrating how the system creates value across stakeholders.

### Why Global Controls?

Prototype controls (tabs, Prefill, Reset) are separated from product UI to enable rapid demoing without manual typing. Stakeholders can quickly see the complete flow.

### Why Lock Filters After Submission?

This demonstrates "serious buyer" behavior - commit to criteria, get offers, then decide. It encourages thoughtful requests vs. endless exploration.

### Why Cross-Tab Status Update?

This is the key value demonstration: when a buyer submits requests, the agent immediately sees the status change from Pending to Completed, showing real-time system integration.

## Notes

- This is a prototype, not production code
- No authentication, validation, or error handling
- All data is in-memory and resets on page refresh
- Timestamps and dates are simulated
- No actual network calls or backend services

## License

Internal prototype - not for distribution
