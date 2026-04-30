import {type API, type FileInfo} from 'jscodeshift'

import type {AttributeMods} from '../types/AttributeMods'
import {defineInlineTest} from '../utils/testUtils'
import {transformAttributes} from './transformAttributes'

const MODS: AttributeMods = {
  border: {
    type: 'mapped-only',
    mapping: {
      default: true,
      none: false,
    },
  },
  borderWidth: {type: 'remove'},
  flex: {
    type: 'shorthand-mapped',
    props: [
      {
        name: 'flexBasis',
        mapping: {
          auto: 'auto',
          1: '0%',
          2: '0%',
        },
      },
      {
        name: 'flexGrow',
        mapping: {
          auto: 1,
          1: 1,
          2: 2,
        },
      },
      {
        name: 'flexShrink',
        mapping: {
          auto: 1,
          1: 1,
          2: 1,
        },
      },
    ],
  },
  insetTop: {
    type: 'rename-only',
    name: 'top',
  },
  muted: {
    type: 'rename-mapped',
    name: 'tone',
    mapping: {
      true: 'neutral',
    },
  },
  padding: {
    type: 'composite',
    name: 'density',
    mapping: {
      compact: {
        padding: 3,
        radius: 2,
      },
    },
  },
  scheme: {
    type: 'warn-only',
    warning: 'Custom warning',
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
  <div border="none" />
  `,
  `
  <div border={false} />
  `,
  'updates boolean mapped prop value if false',
)

defineInlineTest(
  transform,
  {},
  `
  <div border />
  `,
  `
  <div border={true} />
  `,
  'skips updating mapped prop value if it matches existing',
)

defineInlineTest(
  transform,
  {},
  `
  <div muted />
  `,
  `
  <div tone="neutral" />
  `,
  'renames and updates boolean prop to mapped value',
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
  <div flexBasis="auto" flexGrow={1} flexShrink={1} />
  `,
  'splits up shorthand props and updates mapped prop value',
)

defineInlineTest(
  transform,
  {},
  `
  <div flex={["2", "auto"]} />
  `,
  `
  <div flexBasis={["0%", "auto"]} flexGrow={[2, 1]} flexShrink={[1, 1]} />
  `,
  'splits up shorthand props and updates responsive mapped prop value',
)

defineInlineTest(
  transform,
  {},
  `
  <div padding={3} radius={2} />
  `,
  `
  <div density="compact" />
  `,
  'combines composite props and updates mapped prop value',
)

defineInlineTest(
  transform,
  {},
  `
  <div scheme="light" width="fill" />
  `,
  `
  // UI-POC-CODEMOD TODO: Custom warning
  <div scheme="light" width="100%" />
  `,
  'warns with custom warning for warn prop',
)

defineInlineTest(
  transform,
  {},
  `
  <div width={3} />
  `,
  `
  // UI-POC-CODEMOD TODO: ${TODO_WARNING}
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
  // UI-POC-CODEMOD TODO: ${TODO_WARNING}
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
  // UI-POC-CODEMOD TODO: ${TODO_WARNING}
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
  // UI-POC-CODEMOD TODO: ${TODO_WARNING}
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
  // UI-POC-CODEMOD TODO: ${TODO_WARNING}
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
  // UI-POC-CODEMOD TODO: ${TODO_WARNING}
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
  // UI-POC-CODEMOD TODO: ${TODO_WARNING}
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
  // UI-POC-CODEMOD TODO: ${TODO_WARNING}
  <div textAlign={\`cente\${\`r\`}\`} />
  `,
  'warns if prop with template literal value with variable should be moved to style',
)

defineInlineTest(
  transform,
  {},
  `
  <div padding={3} />
  `,
  `
  // UI-POC-CODEMOD TODO: ${TODO_WARNING}
  <div padding={3} />
  `,
  'warns if composite prop does not include all mappings',
)

defineInlineTest(
  transform,
  {},
  `
  <div padding={[3, 4]} radius={2} />
  `,
  `
  // UI-POC-CODEMOD TODO: ${TODO_WARNING}
  <div padding={[3, 4]} radius={2} />
  `,
  'warns if composite prop includes responsive values',
)

defineInlineTest(
  transform,
  {},
  `
  <div padding={3} radius={variable} />
  `,
  `
  // UI-POC-CODEMOD TODO: ${TODO_WARNING}
  <div padding={3} radius={variable} />
  `,
  'warns if composite prop includes variable',
)

function transformWarnMissing(fileInfo: FileInfo, api: API): string {
  const j = api.jscodeshift
  const root = j(fileInfo.source)

  root
    .find(j.JSXOpeningElement, {
      name: {type: 'JSXIdentifier', name: 'div'},
    })
    .forEach((path) => {
      transformAttributes(
        j,
        path,
        {
          requiredProp: {
            type: 'warn-missing',
            warning: 'Missing',
          },
        },
        TODO_WARNING,
      )
    })

  return root.toSource()
}

defineInlineTest(
  transformWarnMissing,
  {},
  `
  <div />
  `,
  `
  // UI-POC-CODEMOD TODO: Missing
  <div />
  `,
  'warns with custom warning for warn missing prop',
)

defineInlineTest(
  transformWarnMissing,
  {},
  `
  <div requiredProp />
  `,
  `
  <div requiredProp />
  `,
  'does not warn for warn missing prop if prop is present',
)
