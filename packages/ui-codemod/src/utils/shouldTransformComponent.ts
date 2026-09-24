import type {API, Collection} from 'jscodeshift'

import type {BaseOptions} from '../types/BaseOptions'
import {getSplitImportSpecifiers} from './getSplitImportSpecifiers'
import {DEFAULT_UI_PACKAGE} from './transformImport'

/**
 * Returns whether a component transform should run on this file, based on local
 * usage or a pending import rewrite.
 */
export function shouldTransformComponent(
  j: API['jscodeshift'],
  root: Collection,
  componentName: string,
  localNames: Set<string>,
  options?: BaseOptions,
  styledAliases?: Set<string>,
): boolean {
  if (localNames.size > 0) {
    return true
  }

  if (styledAliases && styledAliases.size > 0) {
    return true
  }

  const fromPackage = options?.fromPackage ?? DEFAULT_UI_PACKAGE
  const toPackage = options?.toPackage ?? DEFAULT_UI_PACKAGE

  if (fromPackage === toPackage) {
    return false
  }

  return root.find(j.ImportDeclaration).some((path) => {
    const node = path.node

    if (node.source.value !== fromPackage) {
      return false
    }

    const {componentSpecs} = getSplitImportSpecifiers(node.specifiers, componentName)

    return componentSpecs.length > 0
  })
}
