import {type API, type FileInfo} from 'jscodeshift'

import type {BaseOptions} from '../../../types/BaseOptions'
import {getComponentLocalNames} from '../../../utils/getComponentLocalNames'
import {getStyledComponentAliases} from '../../../utils/getStyledComponentAliases'
import {shouldTransformComponent} from '../../../utils/shouldTransformComponent'
import {transformAttributes} from '../../../utils/transformAttributes'
import {transformComponent} from '../../../utils/transformComponent'
import {transformImport} from '../../../utils/transformImport'
import {transformStyledComponents} from '../../../utils/transformStyledComponents'
import {FLEX_MODS} from './flex.mods'

const TODO_WARNING = 'Please double check the Flex migration below'

/** @internal */
export default function transform(
  fileInfo: FileInfo,
  api: API,
  options: BaseOptions,
): string | undefined {
  const {fromPackage, toPackage} = options || {}

  return transformComponent(fileInfo, api, ({j, root, markChanged}) => {
    const localNames = getComponentLocalNames(j, root, 'Flex', options)
    const styledAliases = getStyledComponentAliases(
      j,
      root,
      'Flex',
      fileInfo.path,
      localNames,
      options,
    )

    if (!shouldTransformComponent(j, root, 'Flex', localNames, options, styledAliases)) {
      return
    }

    if (transformImport(j, root, 'Flex', fromPackage, toPackage)) {
      markChanged()
    }

    root.find(j.JSXOpeningElement).forEach((path) => {
      const name = path.node.name

      if (name.type !== 'JSXIdentifier' || !localNames.has(name.name)) {
        return
      }

      if (transformAttributes(j, path, FLEX_MODS, TODO_WARNING)) {
        markChanged()
      }
    })

    if (
      transformStyledComponents(j, root, styledAliases, () => true, {
        callback: (path) => transformAttributes(j, path, FLEX_MODS, TODO_WARNING),
      })
    ) {
      markChanged()
    }
  })
}
