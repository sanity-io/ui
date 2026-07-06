# Contributing guidelines

This repository is a pnpm monorepo. The published `@sanity/ui` package lives in
[`packages/ui`](packages/ui), the Figma plugin lives in
[`packages/figma`](packages/figma), and the Storybook app lives in
[`apps/storybook`](apps/storybook).

## Getting started

```sh
pnpm install
pnpm build
pnpm test
```

Run `pnpm dev` to start Storybook (http://localhost:6006) and the Workshop
(http://localhost:1337) in parallel.

## Testing

Unit tests are written with [vitest](https://vitest.dev) and live next to the
source in `packages/ui/src`. Run them with `pnpm test` (or
`pnpm test:watch` in `packages/ui` for watch mode). They run against the
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

Releases are automated with
[semantic-release](https://github.com/semantic-release/semantic-release):
commits that land on the `v2` branch are analyzed (commit messages must follow
[Conventional Commits](https://www.conventionalcommits.org)), and new versions
of `@sanity/ui` are published to npm from `packages/ui` by the
[CI & Release workflow](https://github.com/sanity-io/ui/actions/workflows/main.yml).

## Working with prereleases

### Going from `alpha => beta`

```sh
git checkout alpha
git pull --rebase
git fetch origin main
git rebase origin/main
git push origin alpha # optional

git checkout beta
git reset --hard alpha
git push origin main
```

### Going from `beta => main`

```sh
git checkout beta
git pull --rebase
git fetch origin main
git rebase origin/main
git push origin beta # optional

git checkout -b v2 # make a new release branch
git reset --hard beta
git push origin v2
# make a PR to `main`
```
