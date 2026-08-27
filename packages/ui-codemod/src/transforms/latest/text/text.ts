import {type API, type FileInfo} from 'jscodeshift'

import type {BaseOptions} from '../../../types/BaseOptions'
import {addAttribute} from '../../../utils/addAttribute'
import {getComponentLocalNames} from '../../../utils/getComponentLocalNames'
import {getStyledComponentAliases} from '../../../utils/getStyledComponentAliases'
import {shouldTransformComponent} from '../../../utils/shouldTransformComponent'
import {transformAttributes} from '../../../utils/transformAttributes'
import {transformComponent} from '../../../utils/transformComponent'
import {transformImport} from '../../../utils/transformImport'
import {transformStyledComponents} from '../../../utils/transformStyledComponents'
import {TEXT_MODS} from './text.mods'

const TODO_WARNING = 'Please double check the Text migration below'

/** @internal */
export default function transform(
  fileInfo: FileInfo,
  api: API,
  options: BaseOptions,
): string | undefined {
  const {fromPackage, toPackage} = options || {}

  return transformComponent(fileInfo, api, ({j, root, markChanged}) => {
    const localNames = getComponentLocalNames(j, root, 'Text', options)
    const styledAliases = getStyledComponentAliases(
      j,
      root,
      'Text',
      fileInfo.path,
      localNames,
      options,
    )

    if (!shouldTransformComponent(j, root, 'Text', localNames, options, styledAliases)) {
      return
    }

    if (transformImport(j, root, 'Text', fromPackage, toPackage)) {
      markChanged()
    }

    root.find(j.JSXOpeningElement).forEach((path) => {
      let changed = false
      const name = path.node.name

      if (name.type !== 'JSXIdentifier' || !localNames.has(name.name)) {
        return
      }

      if (transformAttributes(j, path, TEXT_MODS, TODO_WARNING)) {
        changed = true
      }

      if (addAttribute(j, path.node, 'as', 'div')) {
        changed = true
      }

      if (addAttribute(j, path.node, 'trim', true)) {
        changed = true
      }

      if (changed) {
        markChanged()
      }
    })

    if (
      transformStyledComponents(j, root, styledAliases, () => true, {
        callback: (path) => {
          let changed = false

          if (transformAttributes(j, path, TEXT_MODS, TODO_WARNING)) {
            changed = true
          }

          if (addAttribute(j, path.node, 'as', 'div')) {
            changed = true
          }

          if (addAttribute(j, path.node, 'trim', true)) {
            changed = true
          }

          if (changed) {
            markChanged()
          }

          return changed
        },
      })
    ) {
      markChanged()
    }
  })
}
