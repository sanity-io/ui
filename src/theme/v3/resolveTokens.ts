import {
  THEME_COLOR_CARD_TONES,
  THEME_COLOR_STATE_TONES,
  ThemeColorCardToneKey,
  ThemeColorStateToneKey,
} from '../v2'
import {CardColorTokens} from './color/card'
import {ElementColorTokens} from './color/element'
import {merge} from './merge'
import {PartialTokens, Tokens} from './tokens'

const defaultElementTokens: ElementColorTokens = {
  _hue: 'gray',
  bg: {
    0: ['950', '50'],
    4: ['700', '300'],
  },
  border: {
    0: ['700', '300'],
    4: ['400', '600'],
  },
  fg: {
    0: ['100', '900'],
    4: ['400', '600'],
  },
}

/** @internal */
export function resolveTokens(tokens: PartialTokens<Tokens> = {}): Tokens {
  return {
    color: {
      '*': resolveCardColorTokens(tokens.color?.['*']),

      ...THEME_COLOR_CARD_TONES.reduce(
        (acc, tone) => {
          return {
            ...acc,
            [tone]: resolveCardColorTokens(merge(tokens.color?.['*'], tokens.color?.[tone])),
          }
        },
        {} as Record<ThemeColorCardToneKey, CardColorTokens>,
      ),
    },
  }
}

