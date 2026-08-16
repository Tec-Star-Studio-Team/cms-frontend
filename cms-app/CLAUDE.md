# CLAUDE.md

This file defines the working rules for any Claude-based assistant (Claude
Code, Cowork, etc.) operating on this repository.

## Project Overview

A small CMS admin panel: authentication (mocked), a collapsible sidebar
layout, and full CRUD for multiple entities (Templates, Apps, Projects, ...).
Data is served by `json-server` against `db.json`.

## Tech Stack

- React 19 + TypeScript, built with Vite
- MUI (Material UI) for components and theming
- React Router for navigation
- `react-hook-form` + `zod` (via `@hookform/resolvers/zod`) for forms
- TanStack Query for all server state (fetching, caching, mutations)
- Context API + `useReducer` for auth/session state
- `json-server` as the mock REST API
- `oxlint` as the linter

## Architecture: Feature Folder Structure

Every entity/domain lives under `src/features/<domain>/` and follows this
exact shape (mirror the existing `templates` and `apps` features):

src/features/<domain>/
types.ts # Entity type(s)
<domain>Schema.ts # Zod schema + z.infer form-values type
<domain>Api.ts # CRUD functions calling json-server
<domain>Queries.ts # TanStack Query hooks + query-key factory
<Domain>Form.tsx # react-hook-form + zodResolver
<Domain>ListPage.tsx
<Domain>CreatePage.tsx
<Domain>EditPage.tsx

Shared, cross-feature building blocks (layout, `ConfirmDialog`,
`ErrorBoundary`, auth) live in `src/components/` and `src/features/auth/`.

## Coding Conventions

- All code, comments, identifiers, and user-facing strings/error messages
  are written in **English**, regardless of what language the conversation
  with the developer happens in.
- Prefer `interface` for props/object shapes; use `type` for unions and
  derived/computed types.
- Zod schema is the single source of truth for a form's shape. Derive the
  TypeScript type with `z.infer<typeof schema>` — never hand-maintain a
  parallel `interface` for form values.
- Use `register()` from react-hook-form for native inputs. Use `Controller`
  for any component that needs a real controlled `value` prop (e.g. MUI's
  `Select`).
- Use the `@/` path alias for cross-feature imports; use relative paths
  (`./`, `../`) within the same feature folder.
- Every list of entities uses a query-key factory (see `templateKeys` /
  `appKeys` for the pattern) — never inline raw array literals as query keys.
- Destructive actions (delete) always go through `ConfirmDialog`, never
  `window.confirm`.

## State Management Rules

1. Data that comes from the API → TanStack Query. Never duplicate it into
   `useState` or Context.
2. State used by a single component → local `useState` (or `useReducer` if
   the transitions are non-trivial).
3. State read broadly across the tree and changing infrequently (auth,
   theme) → Context, paired with `useReducer` if transitions are non-trivial.

## Anti-Patterns to Avoid

- Defining a component inside another component's render body.
- Using array index as `key` in a reorderable/filterable list.
- Deriving state from props via `useEffect` instead of computing it inline.
- Missing `AbortController` cleanup on data-fetching effects (when not using
  TanStack Query's built-in `signal`).
- Type-asserting (`as X`) untrusted data instead of parsing it with Zod.
- Storing server data in Context or `useState`.
- Over-broad `invalidateQueries` calls when a precise key is available.

## Feature Workflow

For every new feature, follow this process (see the `feature-workflow`
skill under `.claude/skills/` for the full step-by-step):

1. Write or read the PRD in `docs/prd/`.
2. Write or read the Feature Spec in `docs/specs/`.
3. Implement following the architecture and conventions above.
4. Verify against `docs/harness/verification-checklist.md`, then update
   the feature's status in `docs/features-log.md` before considering the
   feature done.

## Working Style

- The developer is learning React/TypeScript for job interviews. Explain
  the reasoning behind non-trivial decisions, not just the code.
- Do not run, build, or test the project inside your own sandbox unless
  explicitly asked — the developer builds and runs it themselves.
  