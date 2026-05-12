import {type API, type FileInfo} from 'jscodeshift'

import type {BaseOptions} from '../../../types/BaseOptions'
import {addAttribute} from '../../../utils/addAttribute'
import {transformAttributes} from '../../../utils/transformAttributes'
import {transformImport} from '../../../utils/transformImport'
import {CODE_MODS} from './code.mods'

const TODO_WARNING = 'Please double check the Code migration below'

/** @internal */
export default function transform(fileInfo: FileInfo, api: API, options: BaseOptions): string {
  const j = api.jscodeshift
  const root = j(fileInfo.source)
  const {fromPackage, toPackage} = options || {}

  transformImport(j, root, 'Code', fromPackage, toPackage)

  root
    .find(j.JSXOpeningElement, {
      name: {type: 'JSXIdentifier', name: 'Code'},
    })
    .forEach((path) => {
      transformAttributes(j, path, CODE_MODS, TODO_WARNING)
      addAttribute(j, path.node, 'trim', true)
    })

  return root.toSource()
}
