import {buildTheme} from './buildTheme'
import {defaultColorPalette} from './color/defaults/colorPalette'

test('build theme', () => {
  const {color} = buildTheme({
    palette: {
      ...defaultColorPalette,
      black: '#000000',
      white: '#ffffff',
    },
    color: {
      base: {
        default: {
          bg: ['white/0', 'black/0'],
          fg: ['black', 'white'],
        },
      },
      button: {
        ghost: {
          default: {
            '*': {
              border: ['white/0', 'black/0'],
            },
          },
        },
      },
    },
  })

  expect({
    light: {
      bg: color.light.default.base.bg,
      fg: color.light.default.base.fg,
      default: {
        button: {
          ghost: {
            enabled: {
              border: color.light.default.button.ghost.default.enabled.border,
            },
          },
        },
      },
    },
    dark: {
      bg: color.dark.default.base.bg,
      fg: color.dark.default.base.fg,
      default: {
        button: {
          ghost: {
            enabled: {
              border: color.dark.default.button.ghost.default.enabled.border,
            },
          },
        },
      },
    },
  }).toEqual({
    light: {
      bg: 'rgba(255,255,255,0)',
      fg: '#000000',
      default: {
        button: {
          ghost: {
            enabled: {
              border: 'rgba(240,244,244,0)',
            },
          },
        },
      },
    },
    dark: {
      bg: 'rgba(0,0,0,0)',
      fg: '#ffffff',
      default: {
        button: {
          ghost: {
            enabled: {
              border: 'rgba(23,27,28,0)',
            },
          },
        },
      },
    },
  })
})
