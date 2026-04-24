import type {API, ImportDefaultSpecifier, ImportSpecifier} from 'jscodeshift'

export function getClonedImportSpecifiers(
  j: API['jscodeshift'],
  specifiers: (ImportSpecifier | ImportDefaultSpecifier)[] = [],
) {
  return specifiers.map((spec) => {
    if (spec.type === 'ImportSpecifier') {
      if (spec.imported.type !== 'Identifier' || spec.local?.type !== 'Identifier') {
        return spec
      }

      const clone = j.importSpecifier(
        j.identifier(spec.imported.name),
        j.identifier(spec.local.name),
      )

      if ('importKind' in spec && spec.importKind === 'type') {
        Object.assign(clone, {importKind: 'type'})
      }

      return clone
    } else {
      return j.importDefaultSpecifier(
        j.identifier((spec as ImportDefaultSpecifier).local?.name as string),
      )
    }
  })
}
