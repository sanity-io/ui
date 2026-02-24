import path from 'node:path'
import {env} from 'node:process'

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

export function vanillaExtractIdentifiers({
  debugId,
  hash,
  filePath,
}: {
  debugId?: string | undefined
  hash: string
  filePath: string
}) {
  const isProd = env['NODE_ENV'] === 'production'

  if (filePath === 'src/css/layers.css.ts' && debugId) {
    return `ui-${debugId}`
  }

  if (isProd) {
    return `ui-${hash}`
  }

  const basename = path.basename(filePath, '.css.ts')
  const name = dashCase([basename, debugId && sanitize(debugId)].filter(Boolean).join('-'))

  return `${name}-${hash}`
}
