# @sanity/ui

The Sanity UI components.

```sh
npm install @sanity/ui

# Install peer dependencies
npm install react react-dom styled-components
```

[![npm version](https://img.shields.io/npm/v/@sanity/ui.svg?style=flat-square)](https://www.npmjs.com/package/@sanity/ui)

## Usage

```jsx
import {Button, ThemeProvider} from '@sanity/ui'
import {buildTheme} from '@sanity/ui/theme'
import {createRoot} from 'react-dom/client'

// Static styles are shipped as a plain stylesheet (not injected at runtime) —
// import it once, wherever your app loads global CSS
import '@sanity/ui/styles.css'

const root = createRoot(document.getElementById('root'))
const theme = buildTheme()

root.render(
  <ThemeProvider theme={theme}>
    <Button text="Hello, world" />
  </ThemeProvider>,
)
```

## Cascade layers

`@sanity/ui` puts its CSS in [cascade layers](https://developer.mozilla.org/en-US/docs/Web/CSS/@layer): the static styles of `@sanity/ui/styles.css` in `u-tokens` and `u-utilities`, and the rules that styled-components injects at runtime in `u-styled`. Component styles override static styles, so `u-styled` has to come last.

A layer takes its place in the order the first time the page mentions it, and `@sanity/ui` doesn't declare the order for you. Do one of these:

- Import `@sanity/ui/styles.css` so that its `<link rel="stylesheet">` ends up in the DOM before styled-components' `<style data-styled>` tag. Importing it in your entry point, as above, usually does this. Check the order if your own code also uses styled-components, since its tag can then reach the page before `styles.css` does.
- Declare the order in global CSS that loads before anything else:

  ```css
  @layer u-tokens, u-utilities, u-styled;
  ```

  To order layers of your own around these, add them to the same statement, for example `@layer reset, u-tokens, u-utilities, u-styled, app;`.

If neither holds, `u-styled` is declared first and the static styles win over component styles they should lose to.

CSS outside any layer beats every layer, whatever its specificity. That includes your own styled components and extensions like `styled(Button)`, which stay unlayered.

In Next.js, use the statement: Next.js decides where its stylesheets go relative to the `<style>` tag of a styled-components registry, so put it at the top of the global stylesheet that your root layout imports.

## Contributing and releasing new versions to npm

This package lives in the [`sanity-io/ui` monorepo](https://github.com/sanity-io/ui) and uses [Changesets](https://github.com/changesets/changesets) to manage versioning and publishing.

When you make a change that should be released, add a changeset to your pull request:

```sh
pnpm changeset
```

Once pull requests with changesets are merged into the `main` branch, a "Version Packages" pull request is opened (and kept up to date) that bumps the affected package versions and updates their changelogs. Merging that pull request publishes the packages to npm through the [`Release` workflow](https://github.com/sanity-io/ui/actions/workflows/release.yml), which uses npm [Trusted Publishing](https://docs.npmjs.com/trusted-publishers) (OIDC).

## License

MIT-licensed. See LICENSE.
