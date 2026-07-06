# AGENTS.md

## Cursor Cloud specific instructions

This is the `v2` maintenance branch of the `@sanity/ui` React component
library, structured as a pnpm monorepo: the published package lives in
`packages/ui`, the Figma plugin in `packages/figma`, and the Storybook app in
`apps/storybook` (`pnpm-workspace.yaml`). The root `package.json` is a private
workspace root whose scripts orchestrate via pnpm filters. Package manager is
pnpm (`packageManager` pin in `package.json`); developing in this repo requires
Node `>=22.13` (required by pnpm 11), while the published `@sanity/ui` package
supports Node `>=14` (see `packages/ui/package.json` engines).

Standard scripts live in the root `package.json` (`lint`, `test`, `build`,
`dev`). Notes that are not obvious from the scripts:

- Linting uses [oxlint](https://oxc.rs/docs/guide/usage/linter.html) with a
  root `.oxlintrc.json` (type-aware via `oxlint-tsgolint`). TypeScript type
  checking is included in `pnpm lint` via the `typeCheck` option — there is no
  separate `tsc`/`ts:check` command. Run `pnpm lint:fix` to auto-fix issues
  when possible. Suppressions use `oxlint-disable-next-line` comments.
- Formatting uses [oxfmt](https://oxc.rs/docs/guide/usage/formatter.html) with
  a root `.oxfmtrc.json`; run `pnpm format`.
- The published package is built with `@sanity/pkg-utils`
  (`packages/ui/package.config.ts`); `pnpm build` also type-checks the built
  packages with `tsc`.
- `pnpm test` runs the unit tests with vitest (`packages/ui/vitest.config.ts`).
  `@sanity/ui` is aliased to the `packages/ui/exports/` source, so unit tests
  run directly against source and do not require a `pnpm build` first.
- `pnpm dev` starts Storybook (`apps/storybook`) on http://localhost:6006. It
  resolves `@sanity/ui` to the `packages/ui` source, so it hot-reloads source
  edits directly (no rebuild needed).
- `pnpm test:browser` runs the Storybook tests (`apps/storybook`): vitest
  renders every story in headless Chromium via `@storybook/addon-vitest` and
  executes story `play` interactions, plus the browser tests in
  `apps/storybook/tests/` (see `apps/storybook/vitest.config.ts`). The
  Playwright-provided browser must be installed once via
  `pnpm --filter sanity-ui-storybook exec playwright install chromium`.
  Stories opt out of being tested with the `!test` tag.
- Releases are managed with Changesets: run `pnpm changeset` to add a changeset
  to a PR that should trigger a release. Merging to `v2` opens/updates a
  "Version Packages" PR, and merging that publishes `@sanity/ui` to npm under
  the `release-v2` dist-tag (the `latest` dist-tag belongs to the `main`
  branch).
