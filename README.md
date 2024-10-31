# @sanity/ui

The Sanity UI components.

```sh
npm install @sanity/ui

# Install peer dependencies
npm install react react-dom react-is styled-components
```

[![npm version](https://img.shields.io/npm/v/@sanity/ui.svg?style=flat-square)](https://www.npmjs.com/package/@sanity/ui)

## Usage

```jsx
import '@sanity/ui/ui.css'

import {Button, Card} from '@sanity/ui'
import {createRoot} from 'react-dom/client'

const root = createRoot(document.getElementById('root'))

root.render(
  <Card scheme="light" tone="default">
    <Button text="Hello, world" />
  </Card>,
)
```

## License

MIT-licensed. See LICENSE.
