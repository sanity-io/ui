import {type API, type FileInfo} from 'jscodeshift'

import {defineInlineTest} from '../utils/testUtils'
import { addAttribute } from './addAttribute'

function transform(fileInfo: FileInfo, api: API): string {
  const j = api.jscodeshift
  const root = j(fileInfo.source)

  root
    .find(j.JSXOpeningElement, {
      name: {type: 'JSXIdentifier', name: 'div'},
    })
    .forEach((path) => {
      addAttribute(j, path.node, 'trim', true)
    })

  return root.toSource()
}

defineInlineTest(
  transform,
  {},
  `
  <div />
  `,
  `
  <div trim={true} />
  `,
  'adds prop',
)

defineInlineTest(
  transform,
  {},
  `
  <div width="100%" />
  `,
  `
  <div width="100%" trim={true} />
  `,
  'adds prop and preserves existing props',
)
