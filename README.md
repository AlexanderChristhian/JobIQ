# JobIQ

## Prerequisites

- Node.js 18+ (recommended: 22.x)
- pnpm or npm

## Install & Run

```bash
# Move to the project directory
cd "src"

# Install dependencies (choose one)
pnpm install
# or
npm install

# Start development server
pnpm dev
# or
npm run dev
```

Open http://localhost:3000

## AI Setup

The app now uses server-side AI endpoints for recommendations, interview feedback, and tracker suggestions. Without an API key it falls back to local mock AI so the prototype still works.

Create `src/.env.local`:

```bash
OPENAI_API_KEY=your_api_key_here
OPENAI_MODEL=gpt-4o-mini
```

`OPENAI_MODEL` is optional. The default is `gpt-4o-mini`.

## Production Build

```bash
pnpm build
pnpm start
```

## Lint

```bash
pnpm lint
```

## Project Structure

```
src/
├── app/
│   ├── globals.css              # Tailwind v4 + glassmorphism design tokens
│   ├── layout.tsx               # Root layout (Manrope font, metadata)
│   ├── page.tsx                 # Dashboard (/) - sidebar nav + job list + detail panel
│   ├── profile/page.tsx         # Profile & CV Upload
│   ├── preferences/page.tsx     # Manual Preferences form
│   ├── saved-jobs/page.tsx      # Saved Jobs with comparison table
│   ├── tracker/page.tsx         # Application Tracker (Kanban)
│   ├── interview/page.tsx       # AI Interview Session
│   ├── settings/page.tsx        # Settings shell
│   └── api/                     # Mock API routes (WoZ)
│       ├── recommendations/route.ts
│       ├── profile/route.ts
│       ├── preferences/route.ts
│       ├── saved-jobs/route.ts
│       ├── tracker/route.ts
│       └── interview/route.ts
├── data/                        # JSON fixture data
├── lib/types.ts                 # TypeScript type definitions
├── next.config.ts
├── tsconfig.json
├── postcss.config.js
└── package.json
```

## Routes

| Path           | Page                 |
| -------------- | -------------------- |
| `/`            | Dashboard            |
| `/profile`     | Profile & CV Upload  |
| `/preferences` | Preferences          |
| `/saved-jobs`  | Saved Jobs + Compare |
| `/tracker`     | Application Tracker  |
| `/interview`   | AI Interview Session |
| `/settings`    | Settings             |

## Tech Stack

- **Next.js** (App Router) + TypeScript
- **Tailwind CSS v4** with custom design tokens
- **Manrope** (UI font) via next/font
- **Material Symbols Outlined** icons
- Mock API routes with JSON fixtures (Wizard of Oz)

## How to Use

| Mode               | Command              | Behavior                                     |
| :----------------- | :------------------- | :------------------------------------------- |
| **Normal dev**     | `npm run dev`        | No Socket.IO server, all pages use mock data |
| **Wizard testing** | `npm run dev:wizard` | Starts custom server with Socket.IO          |

When using dev:wizard:

1. Open http://localhost:3000 in one browser (the user)
2. Open http://localhost:3000/wizard in another browser/tab (the wizard)
3. User actions appear in the wizard dashboard in real-time
4. Wizard responds using buttons/sliders/text fields
5. User sees the wizard's responses appear in real-time

## Wizard of Oz Testing Guide

Wizard of Oz (WoZ) testing lets a human operator simulate AI responses in real-time. The user interacts with the app normally while a "wizard" controls what the AI sends back.

### Setup

1. Start the wizard-enabled server:
   ```bash
   cd src
   npm run dev:wizard
   ```
2. Open **http://localhost:3000** in one browser — this is the **user** view
3. Open **http://localhost:3000/wizard** in another browser/tab — this is the **wizard** control panel
   Both tabs share a Socket.IO connection. The user's actions appear on the wizard dashboard, and the wizard's responses are pushed back to the user in real-time.
   > **Fallback:** When no wizard is connected (or running `npm run dev`), all pages fall back to their original mock data behavior — random interview scores, static JSON fixtures, etc. The app works normally without a wizard.

### Interview Flow

Test the AI interview feedback system with human-controlled responses.
**User side (`/interview`):**

1. Type an answer to the displayed interview question
2. Click **"Analyze Answer"**
3. A loading spinner appears: _"Analyzing your answer... (Wizard processing)"_
4. When the wizard responds, feedback bars and an AI suggestion appear
   **Wizard side (`/wizard` → Interview tab):**
5. The user's answer appears in the **Incoming Answers** panel on the left
6. Click an answer to view it in detail
7. Adjust the **4 feedback sliders**: Clarity, Relevance, Confidence, Structure (0–100%)
8. Write or edit the **AI Suggestion** text
9. Click **"Send Feedback to User"**
10. The button confirms: _"Feedback Sent!"_
    **Without wizard:** The interview page falls back to random score generation with a hardcoded suggestion.

### Tracker Flow

Test AI-generated suggestions on application tracker cards.
**User side (`/tracker`):**

1. Click any application card to expand it
2. Click **"Get AI Suggestion"** (or "Get New Suggestion" if one already exists)
3. A loading spinner appears: _"Waiting for AI suggestion..."_
4. When the wizard responds, the suggestion text appears on the card
   **Wizard side (`/wizard` → Tracker tab):**
5. The request appears in the left panel with the card's **title, company, and stage**
6. Click a request to select it
7. Either:
   - Click a **quick template** button (e.g., _"Send a follow-up email..."_) to auto-fill the suggestion, or
   - Write a **custom suggestion** in the text area
8. Click **"Send Suggestion"**
   **Without wizard:** Clicking "Get AI Suggestion" falls back to a random suggestion from a built-in list.

### Recommendations Flow

Test AI-curated job recommendations.
**User side (`/` — Dashboard):**

1. When a wizard is connected, the page automatically requests recommendations
2. Skeleton loading cards appear while waiting
3. When the wizard sends jobs, they replace the skeletons
   **Wizard side (`/wizard` → Recommendations tab):**
4. A request appears in the log
5. Click **"Add Job Card"** to create a new job recommendation
6. Fill in the job details: title, company, location, salary, seniority, work model, match score, confidence band, tech stack, description, and AI summary
7. Click **"Send N Recommendations to User"**
8. The button confirms: _"Recommendations Sent!"_
   **Without wizard:** The dashboard falls back to loading the static job list from `recommendations.json`.
