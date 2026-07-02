# @sanity/icons

The Sanity icons.

```sh
npm install @sanity/icons

# Install peer dependencies (requires React 19 or newer)
npm install react
```

[![npm version](https://img.shields.io/npm/v/@sanity/icons.svg?style=flat-square)](https://www.npmjs.com/package/@sanity/icons)

## Usage

Every icon is published on its own export path. The subpath is the icon's name **without** the
`Icon` suffix, e.g. `RocketIcon` lives at `@sanity/icons/Rocket`. Importing icons this way keeps
bundles small and treeshaking fast, since your bundler skips parsing and resolving the full icon
set to reach the handful of icons you actually use:

```jsx
import {RocketIcon} from '@sanity/icons/Rocket'

function App () {
  return <RocketIcon style={{fontSize: 72}}>
}
```

Each icon is also the module's default export, which makes lazy-loading a single icon easy:

```jsx
import {lazy} from 'react'

const RocketIcon = lazy(() => import('@sanity/icons/Rocket'))
```

### Barrel imports

Importing individual icons from the root entry still works, and the named export is identical to
the subpath's:

```jsx
import {RocketIcon} from '@sanity/icons'
```

However, these barrel imports are marked `@deprecated` (your editor will show them as such, with
the subpath to use instead) because they come with barrel file performance issues: unless your
bundler has barrel-file optimizations, importing one icon pulls in the entire icon set. Prefer the
per-icon export paths.

The dynamic `<Icon symbol="…" />` component and the `icons` map remain available from the root
entry and are not deprecated.

## License

MIT-licensed. See LICENSE.
