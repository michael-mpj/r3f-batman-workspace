# Workspace Conventions

This document defines how to place new workspaces and keep the monorepo predictable.

## Folder Roles

- `packages/`: reusable shared libraries used by apps/projects
- `projects/`: starter kits, demos, references, and exploratory work
- `apps/`: deployable end-user applications

## Placement Rule

When creating `newproject1` / `newproject2`, decide by intent:

- If it's a starter/template/reference → `projects/<name>`
- If it's a deployable app surface → `apps/<name>`

## Naming Guidance

- Use `kebab-case` for folder names
- Keep package `name` aligned with folder intent
- Prefer clear names that reflect purpose (`starterkit`, `dashboard-app`, `demo-physics`)

## Script Compatibility

Both `apps/*` and `projects/*` are included in workspace scripts. Keep each workspace providing at least:

- `dev`
- `build`
- `test` (if applicable)
- `lint`

This ensures root-level commands continue to work consistently.
