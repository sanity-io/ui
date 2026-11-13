import {type API, type Collection, type FileInfo, type JSCodeshift} from 'jscodeshift'

import type {BaseOptions} from '../../../types/BaseOptions'
import {getComponentLocalNames} from '../../../utils/getComponentLocalNames'
import {getStyledComponentAliases} from '../../../utils/getStyledComponentAliases'
import {replaceElement} from '../../../utils/replaceElement'
import {replaceStyledComponent} from '../../../utils/replaceStyledComponent'
import {shouldTransformComponent} from '../../../utils/shouldTransformComponent'
import {transformAttributes} from '../../../utils/transformAttributes'
import {transformComponent} from '../../../utils/transformComponent'
import {transformImport} from '../../../utils/transformImport'
import {transformStyledComponents} from '../../../utils/transformStyledComponents'
import {TOOLTIP_MODS, TOOLTIP_DELAY_GROUP_PROVIDER_MODS} from './tooltip.mods'

/** @internal */
export default function transform(
  fileInfo: FileInfo,
  api: API,
  options?: BaseOptions,
): string | undefined {
  const {fromPackage, toPackage} = options || {}

  const transformTooltip = (j: JSCodeshift, root: Collection): boolean => {
    const TODO_WARNING = 'Please double check the Tooltip migration below'
    const localNames = getComponentLocalNames(j, root, 'Tooltip', options)
    const styledAliases = getStyledComponentAliases(
      j,
      root,
      'Tooltip',
      fileInfo.path,
      localNames,
      options,
    )

    if (!shouldTransformComponent(j, root, 'Tooltip', localNames, options, styledAliases)) {
      return false
    }

    let hasChanges = false

    if (transformImport(j, root, 'Tooltip', fromPackage, toPackage)) {
      hasChanges = true
    }

    root.find(j.JSXOpeningElement).forEach((path) => {
      const name = path.node.name

      if (name.type !== 'JSXIdentifier' || !localNames.has(name.name)) {
        return
      }

      if (transformAttributes(j, path, TOOLTIP_MODS, TODO_WARNING)) {
        hasChanges = true
      }
    })

    if (
      transformStyledComponents(j, root, styledAliases, () => true, {
        callback: (path) => transformAttributes(j, path, TOOLTIP_MODS, TODO_WARNING),
      })
    ) {
      hasChanges = true
    }

    return hasChanges
  }

  const transformTooltipGroup = (j: JSCodeshift, root: Collection): boolean => {
    const TODO_WARNING = 'Please double check the TooltipDelayGroupProvider migration below'
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
      return false
    }

    let hasChanges = false

    if (transformImport(j, root, 'TooltipDelayGroupProvider', fromPackage, toPackage)) {
      hasChanges = true
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
      hasChanges = true
    }

    if (
      replaceStyledComponent(
        j,
        root,
        {element: 'TooltipDelayGroupProvider', localNames},
        'TooltipGroup',
      )
    ) {
      hasChanges = true
    }

    if (
      transformStyledComponents(j, root, styledAliases, () => true, {
        callback: (path) =>
          transformAttributes(j, path, TOOLTIP_DELAY_GROUP_PROVIDER_MODS, TODO_WARNING),
      })
    ) {
      hasChanges = true
    }

    return hasChanges
  }

  return transformComponent(fileInfo, api, ({j, root, markChanged}) => {
    if (transformTooltip(j, root)) {
      markChanged()
    }

    if (transformTooltipGroup(j, root)) {
      markChanged()
    }
  })
}
