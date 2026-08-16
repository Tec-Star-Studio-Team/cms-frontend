# PRD: Projects

## Status
Approved

## Summary
Add a "Projects" entity to the CMS with full CRUD (Create, Read, Update,
Delete), following the same simplicity level as the existing Templates
feature.

## Problem / Motivation
The CMS currently manages Templates and Apps, but there is no way to group
or catalog Projects, which is a basic organizational unit administrators
need to register before linking other entities to them in the future.

## Goals
- Allow an authenticated admin to create, list, edit, and delete Projects.
- Keep the data model minimal for this first version: `id` and `name` only.

## Non-Goals
- Linking Projects to Templates or Apps (no foreign key in this version).
- Pagination, search, or filtering on the Projects list.
- Bulk actions (bulk delete, bulk edit).

## User Stories
- As an admin, I want to see a list of all Projects, so that I can review
  what has been registered.
- As an admin, I want to create a new Project by giving it a name, so that
  I can register it in the system.
- As an admin, I want to edit a Project's name, so that I can correct
  typos or rename it.
- As an admin, I want to delete a Project (with confirmation), so that I
  can remove ones that are no longer needed.

## Functional Requirements
1. A "Projects" item is added to the sidebar navigation.
2. `/projects` lists all Projects in a table (`name` column).
3. `/projects/new` renders a form to create a Project (`name`, required).
4. `/projects/:id/edit` renders the same form pre-filled, to update the
   Project.
5. Deleting a Project requires confirmation via a dialog before the
   request is sent.
6. All list/create/edit/delete operations reflect immediately in the UI
   after a successful request (no manual refresh needed).

## Non-Functional Requirements
- `name` must be validated as required (non-empty) on the client before
  submission.
- Loading and error states must be visible to the user during data
  fetching and mutations.

## Out of Scope
- Any relationship between Projects and other entities.
- Server-side validation rules beyond what `json-server` provides by
  default.

## Open Questions
- None for this first version.
