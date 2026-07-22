# Contributing guidelines

This repository is a pnpm monorepo. The published `@sanity/ui` package lives in
[`packages/ui`](packages/ui), the published `@sanity/icons` package lives in
[`packages/icons`](packages/icons), the published `@sanity/color` package lives
in [`packages/color`](packages/color), the published `@sanity/logos` package
lives in [`packages/logos`](packages/logos), the Figma plugins live in
[`packages/figma`](packages/figma) and [`packages/figma-color`](packages/figma-color),
the Storybook lives in
[`apps/storybook`](apps/storybook), the [sanity.io/ui](https://www.sanity.io/ui)
docs site lives in [`apps/docs`](apps/docs), and the
[icons.sanity.dev](https://icons.sanity.dev) icon showcase lives in
[`apps/icons`](apps/icons).

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
source in `packages/ui/src`, `packages/icons/src` and `packages/color/src`. Run
them with `pnpm test`
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
(OIDC).
