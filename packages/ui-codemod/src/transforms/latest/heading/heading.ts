import {type API, type FileInfo} from 'jscodeshift'

import type {BaseOptions} from '../../../types/BaseOptions'
import {addAttribute} from '../../../utils/addAttribute'
import {getComponentLocalNames} from '../../../utils/getComponentLocalNames'
import {shouldTransformComponent} from '../../../utils/shouldTransformComponent'
import {transformAttributes} from '../../../utils/transformAttributes'
import {transformComponent} from '../../../utils/transformComponent'
import {transformImport} from '../../../utils/transformImport'
import {HEADING_MODS} from './heading.mods'

const TODO_WARNING = 'Please double check the Heading migration below'

/** @internal */
export default function transform(
  fileInfo: FileInfo,
  api: API,
  options: BaseOptions,
): string | undefined {
  const {fromPackage, toPackage} = options || {}

  return transformComponent(fileInfo, api, ({j, root, markChanged}) => {
    const localNames = getComponentLocalNames(j, root, 'Heading', options)

    if (!shouldTransformComponent(j, root, 'Heading', localNames, options)) {
      return
    }

    if (transformImport(j, root, 'Heading', fromPackage, toPackage)) {
      markChanged()
    }

    root
      .find(j.JSXOpeningElement, {
        name: {type: 'JSXIdentifier', name: 'Heading'},
      })
      .forEach((path) => {
        let changed = false

        if (transformAttributes(j, path, HEADING_MODS, TODO_WARNING)) {
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
