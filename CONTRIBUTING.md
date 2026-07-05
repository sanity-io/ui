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
