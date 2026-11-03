import {type API, type ASTPath, type FileInfo, type JSXOpeningElement} from 'jscodeshift'

import type {BaseOptions} from '../../../types/BaseOptions'
import {getComponentLocalNames} from '../../../utils/getComponentLocalNames'
import {getStyledComponentAliases} from '../../../utils/getStyledComponentAliases'
import {shouldTransformComponent} from '../../../utils/shouldTransformComponent'
import {transformAttributes} from '../../../utils/transformAttributes'
import {transformComponent} from '../../../utils/transformComponent'
import {transformImport} from '../../../utils/transformImport'
import {transformStyledComponents} from '../../../utils/transformStyledComponents'
import {SELECT_MODS} from './select.mods'

const TODO_WARNING = 'Please double check the Select migration below'

/** @internal */
export default function transform(
  fileInfo: FileInfo,
  api: API,
  options: BaseOptions,
): string | undefined {
  const {fromPackage, toPackage} = options || {}

  return transformComponent(fileInfo, api, ({j, root, markChanged}) => {
    const localNames = getComponentLocalNames(j, root, 'Select', options)
    const styledAliases = getStyledComponentAliases(
      j,
      root,
      'Select',
      fileInfo.path,
      localNames,
      options,
    )

    if (!shouldTransformComponent(j, root, 'Select', localNames, options, styledAliases)) {
      return
    }

    if (transformImport(j, root, 'Select', fromPackage, toPackage)) {
      markChanged()
    }

    const migrate = (path: ASTPath<JSXOpeningElement>): boolean => {
      return transformAttributes(j, path, SELECT_MODS, TODO_WARNING)
    }

    root.find(j.JSXOpeningElement).forEach((path) => {
      const name = path.node.name

      if (name.type !== 'JSXIdentifier' || !localNames.has(name.name)) {
        return
      }

      if (migrate(path)) {
        markChanged()
      }
    })

    if (
      transformStyledComponents(j, root, styledAliases, () => true, {
        callback: (path) => migrate(path),
      })
    ) {
      markChanged()
    }
  })
}
