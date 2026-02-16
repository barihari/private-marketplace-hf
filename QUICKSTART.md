# Quick Start Guide

## Running the Prototype

The dev server is already running at **http://localhost:5173/**

If you need to restart it:

```bash
cd /Users/sbeharry/sites/private-marketplace
npm run dev
```

## 5-Minute Demo Flow

### 1. Click Prefill (Top Right)
This populates all forms and creates demo data including James Walker as a Pending lead.

### 2. Explore the 4 Tabs
- **Agency Admin**: See prefilled agency account form
- **Agent Sign Up**: See prefilled agent profile form
- **Agent Dashboard**: See James Walker and 2 other leads in table
- **Private Marketplace**: This is where the magic happens

### 3. Complete the Private Marketplace Flow
1. Navigate to **Private Marketplace** tab
2. Entry modal appears with "Welcome, James"
3. All fields are prefilled EXCEPT credit score
4. Enter credit score: **720**
5. Click **Find Offers**
6. Wait 3 seconds for loading animation
7. View 3 mortgage offers in the table
8. Click **Get Quote** on any offer
9. Select 1-3 lenders (checkboxes)
10. Click **Continue**
11. Check the disclosure agreement checkbox
12. Click **Agree & Submit**
13. View confirmation with email message

### 4. See the Cross-Tab Magic ✨
1. Navigate back to **Agent Dashboard** tab
2. Look at James Walker's row
3. **Status changed from "Pending" to "Completed"!**
4. This demonstrates real-time cross-surface state sync

### 5. Reset Everything
Click **Reset** button (top right) to return to initial state.

## Key Features to Highlight

### Global Controls (Top Bar)
- **Tabs**: Switch between 4 role-based views
- **Prefill**: Populate all forms with demo data instantly
- **Reset**: Return everything to initial state

### Copy Button Animations
Every "Copy" button shows a "Copied ✓" state for 2 seconds:
- Agency Admin invite link
- Agent Dashboard personalized links
- Regenerate modal links

### Filters Lock/Unlock Pattern
In Private Marketplace:
1. Filters start locked after finding offers
2. Click **Edit** to unlock
3. Modify values
4. Click **Update Offers** (3-second loading)
5. Filters lock again

### Loading States
- Finding offers: **3 seconds**
- Updating offers: **3 seconds**
- Creating link: **1.5 seconds**
- Regenerating link: **1 second**
- Submitting quote: **1.5 seconds**

## Image Placeholders

To add reference images:

1. Place images in `public` folder
2. Open `src/components/views/PrivateMarketplaceView.tsx`
3. Update constants:
   ```typescript
   const RATE_TABLE_REF_SRC = '/rate-table.png'
   const FILTERS_REF_SRC = '/filters.png'
   ```

## Troubleshooting

### Port Already in Use
```bash
# Kill process on port 5173
lsof -ti:5173 | xargs kill -9

# Or use different port
npm run dev -- --port 3000
```

### Reset Not Working
Hard refresh the browser: `Cmd+Shift+R` (Mac) or `Ctrl+Shift+R` (Windows/Linux)

### Modals Not Appearing
Check browser console for errors. Refresh the page and try again.

## Next Steps

1. **Demo to Stakeholders**: Show the complete flow highlighting cross-tab updates
2. **Add Reference Images**: Replace placeholder rectangles with actual wireframe images
3. **Customize Data**: Update Prefill values in `src/store/usePrototypeStore.ts`
4. **Adjust Timings**: Modify loading durations in store actions if needed

## Production Build

When ready to share:

```bash
npm run build
npm run preview
```

This creates an optimized build in `dist/` folder that can be hosted anywhere.

---

**Status: ✅ READY FOR DEMO**

The prototype is fully functional with all acceptance criteria met. Have fun demoing! 🎉
