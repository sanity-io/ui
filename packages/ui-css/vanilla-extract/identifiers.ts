import path from 'node:path'

import {dashCase, sanitize} from './helpers'
import {_varsIdentifiers} from './vars-identifiers'

const shortNamespaces: Record<string, string | undefined> = {
  cardTone: 'card',
  colorScheme: 'scheme',
  elementTone: 'element',

  alignItems: 'align',
  bgPattern: 'bg',
  border: 'b',
  boxSizing: 'sizing',
  flex: 'f',
  flexDirection: 'fdir',
  flexWrap: 'fwrap',
  gap: 'g',
  gridAutoColumns: 'autocols',
  gridAutoFlow: 'autoflow',
  gridAutoRows: 'autorows',
  gridColumn: 'col',
  gridColumnEnd: 'colend',
  gridColumnStart: 'colstart',
  gridRow: 'row',
  gridRowEnd: 'rowend',
  gridRowStart: 'rowstart',
  gridTemplateColumns: 'cols',
  gridTemplateRows: 'rows',
  justifyContent: 'justify',
  pointerEvents: 'pointer',
  radius: 'r',
  shadow: 's',
  textAlign: 'text',
  textOverflow: 'overflow',
  height: 'h',
  width: 'w',
  maxWidth: 'maxw',
  maxHeight: 'maxh',
  minWidth: 'minw',
  minHeight: 'minh',
  margin: 'm',
  padding: 'p',
}

/** @internal */
export function _vanillaExtractIdentifiers(params: {
  debugId?: string
  hash: string
  filePath: string
}) {
  const {debugId, filePath} = params

  if (filePath.startsWith('src/vars/')) {
    return _varsIdentifiers(params)
  }

  if (filePath === 'src/layers.css.ts') {
    return `ui-${debugId}`
  }

  const basename = path.basename(filePath, '.css.ts')
  let id = debugId ? sanitize(debugId) : ''

  let namespace: string = basename

  if (namespace.startsWith('_')) {
    namespace = namespace.slice(1)
  }

  namespace = sanitize(dashCase(shortNamespaces[namespace] ?? namespace))

  const namespacePrefix = `${namespace}-`

  if (id.startsWith(namespacePrefix)) {
    id = id.slice(namespacePrefix.length)
  }

  const name = dashCase([namespace, id].filter(Boolean).join('-'))

  if (name.startsWith('ui-')) {
    return name
  }

  return ['ui', name].filter(Boolean).join('-')
}
