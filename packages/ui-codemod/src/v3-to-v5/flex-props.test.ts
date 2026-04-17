import {defineInlineTest} from '../utils/testUtils'
import transform, {TODO_WARNING} from './box-props'


defineInlineTest(
  transform,
  {},
  `
  <Box height="fill" />
  `,
  `
  <Box height="100%" />
  `,
  'updates prop value',
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
  'updates responsive prop value',
)

defineInlineTest(
  transform,
  {},
  `
  <Box column="full" />
  `,
  `
  <Box gridColumn="1 / -1" />
  `,
  'renames prop and updates value',
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
  'moves prop to style',
)

defineInlineTest(
  transform,
  {},
  `
  <Box sizing="content" />
  `,
  `
  <Box style={{
    boxSizing: "content-box"
  }} />
  `,
  'moves prop to style with updated value',
)

defineInlineTest(
  transform,
  {},
  `
  <Box sizing="content" style={{ background: 'blue' }} />
  `,
  `
  <Box
    style={{
      background: 'blue',
      boxSizing: "content-box"
    }} />
  `,
  'preserves existing styles',
)

defineInlineTest(
  transform,
  {},
  `
  <Box height={variable} />
  `,
  `
  // TODO: ${TODO_WARNING}
  <Box height={variable} />
  `,
  'comments if prop value is a variable',
)

defineInlineTest(
  transform,
  {},
  `
  <Box height={variable ? 'fill' : 'auto'} />
  `,
  `
  // TODO: ${TODO_WARNING}
  <Box height={variable ? 'fill' : 'auto'} />
  `,
  'comments if prop value is a ternary',
)

