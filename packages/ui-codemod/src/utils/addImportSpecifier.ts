import type {API} from 'jscodeshift'

export function addImportSpecifier(
  j: API['jscodeshift'],
  root: ReturnType<API['jscodeshift']>,
  addTo: string,
  name: string,
) {
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
    const hasToSpecifier = specs.some(
      (s) =>
        s.type === 'ImportSpecifier' &&
        s.imported.type === 'Identifier' &&
        s.imported.name === name,
    )

    if (hasFromSpecifier && !hasToSpecifier) {
      specs.push(j.importSpecifier(j.identifier(name), j.identifier(name)))
    }
  })
}
