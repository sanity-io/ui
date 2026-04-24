import {type API, type FileInfo} from 'jscodeshift'

import type {AttributeMods} from '../types/AnyExpression'
import {defineInlineTest} from '../utils/testUtils'
import {transformAttributes} from './transformAttributes'

const MODS: AttributeMods = {
  border: {
    type: 'mapped-only',
    mapping: {
      default: true,
    },
  },
  borderWidth: {type: 'remove'},
  flex: {
    type: 'composite-mapped',
    composition: [
      {
        name: 'flexBasis',
        mapping: {
          auto: 'auto',
        },
      },
      {
        name: 'flexGrow',
        mapping: {
          auto: '1',
          1: '1',
        },
      },
      {
        name: 'flexShrink',
        mapping: {
          auto: '1',
        },
      },
    ],
  },
  insetTop: {
    type: 'rename-only',
    name: 'top',
  },
  sizing: {
    type: 'style-mapped',
    style: 'boxSizing',
    mapping: {
      border: 'border-box',
    },
  },
  textAlign: {
    type: 'style-only',
    style: 'textAlign',
  },
  width: {
    type: 'mapped-only',
    mapping: {
      fill: '100%',
      0: '20rem',
      1: '40rem',
      2: '60rem',
    },
  },
}

const TODO_WARNING = 'Warning'

function transform(fileInfo: FileInfo, api: API): string {
  const j = api.jscodeshift
  const root = j(fileInfo.source)

  root
    .find(j.JSXOpeningElement, {
      name: {type: 'JSXIdentifier', name: 'div'},
    })
    .forEach((path) => {
      transformAttributes(j, path, MODS, TODO_WARNING)
    })

  return root.toSource()
}

defineInlineTest(
  transform,
  {},
  `
  <div borderWidth={0.5} />
  `,
  `
  <div />
  `,
  'removes prop',
)

defineInlineTest(
  transform,
  {},
  `
  <div insetTop={0} />
  `,
  `
  <div top={0} />
  `,
  'renames prop',
)

defineInlineTest(
  transform,
  {},
  `
  <div width="fill" />
  `,
  `
  <div width="100%" />
  `,
  'updates mapped prop value',
)

defineInlineTest(
  transform,
  {},
  `
  <div width={[0, 1, 2]} />
  `,
  `
  <div width={["20rem", "40rem", "60rem"]} />
  `,
  'updates responsive mapped prop value',
)

defineInlineTest(
  transform,
  {},
  `
  <div border="default" />
  `,
  `
  <div border={true} />
  `,
  'updates boolean mapped prop value',
)

defineInlineTest(
  transform,
  {},
  `
  <div textAlign="center" />
  `,
  `
  <div style={{
    textAlign: "center"
  }} />
  `,
  'moves prop to style',
)

defineInlineTest(
  transform,
  {},
  `
  <div textAlign={\`center\`} />
  `,
  `
  <div style={{
    textAlign: \`center\`
  }} />
  `,
  'moves prop to style with template literal value',
)

defineInlineTest(
  transform,
  {},
  `
  <div sizing="border" />
  `,
  `
  <div style={{
    boxSizing: "border-box"
  }} />
  `,
  'moves prop to style and updates mapped value',
)

defineInlineTest(
  transform,
  {},
  `
  <div textAlign="center" style={{ background: "blue" }} />
  `,
  `
  <div
    style={{
      background: "blue",
      textAlign: "center"
    }} />
  `,
  'moves prop to style and preserves existing styles',
)

defineInlineTest(
  transform,
  {},
  `
  <div flex="auto" />
  `,
  `
  <div flexBasis="auto" flexGrow="1" flexShrink="1" />
  `,
  'splits up composite props and updates mapped prop value',
)

defineInlineTest(
  transform,
  {},
  `
  <div flex="1" />
  `,
  `
  <div flexGrow="1" />
  `,
  'splits up composite props and ignores undefined mapped prop values',
)

defineInlineTest(
  transform,
  {},
  `
  <div flex={["1", "auto"]} />
  `,
  `
  <div
    flexBasis={[undefined, "auto"]}
    flexGrow={["1", "1"]}
    flexShrink={[undefined, "1"]} />
  `,
  'splits up composite props and updates responsive mapped prop value',
)

defineInlineTest(
  transform,
  {},
  `
  <div width={3} />
  `,
  `
  // TODO: ${TODO_WARNING}
  <div width={3} />
  `,
  'warns if mapped prop value does not match mappings',
)

defineInlineTest(
  transform,
  {},
  `
  <div width={[2, 3]} />
  `,
  `
  // TODO: ${TODO_WARNING}
  <div width={[2, 3]} />
  `,
  'warns if responsive mapped prop value does not match mappings',
)

defineInlineTest(
  transform,
  {},
  `
  <div width={variable} />
  `,
  `
  // TODO: ${TODO_WARNING}
  <div width={variable} />
  `,
  'warns if mapped prop value is a variable',
)

defineInlineTest(
  transform,
  {},
  `
  <div width={variable ? 'fill' : 0} />
  `,
  `
  // TODO: ${TODO_WARNING}
  <div width={variable ? 'fill' : 0} />
  `,
  'warns if mapped prop value is a ternary',
)

defineInlineTest(
  transform,
  {},
  `
  <div width={\`fil\${\`l\`}\`} />
  `,
  `
  // TODO: ${TODO_WARNING}
  <div width={\`fil\${\`l\`}\`} />
  `,
  'warns if mapped prop value is a template literal with variable',
)

defineInlineTest(
  transform,
  {},
  `
  <div textAlign={["center", "left"]} />
  `,
  `
  // TODO: ${TODO_WARNING}
  <div textAlign={["center", "left"]} />
  `,
  'warns if responsive prop should be moved to style',
)

defineInlineTest(
  transform,
  {},
  `
  <div sizing={["content", "box"]} />
  `,
  `
  // TODO: ${TODO_WARNING}
  <div sizing={["content", "box"]} />
  `,
  'warns if responsive prop should be moved to style with updated values',
)

defineInlineTest(
  transform,
  {},
  `
  <div textAlign={\`cente\${\`r\`}\`} />
  `,
  `
  // TODO: ${TODO_WARNING}
  <div textAlign={\`cente\${\`r\`}\`} />
  `,
  'warns if prop with template literal value with variable should be moved to style',
)
