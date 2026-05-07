import {type API, type FileInfo} from 'jscodeshift'

import type {BaseOptions} from '../../../types/BaseOptions'
import {transformAttributes} from '../../../utils/transformAttributes'
import {transformImport} from '../../../utils/transformImport'
import {CONTAINER_MODS} from './container.mods'

const TODO_WARNING = 'Please double check the Container migration below'

/** @internal */
export default function transform(fileInfo: FileInfo, api: API, options?: BaseOptions): string {
  const j = api.jscodeshift
  const root = j(fileInfo.source)
  const {fromPackage, toPackage} = options || {}

  transformImport(j, root, 'Container', fromPackage, toPackage)

  root
    .find(j.JSXOpeningElement, {
      name: {type: 'JSXIdentifier', name: 'Container'},
    })
    .forEach((path) => {
      transformAttributes(j, path, CONTAINER_MODS, TODO_WARNING)
    })

  return root.toSource()
}
