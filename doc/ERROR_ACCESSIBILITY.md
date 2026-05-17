# Error Handling and Accessibility

## Error states to design
- Invalid CV format: show supported formats and retry action.
- Unreadable CV text: offer manual profile entry.
- Missing preference fields: highlight required inputs.
- No results: suggest loosening filters and show reset.
- Low confidence job: label and request manual verification.
- Scraping failure: show last updated data and retry.
- Suspected ghost job: warn and suggest source verification.

## Error copy examples
- "We could not read this file. Please upload PDF or DOCX."
- "Text could not be extracted. You can fill your profile manually."
- "No jobs matched all filters. Try widening location or work model."
- "Low confidence: salary or work model missing. Verify before applying."

## Graceful degradation
- If AI analysis fails, show raw listing data and source links.
- If personalization fails, fall back to search and manual filters.
- If interview AI is unavailable, show checklist and static prompts.

## Accessibility checklist
- All controls are keyboard focusable and have visible focus rings.
- Use WCAG AA contrast for text, badges, and indicators.
- Provide aria labels for icons, badges, and status chips.
- Ensure tables and cards have readable headings and spacing.
- Support reduced motion for animated elements.
