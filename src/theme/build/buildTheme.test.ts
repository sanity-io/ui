import {buildTheme} from './buildTheme'

test('build theme', () => {
  const {color} = buildTheme({
    color: {
      base: {
        default: {
          bg: ['white/0', 'black/0'],
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
      fg: '#ffffff',
      default: {
        button: {
          ghost: {
            enabled: {
              border: 'rgba(255,255,255,0)',
            },
          },
        },
      },
    },
    dark: {
      bg: 'rgba(0,0,0,0)',
      fg: '#000000',
      default: {
        button: {
          ghost: {
            enabled: {
              border: 'rgba(0,0,0,0)',
            },
          },
        },
      },
    },
  })
})
