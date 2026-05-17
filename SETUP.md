# JobIQ Setup Guide

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

| Path            | Page                   |
|-----------------|------------------------|
| `/`             | Dashboard              |
| `/profile`      | Profile & CV Upload    |
| `/preferences`  | Preferences            |
| `/saved-jobs`   | Saved Jobs + Compare   |
| `/tracker`      | Application Tracker    |
| `/interview`    | AI Interview Session   |
| `/settings`     | Settings               |

## Tech Stack

- **Next.js** (App Router) + TypeScript
- **Tailwind CSS v4** with custom design tokens
- **Manrope** (UI font) via next/font
- **Material Symbols Outlined** icons
- Mock API routes with JSON fixtures (Wizard of Oz)
