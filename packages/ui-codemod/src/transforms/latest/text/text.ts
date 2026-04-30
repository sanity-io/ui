import {type API, type FileInfo} from 'jscodeshift'

import type {BaseOptions} from '../../../types/BaseOptions'
import {addAttribute} from '../../../utils/addAttribute'
import {transformAttributes} from '../../../utils/transformAttributes'
import {transformImport} from '../../../utils/transformImport'
import {TEXT_MODS} from './text.mods'

const TODO_WARNING = 'Please double check the Text migration below'

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
      transformAttributes(j, path, TEXT_MODS, TODO_WARNING)
      addAttribute(j, path.node, 'as', 'div')
      addAttribute(j, path.node, 'trim', true)
    })

  return root.toSource()
}
