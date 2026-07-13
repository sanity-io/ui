function ucfirst(str: string) {
  return str.slice(0, 1).toUpperCase() + str.slice(1)
}

function toPascalCase(str: string) {
  const p = str.split('-')

  return p.map(ucfirst).join('')
}

export function getImportCode(icon: string): string {
  const pascalCase = toPascalCase(icon)

  return `import {${pascalCase}Icon} from '@sanity/icons/${pascalCase}'`
}
