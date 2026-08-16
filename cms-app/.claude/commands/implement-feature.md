---
description: Implement a CRUD feature by name, following PRD → Spec → Implementation → Verification, and mark it as completed when done.
argument-hint: <feature-name>
---

Implement the feature identified by: $ARGUMENTS

Follow the `feature-workflow` skill (`.claude/skills/feature-workflow/SKILL.md`):

1. Find the PRD matching `docs/prd/*-$ARGUMENTS.md` and the Spec matching
   `docs/specs/*-$ARGUMENTS.md`. If either file doesn't exist, stop and ask
   the developer to create it first — never invent requirements from
   scratch.
2. Implement the feature exactly as described in the Spec, following every
   convention listed in `CLAUDE.md`.
3. Walk through `docs/harness/verification-checklist.md` and report the
   result of every item.
4. Only if every checklist item passes:
   - Update the feature's row in `docs/features-log.md` to `Implemented`.
5. Summarize what changed and flag anything left open or that needs the
   developer's decision.
