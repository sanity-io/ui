# Sanity UI 5 — Monorepo

Development monorepo for Sanity UI 5 (`@sanity/ui`). Contains the component library, migration tooling, Storybook, and test apps.

## Packages

Published packages installable from npm.

| Package                                       | Location              | Description                                           |
| --------------------------------------------- | --------------------- | ----------------------------------------------------- |
| [`@sanity/ui`](./packages/ui)                 | `packages/ui`         | The component library. CSS-based, works alongside v3. |
| [`@sanity/ui-codemod`](./packages/ui-codemod) | `packages/ui-codemod` | CLI codemods for migrating v3 or v4 components to v5. |

## Apps

Internal apps — not published.

| App                                          | Description                                                                               |
| -------------------------------------------- | ----------------------------------------------------------------------------------------- |
| [`apps/storybook`](./apps/storybook)         | Component stories. Browse variants, test props, verify visual behavior.                   |
| [`apps/depth-testing`](./apps/depth-testing) | DOM depth comparison. Compares the DOM v3 and v5 emit for equivalent markup.              |
| [`apps/inp-testing`](./apps/inp-testing)     | INP comparison. Compares avg, max, and current INP between v3 and v5.                     |
| [`apps/mount-testing`](./apps/mount-testing) | Mount time comparison. Compares v3, v4, and v5 mount times across component counts.       |
| [`apps/frameworks`](./apps/frameworks)       | E2E tests across Next.js, React Router, and Vite to verify cross-framework compatibility. |

The comparison apps install published versions of `@sanity/ui` under package aliases, since the workspace already claims that name for v5. `ui3` resolves to v3 and `ui4` to v4, so a route named `ui3` imports from `ui3` and the v5 route imports from `@sanity/ui`.

## Repo structure

```
ui/
├── apps/
│   ├── depth-testing/       # DOM depth testing app
│   ├── frameworks/          # E2E tests across Next, React Router, Vite
│   ├── inp-testing/         # INP testing app
│   ├── mount-testing/       # Mount performance testing app
│   └── storybook/           # Component stories
├── packages/
│   ├── @repo/
│   │   └── eslint-config/   # Shared ESLint config (internal)
│   ├── ui/                  # @sanity/ui
│   └── ui-codemod/          # @sanity/ui-codemod
├── bin/
│   └── create-ui.js         # Component scaffolding script
├── turbo.json
└── pnpm-workspace.yaml
```

## Requirements

- Node `>=20.19 <22 || >=22.12`
- pnpm `10.17.0`

## Getting started

```sh
pnpm install
pnpm dev
```

`pnpm dev` starts the component library in watch mode and launches Storybook at `http://localhost:6006`.

## Commands

Run all commands from the repo root.

```sh
# Start dev mode (packages/ui + storybook)
pnpm dev

# Build all packages
pnpm build

# Run unit tests
pnpm test

# Run E2E tests (Next, React Router, Vite)
pnpm test:e2e

# Type-check all packages
pnpm ts:check

# Lint everything
pnpm lint
```

## Adding a component

The `create:ui` script scaffolds a new component with a component file, props file, and Storybook story.

```sh
pnpm create:ui my-component-name
```

The name must be kebab-case. The script creates:

- `packages/ui/src/components/my-component-name/MyComponentName.tsx`
- `packages/ui/src/components/my-component-name/myComponentName.props.ts`
- `apps/storybook/src/stories/MyComponentName.stories.tsx`

It also adds the export to `packages/ui/src/index.ts`.

## Releasing

Releases use [Changesets](https://github.com/changesets/changesets).

```sh
# Create a changeset for your changes
pnpm changeset

# Cut a release (version → build → publish)
pnpm release
```

Each changeset describes what changed and its semver impact. Commit the changeset file alongside your PR.

Publishing is paused while the repo moves to [`sanity-io/ui`](https://github.com/sanity-io/ui). This package builds as `@sanity/ui` at `0.0.1-alpha.24`, and npm's `@sanity/ui` is at `3.5.1`, so `pnpm release` from this state would push an alpha to the `latest` dist-tag. Changesets prerelease mode gets re-established on the v5 branch before the next publish.
