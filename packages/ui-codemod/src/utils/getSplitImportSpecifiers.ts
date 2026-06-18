import type {ImportDefaultSpecifier, ImportNamespaceSpecifier, ImportSpecifier} from 'jscodeshift'

export function getSplitImportSpecifiers(
  specifiers: (ImportSpecifier | ImportDefaultSpecifier | ImportNamespaceSpecifier)[] = [],
  componentName: string,
) {
  const componentNames = new Set([componentName, `${componentName}Props`])
  const specs = {
    componentSpecs: [] as (ImportSpecifier | ImportDefaultSpecifier)[],
    restSpecs: [] as (ImportSpecifier | ImportDefaultSpecifier | ImportNamespaceSpecifier)[],
  }

  for (const spec of specifiers) {
    if (spec.type === 'ImportNamespaceSpecifier') {
      specs.restSpecs.push(spec)
      continue
    }

    if (spec.type === 'ImportSpecifier' || spec.type === 'ImportDefaultSpecifier') {
      let local

      if (spec.type === 'ImportSpecifier') {
        const loc = spec.local ?? spec.imported
        local = loc.type === 'Identifier' ? loc.name : null
      }

      if (spec.type === 'ImportDefaultSpecifier') {
        local = spec.local?.type === 'Identifier' ? spec.local.name : null
      }

      if (local && componentNames.has(local)) {
        specs.componentSpecs.push(spec)
      } else {
        specs.restSpecs.push(spec)
      }
    }
  }

  return specs
}
