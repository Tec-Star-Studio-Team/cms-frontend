# Verification Checklist (Manual Harness)

This project does not yet have automated tests. Until Vitest + React
Testing Library + MSW are added, every feature is verified manually
against this checklist before being considered done.

## Functional
- [ ] List page shows all existing records from the API.
- [ ] Creating a record persists it (visible in `db.json` / on refresh).
- [ ] Editing a record updates it and the list reflects the change without
      a manual page refresh.
- [ ] Deleting a record removes it after confirming the dialog, and does
      NOT remove it if the dialog is cancelled.
- [ ] Empty list shows a friendly empty state, not a blank table.

## Code Quality
- [ ] All code, comments, and strings are in English.
- [ ] The feature folder matches the structure defined in `CLAUDE.md`.
- [ ] Zod schema is the single source of truth for the form's type
      (`z.infer`, no duplicated hand-written interface).
- [ ] No `as X` type assertion is used on data coming from the API.

## Type Safety
- [ ] No unnecessary explicit generics passed to hooks that can infer them.
- [ ] No `any` in the new code.

## State Management
- [ ] Server data lives only in TanStack Query — not duplicated into
      `useState` or Context.
- [ ] Query keys use the project's key-factory pattern.
- [ ] Mutations invalidate the correct (not overly broad) query key.

## UX
- [ ] Loading state is visible during fetches.
- [ ] Error state is visible if a request fails.
- [ ] Form shows inline validation errors.
- [ ] Destructive actions require confirmation.

## Accessibility
- [ ] Every form input has an associated label.
- [ ] Interactive elements are real buttons/links, not `div`s with
      `onClick`.

---
Once Vitest + React Testing Library + MSW are added to the project, each
checked item above should be converted into an automated test.
