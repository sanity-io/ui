import path from 'node:path'

/** @internal */
export function vanillaExtractIdentifiers(params: {
  debugId?: string
  hash: string
  filePath: string
}) {
  const {debugId, filePath, hash: _hash} = params

  const basename = path.basename(filePath, '.css.ts')
  const name = dashCase([basename, debugId && sanitize(debugId)].filter(Boolean).join('-'))

  // if (name.startsWith('_')) {
  //   // internal
  //   return `_${hash}`
  // }

  return `ui-${name}`
}

function dashCase(str: string): string {
  return str
    .replace(/([A-Z])/g, '-$1')
    .toLowerCase()
    .replace(/^-/, '')
}

function sanitize(str: string): string {
  // remove all non-alphanumeric characters except for dashes
  return str.replace(/[^a-zA-Z0-9-]/g, '')
}
