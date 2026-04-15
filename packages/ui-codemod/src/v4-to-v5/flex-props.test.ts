import {defineInlineTest} from '../utils/testUtils'
import transform, {TODO_WARNING} from './flex-props'

defineInlineTest(
  transform,
  {},
  `
  <Flex borderWidth={0.5} />
  `,
  `
  <Flex />
  `,
  'removes deprecated prop',
)

defineInlineTest(
  transform,
  {},
  `
  <Flex align="center" />
  `,
  `
  <Flex alignItems="center" />
  `,
  'renames prop',
)

defineInlineTest(
  transform,
  {},
  `
  <Flex width="fill" />
  `,
  `
  <Flex width="100%" />
  `,
  'updates prop value',
)

defineInlineTest(
  transform,
  {},
  `
  <Flex border="muted" />
  `,
  `
  <Flex border={true} />
  `,
  'updates boolean prop value',
)

defineInlineTest(
  transform,
  {},
  `
  <Flex width={[0, 1, 2]} />
  `,
  `
  <Flex width={["20rem", "40rem", "60rem"]} />
  `,
  'updates responsive prop value',
)

defineInlineTest(
  transform,
  {},
  `
  <Flex textAlign="center" />
  `,
  `
  <Flex style={{
    textAlign: "center"
  }} />
  `,
  'moves prop to style',
)

defineInlineTest(
  transform,
  {},
  `
  <Flex sizing="border" />
  `,
  `
  <Flex style={{
    boxSizing: "border-box"
  }} />
  `,
  'moves prop to style with updated value',
)

defineInlineTest(
  transform,
  {},
  `
  <Flex textAlign={\`center\`} />
  `,
  `
  <Flex style={{
    textAlign: \`center\`
  }} />
  `,
  'moves prop to style with updated template literal value',
)

defineInlineTest(
  transform,
  {},
  `
  <Flex textAlign="center" style={{ background: 'blue' }} />
  `,
  `
  <Flex
    style={{
      background: 'blue',
      textAlign: "center"
    }} />
  `,
  'preserves existing styles',
)

defineInlineTest(
  transform,
  {},
  `
  <Flex textAlign={["center", "left"]} />
  `,
  `
  // TODO: ${TODO_WARNING}
  <Flex textAlign={["center", "left"]} />
  `,
  'comments if responsive prop should be moved to style',
)

defineInlineTest(
  transform,
  {},
  `
  <Flex sizing={["content", "box"]} />
  `,
  `
  // TODO: ${TODO_WARNING}
  <Flex sizing={["content", "box"]} />
  `,
  'comments if responsive prop value should be updated and moved to style',
)

defineInlineTest(
  transform,
  {},
  `
  <Flex textAlign={variable} />
  `,
  `
  // TODO: ${TODO_WARNING}
  <Flex textAlign={variable} />
  `,
  'comments if prop value is a variable',
)

defineInlineTest(
  transform,
  {},
  `
  <Flex textAlign={variable ? 'center' : 'left'} />
  `,
  `
  // TODO: ${TODO_WARNING}
  <Flex textAlign={variable ? 'center' : 'left'} />
  `,
  'comments if prop value is a ternary',
)

defineInlineTest(
  transform,
  {},
  `
  <Flex textAlign={\`lef\${\`t\`}\`} />
  `,
  `
  // TODO: ${TODO_WARNING}
  <Flex textAlign={\`lef\${\`t\`}\`} />
  `,
  'comments if prop value is a template literal with variable',
)
