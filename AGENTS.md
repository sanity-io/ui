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

- `pnpm test` runs the unit tests with vitest (`packages/ui/vitest.config.ts`).
  `@sanity/ui` is aliased to the `packages/ui/exports/` source, so unit tests
  run directly against source and do not require a `pnpm build` first.
- `pnpm dev` runs two servers in parallel: Storybook (`apps/storybook`) on
  http://localhost:6006 and the Workshop (`packages/ui`) on
  http://localhost:1337. Both are Vite-based and resolve `@sanity/ui` to the
  `packages/ui` source, so they hot-reload source edits directly (no rebuild
  needed).
- The Workshop's first component render can show a long loading spinner while
  Vite optimizes deps on demand; it is warm after the first load. This is
  expected, not a failure.
- `pnpm test:browser` runs the Storybook tests (`apps/storybook`): vitest
  renders every story in headless Chromium via `@storybook/addon-vitest` and
  executes story `play` interactions, plus the browser tests in
  `apps/storybook/tests/` (see `apps/storybook/vitest.config.ts`). The
  Playwright-provided browser must be installed once via
  `pnpm --filter sanity-ui-storybook exec playwright install chromium`.
  Stories opt out of being tested with the `!test` tag.
- Releases are automated with semantic-release: commit messages must follow
  Conventional Commits (enforced via commitlint), and pushes to the `v2`
  branch publish `@sanity/ui` to npm from `packages/ui`.
