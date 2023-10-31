import {ColorTokens} from '../../config'

export const defaultColorTokens: ColorTokens = {
  '*': {
    _blend: ['multiply', 'screen'],
    bg: ['50', '950'],
    fg: ['800', '200'],
    border: ['200', '800'],
  },
  transparent: {
    bg: ['50', 'black'],
    fg: ['600', '400'],
  },
  default: {
    bg: ['white', '950'],
    fg: ['black', '200'],
  },
  primary: {
    _hue: 'cyan',
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
          _blend: ['screen', 'multiply'],
          bg: ['500', '400'],
        },
        hovered: {
          bg: ['600', '300'],
        },
        pressed: {
          bg: ['700', '200'],
        },
        selected: {
          bg: ['700', '200'],
        },
        disabled: {
          _hue: 'gray',
          bg: ['100', '900'],
        },
      },
      ghost: {
        '*': {
          _blend: ['multiply', 'screen'],
          bg: ['white', 'black'],
          fg: ['600', '400'],
        },
        hovered: {
          bg: ['50', '950'],
          fg: ['700', '300'],
        },
        pressed: {
          bg: ['100', '900'],
          fg: ['800', '200'],
        },
        selected: {
          bg: ['100', '900'],
          fg: ['800', '200'],
        },
        disabled: {
          _hue: 'gray',
          fg: ['100', '900'],
        },
      },
      bleed: {
        '*': {
          _blend: ['multiply', 'screen'],
          bg: ['white', 'black'],
          fg: ['600', '400'],
        },
        hovered: {
          bg: ['50', '950'],
          fg: ['700', '300'],
        },
        pressed: {
          bg: ['100', '900'],
          fg: ['800', '200'],
        },
        selected: {
          bg: ['100', '900'],
          fg: ['800', '200'],
        },
        disabled: {
          _hue: 'gray',
          fg: ['100', '900'],
        },
      },
    },
    default: {
      default: {
        '*': {
          bg: ['900', '200'],
        },
        hovered: {
          bg: ['black', '100'],
        },
        pressed: {
          bg: ['900', '200'],
        },
        selected: {
          bg: ['black', '200'],
        },
        disabled: {
          _hue: 'gray',
          bg: ['100', '900'],
        },
      },
    },
  },
}
