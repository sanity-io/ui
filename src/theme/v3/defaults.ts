import {PaletteConfig} from '../palette'
import {buildTheme_v3} from './buildTheme_v3'

export const defaultPalette: PaletteConfig = {
  chroma: {min: 0.005, max: 0.2325},
  luminosity: {min: 0.1875, max: 1},
  hues: {
    gray: {h: 277, c: 0.04},
    blue: {h: 273, c: 0.185},
    purple: {h: 295, c: 0.4},
    magenta: {h: 12, c: 0.4},
    red: {h: 30, c: 0.4},
    orange: {h: 68, c: 0.4},
    yellow: {h: 90, c: 0.4},
    green: {h: 171, c: 0.4},
    cyan: {h: 194, c: 0.4},
  },
}

export const defaultTheme = buildTheme_v3({
  tokens: {
    color: {
      '*': {
        shadow: {
          outline: ['500/0.4', '500/0.3'],
          umbra: ['black/0.2', '500/0.1'],
          penumbra: ['black/0.14', '500/0.07'],
          ambient: ['black/0.12', '500/0.06'],
        },
        variant: {
          tinted: {
            '*': {
              bg: {
                0: ['gray/900', 'gray/50'],
                4: ['800', '150'],
              },
              border: {
                0: ['800', '150'],
                4: ['600', '350'],
              },
              fg: {
                0: ['white', 'black'],
                4: ['400', '600'],
              },
            },
            'primary': {
              _hue: 'blue',
            },
            'suggest': {
              _hue: 'purple',
            },
            'positive': {
              _hue: 'green',
            },
            'caution': {
              _hue: 'yellow',
            },
            'critical': {
              _hue: 'red',
            },
          },
          solid: {
            '*': {
              bg: {
                0: ['500', '500'],
                4: ['400', '600'],
              },
              border: {
                0: ['600', '400'],
                4: ['200', '800'],
              },
              fg: {
                0: ['black', 'white'],
                4: ['600', '400'],
              },
            },
            'default': {
              bg: {
                0: ['200', '800'],
                4: ['white', 'black'],
              },
            },
            'primary': {
              _hue: 'blue',
            },
            'suggest': {
              _hue: 'purple',
            },
            'positive': {
              _hue: 'green',
            },
            'caution': {
              _hue: 'yellow',
            },
            'critical': {
              _hue: 'red',
            },
          },
        },
      },
      'transparent': {
        variant: {
          tinted: {
            '*': {
              bg: {
                0: ['black', 'gray/50'],
                4: ['900', '150'],
              },
              border: {
                0: ['900', '150'],
                4: ['700', '350'],
              },
              fg: {
                0: ['150', 'black'],
                4: ['550', '600'],
              },
            },
          },
        },
      },
      'default': {
        variant: {
          tinted: {
            '*': {
              bg: {
                0: ['gray/950', 'white'],
                4: ['850', '100'],
              },
              border: {
                0: ['850', '100'],
                4: ['650', '300'],
              },
              fg: {
                0: ['white', 'black'],
                4: ['400', '600'],
              },
            },
          },
        },
      },
      'primary': {
        _hue: 'blue',
      },
      'suggest': {
        _hue: 'purple',
      },
      'positive': {
        _hue: 'green',
      },
      'caution': {
        _hue: 'yellow',
      },
      'critical': {
        _hue: 'red',
      },
    },
  },
})
