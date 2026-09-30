# Contributing guidelines

This repository is a pnpm monorepo. The published `@sanity/ui` package lives in
[`packages/ui`](packages/ui), the Figma plugin lives in
[`packages/figma`](packages/figma), the Storybook lives in
[`apps/storybook`](apps/storybook), and the [sanity.io/ui](https://www.sanity.io/ui)
docs site lives in [`apps/docs`](apps/docs). The `@sanity/color` palette, the
`@sanity/icons` icon components and the `@sanity/logos` components are
installed from npm, and their stories reach this Storybook through composition
refs to https://color.sanity.dev, https://icons-storybook.sanity.dev and
https://logos.sanity.dev.

Development of the current major happens here on `main`. Previous release lines
receive bug fixes on maintenance branches:
[`v3`](https://github.com/sanity-io/ui/tree/v3) for `3.x` (published under the
`release-v3` dist-tag) and [`v2`](https://github.com/sanity-io/ui/tree/v2) for
`2.x` (`release-v2`).

## Getting started

```sh
pnpm install
pnpm build
pnpm test
```

Run `pnpm dev` to start Storybook (http://localhost:6006). Storybook resolves
`@sanity/ui` from the package source, so edits to `packages/ui/src` hot-reload
without a rebuild.

## Testing

Unit tests are written with [vitest](https://vitest.dev) and live next to the
source in `packages/ui/src`. Run them with `pnpm test`
(or `pnpm test:watch` in the package for watch mode). They run against the
package source, so no build is required.

Browser tests live in the Storybook app (`apps/storybook`) and use
[Storybook's Vitest addon](https://storybook.js.org/docs/writing-tests/integrations/vitest-addon):
every story is rendered as a smoke test in headless Chromium, and interaction
tests are written as story [`play` functions](https://storybook.js.org/docs/writing-stories/play-function).
Tests that need direct control over the browser (e.g. resizing the viewport)
live in `apps/storybook/tests/`.

Install the Playwright-provided browser once with
`pnpm --filter sanity-ui-storybook exec playwright install chromium`, then run
`pnpm test:browser`. While developing, `pnpm dev` exposes the same tests
interactively through the testing panel in the Storybook UI.

## Releasing

Releases are managed with [Changesets](https://github.com/changesets/changesets).

When you make a change that should be released, add a changeset to your pull
request:

```sh
pnpm changeset
```

Once pull requests with changesets are merged into `main`, a "Version Packages"
pull request is opened (and kept up to date) that bumps the affected package
versions and updates their changelogs. Merging that pull request publishes the
packages to npm through the
[`Release` workflow](https://github.com/sanity-io/ui/actions/workflows/release.yml),
which uses npm [Trusted Publishing](https://docs.npmjs.com/trusted-publishers)
(OIDC). Releases from `main` are published under the `latest` dist-tag — `3.x`
maintenance releases come from the [`v3`](https://github.com/sanity-io/ui/tree/v3)
branch under `release-v3`.
