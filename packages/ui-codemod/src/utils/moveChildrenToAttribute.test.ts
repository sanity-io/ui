import {type API, type FileInfo, type Options} from 'jscodeshift'

import {moveChildrenToAttribute} from './moveChildrenToAttribute'
import {defineInlineTest} from './testUtils'

function transform(fileInfo: FileInfo, api: API, options?: Options): string {
  const {
    name = 'text',
    stringOnly,
    element,
  } = options as {
    name?: string
    stringOnly?: boolean
    element?: string
  }
  const j = api.jscodeshift
  const root = j(fileInfo.source)

  root.find(j.JSXOpeningElement).forEach((path) => {
    if (element) {
      const tag = path.node.name

      if (tag.type !== 'JSXIdentifier' || tag.name !== element) {
        return
      }
    }

    moveChildrenToAttribute(j, path, name, {stringOnly})
  })

  return root.toSource()
}

defineInlineTest(
  transform,
  {},
  `
  <KBD>Ctrl</KBD>
  `,
  `
  <KBD text="Ctrl" />
  `,
  'moves static text children',
)

defineInlineTest(
  transform,
  {},
  `
  <KBD>{'Ctrl'}</KBD>
  `,
  `
  <KBD text={'Ctrl'} />
  `,
  'moves string literal expressions children',
)

defineInlineTest(
  transform,
  {},
  `
  <Badge>{label}</Badge>
  `,
  `
  <Badge text={label} />
  `,
  'moves a single expression child',
)

defineInlineTest(
  transform,
  {},
  `
  <Badge>{label}{suffix}</Badge>
  `,
  `
  <Badge text={<>{label}{suffix}</>} />
  `,
  'wraps and moves multiple expressions in a fragment',
)

defineInlineTest(
  transform,
  {element: 'Badge'},
  `
  <Badge><Text>{label}</Text></Badge>
  `,
  `
  <Badge text={<Text>{label}</Text>} />
  `,
  'moves a JSX element child onto the attribute',
)

defineInlineTest(
  transform,
  {},
  `
  <KBD text="Cmd">Ctrl</KBD>
  `,
  `
  // UI-CODEMOD TODO: Move children into the text prop
  <KBD text="Cmd">Ctrl</KBD>
  `,
  'warns when the target attribute is already set',
)

defineInlineTest(
  transform,
  {stringOnly: true},
  `
  <KBD>{'Ctrl'}</KBD>
  `,
  `
  <KBD text="Ctrl" />
  `,
  'moves string literal expression children when stringOnly is true',
)

defineInlineTest(
  transform,
  {stringOnly: true},
  `
  <Badge>{label}</Badge>
  `,
  `
  // UI-CODEMOD TODO: Move children into the text prop
  <Badge>{label}</Badge>
  `,
  'warns on single expression children when stringOnly is true',
)

defineInlineTest(
  transform,
  {stringOnly: true},
  `
  <Badge>{label}{suffix}</Badge>
  `,
  `
  // UI-CODEMOD TODO: Move children into the text prop
  <Badge>{label}{suffix}</Badge>
  `,
  'warns on multiple expressions when stringOnly is true',
)

defineInlineTest(
  transform,
  {element: 'Badge', stringOnly: true},
  `
  <Badge><Text>{label}</Text></Badge>
  `,
  `
  // UI-CODEMOD TODO: Move children into the text prop
  <Badge><Text>{label}</Text></Badge>
  `,
  'warns on JSX element child onto the attribute',
)
