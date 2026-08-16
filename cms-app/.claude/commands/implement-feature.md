---
description: Implement a CRUD feature by name, following PRD → Spec → Implementation → Verification, then commit and push it to its feature branch.
argument-hint: <feature-name>
---

Implement the feature identified by: $ARGUMENTS

Follow the `implement-feature` skill (`.claude/skills/implement-feature/SKILL.md`):

1. Find the PRD matching `docs/prd/*-$ARGUMENTS.md` and the Spec matching
   `docs/specs/*-$ARGUMENTS.md`. If either file doesn't exist, stop and ask
   the developer to create it first — never invent requirements from
   scratch.
2. Confirm the current branch follows `feature/NNN-$ARGUMENTS` (per
   `CLAUDE.md`'s Git Workflow rules). If not on the correct branch yet:

```bash
   git checkout main
   git pull origin main
   git checkout -b feature/NNN-$ARGUMENTS
```

Never create the branch from anything other than the latest `main`. 3. Implement the feature exactly as described in the Spec, following every
convention listed in `CLAUDE.md`. 4. Walk through `docs/harness/verification-checklist.md` and report the
result of every item. If any item fails, stop here — do not commit. 5. Only if every checklist item passes:

- Update the feature's row in `docs/features-log.md` to `Implemented`.
- Stage and commit:

```bash
     git add .
     git commit -m "feat: implement $ARGUMENTS"
```

- Push the feature branch:

```bash
     git push -u origin feature/NNN-$ARGUMENTS
```

6. Summarize what changed, confirm the branch was pushed, and remind the
   developer that opening and merging the Pull Request into `main` is a
   manual step — this command never does that on its own.
