# @sanity/ui-tokens

```sh
pnpm add @sanity/ui-tokens
```

```ts
import {spaceTokens} from '@sanity/ui-tokens/space'

const tokens = {
  ...spaceTokens,
}

console.log(tokens.space.$type) // "dimension"
console.log(tokens.space[4]) // {$value: {value: 20, unit: "px"}}
```
