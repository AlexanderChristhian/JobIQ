# JobIQ Build Rules

## Purpose
Build a desktop-first web UI for JobIQ, an AI-assisted job discovery product that reduces job search fatigue. The UI must emphasize human control, transparency, and safe decision making.

## Non negotiables
- AI is a scout and assistant, not a decision maker.
- The user must always choose whether to apply.
- Every recommendation must explain why it appears.
- Show confidence and uncertainty, not just a score.
- Show data source labels for each job.
- Provide manual override for filters and ranking.
- Handle missing data and low confidence with explicit warnings.
- Protect user privacy; treat CV and profile data as sensitive.

## Personas to design for
- Andi: fresh graduate, over-trusts AI. Needs clear warnings, verification prompts, and safe defaults.
- Siti: senior engineer, under-trusts AI. Needs traceable reasoning, sources, and control.

## UX requirements
- Show a visible progress indicator for scraping and analysis.
- Provide "Why it matches" and "Potential gaps" sections.
- Support efficient dismissal and correction without resetting filters.
- Keep the dashboard clean and low distraction.

## Visual style guardrails
- Dark glassmorphism with layered gradients and soft glows.
- Use Manrope as primary UI font and Space Grotesk for display accents.
- Use a consistent token set for colors, radius, and shadows.
- Favor large, readable type and clear hierarchy.

## Content tone
- Supportive, neutral, and clear.
- Avoid shaming, pressure, or absolute claims.
- Avoid over-promising AI accuracy.

## Accessibility
- Maintain WCAG AA contrast for text and critical indicators.
- All interactive elements must be keyboard reachable with visible focus states.
- Provide accessible labels for icons, badges, and controls.

## Build constraints
- Use the Frontend_Reference as the visual baseline.
- Match the Frontend_Reference output 1:1; only adapt markup for React and Next.js integration.
- Desktop first, then make the layout responsive for tablet and mobile.
- Keep layouts and components reusable across pages.
