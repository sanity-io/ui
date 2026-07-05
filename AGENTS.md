# AGENTS.md

## Cursor Cloud specific instructions

This is the `@sanity/ui` React component library, structured as a pnpm monorepo:
the published package lives in `packages/ui`, the Figma plugin in
`packages/figma`, and the Storybook app in `apps/storybook`
(`pnpm-workspace.yaml`). The root `package.json` is a private workspace root
whose scripts orchestrate via pnpm filters. Package manager is pnpm
(`packageManager` pin in `package.json`); developing in this repo requires Node
`>=22.13` (required by pnpm 11), while the published `@sanity/ui` package
supports `>=20.19 <22 || >=22.12` (see `packages/ui/package.json` engines).

Standard scripts live in the root `package.json` (`lint`, `ts:check`, `test`,
`build`, `dev`). Notes that are not obvious from the scripts:

- Tests require a built package first. `pnpm test` (jest) resolves `@sanity/ui`
  and `@sanity/ui/theme` from `packages/ui/dist` (via package `exports`), so you
  must run `pnpm build` at least once before `pnpm test` or every suite fails
  with "Cannot find module '@sanity/ui'". Re-run `pnpm build` after changing
  source that tests import through the package entrypoints.
- `pnpm dev` starts Storybook (`apps/storybook`) on http://localhost:6006. The
  Storybook Vite config aliases `@sanity/ui` to the `packages/ui/exports/`
  source, so it hot-reloads source edits directly (no rebuild needed). Only jest
  depends on `dist`.
- Cypress end-to-end tests run against the built Storybook: `pnpm test:browser`
  builds Storybook, serves it on http://localhost:6006 (`pnpm storybook:start`),
  and runs `cypress run`. The specs visit stories via
  `/iframe.html?id=<story-id>` URLs, so renaming stories referenced by
  `cy.visit()` breaks them.
- Releases are managed with Changesets: run `pnpm changeset` to add a changeset
  to a PR that should trigger a release. Merging to `main` opens/updates a
  "Version Packages" PR, and merging that publishes to npm via trusted
  publishing.
