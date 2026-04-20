import {type API, type FileInfo} from 'jscodeshift'

import {type AttributeMods} from '../types/AnyExpression'
import {transformAttributes} from '../utils/transformAttributes'

const MODS: AttributeMods = {
  align: {
    type: 'rename-only',
    name: 'alignItems',
  },
  direction: {
    type: 'rename-only',
    name: 'flexDirection',
  },
  flex: {
    type: 'style-only',
    style: 'flex',
  },
  wrap: {
    type: 'rename-only',
    name: 'flexWrap',
  },
  justify: {
    type: 'rename-only',
    name: 'justifyContent',
  },
}

export const TODO_WARNING = 'Codemod could not update the prop below'

export default function transform(fileInfo: FileInfo, api: API): string {
  const j = api.jscodeshift
  const root = j(fileInfo.source)

  root
    .find(j.JSXOpeningElement, {
      name: {type: 'JSXIdentifier', name: 'Flex'},
    })
    .forEach((path) => {
      transformAttributes(j, path, MODS, TODO_WARNING)
    })

  return root.toSource()
}
