# AGENTS.md

## Cursor Cloud specific instructions

This is the `@sanity/ui` React component library, structured as a pnpm monorepo:
the published package lives in `packages/ui` and the Figma plugin in
`packages/figma` (`pnpm-workspace.yaml`). The root `package.json` is a private
workspace root whose scripts orchestrate via pnpm filters. Package manager is
pnpm (`packageManager` pin in `package.json`); Node must satisfy
`>=20.19 <22 || >=22.12`.

Standard scripts live in the root `package.json` (`lint`, `ts:check`, `test`,
`build`, `dev`) and forward to `packages/ui`. Notes that are not obvious from
the scripts:

- Tests require a built package first. `pnpm test` (jest) resolves `@sanity/ui`
  and `@sanity/ui/theme` from `packages/ui/dist` (via package `exports`), so you
  must run `pnpm build` at least once before `pnpm test` or every suite fails
  with "Cannot find module '@sanity/ui'". Re-run `pnpm build` after changing
  source that tests import through the package entrypoints.
- `pnpm dev` runs two servers in parallel (`run-p storybook:dev workshop:dev` in
  `packages/ui`): Storybook on http://localhost:6006 and the Workshop on
  http://localhost:1337. The Workshop is Vite-based and aliases `@sanity/ui` to
  the `packages/ui/exports/` source, so it hot-reloads source edits directly (no
  rebuild needed); Storybook likewise reads source. Only jest depends on `dist`.
- The Workshop's first component render can show a long loading spinner while
  Vite optimizes deps on demand; it is warm after the first load. This is
  expected, not a failure.
- Releases are managed with Changesets: run `pnpm changeset` to add a changeset
  to a PR that should trigger a release. Merging to `main` opens/updates a
  "Version Packages" PR, and merging that publishes to npm via trusted
  publishing.
