import {PaletteConfig} from '../palette'
import {PartialTokens, Tokens} from './tokens'

export const defaultPalette: PaletteConfig = {
  chroma: {min: 0.005, max: 0.2325},
  luminosity: {min: 0.1875, max: 1},
  hues: {
    gray: {h: 277, c: 0.04},
    blue: {h: 273, c: 0.185},
    purple: {h: 295, c: 0.4},
    magenta: {h: 12, c: 0.4},
    red: {h: 30, c: 0.4},
    orange: {h: 68, c: 0.4},
    yellow: {h: 90, c: 0.4},
    green: {h: 171, c: 0.4},
    cyan: {h: 194, c: 0.4},
  },
}

export const defaultTokens: PartialTokens<Tokens> = {
  color: {
    '*': {
      // backdrop: ['black/0.2', '200/0.2'],
      backdrop: ['black/0.5', 'gray/100/0.5'],
      focusRing: ['blue/500', 'blue/300'],
      link: {
        fg: ['blue/400', 'blue/600'],
      },
      shadow: {
        outline: ['500/0.4', '500/0.3'],
        umbra: ['black/0.2', '500/0.1'],
        penumbra: ['black/0.14', '500/0.07'],
        ambient: ['black/0.12', '500/0.06'],
      },
      token: {
        atrule: ['purple/300', 'purple/600'],
        attrName: ['green/300', 'green/600'],
        attrValue: ['yellow/300', 'yellow/600'],
        attribute: ['yellow/300', 'yellow/600'],
        boolean: ['purple/300', 'purple/600'],
        builtin: ['purple/300', 'purple/600'],
        cdata: ['yellow/300', 'yellow/600'],
        char: ['yellow/300', 'yellow/600'],
        class: ['orange/300', 'orange/600'],
        className: ['cyan/300', 'cyan/600'],
        comment: ['gray/600', 'gray/300'],
        constant: ['purple/300', 'purple/600'],
        deleted: ['red/300', 'red/600'],
        entity: ['red/300', 'red/600'],
        function: ['green/300', 'green/600'],
        hexcode: ['blue/300', 'blue/600'],
        id: ['purple/300', 'purple/600'],
        important: ['purple/300', 'purple/600'],
        inserted: ['green/300', 'green/600'],
        keyword: ['magenta/300', 'magenta/600'],
        number: ['purple/300', 'purple/600'],
        operator: ['magenta/300', 'magenta/600'],
        prolog: ['gray/300', 'gray/600'],
        property: ['blue/300', 'blue/600'],
        pseudoClass: ['yellow/300', 'yellow/600'],
        pseudoElement: ['yellow/300', 'yellow/600'],
        punctuation: ['gray/300', 'gray/600'],
        regex: ['blue/300', 'blue/600'],
        selector: ['red/300', 'red/600'],
        string: ['yellow/300', 'yellow/600'],
        symbol: ['purple/300', 'purple/600'],
        tag: ['red/300', 'red/600'],
        unit: ['orange/300', 'orange/600'],
        url: ['red/300', 'red/600'],
        variable: ['red/300', 'red/600'],
      },
      variant: {
        tinted: {
          '*': {
            bg: {
              0: ['900', '50'],
              4: ['800', '150'],
            },
            border: {
              0: ['800', '150'],
              4: ['600', '350'],
            },
            fg: {
              0: ['100', '900'],
              4: ['300', '700'],
            },
          },
          'primary': {
            _hue: 'blue',
          },
          'suggest': {
            _hue: 'purple',
          },
          'positive': {
            _hue: 'green',
          },
          'caution': {
            _hue: 'yellow',
          },
          'critical': {
            _hue: 'red',
          },
        },
        solid: {
          '*': {
            bg: {
              0: ['300', '500'],
              4: ['200', '600'],
            },
            border: {
              0: ['200', '400'],
              4: ['100', '500'],
            },
            fg: {
              0: ['black', 'white'],
              4: ['600', '400'],
            },
          },
          'default': {
            bg: {
              0: ['200', '800'],
              4: ['white', 'black'],
            },
            border: {
              0: ['300', '700'],
              4: ['200', '800'],
            },
          },
          'primary': {
            _hue: 'blue',
          },
          'suggest': {
            _hue: 'purple',
          },
          'positive': {
            _hue: 'green',
          },
          'caution': {
            _hue: 'yellow',
          },
          'critical': {
            _hue: 'red',
          },
        },
      },
    },
    'transparent': {
      variant: {
        tinted: {
          '*': {
            bg: {
              0: ['black', 'gray/50'],
              4: ['900', '150'],
            },
            border: {
              0: ['900', '150'],
              4: ['700', '350'],
            },
            fg: {
              0: ['150', 'black'],
              4: ['550', '600'],
            },
          },
        },
      },
    },
    'default': {
      variant: {
        tinted: {
          '*': {
            bg: {
              0: ['gray/950', 'white'],
              4: ['850', '100'],
            },
            border: {
              0: ['850', '100'],
              4: ['650', '300'],
            },
            fg: {
              0: ['white', 'black'],
              4: ['400', '600'],
            },
          },
        },
      },
    },
    'primary': {
      _hue: 'blue',
    },
    'suggest': {
      _hue: 'purple',
    },
    'positive': {
      _hue: 'green',
    },
    'caution': {
      _hue: 'yellow',
    },
    'critical': {
      _hue: 'red',
    },
  },
}

// export const defaultTheme = buildTheme_v3()
