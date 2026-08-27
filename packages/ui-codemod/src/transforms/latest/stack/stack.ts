import {type API, type FileInfo, type JSXElement} from 'jscodeshift'

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
import {FLEX_MODS} from '../flex/flex.mods'
import {STACK_MODS} from './stack.mods'

const STACK_TODO_WARNING = 'Please double check the Stack migration below'
const FLEX_TODO_WARNING = 'Please double check the Flex migration below'
const STYLED_TODO_WARNING = 'Please double check styled(Stack) migration below'

function replaceWithFlex(attrs: JSXElement['openingElement']['attributes']) {
  if (!attrs) {
    return false
  }

  return attrs.some(
    (attr) =>
      attr.type === 'JSXAttribute' &&
      attr.name.type === 'JSXIdentifier' &&
      (attr.name.name.startsWith('padding') ||
        attr.name.name.startsWith('margin') ||
        attr.name.name.startsWith('overflow') ||
        attr.name.name.startsWith('flex') ||
        attr.name.name.endsWith('height') ||
        attr.name.name.endsWith('width')),
  )
}

/** @internal */
export default function transform(
  fileInfo: FileInfo,
  api: API,
  options?: BaseOptions,
): string | undefined {
  const {fromPackage, toPackage} = options || {}

  return transformComponent(fileInfo, api, ({j, root, markChanged}) => {
    const localNames = getComponentLocalNames(j, root, 'Stack', options)
    const styledAliases = getStyledComponentAliases(
      j,
      root,
      'Stack',
      fileInfo.path,
      localNames,
      options,
    )

    if (!shouldTransformComponent(j, root, 'Stack', localNames, options, styledAliases)) {
      return
    }

    if (transformImport(j, root, 'Stack', fromPackage, toPackage)) {
      markChanged()
    }

    if (
      replaceElement(
        j,
        root,
        (attrs) => replaceWithFlex(attrs),
        {
          element: 'Stack',
          localNames,
        },
        {
          element: 'Flex',
          callback: (path) => {
            let changed = false

            if (addAttribute(j, path.node, 'flexDirection', 'column')) {
              changed = true
            }

            if (transformAttributes(j, path, FLEX_MODS, FLEX_TODO_WARNING)) {
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
      replaceElement(
        j,
        root,
        (attrs) => {
          return !replaceWithFlex(attrs)
        },
        {
          element: 'Stack',
          localNames,
        },
        {
          element: 'VStack',
          callback: (path) => transformAttributes(j, path, STACK_MODS, STACK_TODO_WARNING),
        },
      )
    ) {
      markChanged()
    }

    if (
      transformStyledComponents(j, root, styledAliases, (attrs) => !replaceWithFlex(attrs), {
        warning: STYLED_TODO_WARNING,
        callback: (path) => transformAttributes(j, path, STACK_MODS, STACK_TODO_WARNING),
      })
    ) {
      markChanged()
    }
  })
}
