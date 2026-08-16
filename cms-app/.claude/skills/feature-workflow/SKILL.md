---
name: feature-workflow
description: Step-by-step process for building a new CRUD feature in this CMS project, from PRD to a verified implementation. Use whenever the developer asks to build a new feature or entity for the CMS.
---

# Feature Workflow

Follow these steps, in order, for any new feature request in this project.

1. **PRD** — Check if `docs/prd/<NNN>-<feature>.md` already exists. If not,
   create it using `docs/prd/TEMPLATE.md`, filling in the feature's goals,
   user stories, and functional requirements based on what the developer
   describes.

2. **Feature Spec** — Check if `docs/specs/<NNN>-<feature>.md` already
   exists. If not, create it using `docs/specs/TEMPLATE.md`. Use the
   existing `templates` and `apps` features in `src/features/` as the
   reference architecture for the data model, file structure, and state
   management approach.

3. **Implementation** — Scaffold and implement the files exactly as listed
   in the Feature Spec's "File Structure" section, following every
   convention and anti-pattern listed in `CLAUDE.md`.

4. **Verification** — Walk through `docs/harness/verification-checklist.md`
   item by item and report the result of each one back to the developer.

5. **Summary** — Summarize what was built, list any open questions, and
   point out anything from the PRD that was deliberately left out of
   scope.
   