import {type API, type FileInfo} from 'jscodeshift'

import type {BaseOptions} from '../../../types/BaseOptions'
import {addAttribute} from '../../../utils/addAttribute'
import {getComponentLocalNames} from '../../../utils/getComponentLocalNames'
import {shouldTransformComponent} from '../../../utils/shouldTransformComponent'
import {transformAttributes} from '../../../utils/transformAttributes'
import {transformComponent} from '../../../utils/transformComponent'
import {transformImport} from '../../../utils/transformImport'
import {CODE_MODS} from './code.mods'

const TODO_WARNING = 'Please double check the Code migration below'

/** @internal */
export default function transform(
  fileInfo: FileInfo,
  api: API,
  options: BaseOptions,
): string | undefined {
  const {fromPackage, toPackage} = options || {}

  return transformComponent(fileInfo, api, ({j, root, markChanged}) => {
    const localNames = getComponentLocalNames(j, root, 'Code', options)

    if (!shouldTransformComponent(j, root, 'Code', localNames, options)) {
      return
    }

    if (transformImport(j, root, 'Code', fromPackage, toPackage)) {
      markChanged()
    }

    root
      .find(j.JSXOpeningElement, {
        name: {type: 'JSXIdentifier', name: 'Code'},
      })
      .forEach((path) => {
        let changed = false

        if (transformAttributes(j, path, CODE_MODS, TODO_WARNING)) {
          changed = true
        }

        if (addAttribute(j, path.node, 'trim', true)) {
          changed = true
        }

        if (changed) {
          markChanged()
        }
      })
  })
}
