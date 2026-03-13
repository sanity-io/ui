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
    path: 'button/mode',
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
    importsFrom: ['color/lib'],
  },
  {
    name: '_cardTone',
    path: 'card/tone',
    importsFrom: ['color/lib', '_colorScheme'],
  },
  {
    name: 'palette',
    path: 'color/palette',
  },
  {
    name: '_colorScheme',
    path: 'color/scheme',
    importsFrom: ['color/lib', 'palette'],
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
    name: '_elementTone',
    path: 'element/tone',
    importsFrom: ['color/lib'],
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
    importsFrom: ['color/lib'],
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
