import {type API, type FileInfo} from 'jscodeshift'

import type {BaseOptions} from '../../types/BaseOptions'
import {addAttribute} from '../../utils/addAttribute'
import {transformImport} from '../../utils/transformImport'

/** @internal */
export const TODO_WARNING = 'Codemod could not migrate the Text component below'

/** @internal */
export default function transform(fileInfo: FileInfo, api: API, options: BaseOptions): string {
  const j = api.jscodeshift
  const root = j(fileInfo.source)
  const {fromPackage, toPackage} = options || {}

  transformImport(j, root, 'Heading', fromPackage, toPackage)

  root
    .find(j.JSXOpeningElement, {
      name: {type: 'JSXIdentifier', name: 'Heading'},
    })
    .forEach((path) => {
      addAttribute(j, path.node, 'trim', true)
    })

  return root.toSource()
}
