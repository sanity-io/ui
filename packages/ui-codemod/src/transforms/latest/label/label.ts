import {type API, type FileInfo} from 'jscodeshift'

import type {BaseOptions} from '../../../types/BaseOptions'
import {addAttribute} from '../../../utils/addAttribute'
import {getComponentLocalNames} from '../../../utils/getComponentLocalNames'
import {getStyledComponentAliases} from '../../../utils/getStyledComponentAliases'
import {replaceElement} from '../../../utils/replaceElement'
import {shouldTransformComponent} from '../../../utils/shouldTransformComponent'
import {transformAttributes} from '../../../utils/transformAttributes'
import {transformComponent} from '../../../utils/transformComponent'
import {transformImport} from '../../../utils/transformImport'
import {transformStyledComponents} from '../../../utils/transformStyledComponents'
import {LABEL_MODS} from './label.mods'

const TODO_WARNING = 'Please double check the Label migration below'

/** @internal */
export default function transform(
  fileInfo: FileInfo,
  api: API,
  options: BaseOptions,
): string | undefined {
  const {fromPackage, toPackage} = options || {}

  return transformComponent(fileInfo, api, ({j, root, markChanged}) => {
    const localNames = getComponentLocalNames(j, root, 'Label', options)
    const styledAliases = getStyledComponentAliases(
      j,
      root,
      'Label',
      fileInfo.path,
      localNames,
      options,
    )

    if (!shouldTransformComponent(j, root, 'Label', localNames, options, styledAliases)) {
      return
    }

    if (transformImport(j, root, 'Label', fromPackage, toPackage)) {
      markChanged()
    }

    if (
      replaceElement(
        j,
        root,
        () => true,
        {
          element: 'Label',
          localNames,
        },
        {
          element: 'Eyebrow',
          callback: (path) => {
            let changed = false

            if (transformAttributes(j, path, LABEL_MODS, TODO_WARNING)) {
              changed = true
            }

            if (addAttribute(j, path.node, 'as', 'div')) {
              changed = true
            }

            if (addAttribute(j, path.node, 'trim', true)) {
              changed = true
            }

            return changed
          },
        },
      )
    ) {
      markChanged()
    }

    if (
      transformStyledComponents(j, root, styledAliases, () => true, {
        callback: (path) => {
          let changed = false

          if (transformAttributes(j, path, LABEL_MODS, TODO_WARNING)) {
            changed = true
          }

          if (addAttribute(j, path.node, 'as', 'div')) {
            changed = true
          }

          if (addAttribute(j, path.node, 'trim', true)) {
            changed = true
          }

          return changed
        },
      })
    ) {
      markChanged()
    }
  })
}
