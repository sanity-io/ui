# AGENTS.md

## Cursor Cloud specific instructions

This is the `v2` maintenance branch of the `@sanity/ui` React component
library, structured as a pnpm monorepo: the published package lives in
`packages/ui`, the Figma plugin in `packages/figma`, and the Storybook app in
`apps/storybook` (`pnpm-workspace.yaml`). The root `package.json` is a private
workspace root whose scripts orchestrate via pnpm filters. Package manager is
pnpm (`packageManager` pin in `package.json`).

Standard scripts live in the root `package.json` (`lint`, `ts:check`, `test`,
`build`, `dev`) and forward to the workspace packages. Notes that are not
obvious from the scripts:

- Tests require a built package first. `pnpm test` (jest) resolves `@sanity/ui`
  and `@sanity/ui/theme` from `packages/ui/dist` (via package `exports`), so you
  must run `pnpm build` at least once before `pnpm test` or every suite fails
  with "Cannot find module '@sanity/ui'". Re-run `pnpm build` after changing
  source that tests import through the package entrypoints.
- `pnpm dev` runs two servers in parallel: Storybook (`apps/storybook`) on
  http://localhost:6006 and the Workshop (`packages/ui`) on
  http://localhost:1337. Both are Vite-based and resolve `@sanity/ui` to the
  `packages/ui` source, so they hot-reload source edits directly (no rebuild
  needed); only jest depends on `dist`.
- The Workshop's first component render can show a long loading spinner while
  Vite optimizes deps on demand; it is warm after the first load. This is
  expected, not a failure.
- `pnpm test:browser` builds the Workshop and runs the Cypress e2e suite
  against http://localhost:1337.
- Releases are automated with semantic-release: commit messages must follow
  Conventional Commits (enforced via commitlint), and pushes to the `v2`
  branch publish `@sanity/ui` to npm from `packages/ui`.
