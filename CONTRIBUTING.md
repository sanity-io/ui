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
