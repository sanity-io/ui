import {buildTheme} from './buildTheme'

test('build theme', () => {
  const {color} = buildTheme({
    color: {
      tokens: {
        default: {
          bg: ['white/0', 'black/0'],
        },
      },
    },
  })

  expect({
    light: {
      bg: color.light.default.base.bg,
      fg: color.light.default.base.fg,
    },
    dark: {
      bg: color.dark.default.base.bg,
      fg: color.dark.default.base.fg,
    },
  }).toEqual({
    light: {
      bg: 'rgba(255,255,255,0)',
      fg: '#111213',
    },
    dark: {
      bg: 'rgba(17,18,19,0)',
      fg: '#ffffff',
    },
  })
})
