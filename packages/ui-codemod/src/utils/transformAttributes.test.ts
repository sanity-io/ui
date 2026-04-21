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
