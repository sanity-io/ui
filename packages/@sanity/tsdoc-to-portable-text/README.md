# @sanity/tsdoc-to-portable-text

_Work in progress._

## Installation

```sh
npm i @sanity/tsdoc-to-portable-text
```

## Using the CLI

```sh
# Extract to etc/<version>.json using `tsdoc-to-portable-text etl` command
tsdoc-to-portable-text etl lib/index.d.ts --outDir etc/ --tsconfig tsconfig.lib.json
```

## Using the Node.js API

```ts
import {extract, load, transform} from '@sanity/tsdoc-to-portable-text'

// Path to a package with a package.json file
const packagePath = __dirname

const result = await extract('lib/esm/index.d.ts', {
  packagePath,
  tsconfigPath: 'tsconfig.lib.json'
})

const docs = transform(result, {package: {scope: null, name: 'mylib', version: '1.0.0'}})

await load(docs, {fs: {path: path.resolve(packagePath, 'etc/1.0.0.json')}})
```
