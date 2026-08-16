---
name: feature-workflow
description: Step-by-step process for building a new CRUD feature in this CMS project, from PRD to a verified, committed, and pushed implementation. Use whenever the developer asks to build a new feature or entity for the CMS.
---

# Feature Workflow

Follow these steps, in order, for any new feature request in this project.

1. **PRD** — Check if `docs/prd/<NNN>-<feature>.md` already exists. If not,
   create it using `docs/prd/TEMPLATE.md`.

2. **Feature Spec** — Check if `docs/specs/<NNN>-<feature>.md` already
   exists. If not, create it using `docs/specs/TEMPLATE.md`, using the
   existing `templates`/`apps` features as the reference architecture.

3. **Branch** — Make sure you are on a branch named `feature/NNN-<feature>`,
   created from the latest `main` (see `CLAUDE.md`'s Git Workflow rules).
   Never implement directly on `main`.

4. **Implementation** — Scaffold and implement the files exactly as listed
   in the Feature Spec's "File Structure" section, following every
   convention and anti-pattern listed in `CLAUDE.md`.

5. **Verification** — Walk through `docs/harness/verification-checklist.md`
   item by item and report the result of each one. Stop here if anything
   fails.

6. **Commit & Push** — Only if every checklist item passed: update
   `docs/features-log.md` to `Implemented`, commit with a `feat: ...`
   message, and push the feature branch to `origin`. Never commit, push, or
   merge into `main`.

7. **Summary** — Summarize what was built, confirm the branch was pushed,
   and remind the developer that opening and merging the Pull Request into
   `main` remains a manual step.