import {type API, type FileInfo} from 'jscodeshift'

import type {AttributeMods} from '../../types/AttributeMods'
import type {BaseOptions} from '../../types/BaseOptions'
import {addAttribute} from '../../utils/addAttribute'
import {transformAttributes} from '../../utils/transformAttributes'
import {transformImport} from '../../utils/transformImport'

const MODS: AttributeMods = {
  textOverflow: {
    type: 'rename-mapped',
    name: 'lineClamp',
    mapping: {
      ellipsis: 1,
      clip: 1,
    },
  },
}

/** @internal */
export const TODO_WARNING = 'Codemod could not migrate the Text component below'

/** @internal */
export default function transform(fileInfo: FileInfo, api: API, options: BaseOptions): string {
  const j = api.jscodeshift
  const root = j(fileInfo.source)
  const {fromPackage, toPackage} = options || {}

  transformImport(j, root, 'Text', fromPackage, toPackage)

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
