# AGENTS.md

## Cursor Cloud specific instructions

This is the `@sanity/ui` React component library, structured as a pnpm monorepo:
the published package lives in `packages/ui` and the Figma plugin in
`packages/figma` (`pnpm-workspace.yaml`). The root `package.json` is a private
workspace root whose scripts orchestrate via pnpm filters. Package manager is
pnpm (`packageManager` pin in `package.json`); developing in this repo requires
Node `>=22.13` (required by pnpm 11), while the published `@sanity/ui` package
supports `>=20.19 <22 || >=22.12` (see `packages/ui/package.json` engines).

Standard scripts live in the root `package.json` (`lint`, `test`, `build`,
`dev`); `test`, `build` and `dev` forward to `packages/ui`. Notes that are not
obvious from the scripts:

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
  via the `default` condition (tsc, oxlint's type checker, and vite all pick
  it), so there are no tsconfig `paths`, no `customConditions`, and no vite
  aliases. The `node` condition points at `dist` for Node-only consumers (the
  workshop CLI). The publishable `exports` (dist + `source` condition) live
  under `publishConfig` and are applied by `pnpm pack`/`publish`.
- Tests do not require a build: jest maps `@sanity/ui` to source via
  `moduleNameMapper` and applies the React Compiler in its babel transform
  (see `jest.config.js`) to match the shipped `dist` behavior.
- `pnpm dev` runs two servers in parallel (`run-p storybook:dev workshop:dev` in
  `packages/ui`): Storybook on http://localhost:6006 and the Workshop on
  http://localhost:1337. Both are Vite-based and resolve `@sanity/ui` to the
  `packages/ui/exports/` source (dev exports), so they hot-reload source edits
  directly. The workshop CLI itself needs `pnpm build` to have run once (its
  Node process imports `@sanity/ui` through the `node` condition → `dist`).
- The Workshop's first component render can show a long loading spinner while
  Vite optimizes deps on demand; it is warm after the first load. This is
  expected, not a failure.
- Releases are managed with Changesets: run `pnpm changeset` to add a changeset
  to a PR that should trigger a release. Merging to `main` opens/updates a
  "Version Packages" PR, and merging that publishes to npm via trusted
  publishing.
