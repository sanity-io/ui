# AGENTS.md

## Cursor Cloud specific instructions

This is the `@sanity/ui` React component library, structured as a pnpm monorepo:
the published `@sanity/ui` package lives in `packages/ui`,
the Figma plugin in `packages/figma` (Sanity UI theme tokens), the Storybook
app in `apps/storybook`, the
sanity.io/ui docs site (a fully static Next.js app — no Sanity client, all
content lives in code) in
`apps/docs`, and the Sanity Studio for the legacy docs dataset in `apps/studio`
(`pnpm-workspace.yaml`). The root `package.json` is a private
workspace root whose scripts orchestrate via pnpm filters. Package manager is pnpm
(`packageManager` pin in `package.json`); developing in this repo requires Node
`>=22.13` (root `package.json` engines), while the published `@sanity/ui`
package requires `>=22.12` (matching `sanity`; see `packages/ui/package.json`
engines). `@sanity/color` (the palette `@sanity/ui` depends on), `@sanity/icons`
(icon components used by `@sanity/ui` and the apps) and `@sanity/logos` (logo
components used by `apps/docs` and `apps/studio`) are installed from npm through
their entries in the `pnpm-workspace.yaml` catalog.

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
  `@sanity/tsdown-config` (`tsdown.config.mts` in every package — a bare
  `.ts` config only imports on the Node version in CI when the package is
  `"type": "module"`, while `.mts` always works). The build regenerates
  package.json `exports`
  (dev exports): in the monorepo, `@sanity/ui` (incl. its subpath entry
  points — one per file in `packages/ui/src/exports/`, e.g. `@sanity/ui/theme`
  and `@sanity/ui/toast`; components with heavy dependencies like `motion`,
  `@floating-ui/react-dom` and `react-refractor` live on their own subpaths so
  the root entry never references them, and adding a file to `src/exports/`
  plus running the build is all it takes to publish a new subpath) resolves
  directly to TypeScript source for every tool (tsc, oxlint's type checker,
  vitest, vite), so there are no tsconfig `paths`, no `customConditions`, and
  no vite aliases. The publishable `exports` (pointing at `dist`) live under
  `publishConfig` and are applied by `pnpm pack`/`publish`; npm access comes
  from the Changesets config (`access: public`), so packages don't set
  `publishConfig.access`. `@sanity/ui` is `"type": "module"` and ships ESM
  only (`.js`/`.d.ts`).
- `pnpm test` runs the unit tests with vitest (`packages/ui/vitest.config.ts`).
  `@sanity/ui` resolves to the
  `packages/ui/src/exports/` source through the dev `exports`, so unit tests
  run directly against source and do not require a `pnpm build` first.
- `pnpm dev` starts Storybook (`apps/storybook`) on http://localhost:6006. It
  resolves `@sanity/ui` to the `packages/ui/src/exports/` source through the
  dev `exports`, so it hot-reloads source edits directly (no rebuild needed).
  The `@sanity/color`, `@sanity/icons` and `@sanity/logos` stories come from
  the Storybooks at https://color.sanity.dev, https://icons-storybook.sanity.dev
  and https://logos.sanity.dev through composition refs (`refs` in
  `.storybook/main.ts`).
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
  publishing under the `latest` dist-tag. The `3.x` line is maintained on the
  `v3` branch and publishes under the `release-v3` dist-tag, like `v2` for
  `2.x` (`release-v2`).
- `apps/docs` is linted by the root oxlint config like everything else (an
  override in `.oxlintrc.json` additionally enables the Next.js plugin rules
  for it) and formatted by the root oxfmt config (`pnpm format`) like the rest
  of the repo. It depends on the workspace `@sanity/ui` (`workspace:*`), which
  resolves to the TypeScript source through the dev `exports`, so Next.js
  transpiles it via `transpilePackages` in `apps/docs/next.config.ts`. It is
  deployed via Vercel, not released through Changesets.
- `apps/docs` is fully static: it fetches nothing from Sanity at runtime and
  needs no environment variables. `POST /ui/api/expire-tags` is a no-op that
  answers 200, so callers of that revalidation endpoint don't see errors.
  Every URL is its own `page.tsx` under `apps/docs/src/app/(website)/`, and
  the nav tree mirrors the route file structure — each route folder has a
  colocated `nav.ts` (title, order, display flags) collected with Turbopack's
  `import.meta.glob` in `src/app/(website)/navTree.ts`, so there is no
  manually maintained route list (group folders like `docs/primitive/` have a
  `nav.ts` but no `page.tsx`). Edit the page files directly to change docs
  content. The app runs `next@16` with
  `cacheComponents: true` and builds and devs with Turbopack and the native
  Rust React Compiler (`experimental.turbopackRustReactCompiler`). To make
  that work, `packages/ui` is `"type": "module"` and `apps/docs` omits the
  package.json `type` field: an explicit `"type": "commonjs"` makes Turbopack
  refuse the ESM-syntax TypeScript source that the dev `exports` resolve to.
  For Next.js work, follow the vendored `.agents/skills/next-dev-loop`,
  `.agents/skills/next-cache-components-optimizer`, and
  `.agents/skills/next-partial-prefetching-adoption` skills.
- `pnpm dev:docs` runs the docs app: Next.js on http://localhost:3000 (the
  site is served under the `/ui` base path, so open http://localhost:3000/ui).
  No tokens or env vars are required.
- `pnpm dev:studio` runs the Sanity Studio (`apps/studio`, project `mos42crl`,
  dataset `production`) on http://localhost:3333. It holds the schemas and
  content of the previous docs site. `apps/docs` reads nothing from it, so the
  studio has no presentation tool.
  `pnpm --filter sanity-ui-studio export:docs`
  (`apps/studio/scripts/export-docs-to-code.ts`) writes the dataset's docs
  content to the `apps/docs` page files, overwriting any changes made to them.
  The studio's `dev`, `build` and `deploy` scripts build `@sanity/ui` first
  (`pre*` scripts): `sanity` and its plugins import `@sanity/ui/styles.css`,
  which the workspace `exports` map to `packages/ui/dist/styles.css` — the
  one subpath that needs a build, and `pnpm install` only runs the package's
  `prepare` build when it actually installs something (not with a cached
  `node_modules`, as on Vercel).
  `pnpm --filter sanity-ui-studio run deploy` updates the hosted studio (the
  `appId` in `apps/studio/sanity.cli.ts`); it needs `run` because `deploy` on
  its own is pnpm's built-in `pnpm deploy`. In Cloud Agent VMs,
  `SANITY_API_READ_TOKEN` and `SANITY_AUTH_TOKEN` are available as runtime
  secrets (injected as env vars when the VM starts). To sign in to the studio,
  open `http://localhost:3333/#token={SANITY_AUTH_TOKEN}` (Sanity consumes the
  token from the URL hash on load). When driving the studio through the
  browser (e.g. computer-use), tokens are redacted from tool output, so you
  cannot paste the `#token=...` URL into browser instructions. A reliable
  workaround is a tiny local HTTP server that reads `SANITY_AUTH_TOKEN` from
  env and serves an HTML page doing
  `location.replace(<studio-url-with-token>)`, then point the browser at that
  server — this keeps the secret out of prompts/screenshots while still
  landing you authenticated in the workspace.
