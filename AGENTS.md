# AGENTS.md

## Cursor Cloud specific instructions

This is the `@sanity/ui` React component library, structured as a pnpm monorepo:
the published package lives in `packages/ui`, the Figma plugin in
`packages/figma`, the Storybook app in `apps/storybook`, and the
sanity.io/ui docs site (a Next.js app with an embedded Sanity Studio) in
`apps/docs` (`pnpm-workspace.yaml`). The root `package.json` is a private
workspace root whose scripts orchestrate via pnpm filters. Package manager is pnpm
(`packageManager` pin in `package.json`); developing in this repo requires Node
`>=22.13` (required by pnpm 11), while the published `@sanity/ui` package
supports `>=20.19 <22 || >=22.12` (see `packages/ui/package.json` engines).

Standard scripts live in the root `package.json` (`lint`, `test`, `build`,
`dev`). Notes that are not obvious from the scripts:

- Linting uses [oxlint](https://oxc.rs/docs/guide/usage/linter.html) with a
  root `.oxlintrc.json` (type-aware via `oxlint-tsgolint`). TypeScript type
  checking is included in `pnpm lint` via the `typeCheck` option — there is no
  separate `tsc`/`ts:check` command. Run `pnpm lint:fix` to auto-fix issues
  when possible. Suppressions use `oxlint-disable-next-line` comments.
- Packages are built with [tsdown](https://tsdown.dev) via
  `@sanity/tsdown-config` (`tsdown.config.mts` in each package — the `.mts`
  extension is required because these packages are not `"type": "module"` and
  the Node version in CI cannot import TS config files otherwise). The build
  regenerates package.json `exports` (dev exports): in the monorepo,
  `@sanity/ui` and `@sanity/ui/theme` resolve directly to TypeScript source
  for every tool (tsc, oxlint's type checker, vitest, vite), so there are no
  tsconfig `paths`, no `customConditions`, and no vite aliases. The publishable
  `exports` (dist `import`/`require`) live under `publishConfig` and are
  applied by `pnpm pack`/`publish`.
- `pnpm test` runs the unit tests with vitest (`packages/ui/vitest.config.ts`).
  `@sanity/ui` resolves to the `packages/ui/exports/` source through the dev
  `exports`, so unit tests run directly against source and do not require a
  `pnpm build` first.
- `pnpm dev` starts Storybook (`apps/storybook`) on http://localhost:6006. It
  resolves `@sanity/ui` to the `packages/ui/exports/` source through the dev
  `exports`, so it hot-reloads source edits directly (no rebuild needed).
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
- `apps/docs` was migrated from the standalone `sanity-io/ui-docs` repo. It is
  formatted by the root oxfmt config (`pnpm format`) like the rest of the repo,
  but for linting it is excluded from root oxlint and instead uses its own
  eslint setup (`pnpm --filter sanity-ui-docs lint`). It depends on
  `@sanity/ui` v2 from npm (not the workspace version) and is deployed via
  Vercel, not released through Changesets.
- `pnpm dev:docs` runs the docs app: Next.js on http://localhost:3000 (the
  site is served under the `/ui` base path, so open http://localhost:3000/ui)
  and the Sanity Studio dev server on http://localhost:3333. Rendering draft
  content requires a viewer token in `apps/docs/.env.local`
  (`SANITY_API_READ_TOKEN`); the production dataset is publicly readable. To
  sign in to the studio, open `http://localhost:3333/#token={SANITY_AUTH_TOKEN}`
  (Sanity consumes the token from the URL hash on load). The same hash-token
  sign-in also works for the studio embedded in the Next.js app at
  `http://localhost:3000/ui/studio#token={SANITY_AUTH_TOKEN}`.
