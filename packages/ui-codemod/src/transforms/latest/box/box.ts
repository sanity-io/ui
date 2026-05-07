import {type API, type FileInfo} from 'jscodeshift'

import type {BaseOptions} from '../../../types/BaseOptions'
import {transformAttributes} from '../../../utils/transformAttributes'
import {transformImport} from '../../../utils/transformImport'
import {BOX_MODS} from './box.mods'

const TODO_WARNING = 'Please double check the Box migration below'

/** @internal */
export default function transform(fileInfo: FileInfo, api: API, options?: BaseOptions): string {
  const j = api.jscodeshift
  const root = j(fileInfo.source)
  const {fromPackage, toPackage} = options || {}

  transformImport(j, root, 'Box', fromPackage, toPackage)

  root
    .find(j.JSXOpeningElement, {
      name: {type: 'JSXIdentifier', name: 'Box'},
    })
    .forEach((path) => {
      transformAttributes(j, path, BOX_MODS, TODO_WARNING)
    })

  return root.toSource()
}
