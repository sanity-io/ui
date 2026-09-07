# instant-nav rig: sanity-ui-docs

How this app proves a route is instant, for the
`next-cache-components-optimizer` workflow. Written once, read by every later
run.

- **BUILD**: local production build of `apps/docs`:
  `pnpm --filter sanity-ui-docs e2e:build` (`EXPOSE_TESTING_API=1 next build --turbopack`).
  Vercel preview deploys are also production builds, but the local one is the
  measured rig because it needs no deploy wait. Never `next dev` — it does not
  prefetch, so an `instant()` verdict there is meaningless.
- **EXPOSE**: `experimental.exposeTestingApiInProductionBuild` in
  `next.config.ts` requires `process.env.EXPOSE_TESTING_API === '1'` and
  `process.env.VERCEL !== '1'`. The e2e `webServer` sets the opt-in for
  `next start`; `e2e:build` sets it for the build. Every Vercel build is
  explicitly rejected even if the opt-in is accidentally configured there.
- **RUN**: `pnpm --filter sanity-ui-docs e2e` (Playwright, `e2e/*.e2e.ts`)
  against `http://localhost:3000` — the config starts `next start` itself.
  Set `BASE_URL` to measure an already-running build (e.g. a preview URL)
  instead. Browsers install once with
  `pnpm --filter sanity-ui-docs exec playwright install chromium`.
- **TEST USER**: none. sanity.io/ui is a public, unauthenticated, fully static
  site and requires no environment variables.
- **DRIFT**: things that can make the suite see a different page than a
  developer does, and so make a RED untrustworthy:
  - **Content.** Articles live in source. The guarded route
    (`/ui/docs/primitive/popover`) uses structural testids so prose edits do
    not affect the verdict.
  - **Breakpoint.** The sidebar is hidden below the `media[1]` breakpoint and
    the breadcrumbs bar is hidden above it, so a marker that exists at one
    width can be absent at the other. Both Playwright projects run every spec.
  - **Colour scheme.** `prefers-color-scheme` only changes styling, never
    which nodes render.
- **LOOP**: fully local and agent-drivable, with no CI wait or secrets:
  `e2e:build` → `e2e` (starts the server) → read the failure → fix → repeat.
  The Playwright `webServer` owns port 3000; stop any `next dev`/`next start`
  already holding it first, or the suite silently measures the old process.
  Not wired into GitHub Actions: CI does not currently build `apps/docs`
  (Vercel does).
- **LIVENESS**: n/a. The measured artifact is the one just built in the same
  working tree, so there is no deployed-SHA skew to probe for. Add one only if
  the rig ever moves to preview deploys.
- **WALLS**:
  - `next start` refuses to boot without a preceding `next build`, and a build
    made without `EXPOSE_TESTING_API=1` makes `instant()` pass vacuously. Use
    the `e2e:build` script rather than the plain `build`.
