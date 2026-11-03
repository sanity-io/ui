import {type API, type FileInfo} from 'jscodeshift'

import type {BaseOptions} from '../../../types/BaseOptions'
import {getComponentLocalNames} from '../../../utils/getComponentLocalNames'
import {getStyledComponentAliases} from '../../../utils/getStyledComponentAliases'
import {shouldTransformComponent} from '../../../utils/shouldTransformComponent'
import {transformAttributes} from '../../../utils/transformAttributes'
import {transformComponent} from '../../../utils/transformComponent'
import {transformImport} from '../../../utils/transformImport'
import {transformStyledComponents} from '../../../utils/transformStyledComponents'
import {CHECKBOX_MODS} from './checkbox.mods'

const TODO_WARNING = 'Please double check the Checkbox migration below'

/** @internal */
export default function transform(
  fileInfo: FileInfo,
  api: API,
  options?: BaseOptions,
): string | undefined {
  const {fromPackage, toPackage} = options || {}

  return transformComponent(fileInfo, api, ({j, root, markChanged}) => {
    const localNames = getComponentLocalNames(j, root, 'Checkbox', options)
    const styledAliases = getStyledComponentAliases(
      j,
      root,
      'Checkbox',
      fileInfo.path,
      localNames,
      options,
    )

    if (!shouldTransformComponent(j, root, 'Checkbox', localNames, options, styledAliases)) {
      return
    }

    if (transformImport(j, root, 'Checkbox', fromPackage, toPackage)) {
      markChanged()
    }

    root.find(j.JSXOpeningElement).forEach((path) => {
      const name = path.node.name

      if (name.type !== 'JSXIdentifier' || !localNames.has(name.name)) {
        return
      }

      if (transformAttributes(j, path, CHECKBOX_MODS, TODO_WARNING)) {
        markChanged()
      }
    })

    if (
      transformStyledComponents(j, root, styledAliases, () => true, {
        callback: (path) => transformAttributes(j, path, CHECKBOX_MODS, TODO_WARNING),
      })
    ) {
      markChanged()
    }
  })
}
