import {ColorTokens} from '../../config'

export const defaultColorTokens: ColorTokens = {
  '*': {
    _blend: ['multiply', 'screen'],
    bg: ['50', '950'],
    fg: ['800', '200'],
    border: ['200', '800'],
    focusRing: ['cyan/500', 'cyan/500'],
    shadow: {
      outline: ['500/0.25', '400/0.3'],
      umbra: ['500/0.1', 'black/0.4'],
      penumbra: ['500/0.07', 'black/0.28'],
      ambient: ['500/0.06', 'black/0.24'],
    },
    skeleton: {
      from: ['100', '900'],
      to: ['100/0.5', '900/0.5'],
    },
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
          bg2: ['950', '50'],
          border: ['500/0', '400/0'],
          muted: {
            fg: ['200', '700'],
          },
        },
        hovered: {
          bg: ['600', '300'],
          border: ['600/0', '300/0'],
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
          bg2: ['50', '950'],
          fg: ['600', '400'],
          border: ['200', '800'],
          muted: {
            fg: ['600/0.6', '400/0.6'],
          },
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
          border: ['100', '900'],
        },
      },
      bleed: {
        '*': {
          _blend: ['multiply', 'screen'],
          bg: ['white', 'black'],
          bg2: ['50', '950'],
          fg: ['600', '400'],
          border: ['white/0', 'black/0'],
          muted: {
            fg: ['600/0.6', '400/0.6'],
          },
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
