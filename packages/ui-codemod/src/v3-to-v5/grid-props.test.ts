import {defineInlineTest} from '../utils/testUtils'
import transform from './grid-props'

defineInlineTest(
  transform,
  {},
  `
  <Grid autoCols="min-content" />
  `,
  `
  <Grid gridAutoColumns="min-content" />
  `,
  'renames prop',
)

defineInlineTest(
  transform,
  {},
  `
  <Grid rows={2} />
  `,
  `
  <Grid gridTemplateRows="repeat(2, 1fr)" />
  `,
  'renames prop and updates value',
)
