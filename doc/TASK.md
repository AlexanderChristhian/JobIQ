# JobIQ Build Tasks

## Goal
Produce a high fidelity Next.js front end for JobIQ based on the provided references and context. Focus on UI, interactions, and believable AI outputs with mocked data.

## Scope pages
1. Dashboard with recommendations and detail view
2. Profile and CV Upload
3. Preferences
4. Saved Jobs with comparison
5. Application Tracker
6. AI Interview Session
7. Settings shell (basic layout)

## Route map
- / (dashboard)
- /profile
- /preferences
- /saved-jobs
- /tracker
- /interview
- /settings

## Build order
1. Scaffold Next.js app (App Router) with Tailwind and TypeScript.
2. Create global styles and design tokens to match Frontend_Reference.
3. Build base layout, navigation, and page shell.
4. Build reusable components.
5. Assemble each route using the reference markup.
6. Add mock API routes and JSON fixtures.
7. Add empty states, error states, and loading states.
8. Add accessibility and keyboard focus polish.
9. Validate visual parity with Frontend_Reference.

## Component checklist
- Glass panel and glass card
- Navigation top bar and side rail
- Search input with icon
- Job card with match score and status
- Match score badge and confidence indicator
- "Why it matches" and "Potential gaps" blocks
- Save, compare, apply buttons
- Feedback controls (thumbs up, thumbs down, notes)
- Tracker column and card
- Interview feedback gauges and checklist
- Notification and risk labels

## Interaction checklist
- Filter and sort controls update the list.
- Saving a job adds it to Saved Jobs and compare tray.
- Compare tray supports up to 3 jobs.
- Dismissed items are hidden but retrievable.
- Feedback updates next cycle messaging.
- Apply buttons always open external link.

## Data checklist
- Seed data for jobs, companies, and user profile.
- Match reasoning fields for each recommendation.
- Risk flags for ghost job or low confidence.
- Tracker items with stages and reminders.
- JSON fixtures and TypeScript types for API routes.

## Done when
- All routes render without broken layouts.
- Mock API routes respond with valid JSON.
- Text is readable and contrast compliant.
- States for loading, empty, and error exist.
- Interactions feel coherent and do not fake auto-apply.
- Visual output matches Frontend_Reference.
