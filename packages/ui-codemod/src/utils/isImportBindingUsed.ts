import type {API, ASTPath, ImportSpecifier} from 'jscodeshift'

export function isImportBindingUsed(
  j: API['jscodeshift'],
  root: ReturnType<API['jscodeshift']>,
  name: string,
  specifierPath: ASTPath<ImportSpecifier>,
): boolean {
  const jsxOpening = root.find(j.JSXOpeningElement).some(({node}) => {
    return node.name.type === 'JSXIdentifier' && node.name.name === name
  })

  if (jsxOpening) {
    return true
  }

  const jsxClosing = root.find(j.JSXClosingElement).some(({node}) => {
    return node.name.type === 'JSXIdentifier' && node.name.name === name
  })

  if (jsxClosing) {
    return true
  }

  const importedPath = specifierPath.get('imported')
  const localPath = specifierPath.get('local')

  return root.find(j.Identifier).some((idPath) => {
    if (idPath.node.name !== name) {
      return false
    }

    if (idPath === importedPath || idPath === localPath) {
      return false
    }

    const parent = idPath.parent?.node

    if (!parent) {
      return true
    }

    if (parent.type === 'MemberExpression' && !parent.computed && parent.property === idPath.node) {
      return false
    }

    if (parent.type === 'TSQualifiedName' && parent.right === idPath.node) {
      return false
    }

    return true
  })
}
