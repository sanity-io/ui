import {defineInlineTest} from '../../../utils/testUtils'
import transform from './container'

defineInlineTest(
  transform,
  {fromPackage: '@legacy/ui', toPackage: '@sanity/ui'},
  `
  import {Container} from '@legacy/ui'

  <Container />
  `,
  `
  import {Container} from "@sanity/ui"

  <Container />
  `,
  'updates Container import path based on fromPackage and toPackage',
)

defineInlineTest(
  transform,
  {},
  `
  <Container width={2} />
  `,
  `
  <Container contentSize={2} />
  `,
  'renames width to contentSize',
)

defineInlineTest(
  transform,
  {},
  `
  <Container width={[1, 2, 3]} />
  `,
  `
  <Container contentSize={[1, 2, 3]} />
  `,
  'renames responsive width to contentSize',
)

defineInlineTest(
  transform,
  {},
  `
  <Container
    alignItems="center"
    flexDirection="row"
    flexWrap="wrap"
    justifyContent="center"
  />
  `,
  `
  <Container
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
  <Container
    gridAutoColumns="auto"
    gridAutoFlow="row"
    gridAutoRows="auto"
  />
  `,
  `
  <Container
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
  <Container
    gridTemplateColumns={1}
    gridTemplateRows={2}
  />
  `,
  `
  <Container
    style={{
      gridTemplateColumns: "repeat(1, 1fr)",
      gridTemplateRows: "repeat(2, 1fr)"
    }} />
  `,
  'moves grid props to style and updates mapped values',
)
