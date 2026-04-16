import type {AvatarColor, CardTone, CodeTokenKey, ColorVariant, ElementTone, Hue} from '../../types'
import type {ColorSchemePair} from './_parseColorExprLiteral'

export type AvatarsColorSpec = Record<
  '*' | AvatarColor,
  {
    _hue?: Hue
    bg?: ColorSchemePair
    fg?: ColorSchemePair
  }
>

export interface SanityElementColorSpec {
  _hue?: Hue
  bg?: {
    0?: ColorSchemePair
    4?: ColorSchemePair
  }
  border?: {
    0?: ColorSchemePair
    4?: ColorSchemePair
  }
  fg?: {
    0?: ColorSchemePair
    4?: ColorSchemePair
  }
}

export interface SanityCardColorSpec {
  _hue?: Hue
  avatar?: AvatarsColorSpec
  backdrop?: ColorSchemePair
  code?: {
    token?: Partial<Record<CodeTokenKey, ColorSchemePair>>
  }
  focusRing?: ColorSchemePair
  link?: {
    fg?: ColorSchemePair
  }
  shadow?: {
    outline?: ColorSchemePair
    umbra?: ColorSchemePair
    penumbra?: ColorSchemePair
    ambient?: ColorSchemePair
  }
  element?: Partial<
    Record<ColorVariant, Partial<Record<'*' | ElementTone, SanityElementColorSpec>>>
  >
}

type SanityColorSpec = Partial<Record<'*' | CardTone, SanityCardColorSpec>>

export const colorSpec: SanityColorSpec = {
  '*': {
    backdrop: ['200/0.5', 'black/0.5'],
    code: {
      token: {
        atrule: ['purple-600', 'purple-400'],
        attrName: ['green-600', 'green-400'],
        attrValue: ['yellow-600', 'yellow-400'],
        attribute: ['yellow-600', 'yellow-400'],
        boolean: ['purple-600', 'purple-400'],
        builtin: ['purple-600', 'purple-400'],
        cdata: ['yellow-600', 'yellow-400'],
        char: ['yellow-600', 'yellow-400'],
        class: ['orange-600', 'orange-400'],
        className: ['cyan-600', 'cyan-400'],
        comment: ['600 60%', '400 60%'],
        constant: ['purple-600', 'purple-400'],
        deleted: ['red-600', 'red-400'],
        entity: ['red-600', 'red-400'],
        function: ['green-600', 'green-400'],
        hexcode: ['blue-600', 'blue-400'],
        id: ['purple-600', 'purple-400'],
        important: ['purple-600', 'purple-400'],
        inserted: ['green-600', 'green-400'],
        keyword: ['magenta-600', 'magenta-400'],
        number: ['purple-600', 'purple-400'],
        operator: ['magenta-600', 'magenta-400'],
        prolog: ['600', '400'],
        property: ['blue-600', 'blue-400'],
        pseudoClass: ['yellow-600', 'yellow-400'],
        pseudoElement: ['yellow-600', 'yellow-400'],
        punctuation: ['600', '400'],
        regex: ['blue-600', 'blue-400'],
        selector: ['red-600', 'red-400'],
        string: ['yellow-600', 'yellow-400'],
        symbol: ['purple-600', 'purple-400'],
        tag: ['red-600', 'red-400'],
        unit: ['orange-600', 'orange-400'],
        url: ['red-600', 'red-400'],
        variable: ['red-600', 'red-400'],
      },
    },
    focusRing: ['blue-500', 'blue-500'],
    link: {
      fg: ['blue-600', 'blue-400'],
    },
    shadow: {
      outline: ['600/0.4', '500/0.4'],
      umbra: ['600/0.2', 'black/0.2'],
      penumbra: ['600/0.14', 'black/0.14'],
      ambient: ['600/0.12', 'black/0.12'],
    },
    element: {
      tinted: {
        '*': {
          bg: {
            0: ['100 75%', '900 75%'],
            4: ['300', '700'],
          },
          border: {
            0: ['300 40%', '700 50%'],
            4: ['400 80%', '600'],
          },
          fg: {
            0: ['800', '200'],
            4: ['800 70%', '200 70%'],
          },
        },
        'neutral': {
          bg: {0: ['inherit', 'inherit']},
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
            0: ['500', '400'],
            4: ['600', '300'],
          },
          border: {
            0: ['400', '500'],
            4: ['300', '600'],
          },
          fg: {
            0: ['50', '950'],
            4: ['200', '700'],
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
    backdrop: ['100/0.5', 'black/0.5'],
    element: {
      tinted: {
        '*': {
          bg: {
            0: ['50', 'black'],
            4: ['300 75%', '700 50%'],
          },
          border: {
            0: ['200', '800 50%'],
            4: ['400 75%', '700'],
          },
          fg: {
            0: ['black', '100'],
            4: ['800 70%', '200 70%'],
          },
        },
      },
      solid: {
        default: {
          bg: {
            0: ['800', '200'],
            4: ['black', 'white'],
          },
          border: {
            0: ['700', '300'],
            4: ['600', '400'],
          },
          fg: {
            0: ['white', 'black'],
            4: ['200', '700'],
          },
        },
      },
    },
  },
  'default': {
    backdrop: ['100/0.5', 'black/0.5'],
    element: {
      tinted: {
        '*': {
          bg: {
            0: ['white', '950'],
            4: ['200', '700'],
          },
          border: {
            0: ['200', '700 50%'],
            4: ['400 75%', '600'],
          },
          fg: {
            0: ['900', '100'],
            4: ['700 80%', '300 80%'],
          },
        },
      },
      solid: {
        default: {
          bg: {
            0: ['800', '200'],
            4: ['black', 'white'],
          },
          border: {
            0: ['700', '300'],
            4: ['600', '400'],
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
}
