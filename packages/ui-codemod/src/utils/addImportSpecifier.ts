import type {API} from 'jscodeshift'

/**
 * Adds an import specifier to an existing import declaration.
 * Returns whether the AST was updated.
 */
export function addImportSpecifier(
  j: API['jscodeshift'],
  root: ReturnType<API['jscodeshift']>,
  addTo: string,
  name: string,
): boolean {
  let hasChanges = false

  const hasExistingSpecifier = root
    .find(j.ImportDeclaration)
    .some((path) =>
      Boolean(
        path.node.specifiers?.some(
          (spec) =>
            spec.type === 'ImportSpecifier' &&
            spec.imported.type === 'Identifier' &&
            spec.imported.name === name,
        ),
      ),
    )

  if (hasExistingSpecifier) {
    return false
  }

  root.find(j.ImportDeclaration).forEach((path) => {
    const specs = path.node.specifiers

    if (!specs?.length) {
      return
    }

    const hasFromSpecifier = specs.some(
      (s) =>
        s.type === 'ImportSpecifier' &&
        s.imported.type === 'Identifier' &&
        s.imported.name === addTo,
    )

    if (hasFromSpecifier) {
      specs.push(j.importSpecifier(j.identifier(name), j.identifier(name)))
      hasChanges = true
    }
  })

  return hasChanges
}
