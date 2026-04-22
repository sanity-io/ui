import {defineInlineTest} from '../utils/testUtils'
import transform from './flex-props'

defineInlineTest(
  transform,
  {},
  `
  <Flex flex={1} />
  `,
  `
  <Flex style={{
    flex: 1
  }} />
  `,
  'moves flex prop to style',
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
