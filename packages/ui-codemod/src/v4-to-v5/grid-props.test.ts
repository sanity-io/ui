import {defineInlineTest} from '../utils/testUtils'
import transform, {TODO_WARNING} from './grid-props'

defineInlineTest(
  transform,
  {},
  `
  <Grid borderWidth={0.5} />
  `,
  `
  <Grid />
  `,
  'removes deprecated prop',
)

defineInlineTest(
  transform,
  {},
  `
  <Grid insetTop={0} />
  `,
  `
  <Grid top={0} />
  `,
  'renames prop',
)

defineInlineTest(
  transform,
  {},
  `
  <Grid width="fill" />
  `,
  `
  <Grid width="100%" />
  `,
  'updates prop value',
)

defineInlineTest(
  transform,
  {},
  `
  <Grid border="muted" />
  `,
  `
  <Grid border={true} />
  `,
  'updates boolean prop value',
)

defineInlineTest(
  transform,
  {},
  `
  <Grid width={[0, 1, 2]} />
  `,
  `
  <Grid width={["20rem", "40rem", "60rem"]} />
  `,
  'updates responsive prop value',
)

defineInlineTest(
  transform,
  {},
  `
  <Grid textAlign="center" />
  `,
  `
  <Grid style={{
    textAlign: "center"
  }} />
  `,
  'moves prop to style',
)

defineInlineTest(
  transform,
  {},
  `
  <Grid sizing="border" />
  `,
  `
  <Grid style={{
    boxSizing: "border-box"
  }} />
  `,
  'moves prop to style with updated value',
)

defineInlineTest(
  transform,
  {},
  `
  <Grid textAlign={\`center\`} />
  `,
  `
  <Grid style={{
    textAlign: \`center\`
  }} />
  `,
  'moves prop to style with updated template literal value',
)

defineInlineTest(
  transform,
  {},
  `
  <Grid textAlign="center" style={{ background: 'blue' }} />
  `,
  `
  <Grid
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
  <Grid textAlign={["center", "left"]} />
  `,
  `
  // TODO: ${TODO_WARNING}
  <Grid textAlign={["center", "left"]} />
  `,
  'comments if responsive prop should be moved to style',
)

defineInlineTest(
  transform,
  {},
  `
  <Grid sizing={["content", "box"]} />
  `,
  `
  // TODO: ${TODO_WARNING}
  <Grid sizing={["content", "box"]} />
  `,
  'comments if responsive prop value should be updated and moved to style',
)

defineInlineTest(
  transform,
  {},
  `
  <Grid textAlign={variable} />
  `,
  `
  // TODO: ${TODO_WARNING}
  <Grid textAlign={variable} />
  `,
  'comments if prop value is a variable',
)

defineInlineTest(
  transform,
  {},
  `
  <Grid textAlign={variable ? 'center' : 'left'} />
  `,
  `
  // TODO: ${TODO_WARNING}
  <Grid textAlign={variable ? 'center' : 'left'} />
  `,
  'comments if prop value is a ternary',
)

defineInlineTest(
  transform,
  {},
  `
  <Grid alignItems={\`lef\${\`t\`}\`} />
  `,
  `
  // TODO: ${TODO_WARNING}
  <Grid alignItems={\`lef\${\`t\`}\`} />
  `,
  'comments if prop value is a template literal with variable',
)
