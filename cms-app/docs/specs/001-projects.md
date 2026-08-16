# Feature Spec: Projects

## Related PRD
docs/prd/001-projects.md

## Data Model
```ts
export interface Project {
  id: string
  name: string
}
```

## API (json-server)
Add a `"projects": []` array to `db.json`. json-server auto-generates:
- `GET /projects`
- `GET /projects/:id`
- `POST /projects`
- `PUT /projects/:id`
- `DELETE /projects/:id`

## File Structure
src/features/projects/
types.ts # Project interface
projectSchema.ts # Zod schema + ProjectFormValues = z.infer<...>
projectsApi.ts # listProjects, getProject, createProject,
# updateProject, removeProject
projectQueries.ts # projectKeys factory + useProjectsQuery,
# useProjectQuery, useCreateProject,
# useUpdateProject, useRemoveProject
ProjectForm.tsx # react-hook-form + zodResolver(projectSchema)
ProjectsListPage.tsx
ProjectCreatePage.tsx
ProjectEditPage.tsx

## Component Breakdown
- `ProjectsListPage`: table with `name` column and a "Delete" action per
  row (wrapped in `ConfirmDialog`), plus an "Add Project" button navigating
  to `/projects/new`.
- `ProjectForm`: shared by create and edit pages. Single `name` text field,
  `register("name")`, inline error from `formState.errors.name`.
- `ProjectCreatePage` / `ProjectEditPage`: thin wrappers that call
  `useCreateProject` / `useUpdateProject` and navigate back to `/projects`
  on success (`onSuccess` in the mutation).

## State Management
- `projectKeys = { all: ["projects"], list: () => [...all, "list"],
  detail: (id) => [...all, "detail", id] }`.
- `useProjectsQuery` uses `useQuery({ queryKey: projectKeys.list(), queryFn
  })`.
- Mutations call `queryClient.invalidateQueries({ queryKey:
  projectKeys.all })` in `onSuccess`.
- No Context, no local duplication of server data — same pattern as
  Templates.

## Validation
```ts
export const projectSchema = z.object({
  name: z.string().min(1, "Name is required"),
})
export type ProjectFormValues = z.infer<typeof projectSchema>
```

## Edge Cases & Error Handling
- Empty list: show a simple "No projects yet" message instead of an empty
  table.
- Loading state: show a spinner (or MUI skeleton) while `isLoading` is
  true.
- Error state: show an error message using `isError` / `error` from
  `useQuery`, consistent with how Templates handles it.
- Delete: always confirm via `ConfirmDialog` before calling
  `useRemoveProject`.

## Routing
Add to `App.tsx`:
```tsx
<Route path="/projects" element={<ProjectsListPage />} />
<Route path="/projects/new" element={<ProjectCreatePage />} />
<Route path="/projects/:id/edit" element={<ProjectEditPage />} />
```
Add a "Projects" entry to `NAV_ITEMS` in `Sidebar.tsx` (suggested icon:
`FolderIcon` from `@mui/icons-material`).

## Verification
See `docs/harness/verification-checklist.md`.
