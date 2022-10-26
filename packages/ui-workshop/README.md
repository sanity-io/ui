# Sanity UI Workshop

An environment for designing, reviewing, and quality-testing React components.

```sh
# Install `@sanity/ui-workshop` as dev dependency
npm install @sanity/ui-workshop@beta -D

# Install peer dependencies
npm install @sanity/icons@beta @sanity/ui@beta react react-dom styled-components
```

[![npm version](https://img.shields.io/npm/v/@sanity/ui-workshop.svg?style=flat-square)](https://www.npmjs.com/package/@sanity/ui-workshop)

## Basic usage

Add a `workshop.config.ts` (or .js) in the root of your project:

```ts
import {defineConfig} from '@sanity/ui-workshop'

export default defineConfig({
  title: 'My UI Workshop',
})
```

Start the workshop

```sh
workshop dev
```

`workshop` will automatically find workshop "scopes" by searching for files mathing these patterns:

- `src/**/__workshop__/index.js`
- `src/**/__workshop__/index.jsx`
- `src/**/__workshop__/index.ts`
- `src/**/__workshop__/index.tsx`

Define your first workshop scope by creating `src/__workshop__/index.tsx`:

```tsx
import {defineScope, useText} from '@sanity/ui-workshop'

export default defineScope('test', 'Test', [
  {
    name: 'test',
    title: 'Test',
    component: TestStory,
  },
])

function TestStory() {
  const text = useText('Text', 'Hello, world')

  return <div>This is my first story. Some text: {text}</div>
}
```

## License

[MIT](LICENSE)
