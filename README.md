# Sanity UI monorepo

pnpm workspace for Sanity’s design-system packages and related apps.

Published packages live under `packages/`. Docs, Storybook, and the icon
showcase live under `apps/`.

This is the `v3` maintenance branch for `@sanity/ui` `3.x`. `@sanity/color`,
`@sanity/icons`, and `@sanity/logos` are published from
[`main`](https://github.com/sanity-io/ui/tree/main) and consumed here from npm.
`@sanity/themer` is also published from `main` and is not used on this branch.

## Packages

| Package                                             | Description                                  |
| --------------------------------------------------- | -------------------------------------------- |
| [`@sanity/ui`](packages/ui)                         | React component library                      |
| [`figma-plugin-sanity-ui`](packages/figma)          | Figma plugin for Sanity UI theme tokens      |
| [`figma-plugin-sanity-color`](packages/figma-color) | Figma plugin for the `@sanity/color` palette |

## Apps

| App                                | Description                                                                    |
| ---------------------------------- | ------------------------------------------------------------------------------ |
| [`apps/storybook`](apps/storybook) | Component Storybook ([localhost:6006](http://localhost:6006) via `pnpm dev`)   |
| [`apps/docs`](apps/docs)           | [sanity.io/ui](https://www.sanity.io/ui) docs site (Next.js + embedded Studio) |
| [`apps/icons`](apps/icons)         | [icons.sanity.dev](https://icons.sanity.dev) searchable icon catalog           |

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
pnpm dev:docs     # Docs at http://localhost:3000/ui (+ Studio at :3333)
pnpm dev:icons    # Icon showcase at http://localhost:5173
```

In the monorepo, `@sanity/ui` resolves to TypeScript source through package
`exports`, so Storybook and the apps hot-reload UI package edits without a
rebuild. `@sanity/color`, `@sanity/icons`, and `@sanity/logos` are installed
from npm.

### Common scripts

| Script              | What it does                                      |
| ------------------- | ------------------------------------------------- |
| `pnpm build`        | Build `@sanity/ui` and the Figma plugins          |
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
