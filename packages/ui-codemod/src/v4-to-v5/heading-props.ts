import {type API, type FileInfo} from 'jscodeshift'

import {type AttributeMods} from '../types/AnyExpression'
import {transformAttributes} from '../utils/transformAttributes'
import { addAttribute } from '../utils/addAttribute'
import { hasAttribute } from '../utils/hasAttribute'
import { insertTodoWarning } from '../utils/insertTodoWarning'

const MODS: AttributeMods = {
  flex: {
    type: 'style-only',
    style: 'flex',
  },
  maxWidth: {
    type: 'style-mapped',
    style: 'maxWidth',
    mappings: {
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
    mappings: {
      ellipsis: 1,
      clip: 1,
    },
  },
  width: {
    type: 'style-mapped',
    style: 'width',
    mappings: {
      auto: 'auto',
      fill: '100%',
      stretch: 'stretch',
      min: 'min-content',
      max: 'max-content',
      0: '20rem',
      1: '40rem',
      2: '60rem',
      3: '80rem',
      4: '100rem',
      5: '120rem',
    },
  },
}

export const TODO_WARNING = 'Codemod could not migrate the Heading component below'

export default function transform(fileInfo: FileInfo, api: API): string {
  const j = api.jscodeshift
  const root = j(fileInfo.source)

  root
    .find(j.JSXOpeningElement, {
      name: {type: 'JSXIdentifier', name: 'Heading'},
    })
    .forEach((path) => {
      transformAttributes(j, path, MODS, TODO_WARNING)
      addAttribute(j, path.node, 'trim', true)

      if (!hasAttribute(path.node, 'as')) {
        insertTodoWarning(j, path, 'Codemod migrated Heading component but "as" is required')
      }
    })

  return root.toSource()
}
