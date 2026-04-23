import {defineInlineTest} from '../../../utils/testUtils'
import transform from './transform'

defineInlineTest(
  transform,
  {},
  `
  <Box
    alignItems="center"
    flexDirection="row"
    flexWrap="wrap"
    justifyContent="center"
  />
  `,
  `
  <Box
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
  <Box
    gridAutoColumns="auto"
    gridAutoFlow="row"
    gridAutoRows="auto"
  />
  `,
  `
  <Box
    style={{
      gridAutoColumns: "auto",
      gridAutoFlow: "row",
      gridAutoRows: "auto"
    }} />
  `,
  'moves grid props to style',
)

defineInlineTest(
  transform,
  {},
  `
  <Box
    gridTemplateColumns={1}
    gridTemplateRows={2}
  />
  `,
  `
  <Box
    style={{
      gridTemplateColumns: "repeat(1, 1fr)",
      gridTemplateRows: "repeat(2, 1fr)"
    }} />
  `,
  'moves grid props to style and updates mapped values',
)
