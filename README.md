# @sanity/ui

The Sanity UI components.

```sh
npm install @sanity/ui react styled-components
```

[![npm version](https://img.shields.io/npm/v/@sanity/ui.svg?style=flat-square)](https://www.npmjs.com/package/@sanity/ui)

## Usage

```jsx
import {Button, studioTheme, ThemeProvider} from '@sanity/ui'
import React from 'react'
import ReactDOM from 'react-dom'

ReactDOM.render(
  <ThemeProvider theme={studioTheme}>
    <Button>Hello, world</Button>
  </ThemeProvider>,
  document.getElementById('root')
)
```

## Contributing

### Prerequisites

Install the `vercel` CLI order to run the UI Docs dev server locally (uses `vercel dev`).

```sh
npm install -g vercel
```

### Getting started

```sh
# clone and install dependencies
git clone git@github.com:sanity-io/ui.git
cd ui
npm install

# run the storybook dev server
npm run dev:storybook

# or run the UI Docs dev server
npm run dev:docs

# or run both servers
npm run dev
```

### Testing

There are currently no unit tests or integration tests, although there are checks to lint and type check the source code.

```sh
npm run lint
npm run type-check
```

### Git workflow

Create a branch for your task, and send a pull request (PR) to `next` when you want your work reviewed and merged/rebased.

If you’re adding an urgent bug fix, then code review is not required.

* The `main` branch is the released branch
* The `next` branch is the development branch

### Publishing

```sh
# Make sure checks are green
npm run lint
npm run type-check

# Bump the version in package.json, and add the version (without `v` in the commit message)
git commit -am "<version>"

# Publish to npm
npm publish --access public

# Push a release tag GitHub
git tag v<version>
git push && git push origin v<version>
```

## License

MIT-licensed. See LICENSE.
