import {defineInlineTest} from '../../utils/testUtils'
import transform from './box-props'

defineInlineTest(
  transform,
  {fromPackage: '@legacy/ui', toPackage: '@sanity/ui'},
  `
  import {Box} from '@legacy/ui'

  <Box />
  `,
  `
  import {Box} from "@sanity/ui"

  <Box />
  `,
  'updates Box import path based on fromPackage and toPackage',
)

defineInlineTest(
  transform,
  {},
  `
  <Box flex={1} />
  `,
  `
  <Box style={{
    flex: 1
  }} />
  `,
  'moves flex prop to style',
)

defineInlineTest(
  transform,
  {},
  `
  <Box height="fill" />
  `,
  `
  <Box height="100%" />
  `,
  'updates height prop',
)

defineInlineTest(
  transform,
  {},
  `
  <Box height={["fill", "auto", "fill"]} />
  `,
  `
  <Box height={["100%", "auto", "100%"]} />
  `,
  'updates responsive height prop',
)

defineInlineTest(
  transform,
  {},
  `
  <Box sizing="border" />
  `,
  `
  <Box style={{
    boxSizing: "border-box"
  }} />
  `,
  'moves sizing prop to style and updates mapped value',
)

defineInlineTest(
  transform,
  {},
  `
  <Box sizing="border" />
  `,
  `
  <Box style={{
    boxSizing: "border-box"
  }} />
  `,
  'moves sizing prop to style and updates mapped value',
)

defineInlineTest(
  transform,
  {},
  `
  <Box
    column="full"
    columnStart={2}
    columnEnd={4}
  />
  `,
  `
  <Box
    gridColumn="1 / -1"
    gridColumnStart="2"
    gridColumnEnd="4"
  />
  `,
  'renames grid column props and updates mapped values',
)

defineInlineTest(
  transform,
  {},
  `
  <Box
    row="full"
    rowStart={2}
    rowEnd={4}
  />
  `,
  `
  <Box
    gridRow="1 / -1"
    gridRowStart="2"
    gridRowEnd="4"
  />
  `,
  'renames grid row props and updates mapped values',
)
