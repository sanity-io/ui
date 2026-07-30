import {type API, type FileInfo, type JSXSpreadAttribute, type JSXAttribute} from 'jscodeshift'

import type {BaseOptions} from '../../../types/BaseOptions'
import {getComponentLocalNames} from '../../../utils/getComponentLocalNames'
import {getStaticAttributeExpression} from '../../../utils/getStaticAttributeExpression'
import {getStyledComponentAliases} from '../../../utils/getStyledComponentAliases'
import {replaceElement} from '../../../utils/replaceElement'
import {transformAttributes} from '../../../utils/transformAttributes'
import {transformImport} from '../../../utils/transformImport'
import {transformStyledComponents} from '../../../utils/transformStyledComponents'
import {FLEX_MODS} from '../flex/flex.mods'
import {GRID_MODS} from '../grid/grid.mods'
import {BOX_MODS} from './box.mods'

const BOX_TODO_WARNING = 'Please double check the Box migration below'
const FLEX_TODO_WARNING = 'Please double check the Flex migration below'
const GRID_TODO_WARNING = 'Please double check the Grid migration below'
const STYLED_TODO_WARNING = 'Please double check styled(Box) migration(s) below'

/** @internal */
export default function transform(fileInfo: FileInfo, api: API, options?: BaseOptions): string {
  const j = api.jscodeshift
  const root = j(fileInfo.source)
  const {fromPackage, toPackage} = options || {}

  const replaceWithFlex = (attrs: (JSXAttribute | JSXSpreadAttribute)[]) => {
    const display = getStaticAttributeExpression(j, attrs, 'display')
    return display === 'flex' || display == 'inline-flex'
  }

  const replaceWithGrid = (attrs: (JSXAttribute | JSXSpreadAttribute)[]) => {
    const display = getStaticAttributeExpression(j, attrs, 'display')
    return display === 'grid' || display == 'inline-grid'
  }

  transformImport(j, root, 'Box', fromPackage, toPackage)

  const localNames = getComponentLocalNames(j, root, 'Box', options)
  const styledAliases = getStyledComponentAliases(j, root, localNames)

  replaceElement(
    j,
    root,
    replaceWithFlex,
    {
      element: 'Box',
      localNames,
    },
    {
      element: 'Flex',
      callback: (path) => transformAttributes(j, path, FLEX_MODS, FLEX_TODO_WARNING),
    },
  )

  replaceElement(
    j,
    root,
    replaceWithGrid,
    {
      element: 'Box',
      localNames,
      callback: (path) => transformAttributes(j, path, BOX_MODS, BOX_TODO_WARNING),
    },
    {
      element: 'Grid',
      callback: (path) => transformAttributes(j, path, GRID_MODS, GRID_TODO_WARNING),
    },
  )

  transformStyledComponents(
    j,
    root,
    styledAliases,
    (attrs) => !replaceWithFlex(attrs) && !replaceWithGrid(attrs),
    {
      warning: STYLED_TODO_WARNING,
      callback: (path) => transformAttributes(j, path, BOX_MODS, BOX_TODO_WARNING),
    },
  )

  return root.toSource()
}
