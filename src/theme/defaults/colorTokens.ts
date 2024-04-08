import {ThemeColorTokens} from '../config'

export const defaultColorTokens: ThemeColorTokens = {
  base: {
    '*': {
      _blend: ['multiply', 'screen'],
      accent: {
        fg: ['purple/600', 'purple/400'],
      },
      avatar: {
        '*': {
          _blend: ['screen', 'multiply'],
          bg: ['500', '400'],
          fg: ['white', 'black'],
        },
      },
      backdrop: ['gray/200/0.5', 'black/0.5'],
      badge: {
        '*': {
          bg: ['100', '900'],
          fg: ['600', '400'],
          icon: ['500', '500'],
          dot: ['500', '500'],
        },
        positive: {
          bg: ['200 50%', '900'],
          fg: ['600', '500'],
        },
        caution: {
          bg: ['200 50%', '900'],
          fg: ['600', '500'],
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
      icon: ['600', '400'],
      kbd: {
        bg: ['white', 'black'],
        fg: ['600', '400'],
        border: ['200', '800'],
      },
      link: {
        fg: ['blue/600', 'blue/300'],
      },
      muted: {
        bg: ['50', '950'],
        fg: ['700 75%', '300 75%'],
      },
      shadow: {
        outline: ['500/0.3', '500/0.4'],
        umbra: ['gray/500/0.1', 'black/0.2'],
        penumbra: ['gray/500/0.07', 'black/0.14'],
        ambient: ['gray/500/0.06', 'black/0.12'],
      },
      skeleton: {
        from: ['100', '900'],
        to: ['100 50%', '900 50%'],
      },
    },
    transparent: {
      bg: ['50', 'black'],
    },
    default: {
      bg: ['white', '950'],
      fg: ['800', '200'],
      muted: {
        fg: ['600', '400'],
      },
    },
    primary: {_hue: 'blue'},
    positive: {
      _hue: 'green',
      shadow: {outline: ['500/0.4', '500/0.4']},
    },
    caution: {
      _hue: 'yellow',
      shadow: {outline: ['600/0.3', '500/0.4']},
    },
    critical: {_hue: 'red'},
  },
  button: {
    default: {
      '*': {
        '*': {
          _blend: ['screen', 'multiply'],
          accent: {
            fg: ['purple/300', 'purple/700'],
          },
          avatar: {
            '*': {
              _blend: ['multiply', 'screen'],
              bg: ['white', 'black'],
              fg: ['black', 'white'],
            },
          },
          badge: {
            '*': {
              bg: ['900', '100'],
              fg: ['400', '600'],
              dot: ['500', '500'],
              icon: ['500', '500'],
            },
          },
          bg: ['500', '400'],
          border: ['500/0', '400/0'],
          code: {
            bg: ['500 20%', '400 20%'],
            fg: ['200', '600'],
          },
          fg: ['white', 'black'],
          icon: ['100 70%', '900 70%'],
          kbd: {
            bg: ['black', 'white'],
            fg: ['200', '600'],
            border: ['800', '200'],
          },
          link: {
            fg: ['blue/200', 'blue/600'],
          },
          muted: {
            bg: ['950', '50'],
            fg: ['100 70%', '900 70%'],
          },
          skeleton: {
            from: ['900', '100'],
            to: ['900 50%', '100 50%'],
          },
        },
        hovered: {
          bg: ['700', '300'],
          border: ['700/0', '300/0'],
        },
        pressed: {
          bg: ['700', '300'],
        },
        selected: {
          bg: ['700', '300'],
        },
        disabled: {
          _hue: 'gray',
          accent: {
            fg: ['100 70%', '900 70%'],
          },
          badge: {
            '*': {
              bg: ['gray/700', 'gray/300'],
              fg: ['white', 'black'],
              dot: ['white', 'black'],
              icon: ['white', 'black'],
            },
          },
          bg: ['300', '600'],
          fg: ['300', '600'],
          muted: {
            bg: ['300', '600'],
            fg: ['300', '600'],
          },
          kbd: {
            bg: ['black', 'white'],
            fg: ['white', 'black'],
            border: ['700', '300'],
          },
          link: {
            fg: ['100 70%', '900 70%'],
          },
        },
      },
      default: {
        '*': {
          bg: ['800', '200'],
          muted: {
            bg: ['950', '50'],
            fg: ['400', '600'],
          },
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
    },
    ghost: {
      '*': {
        '*': {
          _blend: ['multiply', 'screen'],
          accent: {
            fg: ['purple/700 60%', 'purple/300 70%'],
          },
          badge: {
            '*': {
              bg: ['100', '900'],
              fg: ['600', '400'],
              dot: ['500', '500'],
              icon: ['500', '500'],
            },
          },
          bg: ['50', '950'],
          border: ['100', '900'],
          code: {
            bg: ['500 10%', '400 10%'],
            fg: ['700 60%', '400 60%'],
          },
          fg: ['600', '400'],
          icon: ['700 60%', '300 60%'],
          kbd: {
            bg: ['white', 'black'],
            fg: ['600', '400'],
            border: ['200', '800'],
          },
          link: {
            fg: ['blue/700 60%', 'blue/300 60%'],
          },
          muted: {
            bg: ['100', '950'],
            fg: ['700 60%', '300 60%'],
          },
          skeleton: {
            from: ['100', '900'],
            to: ['100 50%', '900 50%'],
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
          accent: {
            fg: ['200', '800'],
          },
          badge: {
            '*': {
              _hue: 'gray',
              bg: ['50', '950'],
              fg: ['gray/200', 'gray/800'],
              dot: ['gray/200', 'gray/800'],
              icon: ['gray/200', 'gray/800'],
            },
          },
          border: ['100', '900'],
          code: {
            bg: ['50', '950'],
            fg: ['200', '800'],
          },
          fg: ['400', '600'],
          icon: ['300', '700'],
          muted: {
            fg: ['400', '600'],
          },
          kbd: {
            bg: ['white', 'black'],
            fg: ['200', '800'],
            border: ['100', '900'],
          },
          link: {
            fg: ['200', '800'],
          },
        },
      },
      positive: {
        '*': {
          border: ['600 20%', '800'],
        },
      },
      caution: {
        '*': {
          border: ['600 20%', '800'],
        },
      },
    },
    bleed: {
      '*': {
        '*': {
          _blend: ['multiply', 'screen'],
          accent: {
            fg: ['purple/700 70%', 'purple/300 70%'],
          },
          badge: {
            '*': {
              bg: ['100', '900'],
              fg: ['600', '400'],
              dot: ['500', '500'],
              icon: ['500', '500'],
            },
          },
          bg: ['white', 'black'],
          border: ['white/0', 'black/0'],
          code: {
            bg: ['50', '950'],
            fg: ['700 75%', '300 75%'],
          },
          fg: ['700', '300'],
          icon: ['700 75%', '300 75%'],
          kbd: {
            bg: ['white', 'black'],
            fg: ['700', '300'],
            border: ['200', '800'],
          },
          link: {
            fg: ['blue/700 70%', 'blue/300 70%'],
          },
          muted: {
            bg: ['100', '950'],
            fg: ['700 75%', '300 75%'],
          },
          skeleton: {
            from: ['100', '900'],
            to: ['100 50%', '900 50%'],
          },
        },
        hovered: {
          bg: ['50', '950'],
          icon: ['700 70%', '400 70%'],
        },
        pressed: {
          bg: ['100', '900'],
          fg: ['800', '200'],
          icon: ['800 70%', '200 70%'],
        },
        selected: {
          bg: ['100', '900'],
          fg: ['800', '200'],
          icon: ['800 60%', '200 60%'],
        },
        disabled: {
          _hue: 'gray',
          accent: {
            fg: ['200', '800'],
          },
          badge: {
            '*': {
              _hue: 'gray',
              bg: ['50', '950'],
              fg: ['gray/200', 'gray/800'],
              dot: ['gray/200', 'gray/800'],
              icon: ['gray/200', 'gray/800'],
            },
          },
          code: {
            bg: ['50', '950'],
            fg: ['200', '800'],
          },
          fg: ['400', '600'],
          icon: ['300', '700'],
          muted: {
            fg: ['400', '600'],
          },
          kbd: {
            bg: ['white', 'black'],
            fg: ['200', '800'],
            border: ['100', '900'],
          },
          link: {
            fg: ['200', '800'],
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
        placeholder: ['400', '600 50%'],
      },
      hovered: {
        border: ['300', '700'],
      },
      readOnly: {
        bg: ['50', '950'],
        border: ['200', '800'],
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
        accent: {
          fg: ['purple/700 70%', 'purple/300 70%'],
        },
        badge: {
          '*': {
            bg: ['100', '900'],
            fg: ['600', '400'],
            dot: ['500', '500'],
            icon: ['500', '500'],
          },
        },
        bg: ['white', 'black'],
        border: ['200', '800'],
        code: {
          bg: ['50', '950'],
          fg: ['600', '400'],
        },
        fg: ['700', '300'],
        icon: ['700 75%', '300 75%'],
        kbd: {
          bg: ['white', 'black'],
          fg: ['600', '400'],
          border: ['200', '800'],
        },
        link: {
          fg: ['blue/700 70%', 'blue/300 70%'],
        },
        muted: {
          bg: ['100', '950'],
          fg: ['700 75%', '300 75%'],
        },
        skeleton: {
          from: ['100', '900'],
          to: ['100 50%', '900 50%'],
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
        accent: {
          fg: ['purple/300', 'purple/700'],
        },
        avatar: {
          '*': {
            _blend: ['multiply', 'screen'],
            bg: ['white', 'black'],
            fg: ['black', 'white'],
          },
        },
        badge: {
          '*': {
            bg: ['900', '100'],
            fg: ['400', '600'],
            dot: ['500', '500'],
            icon: ['500', '500'],
          },
        },
        bg: ['500', '400'],
        border: ['500 20%', '400 20%'],
        code: {
          bg: ['500 20%', '400 20%'],
          fg: ['200', '600'],
        },
        fg: ['white', 'black'],
        icon: ['100 70%', '900 70%'],
        kbd: {
          bg: ['black', 'white'],
          fg: ['200', '600'],
          border: ['800', '200'],
        },
        link: {
          fg: ['blue/200', 'blue/600'],
        },
        muted: {
          bg: ['950', '50'],
          fg: ['100 70%', '900 70%'],
        },
        skeleton: {
          from: ['900', '100'],
          to: ['900 50%', '100 50%'],
        },
      },
      disabled: {
        _hue: 'gray',
        accent: {
          fg: ['200', '800'],
        },
        badge: {
          '*': {
            _hue: 'gray',
            bg: ['50', '950'],
            fg: ['gray/200', 'gray/800'],
            dot: ['gray/200', 'gray/800'],
            icon: ['gray/200', 'gray/800'],
          },
        },
        border: ['100', '900'],
        code: {
          bg: ['50', '950'],
          fg: ['200', '800'],
        },
        fg: ['200', '800'],
        icon: ['200', '800'],
        kbd: {
          bg: ['white', 'black'],
          fg: ['200', '800'],
          border: ['100', '900'],
        },
        link: {
          fg: ['200', '800'],
        },
        muted: {
          fg: ['200', '800'],
        },
      },
    },
    default: {
      selected: {
        _hue: 'blue',
      },
    },
    critical: {
      disabled: {
        bg: ['50 50%', '950 50%'],
      },
    },
  },
  syntax: {
    atrule: ['purple/600', 'purple/400'],
    attrName: ['green/600', 'green/400'],
    attrValue: ['yellow/600', 'yellow/400'],
    attribute: ['yellow/600', 'yellow/400'],
    boolean: ['purple/600', 'purple/400'],
    builtin: ['purple/600', 'purple/400'],
    cdata: ['yellow/600', 'yellow/400'],
    char: ['yellow/600', 'yellow/400'],
    class: ['orange/600', 'orange/400'],
    className: ['cyan/600', 'cyan/400'],
    comment: ['gray/400', 'gray/600'],
    constant: ['purple/600', 'purple/400'],
    deleted: ['red/600', 'red/400'],
    entity: ['red/600', 'red/400'],
    function: ['green/600', 'green/400'],
    hexcode: ['blue/600', 'blue/400'],
    id: ['purple/600', 'purple/400'],
    important: ['purple/600', 'purple/400'],
    inserted: ['yellow/600', 'yellow/400'],
    keyword: ['magenta/600', 'magenta/400'],
    number: ['purple/600', 'purple/400'],
    operator: ['magenta/600', 'magenta/400'],
    property: ['blue/600', 'blue/400'],
    pseudoClass: ['yellow/600', 'yellow/400'],
    pseudoElement: ['yellow/600', 'yellow/400'],
    punctuation: ['gray/600', 'gray/400'],
    regex: ['blue/600', 'blue/400'],
    selector: ['red/600', 'red/400'],
    string: ['yellow/600', 'yellow/400'],
    symbol: ['purple/600', 'purple/400'],
    tag: ['red/600', 'red/400'],
    unit: ['orange/600', 'orange/400'],
    url: ['red/600', 'red/400'],
    variable: ['red/600', 'red/400'],
  },
}
