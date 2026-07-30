import {type API, type FileInfo} from 'jscodeshift'

import type {BaseOptions} from '../../../types/BaseOptions'
import {getComponentLocalNames} from '../../../utils/getComponentLocalNames'
import {shouldTransformComponent} from '../../../utils/shouldTransformComponent'
import {transformAttributes} from '../../../utils/transformAttributes'
import {transformComponent} from '../../../utils/transformComponent'
import {transformImport} from '../../../utils/transformImport'
import {CONTAINER_MODS} from './container.mods'

const TODO_WARNING = 'Please double check the Container migration below'

/** @internal */
export default function transform(
  fileInfo: FileInfo,
  api: API,
  options?: BaseOptions,
): string | undefined {
  const {fromPackage, toPackage} = options || {}

  return transformComponent(fileInfo, api, ({j, root, markChanged}) => {
    const localNames = getComponentLocalNames(j, root, 'Container', options)

    if (!shouldTransformComponent(j, root, 'Container', localNames, options)) {
      return
    }

    if (transformImport(j, root, 'Container', fromPackage, toPackage)) {
      markChanged()
    }

    root
      .find(j.JSXOpeningElement, {
        name: {type: 'JSXIdentifier', name: 'Container'},
      })
      .forEach((path) => {
        if (transformAttributes(j, path, CONTAINER_MODS, TODO_WARNING)) {
          markChanged()
        }
      })
  })
}
