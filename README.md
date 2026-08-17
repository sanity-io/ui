# Sanity UI monorepo

pnpm workspace for Sanity’s design-system packages and related apps.

Published packages live under `packages/`. Docs, Storybook, the icon showcase,
and serverless functions live under `apps/`.

## Packages

| Package                                             | Description                                  |
| --------------------------------------------------- | -------------------------------------------- |
| [`@sanity/ui`](packages/ui)                         | React component library                      |
| [`@sanity/icons`](packages/icons)                   | Icon components (SVG → React)                |
| [`@sanity/color`](packages/color)                   | Color palette                                |
| [`@sanity/logos`](packages/logos)                   | Sanity / GROQ logo components                |
| [`figma-plugin-sanity-ui`](packages/figma)          | Figma plugin for Sanity UI theme tokens      |
| [`figma-plugin-sanity-color`](packages/figma-color) | Figma plugin for the `@sanity/color` palette |

## Migration

See the [`@sanity/ui` migration guides](MIGRATION.md) when you upgrade from v2 to v3 or from v3 to v4.

## Apps

| App                                            | Description                                                                  |
| ---------------------------------------------- | ---------------------------------------------------------------------------- |
| [`apps/storybook`](apps/storybook)             | Component Storybook ([localhost:6006](http://localhost:6006) via `pnpm dev`) |
| [`apps/docs`](apps/docs)                       | [sanity.io/ui](https://www.sanity.io/ui) docs site (fully static Next.js)    |
| [`apps/studio`](apps/studio)                   | Sanity Studio for the legacy docs dataset                                    |
| [`apps/icons`](apps/icons)                     | [icons.sanity.dev](https://icons.sanity.dev) searchable icon catalog         |
| [`apps/blueprints/docs`](apps/blueprints/docs) | Sanity Blueprint (serverless icon-enrichment function)                       |

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
pnpm dev:docs     # Docs at http://localhost:3000/ui
pnpm dev:icons    # Icon showcase at http://localhost:5173
pnpm dev:studio   # Sanity Studio at http://localhost:3333
```

In the monorepo, `@sanity/ui`, `@sanity/icons`, `@sanity/color`, and
`@sanity/logos` resolve to TypeScript source through package `exports`, so
Storybook and the apps hot-reload package edits without a rebuild.

### Common scripts

| Script              | What it does                                                |
| ------------------- | ----------------------------------------------------------- |
| `pnpm build`        | Build all publishable packages and Figma plugins            |
| `pnpm test`         | Unit tests (`@sanity/ui`, `@sanity/icons`, `@sanity/color`) |
| `pnpm test:browser` | Storybook browser tests (Chromium via Playwright)           |
| `pnpm lint`         | Lint + type-check (oxlint)                                  |
| `pnpm format`       | Format with oxfmt                                           |
| `pnpm knip`         | Unused files / dependencies / exports                       |
| `pnpm changeset`    | Add a changeset for a release                               |

## Contributing & releasing

See [CONTRIBUTING.md](CONTRIBUTING.md). Releases use
[Changesets](https://github.com/changesets/changesets): add a changeset on your
PR; merging to `main` opens a “Version Packages” PR that publishes to npm when
merged.

## License

MIT — see [LICENSE](LICENSE).
