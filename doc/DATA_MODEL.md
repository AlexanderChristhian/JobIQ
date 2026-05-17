# JobIQ Data Model

## UserProfile
Fields: id, name, title, location, experienceYears, skills, resumeFileName, profileStrength, missingSkills.

## Preferences
Fields: salaryMin, salaryMax, workModel, preferredLocations, noticePeriod, sourcePlatforms.

## JobListing
Fields: id, title, company, location, workModel, salaryRange, seniority, techStack, source, postedAt, verified, riskFlags.

## MatchReasoning
Fields: matchScore, confidenceBand, whyMatches, potentialGaps, extractedAttributes, summary.

## SavedJob
Fields: jobId, savedAt, personalNotes, compareSlot.

## TrackerItem
Fields: jobId, stage, lastUpdated, reminders, actionRequired, stageNotes.

## InterviewSession
Fields: jobId, question, confidenceScore, clarityScore, keywordsDetected, checklist.

## Feedback
Fields: jobId, thumbsUp, thumbsDown, notes, dismissed.

## Mock storage
- JSON fixtures live in src/data.
- Type definitions live in src/lib/types.

## Example object
```json
{
  "jobId": "job_1024",
  "title": "Senior Product Designer",
  "company": "TechFlow",
  "location": "San Francisco, CA",
  "workModel": "Hybrid",
  "salaryRange": "$140k-$180k",
  "source": "LinkedIn",
  "matchScore": 92,
  "confidenceBand": "high",
  "whyMatches": ["Figma", "Design systems", "Fintech domain"],
  "potentialGaps": ["Hybrid 3 days office"],
  "riskFlags": ["verify-remote-policy"]
}
```
