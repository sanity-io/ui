# AGENTS.md

## Cursor Cloud specific instructions

This is the `@sanity/ui` React component library, structured as a pnpm monorepo:
the published `@sanity/ui` package lives in `packages/ui`, the published
`@sanity/logos` package (Sanity/GROQ logo components, migrated from the
standalone `sanity-io/logos` repo with full git history) in `packages/logos`,
the Figma plugin in `packages/figma`, the Storybook app in `apps/storybook`, the
sanity.io/ui docs site (a Next.js app with an embedded Sanity Studio) in
`apps/docs`, and a Sanity Blueprint (serverless functions for the docs site)
in `apps/blueprints/docs` (`pnpm-workspace.yaml`). The root `package.json` is a private
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
  linted by the root oxlint config like everything else (an override in
  `.oxlintrc.json` additionally enables the Next.js plugin rules for it) and
  formatted by the root oxfmt config (`pnpm format`) like the rest of the
  repo. It depends on the workspace `@sanity/ui` (`workspace:*`), which
  resolves to the TypeScript source through the dev `exports`, so Next.js
  transpiles it via `transpilePackages` in `apps/docs/next.config.mjs`. It is
  deployed via Vercel, not released through Changesets.
- `apps/docs` runs `next@preview` with `cacheComponents: true` and fetches
  content with `next-sanity`'s `defineLive`/`sanityFetch` (Sanity Live) plus
  stega-based visual editing. When touching data fetching or draft mode in
  `apps/docs`, follow the vendored
  `.agents/skills/sanity-live-cache-components` skill (three-layer
  Page/Dynamic/Cached pattern with explicit `perspective`/`stega` props;
  `'use cache'` only on the cached layer). The app builds and devs with
  Turbopack and the native Rust React Compiler
  (`experimental.turbopackRustReactCompiler`). To make that work,
  `packages/ui` and `apps/docs` omit the package.json `type` field: an
  explicit `"type": "commonjs"` makes Turbopack refuse the ESM-syntax
  TypeScript source that the dev `exports` resolve to. On-demand revalidation flows from
  the Live Content API through the `invalidate-sync-tags` Sanity Function
  (defined in `apps/blueprints/docs`) to `POST /ui/api/expire-tags`, which
  calls `revalidateTag('sanity:<tag>', 'max')`; the route is guarded by the
  `EXPIRE_TAGS_SECRET` env var.
- `apps/blueprints/docs` is deployed by
  `.github/workflows/sanity-blueprint-docs.yml` via `@sanity/runtime-cli`
  (`blueprints doctor`/`plan` on PRs, `blueprints deploy` on pushes to
  `main`). It needs the `SANITY_UI_DOCS_AUTH_TOKEN` repo secret and the
  stack id in the workflow's `SANITY_BLUEPRINT_STACK_ID` env (created by the
  first manual deploy; see `apps/blueprints/docs/README.md`).
- `pnpm dev:docs` runs the docs app: Next.js on http://localhost:3000 (the
  site is served under the `/ui` base path, so open http://localhost:3000/ui)
  and the Sanity Studio dev server on http://localhost:3333. The Next.js app
  requires a viewer token in `SANITY_API_READ_TOKEN` (environment variable or
  `apps/docs/.env.local`) — without it every route fails with "Missing
  SANITY_API_READ_TOKEN", even though the production dataset itself is
  publicly readable. In Cloud Agent VMs, `SANITY_API_READ_TOKEN` and
  `SANITY_AUTH_TOKEN` are available as runtime secrets (injected as env vars
  when the VM starts). To sign in to the studio, open
  `http://localhost:3333/#token={SANITY_AUTH_TOKEN}` (Sanity consumes the
  token from the URL hash on load). The same hash-token sign-in also works for
  the studio embedded in the Next.js app at
  `http://localhost:3000/ui/studio/production#token={SANITY_AUTH_TOKEN}`. The
  standalone studio (`pnpm dev:docs`, project `mos42crl`) exposes two
  workspaces — `/production` (dataset `production`) and `/development` (dataset
  `development`); prefer `/development` when creating/publishing test documents
  so you don't pollute production. When driving the studio through the browser
  (e.g. computer-use), tokens are redacted from tool output, so you cannot paste
  the `#token=...` URL into browser instructions. A reliable workaround is a
  tiny local HTTP server that reads `SANITY_AUTH_TOKEN` from env and serves an
  HTML page doing `location.replace(<studio-url-with-token>)`, then point the
  browser at that server — this keeps the secret out of prompts/screenshots
  while still landing you authenticated in the workspace.
