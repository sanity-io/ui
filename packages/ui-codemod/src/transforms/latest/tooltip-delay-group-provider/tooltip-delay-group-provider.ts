import {type API, type FileInfo} from 'jscodeshift'

import type {BaseOptions} from '../../../types/BaseOptions'
import {getComponentLocalNames} from '../../../utils/getComponentLocalNames'
import {getStyledComponentAliases} from '../../../utils/getStyledComponentAliases'
import {replaceElement} from '../../../utils/replaceElement'
import {shouldTransformComponent} from '../../../utils/shouldTransformComponent'
import {transformAttributes} from '../../../utils/transformAttributes'
import {transformComponent} from '../../../utils/transformComponent'
import {transformImport} from '../../../utils/transformImport'
import {transformStyledComponents} from '../../../utils/transformStyledComponents'
import {TOOLTIP_DELAY_GROUP_PROVIDER_MODS} from './tooltip-delay-group-provider.mods'

const TODO_WARNING = 'Please double check the TooltipDelayGroupProvider migration below'

/** @internal */
export default function transform(
  fileInfo: FileInfo,
  api: API,
  options?: BaseOptions,
): string | undefined {
  const {fromPackage, toPackage} = options || {}

  return transformComponent(fileInfo, api, ({j, root, markChanged}) => {
    const localNames = getComponentLocalNames(j, root, 'TooltipDelayGroupProvider', options)
    const styledAliases = getStyledComponentAliases(
      j,
      root,
      'TooltipDelayGroupProvider',
      fileInfo.path,
      localNames,
      options,
    )

    if (
      !shouldTransformComponent(
        j,
        root,
        'TooltipDelayGroupProvider',
        localNames,
        options,
        styledAliases,
      )
    ) {
      return
    }

    if (transformImport(j, root, 'TooltipDelayGroupProvider', fromPackage, toPackage)) {
      markChanged()
    }

    if (
      replaceElement(
        j,
        root,
        () => true,
        {
          element: 'TooltipDelayGroupProvider',
          localNames,
        },
        {
          element: 'TooltipGroup',
          callback: (path) => {
            let changed = false

            if (transformAttributes(j, path, TOOLTIP_DELAY_GROUP_PROVIDER_MODS, TODO_WARNING)) {
              changed = true
            }

            return changed
          },
        },
      )
    ) {
      markChanged()
    }

    root.find(j.JSXOpeningElement).forEach((path) => {
      const name = path.node.name

      if (name.type !== 'JSXIdentifier' || !localNames.has(name.name)) {
        return
      }

      if (transformAttributes(j, path, TOOLTIP_DELAY_GROUP_PROVIDER_MODS, TODO_WARNING)) {
        markChanged()
      }
    })

    if (
      transformStyledComponents(j, root, styledAliases, () => true, {
        callback: (path) =>
          transformAttributes(j, path, TOOLTIP_DELAY_GROUP_PROVIDER_MODS, TODO_WARNING),
      })
    ) {
      markChanged()
    }
  })
}
