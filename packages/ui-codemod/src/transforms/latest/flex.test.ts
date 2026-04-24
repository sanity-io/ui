import {defineInlineTest} from '../../utils/testUtils'
import transform from './flex'

defineInlineTest(
  transform,
  {fromPackage: '@legacy/ui', toPackage: '@sanity/ui'},
  `
  import {Flex} from '@legacy/ui'

  <Flex />
  `,
  `
  import {Flex} from "@sanity/ui"

  <Flex />
  `,
  'updates Flex import path based on fromPackage and toPackage',
)

defineInlineTest(
  transform,
  {},
  `
  <Flex
    align="center"
    direction="row"
    wrap="wrap"
    justify="center"
  />
  `,
  `
  <Flex
    alignItems="center"
    flexDirection="row"
    flexWrap="wrap"
    justifyContent="center"
  />
  `,
  'renames flex props',
)

defineInlineTest(
  transform,
  {},
  `
  <Flex
    gridAutoColumns="auto"
    gridAutoFlow="row"
    gridAutoRows="auto"
  />
  `,
  `
  <Flex
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
  <Flex
    gridTemplateColumns={1}
    gridTemplateRows={2}
  />
  `,
  `
  <Flex
    style={{
      gridTemplateColumns: "repeat(1, 1fr)",
      gridTemplateRows: "repeat(2, 1fr)"
    }} />
  `,
  'moves grid props to style and updates mapped values',
)
