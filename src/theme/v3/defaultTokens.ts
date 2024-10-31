import {PartialTokens, Tokens} from './tokens'

/** @internal */
export const defaultTokens: PartialTokens<Tokens> = {
  color: {
    '*': {
      backdrop: ['black/0.5', 'gray/100/0.5'],
      code: {
        bg: ['950', '50'],
        fg: ['300', '700'],
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
      },
      focusRing: ['blue/500', 'blue/500'],
      link: {
        fg: ['blue/400', 'blue/600'],
      },
      shadow: {
        outline: ['500/0.4', '500/0.3'],
        umbra: ['black/0.2', '500/0.1'],
        penumbra: ['black/0.14', '500/0.07'],
        ambient: ['black/0.12', '500/0.06'],
      },
      variant: {
        tinted: {
          '*': {
            bg: {
              0: ['950', '50'],
              4: ['700', '300'],
            },
            border: {
              0: ['700', '100'],
              4: ['500', '300'],
            },
            fg: {
              0: ['100', '900'],
              4: ['300', '700'],
            },
          },
          'primary': {
            _hue: 'blue',
            bg: {0: ['inherit', 'inherit']},
          },
          'suggest': {
            _hue: 'purple',
            bg: {0: ['inherit', 'inherit']},
          },
          'positive': {
            _hue: 'green',
            bg: {0: ['inherit', 'inherit']},
          },
          'caution': {
            _hue: 'yellow',
            bg: {0: ['inherit', 'inherit']},
          },
          'critical': {
            _hue: 'red',
            bg: {0: ['inherit', 'inherit']},
          },
        },
        solid: {
          '*': {
            bg: {
              0: ['400', '500'],
              4: ['300', '600'],
            },
            border: {
              0: ['200', '400'],
              4: ['100', '500'],
            },
            fg: {
              0: ['black', 'white'],
              4: ['700', '200'],
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
              4: ['800', '300 50%'],
            },
            border: {
              0: ['800', '300 40%'],
              4: ['600', '300'],
            },
            fg: {
              0: ['100', 'black'],
              4: ['400', '700'],
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
              0: ['950', 'white'],
              4: ['800', '200'],
            },
            border: {
              0: ['800', '100'],
              4: ['600', '400'],
            },
            fg: {
              0: ['white', 'black'],
              4: ['400', '600'],
            },
          },
        },
      },
    },
    'neutral': {
      variant: {
        tinted: {
          '*': {
            bg: {
              0: ['900', '50'],
              4: ['700', '200'],
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
