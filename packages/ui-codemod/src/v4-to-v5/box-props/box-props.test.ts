import {defineInlineTest} from '../../utils/testUtils'
import transform, {TODO_WARNING} from './box-props'

defineInlineTest(
  transform,
  {},
  `
  <Box borderWidth={0.5} />
  `,
  `
  <Box />
  `,
  'removes deprecated prop',
)

defineInlineTest(
  transform,
  {},
  `
  <Box insetTop={0} />
  `,
  `
  <Box top={0} />
  `,
  'renames prop',
)

defineInlineTest(
  transform,
  {},
  `
  <Box width="fill" />
  `,
  `
  <Box width="100%" />
  `,
  'updates prop value',
)

defineInlineTest(
  transform,
  {},
  `
  <Box border="muted" />
  `,
  `
  <Box border={true} />
  `,
  'updates boolean prop value',
)

defineInlineTest(
  transform,
  {},
  `
  <Box width={[0, 1, 2]} />
  `,
  `
  <Box width={["20rem", "40rem", "60rem"]} />
  `,
  'updates responsive prop value',
)

defineInlineTest(
  transform,
  {},
  `
  <Box alignItems="center" />
  `,
  `
  <Box style={{
    alignItems: "center"
  }} />
  `,
  'moves prop to style',
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
  'moves prop to style with updated value',
)

defineInlineTest(
  transform,
  {},
  `
  <Box alignItems={\`center\`} />
  `,
  `
  <Box style={{
    alignItems: \`center\`
  }} />
  `,
  'moves prop to style with updated template literal value',
)

defineInlineTest(
  transform,
  {},
  `
  <Box alignItems="center" style={{ background: 'blue' }} />
  `,
  `
  <Box
    style={{
      background: 'blue',
      alignItems: "center"
    }} />
  `,
  'preserves existing styles',
)

defineInlineTest(
  transform,
  {},
  `
  <Box alignItems={["center", "flex-start"]} />
  `,
  `
  // TODO: ${TODO_WARNING}
  <Box alignItems={["center", "flex-start"]} />
  `,
  'comments if responsive prop should be moved to style',
)

defineInlineTest(
  transform,
  {},
  `
  <Box sizing={["content", "box"]} />
  `,
  `
  // TODO: ${TODO_WARNING}
  <Box sizing={["content", "box"]} />
  `,
  'comments if responsive prop value should be updated and moved to style',
)

defineInlineTest(
  transform,
  {},
  `
  <Box alignItems={variable} />
  `,
  `
  // TODO: ${TODO_WARNING}
  <Box alignItems={variable} />
  `,
  'comments if prop value is a variable',
)

defineInlineTest(
  transform,
  {},
  `
  <Box alignItems={variable ? 'center' : 'flex-start'} />
  `,
  `
  // TODO: ${TODO_WARNING}
  <Box alignItems={variable ? 'center' : 'flex-start'} />
  `,
  'comments if prop value is a ternary',
)

defineInlineTest(
  transform,
  {},
  `
  <Box alignItems={\`flex\${\`-start\`}\`} />
  `,
  `
  // TODO: ${TODO_WARNING}
  <Box alignItems={\`flex\${\`-start\`}\`} />
  `,
  'comments if prop value is a template literal with variable',
)
