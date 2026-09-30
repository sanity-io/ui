# Sanity UI monorepo

pnpm workspace for Sanity’s design-system packages and related apps.

Published packages live under `packages/`. Docs, Storybook and the legacy docs
Studio live under `apps/`.

## Packages

| Package                                    | Description                             |
| ------------------------------------------ | --------------------------------------- |
| [`@sanity/ui`](packages/ui)                | React component library                 |
| [`figma-plugin-sanity-ui`](packages/figma) | Figma plugin for Sanity UI theme tokens |

The `@sanity/color` palette and its Figma plugin live in
[sanity-io/color](https://github.com/sanity-io/color), the `@sanity/icons`
icon components and the [icons.sanity.dev](https://icons.sanity.dev) catalog
live in [sanity-io/icons](https://github.com/sanity-io/icons), and the
`@sanity/logos` Sanity / GROQ logo components live in
[sanity-io/logos](https://github.com/sanity-io/logos). Their Storybooks
([color.sanity.dev](https://color.sanity.dev),
[icons-storybook.sanity.dev](https://icons-storybook.sanity.dev) and
[logos.sanity.dev](https://logos.sanity.dev)) are composed into this repo's
Storybook. The `@sanity/themer` theme builder and its Studio tool live in
[sanity-io/plugins](https://github.com/sanity-io/plugins), and
`@sanity/themer-legacy` lives in
[sanity-io/themer](https://github.com/sanity-io/themer).

## Migration

See the [`@sanity/ui` migration guides](MIGRATION.md) when you upgrade from v2 to v3 or from v3 to v4.

## Apps

| App                                | Description                                                                  |
| ---------------------------------- | ---------------------------------------------------------------------------- |
| [`apps/storybook`](apps/storybook) | Component Storybook ([localhost:6006](http://localhost:6006) via `pnpm dev`) |
| [`apps/docs`](apps/docs)           | [sanity.io/ui](https://www.sanity.io/ui) docs site (fully static Next.js)    |
| [`apps/studio`](apps/studio)       | Sanity Studio for the legacy docs dataset                                    |

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
pnpm dev:studio   # Sanity Studio at http://localhost:3333
```

In the monorepo, `@sanity/ui` resolves to TypeScript source through package
`exports`, so Storybook and the apps hot-reload package edits without a
rebuild.

### Common scripts

| Script              | What it does                                        |
| ------------------- | --------------------------------------------------- |
| `pnpm build`        | Build all publishable packages and the Figma plugin |
| `pnpm test`         | Unit tests (`@sanity/ui`)                           |
| `pnpm test:browser` | Storybook browser tests (Chromium via Playwright)   |
| `pnpm lint`         | Lint + type-check (oxlint)                          |
| `pnpm format`       | Format with oxfmt                                   |
| `pnpm knip`         | Unused files / dependencies / exports               |
| `pnpm changeset`    | Add a changeset for a release                       |

## Contributing & releasing

See [CONTRIBUTING.md](CONTRIBUTING.md). Releases use
[Changesets](https://github.com/changesets/changesets): add a changeset on your
PR; merging to `main` opens a “Version Packages” PR that publishes to npm when
merged.

## License

MIT — see [LICENSE](LICENSE).
