import {defineInlineTest} from '../utils/testUtils'
import transform from './grid-props'

defineInlineTest(
  transform,
  {},
  `
  <Grid
    autoCols="auto"
    autoFlow="row"
    autoRows="auto"
  />
  `,
  `
  <Grid
    gridAutoColumns="auto"
    gridAutoFlow="row"
    gridAutoRows="auto"
  />
  `,
  'renames grid props',
)

defineInlineTest(
  transform,
  {},
  `
  <Grid
    columns={1}
    rows={2}
  />
  `,
  `
  <Grid
    gridTemplateColumns="repeat(1, 1fr)"
    gridTemplateRows="repeat(2, 1fr)"
  />
  `,
  'renames grid props and updates mapped values',
)
