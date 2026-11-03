import {type API, type ASTPath, type FileInfo, type JSXOpeningElement} from 'jscodeshift'

import type {BaseOptions} from '../../../types/BaseOptions'
import {getComponentLocalNames} from '../../../utils/getComponentLocalNames'
import {getStyledComponentAliases} from '../../../utils/getStyledComponentAliases'
import {moveChildrenToAttribute} from '../../../utils/moveChildrenToAttribute'
import {shouldTransformComponent} from '../../../utils/shouldTransformComponent'
import {transformAttributes} from '../../../utils/transformAttributes'
import {transformComponent} from '../../../utils/transformComponent'
import {transformImport} from '../../../utils/transformImport'
import {transformStyledComponents} from '../../../utils/transformStyledComponents'
import {KBD_MODS} from './kbd.mods'

const TODO_WARNING = 'Please double check the KBD migration below'

/** @internal */
export default function transform(
  fileInfo: FileInfo,
  api: API,
  options?: BaseOptions,
): string | undefined {
  const {fromPackage, toPackage} = options || {}

  return transformComponent(fileInfo, api, ({j, root, markChanged}) => {
    const localNames = getComponentLocalNames(j, root, 'KBD', options)
    const styledAliases = getStyledComponentAliases(
      j,
      root,
      'KBD',
      fileInfo.path,
      localNames,
      options,
    )

    if (!shouldTransformComponent(j, root, 'KBD', localNames, options, styledAliases)) {
      return
    }

    if (transformImport(j, root, 'KBD', fromPackage, toPackage)) {
      markChanged()
    }

    const migrate = (path: ASTPath<JSXOpeningElement>): boolean => {
      let changed = false

      if (transformAttributes(j, path, KBD_MODS, TODO_WARNING)) {
        changed = true
      }

      if (
        moveChildrenToAttribute(j, path, 'text', {
          stringOnly: true,
          todoWarning: `${TODO_WARNING}. Move children into the text prop.`,
        })
      ) {
        changed = true
      }

      return changed
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
