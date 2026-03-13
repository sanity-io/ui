import path from 'node:path'

import {dashCase, sanitize} from './helpers'

const shortNamespaces: Record<string, string | undefined> = {
  'button/mode': 'button',
  'card/tone': 'card',
  'color/scheme': 'scheme',
  'color/palette': 'palette',
  'element/tone': 'element',
}

const shortIdSegments = [
  {from: 'color-palette', to: 'palette'},
  {from: 'color-scheme', to: 'scheme'},
  {from: 'card-tone', to: 'card'},
]

const VARIANT_PREFIX = 'variant-'

/** @internal */
export function _varsIdentifiers(params: {debugId?: string; hash: string; filePath: string}) {
  const {debugId, filePath} = params

  const dir = path.relative('src/vars', path.dirname(filePath))

  const basename = path.join(dir, path.basename(filePath, '.css.ts'))
  // .replace(/\//g, '-')

  // console.log('basename', basename)

  let id = debugId ? sanitize(dashCase(debugId)) : ''

  for (const segment of shortIdSegments) {
    // replace all occurrences of the segment.from with the segment.to
    id = id.replace(new RegExp(segment.from, 'g'), segment.to)
  }

  let namespace: string = basename

  // if (namespace.startsWith('_')) {
  //   namespace = namespace.slice(1)
  // }

  namespace = sanitize(dashCase(shortNamespaces[namespace] ?? namespace))

  // identifier of single variant collections
  if (id === '') {
    return `ui-${namespace}-vars`
  }

  // identifier of multi variant collections
  if (id.startsWith(VARIANT_PREFIX)) {
    id = id.slice(VARIANT_PREFIX.length)

    return `ui-${namespace}-${id}-vars`
  }

  // identifier of variable
  return `ui-${id}`
}
