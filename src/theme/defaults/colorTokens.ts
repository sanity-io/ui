import {ThemeColorTokens} from '../config'

export const defaultColorTokens: ThemeColorTokens = {
  base: {
    '*': {
      _blend: ['multiply', 'screen'],
      avatar: {
        '*': {
          _blend: ['screen', 'multiply'],
          bg: ['500', '400'],
          fg: ['white', 'black'],
        },
        yellow: {bg: ['600', '400']},
        green: {bg: ['600', '400']},
        cyan: {bg: ['600', '400']},
      },
      backdrop: ['gray/200/0.2', 'black/0.5'],
      badge: {
        '*': {
          bg: ['100', '900'],
          fg: ['600', '400'],
        },
        positive: {
          bg: ['200/0.6', '900'],
          fg: ['700', '500'],
        },
        caution: {
          bg: ['200/0.7', '900'],
          fg: ['700', '500'],
        },
      },
      bg: ['50', '950'],
      border: ['200', '800'],
      code: {
        bg: ['50', '950'],
        fg: ['600', '400'],
      },
      fg: ['800', '200'],
      focusRing: ['blue/500', 'blue/500'],
      kbd: {
        bg: ['white', 'black'],
        fg: ['600', '400'],
        border: ['200', '800'],
      },
      link: {
        fg: ['blue/600', 'blue/400'],
      },
      muted: {
        bg: ['50', '950'],
        fg: ['600', '400'],
      },
      shadow: {
        outline: ['500/0.3', '500/0.4'],
        umbra: ['gray/500/0.1', 'black/0.2'],
        penumbra: ['gray/500/0.07', 'black/0.14'],
        ambient: ['gray/500/0.06', 'black/0.12'],
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
      _hue: 'blue',
    },
    positive: {
      _hue: 'green',
      shadow: {
        outline: ['600/0.3', '500/0.25'],
      },
    },
    caution: {
      _hue: 'yellow',
      shadow: {
        outline: ['600/0.3', '500/0.25'],
      },
    },
    critical: {
      _hue: 'red',
      shadow: {
        outline: ['500/0.3', '500/0.3'],
      },
    },
  },
  button: {
    default: {
      '*': {
        '*': {
          _blend: ['screen', 'multiply'],
          accent: {
            fg: ['purple/200', 'purple/700'],
          },
          badge: {
            '*': {
              dot: ['300', '700'],
              icon: ['600', '400'],
            },
          },
          bg: ['500', '400'],
          border: ['500/0', '400/0'],
          code: {
            bg: ['500/0.2', '400/0.2'],
            fg: ['200', '700'],
          },
          fg: ['white', 'black'],
          icon: ['200', '800'],
          kbd: {
            bg: ['900', '50'],
            fg: ['white', 'black'],
            border: ['800', '200'],
          },
          link: {
            fg: ['blue/200', 'blue/700'],
          },
          muted: {
            bg: ['900', '50'],
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
          bg: ['200', '800'],
          icon: ['white', 'black'],
        },
      },
      default: {
        '*': {
          bg: ['800', '200'],
        },
        hovered: {
          bg: ['900', '100'],
        },
        pressed: {
          bg: ['black', 'white'],
        },
        selected: {
          bg: ['black', 'white'],
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
          bg: ['50', '950'],
          fg: ['700', '400'],
          icon: ['600', '500'],
          border: ['100', '900'],
          accent: {
            fg: ['purple/700/0.6', 'purple/400/0.8'],
          },
          link: {
            fg: ['blue/700/0.6', 'blue/400/0.8'],
          },
          muted: {
            bg: ['100', '950'],
            fg: ['700/0.6', '400/0.6'],
          },
          code: {
            bg: ['500/0.1', '400/0.1'],
            fg: ['700/0.6', '400/0.6'],
          },
          skeleton: {
            from: ['100', '900'],
            to: ['100/0.5', '900/0.5'],
          },
          badge: {
            '*': {
              dot: ['300', '700'],
              icon: ['600', '400'],
            },
          },
        },
        hovered: {
          bg: ['100', '900'],
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
          fg: ['200', '800'],
          icon: ['200', '800'],
          border: ['100', '900'],
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
      positive: {
        '*': {
          border: ['600/0.2', '800'],
        },
      },
      caution: {
        '*': {
          border: ['600/0.2', '800'],
        },
      },
    },
    bleed: {
      '*': {
        '*': {
          _blend: ['multiply', 'screen'],
          bg: ['white', 'black'],
          fg: ['700', '300'],
          icon: ['700/0.7', '300/0.7'],
          border: ['white/0', 'black/0'],
          muted: {
            bg: ['100', '950'],
            fg: ['700/0.7', '300/0.7'],
          },
          accent: {
            fg: ['purple/700/0.7', 'purple/300/0.7'],
          },
          link: {
            fg: ['blue/700/0.7', 'blue/300/0.7'],
          },
          code: {
            bg: ['100', '950'],
            fg: ['600', '300'],
          },
          skeleton: {
            from: ['100', '900'],
            to: ['100/0.5', '900/0.5'],
          },
          badge: {
            '*': {
              dot: ['300', '700'],
              icon: ['600', '400'],
            },
          },
        },
        hovered: {
          bg: ['50', '950'],
          fg: ['700', '300'],
          icon: ['700/0.7', '400/0.7'],
        },
        pressed: {
          bg: ['100', '900'],
          fg: ['800', '200'],
          icon: ['800/0.7', '200/0.7'],
        },
        selected: {
          bg: ['100', '900'],
          fg: ['800', '200'],
          icon: ['800/0.7', '200/0.7'],
        },
        disabled: {
          _hue: 'gray',
          fg: ['200', '800'],
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
    },
  },
  input: {
    '*': {
      '*': {
        _blend: ['multiply', 'screen'],
        bg: ['white', 'black'],
        border: ['200', '800'],
        fg: ['black', '200'],
        muted: {
          bg: ['50', '950'],
        },
        placeholder: ['400', '600/0.5'],
      },

      hovered: {
        border: ['300', '800'],
      },

      readOnly: {
        border: ['200/0', '900/0'],
        bg: ['100', '950'],
        fg: ['800', '200'],
      },

      disabled: {
        fg: ['200', '800'],
        border: ['100', '900'],
      },
    },
    invalid: {
      '*': {
        _hue: 'red',
        bg: ['100', '950'],
      },
    },
  },
  selectable: {
    '*': {
      '*': {
        _blend: ['multiply', 'screen'],
        bg: ['white', 'black'],
        fg: ['800', '200'],
        icon: ['700/0.7', '300/0.7'],
        avatar: {
          '*': {
            _blend: ['screen', 'multiply'],
            bg: ['500', '400'],
            fg: ['white', 'black'],
          },
          //   yellow: {bg: ['600', '400']},
          //   green: {bg: ['600', '400']},
          //   cyan: {bg: ['600', '400']},
        },
        border: ['200', '800'],
        muted: {
          bg: ['50', '950'],
          fg: ['700', '300'],
        },
        accent: {
          fg: ['purple/600', 'purple/400'],
        },
        link: {
          fg: ['blue/700', 'blue/300'],
        },
        code: {
          bg: ['100', '950'],
          fg: ['700', '300'],
        },
        skeleton: {
          from: ['100', '900'],
          to: ['100/0.5', '900/0.5'],
        },
        badge: {
          '*': {
            // _blend: ['multiply', 'screen'],
            bg: ['100', '900'],
            fg: ['600', '200'],
            dot: ['300', '700'],
            icon: ['600', '400'],
          },
        },
        kbd: {
          // _blend: ['multiply', 'screen'],
          bg: ['white', 'black'],
          fg: ['600', '400'],
          border: ['200', '800'],
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
        icon: ['200', '800'],
        avatar: {
          '*': {
            _blend: ['multiply', 'screen'],
            bg: ['white', 'black'],
            fg: ['black', 'white'],
          },
          // magenta: {_hue: 'green'},
          // yellow: {bg: ['600', '400']},
          // green: {bg: ['600', '400']},
          // cyan: {bg: ['600', '400']},
        },
        badge: {
          '*': {
            // _blend: ['multiply', 'screen'],
            // _blend: ['screen', 'multiply'],
            bg: ['700', '300'],
            fg: ['white', 'black'],
          },
        },
        border: ['500/0.2', '400/0.2'],
        muted: {
          bg: ['900', '50'],
          fg: ['200', '800'],
        },
        accent: {
          fg: ['purple/200', 'purple/800'],
        },
        kbd: {
          bg: ['black/0', 'white/0'],
          fg: ['white', 'black'],
          border: ['gray/700', 'gray/300'],
        },
        link: {
          fg: ['blue/200', 'blue/800'],
        },
        code: {
          bg: ['500/0.2', '400/0.2'],
          fg: ['200', '700'],
        },
        skeleton: {
          from: ['900', '100'],
          to: ['900/0.5', '100/0.5'],
        },
        // badge: {
        //   '*': {
        //     _blend: ['multiply', 'screen'],
        //     bg: ['900', '100'],
        //     fg: ['white', 'black'],
        //     dot: ['700', '300'],
        //     icon: ['400', '600'],
        //   },
        // },
      },
      disabled: {
        fg: ['200', '800'],
        icon: ['200', '800'],
        muted: {
          fg: ['200', '800/0.5'],
        },
        accent: {
          fg: ['purple/200', 'purple/800/0.5'],
        },
        link: {
          fg: ['blue/200', 'blue/800/0.5'],
        },
        code: {
          bg: ['100', '950/0.5'],
          fg: ['200', '800/0.5'],
        },
      },
    },
    default: {
      selected: {
        _hue: 'blue',
        // bg: ['500', '400'],
      },
    },
    critical: {
      disabled: {
        bg: ['50/0.5', '950/0.5'],
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
