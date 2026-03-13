/**
 * List of layers to export. Paths are relative to the `src` directory.
 */
export const layers = [
  {
    name: 'avatar',
    path: 'avatar',
  },
  {
    name: 'border',
    path: 'border',
  },
  {
    name: '_buttonMode',
    path: 'button/_buttonMode',
    importsFrom: ['color/lib'],
  },
  {
    name: 'button',
    path: 'button',
    importsFrom: ['color/lib'],
  },
  {
    name: 'card',
    path: 'card',
  },
  {
    name: '_cardTone',
    path: 'color/_cardTone',
    importsFrom: ['color/lib', '_colorScheme'],
  },
  {
    name: '_colorScheme',
    path: 'color/_colorScheme',
    importsFrom: ['color/lib', 'palette'],
  },
  {
    name: 'palette',
    path: 'color/palette',
  },
  {
    name: 'color',
    path: 'color',
    importsFrom: ['color/lib'],
  },
  {
    name: 'container',
    path: 'container',
  },
  {
    name: 'corner',
    path: 'corner',
  },
  {
    name: 'focus',
    path: 'focus',
  },
  {
    name: 'font',
    path: 'font',
    importsFrom: ['font/lib'],
  },
  {
    name: 'input',
    path: 'input',
  },
  {
    name: 'radius',
    path: 'radius',
  },
  {
    name: 'selectable',
    path: 'selectable',
    importsFrom: ['color/lib'],
  },
  {
    name: 'shadow',
    path: 'shadow',
    importsFrom: ['color/lib'],
  },
  {
    name: 'space',
    path: 'space',
  },
]