function resolveCardColorTokens(
  tokens: PartialTokens<CardColorTokens> | undefined,
): CardColorTokens {
  return {
    _hue: tokens?._hue ?? 'gray',
    avatar: {
      gray: {
        _hue: tokens?.avatar?.gray?._hue ?? 'gray',
        bg: tokens?.avatar?.gray?.bg ?? ['400', '500'],
        fg: tokens?.avatar?.gray?.fg ?? ['900', 'white'],
      },
      blue: {
        _hue: tokens?.avatar?.blue?._hue ?? 'blue',
        bg: tokens?.avatar?.blue?.bg ?? ['400', '500'],
        fg: tokens?.avatar?.blue?.fg ?? ['900', 'white'],
      },
      purple: {
        _hue: tokens?.avatar?.purple?._hue ?? 'purple',
        bg: tokens?.avatar?.purple?.bg ?? ['400', '500'],
        fg: tokens?.avatar?.purple?.fg ?? ['900', 'white'],
      },
      magenta: {
        _hue: tokens?.avatar?.magenta?._hue ?? 'magenta',
        bg: tokens?.avatar?.magenta?.bg ?? ['400', '500'],
        fg: tokens?.avatar?.magenta?.fg ?? ['900', 'white'],
      },
      red: {
        _hue: tokens?.avatar?.red?._hue ?? 'red',
        bg: tokens?.avatar?.red?.bg ?? ['400', '500'],
        fg: tokens?.avatar?.red?.fg ?? ['900', 'white'],
      },
      orange: {
        _hue: tokens?.avatar?.orange?._hue ?? 'orange',
        bg: tokens?.avatar?.orange?.bg ?? ['400', '500'],
        fg: tokens?.avatar?.orange?.fg ?? ['900', 'white'],
      },
      yellow: {
        _hue: tokens?.avatar?.yellow?._hue ?? 'yellow',
        bg: tokens?.avatar?.yellow?.bg ?? ['400', '500'],
        fg: tokens?.avatar?.yellow?.fg ?? ['900', 'white'],
      },
      green: {
        _hue: tokens?.avatar?.green?._hue ?? 'green',
        bg: tokens?.avatar?.green?.bg ?? ['400', '500'],
        fg: tokens?.avatar?.green?.fg ?? ['900', 'white'],
      },
      cyan: {
        _hue: tokens?.avatar?.cyan?._hue ?? 'cyan',
        bg: tokens?.avatar?.cyan?.bg ?? ['400', '500'],
        fg: tokens?.avatar?.cyan?.fg ?? ['900', 'white'],
      },
    },
    backdrop: tokens?.backdrop ?? ['900', '100'],
    code: {
      bg: tokens?.code?.bg ?? ['950', '50'],
      fg: tokens?.code?.fg ?? ['400', '600'],
      token: {
        atrule: tokens?.code?.token?.atrule ?? ['400', '600'],
        attribute: tokens?.code?.token?.attribute ?? ['400', '600'],
        attrName: tokens?.code?.token?.attrName ?? ['400', '600'],
        attrValue: tokens?.code?.token?.attrValue ?? ['400', '600'],
        boolean: tokens?.code?.token?.boolean ?? ['400', '600'],
        builtin: tokens?.code?.token?.builtin ?? ['400', '600'],
        cdata: tokens?.code?.token?.cdata ?? ['400', '600'],
        char: tokens?.code?.token?.char ?? ['400', '600'],
        class: tokens?.code?.token?.class ?? ['400', '600'],
        className: tokens?.code?.token?.className ?? ['400', '600'],
        comment: tokens?.code?.token?.comment ?? ['600', '400'],
        constant: tokens?.code?.token?.constant ?? ['400', '600'],
        deleted: tokens?.code?.token?.deleted ?? ['400', '600'],
        doctype: tokens?.code?.token?.doctype ?? ['400', '600'],
        entity: tokens?.code?.token?.entity ?? ['400', '600'],
        function: tokens?.code?.token?.function ?? ['400', '600'],
        hexcode: tokens?.code?.token?.hexcode ?? ['400', '600'],
        id: tokens?.code?.token?.id ?? ['400', '600'],
        important: tokens?.code?.token?.important ?? ['400', '600'],
        inserted: tokens?.code?.token?.inserted ?? ['400', '600'],
        keyword: tokens?.code?.token?.keyword ?? ['400', '600'],
        number: tokens?.code?.token?.number ?? ['400', '600'],
        operator: tokens?.code?.token?.operator ?? ['400', '600'],
        prolog: tokens?.code?.token?.prolog ?? ['400', '600'],
        property: tokens?.code?.token?.property ?? ['400', '600'],
        pseudoClass: tokens?.code?.token?.pseudoClass ?? ['400', '600'],
        pseudoElement: tokens?.code?.token?.pseudoElement ?? ['400', '600'],
        punctuation: tokens?.code?.token?.punctuation ?? ['400', '600'],
        regex: tokens?.code?.token?.regex ?? ['400', '600'],
        selector: tokens?.code?.token?.selector ?? ['400', '600'],
        string: tokens?.code?.token?.string ?? ['400', '600'],
        symbol: tokens?.code?.token?.symbol ?? ['400', '600'],
        tag: tokens?.code?.token?.tag ?? ['400', '600'],
        unit: tokens?.code?.token?.unit ?? ['400', '600'],
        url: tokens?.code?.token?.url ?? ['400', '600'],
        variable: tokens?.code?.token?.variable ?? ['400', '600'],
      },
    },
    focusRing: tokens?.focusRing ?? ['500', '500'],
    link: {
      fg: tokens?.link?.fg ?? ['400', '600'],
    },
    shadow: {
      outline: tokens?.shadow?.outline ?? ['500', '500'],
      umbra: tokens?.shadow?.umbra ?? ['500', '500'],
      penumbra: tokens?.shadow?.penumbra ?? ['500', '500'],
      ambient: tokens?.shadow?.ambient ?? ['500', '500'],
    },
    skeleton: {
      from: tokens?.skeleton?.from ?? ['900', '100'],
      to: tokens?.skeleton?.to ?? ['950', '50'],
    },

    variant: {
      solid: {
        '*': resolveElementTokens(tokens?.variant?.solid?.['*']),
        ...THEME_COLOR_STATE_TONES.reduce(
          (acc, tone) => {
            acc[tone] = resolveElementTokens(
              merge(tokens, tokens?.variant?.solid?.['*'], tokens?.variant?.solid?.[tone]),
            )

            return acc
          },
          {} as Record<ThemeColorStateToneKey, ElementColorTokens>,
        ),
      },
      tinted: {
        '*': resolveElementTokens(tokens?.variant?.tinted?.['*']),
        ...THEME_COLOR_STATE_TONES.reduce(
          (acc, tone) => {
            acc[tone] = resolveElementTokens(
              merge(tokens, tokens?.variant?.tinted?.['*'], tokens?.variant?.tinted?.[tone]),
            )

            return acc
          },
          {} as Record<ThemeColorStateToneKey, ElementColorTokens>,
        ),
      },
    },
  }
}

function resolveElementTokens(tokens?: PartialTokens<ElementColorTokens>): ElementColorTokens {
  return {
    _hue: tokens?._hue ?? 'gray',
    bg: {
      0: tokens?.bg?.[0] ?? defaultElementTokens.bg[0],
      4: tokens?.bg?.[4] ?? defaultElementTokens.bg[4],
    },
    border: {
      0: tokens?.border?.[0] ?? defaultElementTokens.border[0],
      4: tokens?.border?.[4] ?? defaultElementTokens.border[4],
    },
    fg: {
      0: tokens?.fg?.[0] ?? defaultElementTokens.fg[0],
      4: tokens?.fg?.[4] ?? defaultElementTokens.fg[4],
    },
  }
}
