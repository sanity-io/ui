import {expect, test} from 'vitest'

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
    dark: {
      bg: '#000000',
      default: {
        button: {
          ghost: {
            enabled: {
              border: '#252837',
            },
          },
        },
      },
      fg: '#ffffff',
    },
    light: {
      bg: '#ffffff',
      default: {
        button: {
          ghost: {
            enabled: {
              border: '#e3e4e8',
            },
          },
        },
      },
      fg: '#000000',
    },
  })
})
