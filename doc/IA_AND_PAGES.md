# JobIQ Information Architecture and Page Specs

## Primary navigation

Dashboard, Discover, Saved Jobs, Applications, Interview Prep, Profile, Settings.

## App routes (Next.js)

- / (dashboard)
- /profile
- /preferences
- /saved-jobs
- /tracker
- /interview
- /settings

## Profile and CV Upload

- Purpose: Capture user data for personalization and build initial trust.
- Primary sections: Upload zone, profile summary, AI insights, missing skills, recommended roles.
- Key components: Upload card, profile strength bar, skill chips, edit profile, save changes.

## Preferences

- Purpose: Let users set salary, location, and work model in a structured way.
- Primary sections: Salary range, work model chips, preferred location, notice period.
- Key components: Glass inputs, chip toggles, save button, helper text.

## Dashboard (Recommendations)

- Purpose: Show the best matched jobs with clear reasoning and controls.
- Primary sections: Recommendation list, detail panel, AI analysis summary, feedback controls.
- Key components: Match score badge, verified label, why it matches, potential gaps, apply button.

## Saved Jobs and Comparison

- Purpose: Let users shortlist and compare up to three jobs side by side.
- Primary sections: Compare banner, comparison table, saved job cards.
- Key components: Compare tray, active comparison table, note fields, start comparison action.

## Application Tracker

- Purpose: Organize applications into stages and surface AI reminders.
- Primary sections: Applied, Screening, Interviewing, Offer columns.
- Key components: Stage cards, reminders, timeline badges, add application button.

## AI Interview Session

- Purpose: Provide practice with real time feedback and preparation checklist.
- Primary sections: Interview video area, question panel, feedback metrics, prep checklist.
- Key components: Confidence bar, clarity bar, keyword chips, answer input.

## Settings (shell)

- Purpose: Global controls for notifications, sources, and personalization resets.
- Primary sections: Notification toggles, data sources, scraping schedule, reset preferences.
- Key components: Toggle rows, dropdown schedule, danger zone actions.
