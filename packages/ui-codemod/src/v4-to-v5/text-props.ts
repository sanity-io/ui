import {type API, type FileInfo} from 'jscodeshift'

import {type AttributeMods} from '../types/AnyExpression'
import {addAttribute} from '../utils/addAttribute'
import {transformAttributes} from '../utils/transformAttributes'

const MODS: AttributeMods = {
  flex: {
    type: 'style-only',
    style: 'flex',
  },
  maxWidth: {
    type: 'style-mapped',
    style: 'maxWidth',
    mapping: {
      auto: 'none',
      fill: '100%',
      0: '20rem',
      1: '40rem',
      2: '60rem',
      3: '80rem',
      4: '100rem',
      5: '120rem',
    },
  },
  textOverflow: {
    type: 'rename-mapped',
    name: 'lineClamp',
    mapping: {
      ellipsis: 1,
      clip: 1,
    },
  },
}

export const TODO_WARNING = 'Codemod could not migrate the Text component below'

export default function transform(fileInfo: FileInfo, api: API): string {
  const j = api.jscodeshift
  const root = j(fileInfo.source)

  root
    .find(j.JSXOpeningElement, {
      name: {type: 'JSXIdentifier', name: 'Text'},
    })
    .forEach((path) => {
      transformAttributes(j, path, MODS, TODO_WARNING)
      addAttribute(j, path.node, 'trim', true)
    })

  return root.toSource()
}
