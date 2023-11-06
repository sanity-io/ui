import {ColorTokens} from '../../../config'

export const defaultColorTokens: ColorTokens = {
  base: {
    '*': {
      _blend: ['multiply', 'screen'],
      bg: ['50', '950'],
      fg: ['800', '200'],
      border: ['200', '900'],
      focusRing: ['cyan/500', 'cyan/500'],
      shadow: {
        outline: ['500/0.2', '500/0.2'],
        umbra: ['gray/500/0.1', 'black/0.1'],
        penumbra: ['gray/500/0.07', 'black/0.07'],
        ambient: ['gray/500/0.06', 'black/0.06'],
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
      // border: ['200', '800'],
      // shadow: {
      //   // outline: ['500/0.3', '400/0.3'],
      // },
    },
    caution: {
      _hue: 'yellow',
      // border: ['200', '800'],
      // shadow: {
      //   outline: ['500/0.3', '400/0.3'],
      // },
    },
    critical: {
      _hue: 'red',
    },
  },
  button: {
    default: {
      '*': {
        '*': {
          _blend: ['screen', 'multiply'],
          bg: ['500', '400'],
          bg2: ['950', '50'],
          fg: ['white', 'black'],
          icon: ['200', '800'],
          border: ['500/0', '400/0'],
          muted: {
            fg: ['200', '700'],
          },
          accent: {
            fg: ['purple/200', 'purple/700'],
          },
          link: {
            fg: ['cyan/200', 'cyan/700'],
          },
          code: {
            bg: ['950', '50'],
            fg: ['200', '700'],
          },
          skeleton: {
            from: ['900', '100'],
            to: ['900/0.5', '100/0.5'],
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
          bg: ['200', '900'],
        },
      },
      default: {
        '*': {
          bg: ['900', '200'],
        },
        hovered: {
          bg: ['black', '100'],
        },
        pressed: {
          bg: ['black', '200'],
        },
        selected: {
          bg: ['black', '200'],
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
          _blend: ['multiply', 'screen'],
          bg: ['white', 'black'],
          bg2: ['50', '950'],
          fg: ['600', '400'],
          icon: ['500', '400'],
          border: ['200', '900'],
          muted: {
            fg: ['600/0.75', '400/0.75'],
          },
          accent: {
            fg: ['purple/600/0.75', 'purple/400/0.75'],
          },
          link: {
            fg: ['cyan/600/0.75', 'cyan/400/0.75'],
          },
          code: {
            bg: ['50', '950'],
            fg: ['600/0.75', '400/0.75'],
          },
          skeleton: {
            from: ['100', '900'],
            to: ['100/0.5', '900/0.5'],
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
          fg: ['200', '900'],
          border: ['100', '950'],
          muted: {
            fg: ['200/0.6', '900/0.6'],
          },
          accent: {
            fg: ['200/0.6', '900/0.6'],
          },
          link: {
            fg: ['200/0.6', '900/0.6'],
          },
          code: {
            bg: ['50/0.5', '950/0.5'],
            fg: ['200/0.6', '900/0.6'],
          },
        },
      },
      default: {
        pressed: {
          _hue: 'cyan',
          // border: ['400', '800'],
        },
        selected: {
          _hue: 'cyan',
          // border: ['400', '800'],
        },
      },
      // primary: {
      //   '*': {
      //     border: ['400', '800'],
      //   },
      // },
      // positive: {
      //   '*': {
      //     border: ['400', '800'],
      //   },
      // },
      // caution: {
      //   '*': {
      //     border: ['400', '800'],
      //   },
      // },
    },
    bleed: {
      '*': {
        '*': {
          _blend: ['multiply', 'screen'],
          bg: ['white', 'black'],
          bg2: ['50', '950'],
          fg: ['600', '400'],
          icon: ['500', '400'],
          border: ['white/0', 'black/0'],
          muted: {
            fg: ['600', '300'],
          },
          accent: {
            fg: ['purple/600', 'purple/300'],
          },
          link: {
            fg: ['cyan/600', 'cyan/300'],
          },
          code: {
            bg: ['50', '950'],
            fg: ['600', '300'],
          },
          skeleton: {
            from: ['100', '900'],
            to: ['100/0.5', '900/0.5'],
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
          fg: ['200', '900'],
          muted: {
            fg: ['200/0.6', '900/0.6'],
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
      _blend: ['multiply', 'screen'],
      bg: ['white', 'black'],
      bg2: ['50', '950'],
      fg: ['black', 'white'],
      icon: ['500', '400'],
      border: ['200', '900'],
      muted: {
        fg: ['gray/600', 'gray/400'],
      },
      accent: {
        fg: ['purple/600', 'purple/300'],
      },
      link: {
        fg: ['cyan/700', 'cyan/300'],
      },
      code: {
        bg: ['50', '950'],
        fg: ['gray/600', 'gray/400'],
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
      // _hue: 'cyan',
      bg: ['100', '900'],
      bg2: ['50', '950'],
      fg: ['black', 'white'],
      border: ['200', '900'],
    },
    disabled: {
      _hue: 'gray',
      fg: ['200', '900'],
      border: ['100', '900/0.5'],
      muted: {
        fg: ['200/0.5', '800/0.5'],
      },
      accent: {
        fg: ['200/0.6', '800/0.6'],
      },
      link: {
        fg: ['200/0.6', '800/0.6'],
      },
    },
  },
  input: {
    '*': {
      '*': {
        _blend: ['multiply', 'screen'],
        bg: ['white', 'black'],
        bg2: ['50', '950'],
        fg: ['black', '200'],
        border: ['200', '900'],
        placeholder: ['400', '600/0.5'],
      },

      hovered: {
        border: ['300', '800'],
      },

      readOnly: {
        border: ['200/0', '900/0'],
        bg: ['50', '950'],
        fg: ['900/0.7', '200/0.7'],
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
        // fg: ['800', '200'],
        // border: ['200', '900'],
      },

      readOnly: {
        // bg: ['100', '900'],
      },
    },
  },
  syntax: {
    atrule: ['purple/700', 'purple/400'],
    attrName: ['green/700', 'green/400'],
    attrValue: ['yellow/700', 'yellow/400'],
    attribute: ['yellow/700', 'yellow/400'],
    boolean: ['purple/700', 'purple/400'],
    builtin: ['purple/700', 'purple/400'],
    cdata: ['yellow/700', 'yellow/400'],
    char: ['yellow/700', 'yellow/400'],
    class: ['orange/700', 'orange/400'],
    className: ['cyan/700', 'cyan/400'],
    comment: ['gray/700/0.5', 'gray/400/0.5'],
    constant: ['purple/700', 'purple/400'],
    deleted: ['red/700', 'red/400'],
    entity: ['red/700', 'red/400'],
    function: ['green/700', 'green/400'],
    hexcode: ['blue/700', 'blue/400'],
    id: ['purple/700', 'purple/400'],
    important: ['purple/700', 'purple/400'],
    inserted: ['yellow/700', 'yellow/400'],
    keyword: ['magenta/700', 'magenta/400'],
    number: ['purple/700', 'purple/400'],
    operator: ['magenta/700', 'magenta/400'],
    property: ['blue/700', 'blue/400'],
    pseudoClass: ['yellow/700', 'yellow/400'],
    pseudoElement: ['yellow/700', 'yellow/400'],
    punctuation: ['gray/700', 'gray/400'],
    regex: ['blue/700', 'blue/400'],
    selector: ['red/700', 'red/400'],
    string: ['yellow/700', 'yellow/400'],
    symbol: ['purple/700', 'purple/400'],
    tag: ['red/700', 'red/400'],
    unit: ['orange/700', 'orange/400'],
    url: ['red/700', 'red/400'],
    variable: ['red/700', 'red/400'],
  },
}
