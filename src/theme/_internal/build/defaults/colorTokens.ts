import {ColorTokens} from '../../config'

export const defaultColorTokens: ColorTokens = {
  base: {
    '*': {
      _blend: ['multiply', 'screen'],
      bg: ['50', '950'],
      fg: ['800', '200'],
      border: ['200', '800'],
      focusRing: ['cyan/500', 'cyan/500'],
      shadow: {
        outline: ['500/0.2', '400/0.3'],
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
      _hue: 'purple',
    },
    positive: {
      _hue: 'cyan',
      border: ['300', '800'],
      shadow: {
        outline: ['500/0.3', '400/0.3'],
      },
    },
    caution: {
      _hue: 'yellow',
      border: ['300', '800'],
      shadow: {
        outline: ['500/0.3', '400/0.3'],
      },
    },
    critical: {
      _hue: 'red',
    },
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
          accent: {
            fg: ['purple/200', '700'],
          },
          link: {
            fg: ['cyan/200', 'cyan/700'],
          },
        },
        hovered: {
          bg: ['600', '300'],
          border: ['600/0', '300/0'],
        },
        pressed: {
          // _hue: 'cyan',
          bg: ['700', '200'],
        },
        selected: {
          _hue: 'cyan',
          bg: ['700', '200'],
        },
        disabled: {
          _hue: 'gray',
          bg: ['200', '900'],
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
          accent: {
            fg: ['purple/200', '700'],
          },
          link: {
            fg: ['cyan/200', 'cyan/700'],
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
          _hue: 'cyan',
          bg: ['100', '900'],
          fg: ['800', '200'],
        },
        disabled: {
          _hue: 'gray',
          fg: ['200', '900'],
          border: ['100', '950'],
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
          accent: {
            fg: ['purple/200', '700'],
          },
          link: {
            fg: ['cyan/200', 'cyan/700'],
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
          _hue: 'cyan',
          bg: ['100', '900'],
          fg: ['800', '200'],
        },
        disabled: {
          _hue: 'gray',
          fg: ['200', '900'],
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
          _hue: 'cyan',
          bg: ['black', '200'],
        },
        disabled: {
          _hue: 'gray',
          bg: ['200', '900'],
        },
      },
    },
  },
  card: {
    '*': {
      _blend: ['multiply', 'screen'],
      bg: ['white', 'black'],
      bg2: ['50', '950'],
      fg: ['black', 'white'],
      border: ['200', '800'],
      muted: {
        fg: ['600/0.6', '400/0.6'],
      },
      accent: {
        fg: ['purple/200', '700'],
      },
      link: {
        fg: ['cyan/200', 'cyan/700'],
      },
      code: {
        bg: ['50', '950'],
        fg: ['600', '400'],
      },
      skeleton: {
        from: ['100', '900'],
        to: ['100/0.5', '900/0.5'],
      },
    },
    hovered: {
      bg: ['50', '950'],
    },
    pressed: {
      bg: ['100', '900'],
    },
    selected: {
      _blend: ['screen', 'multiply'],
      bg: ['500', '400'],
      fg: ['white', 'black'],
      border: ['500/0', '400/0'],
    },
    disabled: {
      fg: ['200', '800'],
    },
  },
  input: {
    '*': {
      '*': {
        _blend: ['multiply', 'screen'],
        bg: ['white', 'black'],
        bg2: ['50', '950'],
        fg: ['black', '200'],
        border: ['200', '800'],
        placeholder: ['400', '600/0.5'],
      },

      hovered: {
        border: ['300', '700'],
      },

      readOnly: {
        bg: ['50', '950'],
        fg: ['600', '400'],
      },

      disabled: {
        fg: ['200', '800'],
        border: ['100', '900'],
      },
    },

    invalid: {
      '*': {
        _hue: 'red',
        bg: ['50', '950'],
        fg: ['800', '200'],
      },
    },
  },
}
