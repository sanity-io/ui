# Sanity UI monorepo

pnpm workspace for Sanity’s design-system packages and related apps.

Published packages live under `packages/`. Storybook lives under `apps/`.

This is the `v3` maintenance branch for `@sanity/ui` `3.x`. `@sanity/color`,
`@sanity/icons`, and `@sanity/logos` are published from
[`main`](https://github.com/sanity-io/ui/tree/main) and consumed here from npm.
`@sanity/themer`, the [sanity.io/ui](https://www.sanity.io/ui) docs site, the
[icons.sanity.dev](https://icons.sanity.dev) icon showcase, and the
`@sanity/color` Figma plugin also live on `main` and are not part of this
branch. `apps/docs` and `apps/icons` stay as a `vercel.json` that always skips
the build (`ignoreCommand` exits 0), so the Vercel projects linked to those
directories keep deploying.

## Packages

| Package                                    | Description                             |
| ------------------------------------------ | --------------------------------------- |
| [`@sanity/ui`](packages/ui)                | React component library                 |
| [`figma-plugin-sanity-ui`](packages/figma) | Figma plugin for Sanity UI theme tokens |

## Apps

| App                                | Description                                                                  |
| ---------------------------------- | ---------------------------------------------------------------------------- |
| [`apps/storybook`](apps/storybook) | Component Storybook ([localhost:6006](http://localhost:6006) via `pnpm dev`) |

## Requirements

- Node.js `>=22.13`
- [pnpm](https://pnpm.io) `11` (pinned via `packageManager` in `package.json`)

## Getting started

```sh
pnpm install
pnpm build
pnpm test
```

### Development

```sh
pnpm dev          # Storybook at http://localhost:6006
```

In the monorepo, `@sanity/ui` resolves to TypeScript source through package
`exports`, so Storybook hot-reloads UI package edits without a rebuild.
`@sanity/color`, `@sanity/icons`, and `@sanity/logos` are installed from npm.

### Common scripts

| Script              | What it does                                      |
| ------------------- | ------------------------------------------------- |
| `pnpm build`        | Build `@sanity/ui` and the Figma plugin           |
| `pnpm test`         | Unit tests (`@sanity/ui`)                         |
| `pnpm test:browser` | Storybook browser tests (Chromium via Playwright) |
| `pnpm lint`         | Lint + type-check (oxlint)                        |
| `pnpm format`       | Format with oxfmt                                 |
| `pnpm knip`         | Unused files / dependencies / exports             |
| `pnpm changeset`    | Add a changeset for a release                     |

## Contributing & releasing

See [CONTRIBUTING.md](CONTRIBUTING.md). Releases use
[Changesets](https://github.com/changesets/changesets): add a changeset on your
PR; merging to `v3` opens a “Version Packages” PR that publishes `@sanity/ui` to
npm under the `release-v3` dist-tag when merged (the `latest` dist-tag belongs
to `main`).

## License

MIT — see [LICENSE](LICENSE).
