import {defineInlineTest} from '../../utils/testUtils'
import transform from './grid'

defineInlineTest(
  transform,
  {fromPackage: '@legacy/ui', toPackage: '@sanity/ui'},
  `
  import {Grid} from '@legacy/ui'

  <Grid />
  `,
  `
  import {Grid} from "@sanity/ui"

  <Grid />
  `,
  'updates Grid import path based on fromPackage and toPackage',
)

defineInlineTest(
  transform,
  {},
  `
  <Grid
    alignItems="center"
    flexDirection="row"
    flexWrap="wrap"
    justifyContent="center"
  />
  `,
  `
  <Grid
    style={{
      alignItems: "center",
      flexDirection: "row",
      flexWrap: "wrap",
      justifyContent: "center"
    }} />
  `,
  'moves flex props to style',
)

defineInlineTest(
  transform,
  {},
  `
  <Grid
    gridTemplateColumns={1}
    gridTemplateRows={2}
  />
  `,
  `
  <Grid
    gridTemplateColumns="repeat(1, 1fr)"
    gridTemplateRows="repeat(2, 1fr)"
  />
  `,
  'updates grid props mapped values',
)

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
  'renames v3 grid props',
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
  'updates v3 grid props mapped values',
)
