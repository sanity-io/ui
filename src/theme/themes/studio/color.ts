import {ColorTokens} from '../../config'

export const color: ColorTokens = {
  base: {
    '*': {
      focusRing: ['cyan/500', 'cyan/500'],
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
  },
  button: {
    default: {
      '*': {
        '*': {
          accent: {
            fg: ['purple/200', 'purple/700'],
          },
          link: {
            fg: ['cyan/200', 'cyan/700'],
          },
        },
      },
      primary: {
        '*': {
          bg: ['600', '400'],
        },
        hovered: {
          bg: ['700', '300'],
        },
        pressed: {
          bg: ['800', '200'],
        },
        selected: {
          bg: ['800', '200'],
        },
      },
      positive: {
        '*': {
          bg: ['600', '400'],
        },
        hovered: {
          bg: ['700', '300'],
        },
        pressed: {
          bg: ['800', '200'],
        },
        selected: {
          bg: ['800', '200'],
        },
      },
      caution: {
        '*': {
          bg: ['600', '400'],
        },
        hovered: {
          bg: ['700', '300'],
        },
        pressed: {
          bg: ['800', '200'],
        },
        selected: {
          bg: ['800', '200'],
        },
      },
    },
    ghost: {
      '*': {
        '*': {
          accent: {
            fg: ['purple/600/0.75', 'purple/400/0.75'],
          },
          link: {
            fg: ['cyan/600/0.75', 'cyan/400/0.75'],
          },
        },
      },
      default: {
        pressed: {
          _hue: 'cyan',
        },
        selected: {
          _hue: 'cyan',
        },
      },
      critical: {
        '*': {
          border: ['500/0.2', '900'],
        },
      },
    },
    bleed: {
      '*': {
        '*': {
          accent: {
            fg: ['purple/600', 'purple/300'],
          },
          link: {
            fg: ['cyan/600', 'cyan/300'],
          },
        },
      },
      default: {
        pressed: {
          _hue: 'cyan',
        },
        selected: {
          _hue: 'cyan',
        },
      },
    },
  },
  card: {
    '*': {
      accent: {
        fg: ['purple/600', 'purple/300'],
      },
      link: {
        fg: ['cyan/700', 'cyan/300'],
      },
    },
    selected: {
      _blend: ['multiply', 'screen'],
      bg: ['100', '900'],
      bg2: ['50', '950'],
      fg: ['black', 'white'],
      border: ['200', '900'],
    },
  },
  selectable: {
    '*': {
      pressed: {
        // _hue: 'cyan',
      },
      selected: {
        _blend: ['multiply', 'screen'],
        // _hue: 'cyan',
        bg: ['100', '900'],
        fg: ['800', '200'],
      },
    },
    default: {
      selected: {
        _hue: 'cyan',
      },
    },
    primary: {
      _hue: 'cyan',
    },
    positive: {
      _hue: 'cyan',
    },
  },
}
