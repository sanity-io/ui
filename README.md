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

const root = createRoot(document.getElementById('root'))
const theme = buildTheme()

root.render(
  <ThemeProvider theme={theme}>
    <Button text="Hello, world" />
  </ThemeProvider>,
)
```

## License

MIT-licensed. See LICENSE.
