import {defaultColorPalette} from '../defaults/colorPalette'
import {buildTheme} from './buildTheme'

test('build theme', () => {
  const rootTheme = buildTheme({
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

  const {color} = rootTheme.v2!

  expect({
    light: {
      bg: color.light.default.bg,
      fg: color.light.default.fg,
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
      bg: color.dark.default.bg,
      fg: color.dark.default.fg,
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
              border: 'rgba(246,246,248,0)',
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
              border: 'rgba(19,20,27,0)',
            },
          },
        },
      },
    },
  })
})
