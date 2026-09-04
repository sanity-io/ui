import {
  type API,
  type ASTPath,
  type FileInfo,
  type JSXElement,
  type JSXOpeningElement,
} from 'jscodeshift'

import type {BaseOptions} from '../../../types/BaseOptions'
import {addAttribute} from '../../../utils/addAttribute'
import {getComponentLocalNames} from '../../../utils/getComponentLocalNames'
import {getStyledComponentAliases} from '../../../utils/getStyledComponentAliases'
import {insertTodoWarning} from '../../../utils/insertTodoWarning'
import {shouldTransformComponent} from '../../../utils/shouldTransformComponent'
import {transformAttributes} from '../../../utils/transformAttributes'
import {transformComponent} from '../../../utils/transformComponent'
import {transformImport} from '../../../utils/transformImport'
import {transformStyledComponents} from '../../../utils/transformStyledComponents'
import {BADGE_MODS} from './badge.mods'

const TODO_WARNING = 'Please double check the Badge migration below'
const CHILDREN_TODO_WARNING =
  'Please double check the Badge migration below. Move the children into the text prop.'
const STYLED_TODO_WARNING = 'Please double check styled(Badge) migration below'

/** @internal */
export default function transform(
  fileInfo: FileInfo,
  api: API,
  options: BaseOptions,
): string | undefined {
  const {fromPackage, toPackage} = options || {}

  return transformComponent(fileInfo, api, ({j, root, markChanged}) => {
    const localNames = getComponentLocalNames(j, root, 'Badge', options)
    const styledAliases = getStyledComponentAliases(
      j,
      root,
      'Badge',
      fileInfo.path,
      localNames,
      options,
    )

    if (!shouldTransformComponent(j, root, 'Badge', localNames, options, styledAliases)) {
      return
    }

    if (transformImport(j, root, 'Badge', fromPackage, toPackage)) {
      markChanged()
    }

    const warnOnChildren = (path: ASTPath<JSXOpeningElement>): boolean => {
      const parentNode = path.parent?.node
      const element: JSXElement | undefined =
        parentNode?.type === 'JSXElement' ? parentNode : undefined

      if (!element) {
        return false
      }

      const hasChildren = (element.children ?? []).some(
        (child) => !(child.type === 'JSXText' && child.value.trim() === ''),
      )

      return hasChildren && insertTodoWarning(j, path, CHILDREN_TODO_WARNING)
    }

    const migrate = (path: ASTPath<JSXOpeningElement>): boolean => {
      let changed = false

      if (transformAttributes(j, path, BADGE_MODS, TODO_WARNING)) {
        changed = true
      }

      if (addAttribute(j, path.node, 'as', 'div')) {
        changed = true
      }

      if (warnOnChildren(path)) {
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
        warning: STYLED_TODO_WARNING,
        callback: (path) => migrate(path),
      })
    ) {
      markChanged()
    }
  })
}
