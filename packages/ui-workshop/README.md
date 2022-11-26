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
import {
  defineScope,
  useBoolean,
  useNumber,
  useSelect,
  useString,
  useText,
} from '@sanity/ui-workshop'

export default defineScope({
  name: 'test',
  title: 'Test',
  stories: [
    {
      name: 'test',
      title: 'Test',
      component: TestStory,
    },
  ],
})

const options = {
  None: '',
  Small: 'sm',
  Medium: 'md',
  Large: 'lg',
}

function TestStory() {
  const text = useText('Text', 'Hello, world')
  const boolean = useBoolean('Boolean', true)
  const number = useNumber('Number', 1234)
  const string = useString('String', '...')
  const option = useSelect('Select option', options)

  return (
    <div>
      <h1>This is my first story.</h1>
      <p>Some text: {text}</p>
      <p>A boolean: {boolean ? 'true' : 'false'}</p>
      <p>A number: {number}</p>
      <p>A string: {string}</p>
      <p>An option: {option}</p>
    </div>
  )
}
```

## License

[MIT](LICENSE)
