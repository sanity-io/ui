# AGENTS.md

## Cursor Cloud specific instructions

`@sanity/ui` is a React component library published as `@sanity/ui`. It is a pnpm
workspace: the root package plus a `figma` package (`pnpm-workspace.yaml`).
Package manager is pnpm (`packageManager` pin in `package.json`); Node must satisfy
`>=20.19 <22 || >=22.12`.

Standard scripts live in `package.json` (`lint`, `ts:check`, `test`, `build`, `dev`).
Notes that are not obvious from the scripts:

- Tests require a built package first. `pnpm test` (jest) resolves `@sanity/ui` and
  `@sanity/ui/theme` from `./dist` (via package `exports`), so you must run
  `pnpm build` at least once before `pnpm test` or every suite fails with
  "Cannot find module '@sanity/ui'". Re-run `pnpm build` after changing source that
  tests import through the package entrypoints.
- `pnpm dev` runs two servers in parallel (`run-p storybook:dev workshop:dev`):
  Storybook on http://localhost:6006 and the Workshop on http://localhost:1337.
  The Workshop is Vite-based and aliases `@sanity/ui` to the `exports/` source, so
  it hot-reloads source edits directly (no rebuild needed); Storybook likewise reads
  source. Only jest depends on `dist`.
- The Workshop's first component render can show a long loading spinner while Vite
  optimizes deps on demand; it is warm after the first load. This is expected, not a
  failure.
- Commits are linted by a husky `commit-msg` hook running commitlint
  (conventional-commits). Use conventional commit messages (e.g. `chore: ...`,
  `fix: ...`).
