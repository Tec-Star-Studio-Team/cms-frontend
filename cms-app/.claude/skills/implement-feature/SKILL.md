---
name: implement-feature
description: Implement a CRUD feature by name or slug (e.g. "001-projects" or "projects"), following this project's PRD → Spec → Implementation → Verification → Commit/Push workflow. Use when the developer asks to implement, build, or finish a specific feature by name.
---

# Implement Feature

You will receive a feature name or slug as an argument (e.g. `001-projects`
or `projects`).

1. Find the PRD matching `docs/prd/*<name>*.md` and the Spec matching
   `docs/specs/*<name>*.md`. If either file doesn't exist, stop and ask the
   developer to create it first — never invent requirements from scratch.
2. Confirm the current branch follows `feature/NNN-<feature>` (per
   `CLAUDE.md`'s Git Workflow rules), created from the latest `main`. If
   not on the correct branch yet, create it:
```bash
   git checkout main
   git pull origin main
   git checkout -b feature/NNN-<feature>
```
3. Implement the feature exactly as described in the Spec, following every
   convention listed in `CLAUDE.md`.
4. Walk through `docs/harness/verification-checklist.md` and report the
   result of every item. If any item fails, stop here — do not commit.
5. Only if every checklist item passes:
   - Update the feature's row in `docs/features-log.md` to `Implemented`.
   - Commit: `git add .` then `git commit -m "feat: implement <feature>"`.
   - Push: `git push -u origin feature/NNN-<feature>`.
6. Summarize what changed, confirm the branch was pushed, and remind the
   developer that opening and merging the Pull Request into `main` is a
   manual step this workflow never does automatically.