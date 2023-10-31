import {ColorThemeConfig} from '../../config'
import {buildColorTheme} from './buildColorTheme'

test('buildColorTheme: base', () => {
  const colorConfig: ColorThemeConfig = {
    tokens: {
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
  }

  const light = buildColorTheme({scheme: 'light'}, {color: colorConfig})
  const dark = buildColorTheme({scheme: 'dark'}, {color: colorConfig})

  expect({
    light: {
      transparent: {
        bg: light.transparent.base.bg,
        fg: light.transparent.base.fg,
      },
      default: {
        bg: light.default.base.bg,
        fg: light.default.base.fg,
      },
      primary: {
        bg: light.primary.base.bg,
        fg: light.primary.base.fg,
      },
    },
    dark: {
      transparent: {
        bg: dark.transparent.base.bg,
        fg: dark.transparent.base.fg,
      },
      default: {
        bg: dark.default.base.bg,
        fg: dark.default.base.fg,
      },
      primary: {
        bg: dark.primary.base.bg,
        fg: dark.primary.base.fg,
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

test.only('buildColorTheme: button', () => {
  const colorConfig: ColorThemeConfig = {
    tokens: {
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
      button: {
        '*': {
          default: {
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
    },
  }

  const light = buildColorTheme({scheme: 'light'}, {color: colorConfig})
  const dark = buildColorTheme({scheme: 'dark'}, {color: colorConfig})

  expect({
    light: {
      enabled: {
        bg: light.default.button.primary.default.enabled.bg,
        fg: light.default.button.primary.default.enabled.fg,
      },
      hovered: {
        bg: light.default.button.primary.default.hovered.bg,
        fg: light.default.button.primary.default.hovered.fg,
      },
    },
    dark: {
      enabled: {
        bg: dark.default.button.primary.default.enabled.bg,
        fg: dark.default.button.primary.default.enabled.fg,
      },
      hovered: {
        bg: dark.default.button.primary.default.hovered.bg,
        fg: dark.default.button.primary.default.hovered.fg,
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
