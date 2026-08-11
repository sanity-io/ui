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
  `next.config.ts` is wired to `process.env.EXPOSE_TESTING_API === '1'`. The
  e2e `webServer` sets it for `next start`; `e2e:build` sets it for the build.
  Vercel never sets it, so the deployed site keeps the testing API off.
- **RUN**: `pnpm --filter sanity-ui-docs e2e` (Playwright, `e2e/*.e2e.ts`)
  against `http://localhost:3000` — the config starts `next start` itself.
  Set `BASE_URL` to measure an already-running build (e.g. a preview URL)
  instead. Browsers install once with
  `pnpm --filter sanity-ui-docs exec playwright install chromium`.
- **TEST USER**: none. sanity.io/ui is a public, unauthenticated site; the
  suite reads the `published` perspective of the `production` dataset exactly
  as an anonymous visitor does. `SANITY_API_READ_TOKEN` is required for the
  server to boot, not to authorize a user.
- **DRIFT**: things that can make the suite see a different page than a
  developer does, and so make a RED untrustworthy:
  - **Draft mode.** The `__prerender_bypass` cookie switches every route onto
    its dynamic branch (`draftMode()` in the `(website)` and `[screen]`
    layouts). The suite runs in a fresh context without it. Never run the
    suite against a browser profile that has visited `/ui/api/draft-mode/enable`.
  - **Content.** Articles come from the live `production` dataset, so an
    unpublished or renamed article changes what renders. The guarded route
    (`/ui/docs/primitive/popover`) is asserted by structural testids, not by
    article prose, to keep that drift out of the verdict.
  - **Breakpoint.** The sidebar is hidden below the `media[1]` breakpoint and
    the breadcrumbs bar is hidden above it, so a marker that exists at one
    width can be absent at the other. Both Playwright projects run every spec.
  - **Colour scheme.** `prefers-color-scheme` only changes styling, never
    which nodes render.
- **LOOP**: fully local and agent-drivable, no CI wait and no secrets beyond
  the `SANITY_API_READ_TOKEN` the app already needs:
  `e2e:build` → `e2e` (starts the server) → read the failure → fix → repeat.
  The Playwright `webServer` owns port 3000; stop any `next dev`/`next start`
  already holding it first, or the suite silently measures the old process.
  Not wired into GitHub Actions: CI never builds `apps/docs` (Vercel does)
  and the repo has no `SANITY_API_READ_TOKEN` secret, so running the suite
  there needs that secret added first.
- **LIVENESS**: n/a. The measured artifact is the one just built in the same
  working tree, so there is no deployed-SHA skew to probe for. Add one only if
  the rig ever moves to preview deploys.
- **WALLS**:
  - The build needs `SANITY_API_READ_TOKEN` (and reaches the Sanity API) even
    though the dataset is public; without it every route fails with "Missing
    SANITY_API_READ_TOKEN".
  - `next start` refuses to boot without a preceding `next build`, and a build
    made without `EXPOSE_TESTING_API=1` makes `instant()` pass vacuously. Use
    the `e2e:build` script rather than the plain `next:build`.
