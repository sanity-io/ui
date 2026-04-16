/**
 * List of layers to export. Paths are relative to the `src` directory.
 * The `name` should match the `path` (location in src/).
 */
export const layers = [
  // primitive layers
  {
    name: 'primitive/color/palette',
    path: 'primitive/color/palette',
  },
  {
    name: 'primitive/font/lib',
    path: 'primitive/font/lib',
  },
  {
    name: 'primitive/font',
    path: 'primitive/font',
    importsFrom: ['primitive/font/lib'],
  },
  {
    name: 'primitive/radius',
    path: 'primitive/radius',
  },
  {
    name: 'primitive/shadow',
    path: 'primitive/shadow',
    importsFrom: ['lib/color'],
  },
  {
    name: 'primitive/space',
    path: 'primitive/space',
  },

  // build layers
  {
    name: 'build/color/scheme',
    path: 'build/color/scheme',
    importsFrom: ['lib/color', 'primitive/color/palette'],
  },

  // semantic layers
  {
    name: 'semantic/color',
    path: 'semantic/color',
    importsFrom: ['lib/color', 'build/color/scheme', 'primitive/color/palette'],
  },

  // decision layers
  {
    name: 'decision/border',
    path: 'decision/border',
  },
  {
    name: 'decision/container',
    path: 'decision/container',
  },
  {
    name: 'decision/corner',
    path: 'decision/corner',
  },
  {
    name: 'decision/focus',
    path: 'decision/focus',
  },

  // context layers
  {
    name: 'context/element/tone',
    path: 'context/element/tone',
    importsFrom: ['lib/color'],
  },
  {
    name: 'context/card/tone',
    path: 'context/card/tone',
    importsFrom: ['lib/color'],
  },

  // component layers
  {
    name: 'component/avatar',
    path: 'component/avatar',
  },
  {
    name: 'component/button/mode',
    path: 'component/button/mode',
    importsFrom: ['lib/color'],
  },
  {
    name: 'component/button',
    path: 'component/button',
    importsFrom: ['lib/color'],
  },
  {
    name: 'component/card',
    path: 'component/card',
    importsFrom: ['lib/color'],
  },
  {
    name: 'component/input',
    path: 'component/input',
    importsFrom: ['lib/color'],
  },
  {
    name: 'component/selectable',
    path: 'component/selectable',
    importsFrom: ['lib/color'],
  },
]
