# @sanity/ui

The Sanity UI components.

```sh
npm install @sanity/ui

# Install peer dependencies
npm install react react-dom react-is
```

[![npm version](https://img.shields.io/npm/v/@sanity/ui.svg?style=flat-square)](https://www.npmjs.com/package/@sanity/ui)

## Usage

```jsx
import '@sanity/ui/css/index.css'

import {Button, Root} from '@sanity/ui'
import {createRoot} from 'react-dom/client'

createRoot(document).render(
  <Root lang="en">
    <Button text="Hello, world" />
  </Root>,
)
```

## License

MIT-licensed. See LICENSE.
