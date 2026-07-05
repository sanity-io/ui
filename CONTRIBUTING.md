# Contributing guidelines

This repository is a pnpm monorepo. The published `@sanity/ui` package lives in
[`packages/ui`](packages/ui), the Figma plugin lives in
[`packages/figma`](packages/figma), and the Storybook lives in
[`apps/storybook`](apps/storybook).

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
source in `packages/ui/src`. Run them with `pnpm test` (or
`pnpm test:watch` in `packages/ui` for watch mode). They run against the
package source, so no build is required.

End-to-end tests are written with [Playwright](https://playwright.dev) and live
in `e2e/`. Install the browsers once with `pnpm exec playwright install chromium`,
then run `pnpm test:browser` — this builds Storybook, serves it on
http://localhost:6006, and runs the tests against it. While developing, you can
keep `pnpm dev` running (Playwright reuses the running Storybook) and use
`pnpm test:browser:ui` to run tests interactively.

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
