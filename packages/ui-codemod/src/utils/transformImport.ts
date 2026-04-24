import type {API, Collection} from 'jscodeshift'

import {getClonedImportSpecifiers} from './getClonedImportSpecifiers'
import {getSplitImportSpecifiers} from './getSplitImportSpecifiers'

export const DEFAULT_UI_PACKAGE = '@sanity/ui'

export function transformImport(
  j: API['jscodeshift'],
  root: Collection,
  componentName: string,
  fromPackage: string = DEFAULT_UI_PACKAGE,
  toPackage: string = DEFAULT_UI_PACKAGE,
): void {
  if (fromPackage === toPackage) {
    return
  }

  root.find(j.ImportDeclaration).forEach((path) => {
    const node = path.node

    if (node.source.value !== fromPackage) {
      return
    }

    const {componentSpecs, restSpecs} = getSplitImportSpecifiers(node.specifiers, componentName)

    if (componentSpecs.length === 0) {
      return
    }

    if (restSpecs.length === 0) {
      if (node.source && typeof node.source === 'object' && 'value' in node.source) {
        const sourceLiteral = node.source as {value: string}
        sourceLiteral.value = toPackage
      }

      return
    }

    path.node.specifiers = restSpecs
    const clonedImportSpecifiers = getClonedImportSpecifiers(j, componentSpecs)
    path.insertAfter(j.importDeclaration(clonedImportSpecifiers, j.stringLiteral(toPackage)))
  })
}
