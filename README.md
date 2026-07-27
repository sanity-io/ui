# Sanity UI 4 — Monorepo

Development monorepo for Sanity UI 4 (`@sanity-labs/ui-poc`). Contains the component library, migration tooling, Storybook, and test apps.

## Packages

Published packages installable from npm.

| Package                                                | Version               | Description                                             |
| ------------------------------------------------------ | --------------------- | ------------------------------------------------------- |
| [`@sanity-labs/ui-poc`](./packages/ui)                 | `packages/ui`         | The component library. CSS-based, works alongside UI 3. |
| [`@sanity-labs/ui-poc-codemod`](./packages/ui-codemod) | `packages/ui-codemod` | CLI codemods for migrating UI 3 components to UI 4.     |

## Apps

Internal apps — not published.

| App                                          | Description                                                                               |
| -------------------------------------------- | ----------------------------------------------------------------------------------------- |
| [`apps/storybook`](./apps/storybook)         | Component stories. Browse variants, test props, verify visual behavior.                   |
| [`apps/depth-testing`](./apps/depth-testing) | DOM depth comparison. Compares the DOM each library emits between v3 and the POC.         |
| [`apps/inp-testing`](./apps/inp-testing)     | INP comparison. Compares avg, max, and current INP between v3 and the POC.                |
| [`apps/mount-testing`](./apps/mount-testing) | Mount time comparison. Compares v3 and v4 mount times across component counts.            |
| [`apps/frameworks`](./apps/frameworks)       | E2E tests across Next.js, React Router, and Vite to verify cross-framework compatibility. |

## Repo structure

```
ui-poc/
├── apps/
│   ├── depth-testing/       # DOM depth testing app
│   ├── frameworks/          # E2E tests across Next, React Router, Vite
│   ├── inp-testing/         # INP testing app
│   ├── mount-testing/       # Mount performance testing app
│   └── storybook/           # Component stories
├── packages/
│   ├── @repo/
│   │   └── eslint-config/   # Shared ESLint config (internal)
│   ├── ui/                  # @sanity-labs/ui-poc
│   └── ui-codemod/          # @sanity-labs/ui-poc-codemod
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

# Cut a release (build → version → publish)
pnpm release
```

Each changeset describes what changed and its semver impact. Commit the changeset file alongside your PR.
