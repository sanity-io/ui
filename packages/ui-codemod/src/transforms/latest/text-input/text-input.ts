import {type API, type ASTPath, type FileInfo, type JSXOpeningElement} from 'jscodeshift'

import type {BaseOptions} from '../../../types/BaseOptions'
import {getComponentLocalNames} from '../../../utils/getComponentLocalNames'
import {getStyledComponentAliases} from '../../../utils/getStyledComponentAliases'
import {shouldTransformComponent} from '../../../utils/shouldTransformComponent'
import {transformAttributes} from '../../../utils/transformAttributes'
import {transformComponent} from '../../../utils/transformComponent'
import {transformImport} from '../../../utils/transformImport'
import {transformStyledComponents} from '../../../utils/transformStyledComponents'
import {TEXT_INPUT_MODS} from './text-input.mods'

const TODO_WARNING = 'Please double check the TextInput migration below'

/** @internal */
export default function transform(
  fileInfo: FileInfo,
  api: API,
  options: BaseOptions,
): string | undefined {
  const {fromPackage, toPackage} = options || {}

  return transformComponent(fileInfo, api, ({j, root, markChanged}) => {
    const localNames = getComponentLocalNames(j, root, 'TextInput', options)
    const styledAliases = getStyledComponentAliases(
      j,
      root,
      'TextInput',
      fileInfo.path,
      localNames,
      options,
    )

    if (!shouldTransformComponent(j, root, 'TextInput', localNames, options, styledAliases)) {
      return
    }

    if (transformImport(j, root, 'TextInput', fromPackage, toPackage)) {
      markChanged()
    }

    const migrate = (path: ASTPath<JSXOpeningElement>): boolean => {
      return transformAttributes(j, path, TEXT_INPUT_MODS, TODO_WARNING)
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
