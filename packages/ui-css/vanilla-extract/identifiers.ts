import path from 'node:path'

const shortNamespaces: Record<string, string | undefined> = {
  buttonMode: 'button',
  cardTone: 'tone',
  colorScheme: '',
  core: '',
  display: '',
  elementTone: '',
  inset: '',
  layers: '',

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
export function vanillaExtractIdentifiers(params: {
  debugId?: string
  hash: string
  filePath: string
}) {
  const {debugId, filePath} = params
  const basename = path.basename(filePath, '.css.ts')
  const id = debugId

  let namespace: string | undefined = basename

  if (namespace.startsWith('_')) {
    namespace = namespace.slice(1)
  }

  namespace = sanitize(dashCase(shortNamespaces[namespace] ?? namespace))

  const name = dashCase([namespace, id && sanitize(id)].filter(Boolean).join('-'))

  return ['ui', name].filter(Boolean).join('-')
}

function dashCase(str: string): string {
  return (
    str
      .replace(/([A-Z])/g, '-$1')
      .toLowerCase()
      // remove leading dash
      .replace(/^-/, '')
      // remove trailing dash
      .replace(/-$/, '')
  )
}

function sanitize(str: string): string {
  // remove all non-alphanumeric characters except for dashes
  return str.replace(/[^a-zA-Z0-9-]/g, '')
}
