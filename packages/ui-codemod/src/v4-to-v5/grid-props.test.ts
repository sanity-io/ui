import {defineInlineTest} from '../utils/testUtils'
import transform from './grid-props'

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
  'moves flex child props to style',
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
  'moves grid child props to style and updates mapped values',
)
