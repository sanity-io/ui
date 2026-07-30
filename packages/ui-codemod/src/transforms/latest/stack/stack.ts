import {type API, type FileInfo, type JSXElement} from 'jscodeshift'

import type {BaseOptions} from '../../../types/BaseOptions'
import {addAttribute} from '../../../utils/addAttribute'
import {replaceElement} from '../../../utils/replaceElement'
import {transformAttributes} from '../../../utils/transformAttributes'
import {transformImport} from '../../../utils/transformImport'
import {FLEX_MODS} from '../flex/flex.mods'
import {STACK_MODS} from './stack.mods'

const STACK_TODO_WARNING = 'Please double check the Stack migration below'
const FLEX_TODO_WARNING = 'Please double check the Flex migration below'

function hasFlexAttrs(attrs: JSXElement['openingElement']['attributes']) {
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
        attr.name.name.startsWith('flex')),
  )
}

/** @internal */
export default function transform(fileInfo: FileInfo, api: API, options?: BaseOptions): string {
  const j = api.jscodeshift
  const root = j(fileInfo.source)
  const {fromPackage, toPackage} = options || {}

  transformImport(j, root, 'Stack', fromPackage, toPackage)

  replaceElement(
    j,
    root,
    (attrs) => {
      return hasFlexAttrs(attrs)
    },
    {
      element: 'Stack',
    },
    {
      element: 'Flex',
      callback: (path) => {
        addAttribute(j, path.node, 'flexDirection', 'column')
        transformAttributes(j, path, FLEX_MODS, FLEX_TODO_WARNING)
      },
    },
  )

  replaceElement(
    j,
    root,
    (attrs) => {
      return !hasFlexAttrs(attrs)
    },
    {
      element: 'Stack',
    },
    {
      element: 'VStack',
      callback: (path) => transformAttributes(j, path, STACK_MODS, STACK_TODO_WARNING),
    },
  )

  return root.toSource()
}
