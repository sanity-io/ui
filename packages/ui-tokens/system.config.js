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
    name: 'build/color/_scheme',
    path: 'build/color/_scheme',
    importsFrom: ['lib/color', 'build/color/_scheme', 'primitive/color/palette'],
  },

  // semantic layers
  {
    name: 'semantic/color',
    path: 'semantic/color',
    importsFrom: ['lib/color', 'build/color/_scheme', 'primitive/color/palette'],
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
    name: 'context/card/_tone',
    path: 'context/card/_tone',
    importsFrom: ['lib/color'],
  },

  // component layers
  {
    name: 'component/avatar',
    path: 'component/avatar',
  },
  {
    name: 'component/avatar/color',
    path: 'component/avatar/color',
    importsFrom: ['lib/color'],
  },
  {
    name: 'component/boolean/color',
    path: 'component/boolean/color',
    importsFrom: ['lib/color'],
  },
  {
    name: 'component/boolean/validity',
    path: 'component/boolean/validity',
    importsFrom: ['lib/color'],
  },
  {
    name: 'component/boolean/state',
    path: 'component/boolean/state',
    importsFrom: ['lib/color'],
  },
  {
    name: 'component/button',
    path: 'component/button',
    importsFrom: ['lib/color'],
  },
  {
    name: 'component/button/mode',
    path: 'component/button/mode',
    importsFrom: ['lib/color'],
  },
  {
    name: 'component/button/state',
    path: 'component/button/state',
    importsFrom: ['lib/color'],
  },
  {
    name: 'component/card',
    path: 'component/card',
    importsFrom: ['lib/color'],
  },
  {
    name: 'component/code',
    path: 'component/code',
    importsFrom: ['lib/color'],
  },
  {
    name: 'component/input',
    path: 'component/input',
    importsFrom: ['lib/color'],
  },
  {
    name: 'component/input/color',
    path: 'component/input/color',
    importsFrom: ['lib/color'],
  },
  {
    name: 'component/input/validity',
    path: 'component/input/validity',
    importsFrom: ['lib/color'],
  },
  {
    name: 'component/input/state',
    path: 'component/input/state',
    importsFrom: ['lib/color'],
  },
  {
    name: 'component/selectable',
    path: 'component/selectable',
    importsFrom: ['lib/color'],
  },
  {
    name: 'component/selectable/state',
    path: 'component/selectable/state',
    importsFrom: ['lib/color'],
  },
]
