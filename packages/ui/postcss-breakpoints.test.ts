import postcss from 'postcss'
import {expect, it} from 'vitest'

import plugin from './postcss-breakpoints'

async function run(input: string, output: string) {
  const result = await postcss([plugin()]).process(input, {from: undefined})
  expect(result.css).toMatch(output)
  expect(result.warnings()).toHaveLength(0)
}

it('generates responsive css', async () => {
  const input = `@breakpoints {
  .p-1 {
    padding: var(--space-1);
  }
}`

  const output = `.p-1 {
  padding: var(--space-1);
}
@media (min-width: 360px) {
  .p-1-bp-1 {
    padding: var(--space-1);
  }
}
@media (min-width: 600px) {
  .p-1-bp-2 {
    padding: var(--space-1);
  }
}
@media (min-width: 900px) {
  .p-1-bp-3 {
    padding: var(--space-1);
  }
}
@media (min-width: 1200px) {
  .p-1-bp-4 {
    padding: var(--space-1);
  }
}
@media (min-width: 1800px) {
  .p-1-bp-5 {
    padding: var(--space-1);
  }
}`

  await run(input, output)
})
