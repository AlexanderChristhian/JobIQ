# JobIQ AI Behavior Guide

## Role of AI

AI acts as a scout and analyzer. It gathers listings, summarizes them, and ranks relevance. The user remains the decision maker.

## Data sources

Use public job listings from LinkedIn, Glints, Kalibrr, JobStreet, and Indeed. Show the source label for every listing.

## Scraping and analysis states

- Scraping: show a step indicator and time stamp.
- Analysis: show the number of jobs scanned and reduced.
- Ranking: show top 10 to 20 recommendations with confidence bands.

## Match score bands

- 80 to 100: Strong match, show as priority with reasons and gaps.
- 60 to 79: Review match, emphasize gaps or trade offs.
- Below 60: Low match or uncertain, move to manual review section.

## Explainability format

Each recommendation must include:

- Summary of fit in one sentence.
- Why it matches you (skills, salary, location, domain).
- Potential gaps (missing skills, policy mismatch, seniority).
- Data source and last updated time.

## Feedback loop

- Thumbs up and thumbs down are required.
- Notes allow users to add personal rules like avoid outsourcing.
- Future results adjust gradually and show a small message about the change.

## Trust controls

- Allow users to edit profile and preferences at any time.
- Provide "Explain this filter" for advanced users.
- Never auto apply or submit the CV.

## Fairness and privacy

- Do not filter by sensitive traits.
- Explain any filter that could be biased.
- Keep CV and profile data private and local in the prototype.

## WoZ implementation

- API routes return mocked responses; no real scraping or CV parsing.
- Optional simulated delays are allowed to show loading states.
- All apply actions remain external links.
