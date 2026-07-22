# @sanity/logos

The Sanity logos.

```sh
npm install @sanity/logos

# Install peer dependencies
npm install react
```

[![npm version](https://img.shields.io/npm/v/@sanity/logos.svg?style=flat-square)](https://www.npmjs.com/package/@sanity/logos)

## Usage

```jsx
import {SanityLogo} from '@sanity/logos'

function App() {
  return <SanityLogo style={{fontSize: 72}} />
}
```

## Contributing and releasing new versions to npm

This package lives in the [`sanity-io/ui` monorepo](https://github.com/sanity-io/ui) and uses [Changesets](https://github.com/changesets/changesets) to manage versioning and publishing.

When you make a change that should be released, add a changeset to your pull request:

```sh
pnpm changeset
```

Once pull requests with changesets are merged into the `main` branch, a "Version Packages" pull request is opened (and kept up to date) that bumps the affected package versions and updates their changelogs. Merging that pull request publishes the packages to npm through the [`Release` workflow](https://github.com/sanity-io/ui/actions/workflows/release.yml), which uses npm [Trusted Publishing](https://docs.npmjs.com/trusted-publishers) (OIDC).

## License

MIT-licensed. See LICENSE.
