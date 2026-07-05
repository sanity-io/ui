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

- `pnpm test` runs the unit tests with vitest (`packages/ui/vitest.config.ts`).
  The config aliases `@sanity/ui` to the `packages/ui/exports/` source, so unit
  tests run directly against source and do not require a `pnpm build` first.
- `pnpm dev` starts Storybook (`apps/storybook`) on http://localhost:6006. The
  Storybook Vite config aliases `@sanity/ui` to the `packages/ui/exports/`
  source, so it hot-reloads source edits directly (no rebuild needed).
- `pnpm test:browser` runs the Storybook tests (`apps/storybook`): vitest
  renders every story in headless Chromium via `@storybook/addon-vitest` and
  executes story `play` interactions, plus the browser tests in
  `apps/storybook/tests/` (see `apps/storybook/vitest.config.ts`). The
  Playwright-provided browser must be installed once via
  `pnpm --filter sanity-ui-storybook exec playwright install chromium`.
  Stories opt out of being tested with the `!test` tag.
- Releases are managed with Changesets: run `pnpm changeset` to add a changeset
  to a PR that should trigger a release. Merging to `main` opens/updates a
  "Version Packages" PR, and merging that publishes to npm via trusted
  publishing.
