import path from 'node:path'

import {dashCase, sanitize} from './helpers'

const shortNamespaces: Record<string, string | undefined> = {
  'build/color/_scheme': '_scheme',

  'context/card/_tone': '_card',
  'context/element/tone': 'element',

  'component/avatar': 'avatar',
  'component/avatar/color': 'avatar',
  'component/boolean/color': 'boolean-color',
  'component/button/mode': 'button',
  'component/button': 'button',
  'component/card': 'card',
  'component/code': 'code',
  'component/input': 'input',
  'component/input/color': 'input-color',
  'component/selectable': 'selectable',

  'decision/border': 'border',
  'decision/container': 'container',
  'decision/corner': 'corner',
  'decision/focus': 'focus',

  'primitive/color/palette': 'palette',
  'primitive/font': 'font',
  'primitive/radius': 'radius',
  'primitive/shadow': 'shadow',
  'primitive/space': 'space',

  'semantic/color': 'color',
}

const shortIdSegments = [
  {from: 'color-palette', to: 'palette'},
  {from: 'color-scheme', to: 'scheme'},
  {from: 'card-tone', to: 'card'},
]

const VARIANT_PREFIX = 'variant-'

/** @internal */
export function _varsIdentifiers(params: {debugId?: string; hash: string; filePath: string}) {
  const {debugId, filePath, hash} = params

  const dir = path.relative('src/vars', path.dirname(filePath))

  const basename = path.join(dir, path.basename(filePath, '.css.ts'))

  let id = debugId ? sanitize(dashCase(debugId)) : ''

  for (const segment of shortIdSegments) {
    // replace all occurrences of the segment.from with the segment.to
    id = id.replace(new RegExp(segment.from, 'g'), segment.to)
  }

  let namespace: string = basename

  namespace = shortNamespaces[namespace] ?? namespace.replace(/\//g, '-')

  const isInternal = namespace.startsWith('_')

  namespace = sanitize(dashCase(namespace))

  // identifier of single variant collections
  if (id === '') {
    return `ui-${namespace}-vars`
  }

  // identifier of multi variant collections
  if (id.startsWith(VARIANT_PREFIX)) {
    id = id.slice(VARIANT_PREFIX.length)

    return `ui-${namespace}-${id}-vars`
  }

  // internal variable
  if (isInternal) {
    return `ui-${hash}` // internal identifier
  }

  if (id.startsWith('palette-')) {
    id = id.slice('palette-'.length)
  }

  // identifier of variable
  return `ui-${id}`
}
