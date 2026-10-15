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

## Load order

`@sanity/ui/styles.css` is plain CSS without cascade layers: when two rules with the same specificity set the same property on an element, the one that loads last wins. Your styled-components overrides, such as `styled(Button)`, often have the same specificity as the static styles they override, so **`@sanity/ui/styles.css` must load before styled-components' `<style data-styled>` tag**, or those overrides break.

Importing the stylesheet in your entry point, before anything renders, as above, gives this order: styled-components adds its tag to the end of `<head>` the first time it renders. Check the order in your browser's devtools if the stylesheet loads lazily, in a code-split chunk, or if a framework such as Next.js decides where stylesheets go.

## Contributing and releasing new versions to npm

This package lives in the [`sanity-io/ui` monorepo](https://github.com/sanity-io/ui) and uses [Changesets](https://github.com/changesets/changesets) to manage versioning and publishing.

When you make a change that should be released, add a changeset to your pull request:

```sh
pnpm changeset
```

Once pull requests with changesets are merged into the `main` branch, a "Version Packages" pull request is opened (and kept up to date) that bumps the affected package versions and updates their changelogs. Merging that pull request publishes the packages to npm through the [`Release` workflow](https://github.com/sanity-io/ui/actions/workflows/release.yml), which uses npm [Trusted Publishing](https://docs.npmjs.com/trusted-publishers) (OIDC).

## License

MIT-licensed. See LICENSE.
