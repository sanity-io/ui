# AGENTS.md

## Cursor Cloud specific instructions

This is the `v3` maintenance branch of the `@sanity/ui` React component
library, structured as a pnpm monorepo:
the published `@sanity/ui` package lives in `packages/ui`,
the Figma plugin for the Sanity UI theme tokens in `packages/figma`, and the
Storybook app in `apps/storybook` (`pnpm-workspace.yaml`).

`@sanity/color`, `@sanity/icons`, and `@sanity/logos` are published from
`main` and installed from npm on this branch (via the pnpm `catalog:` pins in
`pnpm-workspace.yaml`). `@sanity/themer`, the sanity.io/ui docs site, the
icons.sanity.dev icon showcase, the `@sanity/color` Figma plugin
(`packages/figma-color`, fully removed) and the docs Sanity Blueprint
(`apps/blueprints/docs`) also live on `main` and are not workspace packages
here. `apps/docs`, `apps/icons`, and `apps/studio` remain only as a
`vercel.json` whose `ignoreCommand` exits 0, so the Vercel projects still
linked to those directories skip the build instead of failing. Do not
reintroduce those packages/apps as workspace packages, and do not delete the
stub `vercel.json` files.

The root `package.json` is a private
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
  Storybook-specific rules come from `eslint-plugin-storybook`, loaded through
  oxlint's [JS plugins](https://oxc.rs/docs/guide/usage/linter/js-plugins.html)
  support (`jsPlugins` in `.oxlintrc.json`) and enabled via config `overrides`
  scoped to story files and `.storybook/main.ts`.
- `pnpm knip` runs [knip](https://knip.dev) (config in `knip.jsonc`, also a CI
  job) to detect unused files, dependencies and exports. Anything (values and
  types alike) that is only used within its own module should not be exported
  — knip reports such exports. Dependencies that are referenced but invisible
  to knip (e.g. only as strings in babel plugin arrays) are listed in
  `ignoreDependencies` with a comment explaining why. The script passes
  `--treat-config-hints-as-errors`, so stale knip config (e.g. an
  `ignoreDependencies` entry that no longer matches anything) also fails the
  run.
- Packages are built with [tsdown](https://tsdown.dev) via
  `@sanity/tsdown-config` (`tsdown.config.mts` in every package). The build
  regenerates package.json `exports` (dev exports): in the monorepo,
  `@sanity/ui` and `@sanity/ui/theme` resolve directly to TypeScript source for
  every tool (tsc, oxlint's type checker, vitest, vite), so there are no
  tsconfig `paths`, no `customConditions`, and no vite aliases. The publishable
  `exports` (dist `import`/`require`) live under `publishConfig` and are
  applied by `pnpm pack`/`publish`; npm access comes from the Changesets config
  (`access: public`), so packages don't set `publishConfig.access`. Published
  packages are `"type": "module"`: dist ESM builds use `.js`/`.d.ts` and dist
  CJS builds `.cjs`/`.d.cts`.
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
  to a PR that should trigger a release. Merging to `v3` opens/updates a
  "Version Packages" PR, and merging that publishes `@sanity/ui` to npm under the
  `release-v3` dist-tag (the `latest` dist-tag belongs to the `main`
  branch).
