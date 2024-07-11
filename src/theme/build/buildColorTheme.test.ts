import {ThemeColorTokens} from '../config'
import {buildColorTheme} from './buildColorTheme'

test('buildColorTheme: base', () => {
  const {light, dark} = buildColorTheme({
    color: {
      base: {
        '*': {
          bg: ['50', '900'],
          fg: ['800', '200'],
        },
        transparent: {
          bg: ['50', 'black'],
        },
        default: {
          bg: ['white', '950'],
          fg: ['black', '200'],
        },
        primary: {
          _hue: 'purple',
        },
        positive: {
          _hue: 'cyan',
        },
        caution: {
          _hue: 'yellow',
        },
        critical: {
          _hue: 'red',
        },
      },
    },
  })

  expect({
    light: {
      transparent: {
        bg: light.transparent.bg,
        fg: light.transparent.fg,
      },
      default: {
        bg: light.default.bg,
        fg: light.default.fg,
      },
      primary: {
        bg: light.primary.bg,
        fg: light.primary.fg,
      },
    },
    dark: {
      transparent: {
        bg: dark.transparent.bg,
        fg: dark.transparent.fg,
      },
      default: {
        bg: dark.default.bg,
        fg: dark.default.fg,
      },
      primary: {
        bg: dark.primary.bg,
        fg: dark.primary.fg,
      },
    },
  }).toEqual({
    light: {
      transparent: {
        bg: 'gray/50',
        fg: 'gray/800',
      },
      default: {
        bg: 'white',
        fg: 'black',
      },
      primary: {
        bg: 'purple/50',
        fg: 'purple/800',
      },
    },
    dark: {
      transparent: {
        bg: 'black',
        fg: 'gray/200',
      },
      default: {
        bg: 'gray/950',
        fg: 'gray/200',
      },
      primary: {
        bg: 'purple/900',
        fg: 'purple/200',
      },
    },
  })
})

test('buildColorTheme: button', () => {
  const tokens: ThemeColorTokens = {
    base: {
      '*': {
        bg: ['50', '900'],
        fg: ['800', '200'],
      },
      transparent: {
        bg: ['50', 'black'],
      },
      default: {
        bg: ['white', '950'],
        fg: ['black', '200'],
      },
      primary: {
        _hue: 'purple',
      },
      positive: {
        _hue: 'cyan',
      },
      caution: {
        _hue: 'yellow',
      },
      critical: {
        _hue: 'red',
      },
    },
    button: {
      default: {
        '*': {
          '*': {
            bg: ['500', '400'],
            fg: ['white', 'black'],
          },
          hovered: {
            bg: ['600', '300'],
          },
        },
      },
    },
  }

  const {dark, light} = buildColorTheme({color: tokens})

  expect({
    light: {
      enabled: {
        bg: light.default.button.default.primary.enabled.bg,
        fg: light.default.button.default.primary.enabled.fg,
      },
      hovered: {
        bg: light.default.button.default.primary.hovered.bg,
        fg: light.default.button.default.primary.hovered.fg,
      },
    },
    dark: {
      enabled: {
        bg: dark.default.button.default.primary.enabled.bg,
        fg: dark.default.button.default.primary.enabled.fg,
      },
      hovered: {
        bg: dark.default.button.default.primary.hovered.bg,
        fg: dark.default.button.default.primary.hovered.fg,
      },
    },
  }).toEqual({
    light: {
      enabled: {
        bg: 'purple/500',
        fg: 'white',
      },
      hovered: {
        bg: 'purple/600',
        fg: 'white',
      },
    },
    dark: {
      enabled: {
        bg: 'purple/400',
        fg: 'black',
      },
      hovered: {
        bg: 'purple/300',
        fg: 'black',
      },
    },
  })
})
