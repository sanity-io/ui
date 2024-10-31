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
        bg: tokens?.avatar?.gray?.bg ?? ['400', '400'],
        fg: tokens?.avatar?.gray?.fg ?? ['900', '900'],
      },
      blue: {
        _hue: tokens?.avatar?.blue?._hue ?? 'blue',
        bg: tokens?.avatar?.blue?.bg ?? ['400', '400'],
        fg: tokens?.avatar?.blue?.fg ?? ['900', '900'],
      },
      purple: {
        _hue: tokens?.avatar?.purple?._hue ?? 'purple',
        bg: tokens?.avatar?.purple?.bg ?? ['400', '400'],
        fg: tokens?.avatar?.purple?.fg ?? ['900', '900'],
      },
      magenta: {
        _hue: tokens?.avatar?.magenta?._hue ?? 'magenta',
        bg: tokens?.avatar?.magenta?.bg ?? ['400', '400'],
        fg: tokens?.avatar?.magenta?.fg ?? ['900', '900'],
      },
      red: {
        _hue: tokens?.avatar?.red?._hue ?? 'red',
        bg: tokens?.avatar?.red?.bg ?? ['400', '400'],
        fg: tokens?.avatar?.red?.fg ?? ['900', '900'],
      },
      orange: {
        _hue: tokens?.avatar?.orange?._hue ?? 'orange',
        bg: tokens?.avatar?.orange?.bg ?? ['400', '400'],
        fg: tokens?.avatar?.orange?.fg ?? ['900', '900'],
      },
      yellow: {
        _hue: tokens?.avatar?.yellow?._hue ?? 'yellow',
        bg: tokens?.avatar?.yellow?.bg ?? ['400', '400'],
        fg: tokens?.avatar?.yellow?.fg ?? ['900', '900'],
      },
      green: {
        _hue: tokens?.avatar?.green?._hue ?? 'green',
        bg: tokens?.avatar?.green?.bg ?? ['400', '400'],
        fg: tokens?.avatar?.green?.fg ?? ['900', '900'],
      },
      cyan: {
        _hue: tokens?.avatar?.cyan?._hue ?? 'cyan',
        bg: tokens?.avatar?.cyan?.bg ?? ['400', '400'],
        fg: tokens?.avatar?.cyan?.fg ?? ['900', '900'],
      },
    },
    backdrop: tokens?.backdrop ?? ['900', '100'],
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
    token: {
      atrule: tokens?.token?.atrule ?? ['400', '600'],
      attribute: tokens?.token?.attribute ?? ['400', '600'],
      attrName: tokens?.token?.attrName ?? ['400', '600'],
      attrValue: tokens?.token?.attrValue ?? ['400', '600'],
      boolean: tokens?.token?.boolean ?? ['400', '600'],
      builtin: tokens?.token?.builtin ?? ['400', '600'],
      cdata: tokens?.token?.cdata ?? ['400', '600'],
      char: tokens?.token?.char ?? ['400', '600'],
      class: tokens?.token?.class ?? ['400', '600'],
      className: tokens?.token?.className ?? ['400', '600'],
      comment: tokens?.token?.comment ?? ['600', '400'],
      constant: tokens?.token?.constant ?? ['400', '600'],
      deleted: tokens?.token?.deleted ?? ['400', '600'],
      doctype: tokens?.token?.doctype ?? ['400', '600'],
      entity: tokens?.token?.entity ?? ['400', '600'],
      function: tokens?.token?.function ?? ['400', '600'],
      hexcode: tokens?.token?.hexcode ?? ['400', '600'],
      id: tokens?.token?.id ?? ['400', '600'],
      important: tokens?.token?.important ?? ['400', '600'],
      inserted: tokens?.token?.inserted ?? ['400', '600'],
      keyword: tokens?.token?.keyword ?? ['400', '600'],
      number: tokens?.token?.number ?? ['400', '600'],
      operator: tokens?.token?.operator ?? ['400', '600'],
      prolog: tokens?.token?.prolog ?? ['400', '600'],
      property: tokens?.token?.property ?? ['400', '600'],
      pseudoClass: tokens?.token?.pseudoClass ?? ['400', '600'],
      pseudoElement: tokens?.token?.pseudoElement ?? ['400', '600'],
      punctuation: tokens?.token?.punctuation ?? ['400', '600'],
      regex: tokens?.token?.regex ?? ['400', '600'],
      selector: tokens?.token?.selector ?? ['400', '600'],
      string: tokens?.token?.string ?? ['400', '600'],
      symbol: tokens?.token?.symbol ?? ['400', '600'],
      tag: tokens?.token?.tag ?? ['400', '600'],
      unit: tokens?.token?.unit ?? ['400', '600'],
      url: tokens?.token?.url ?? ['400', '600'],
      variable: tokens?.token?.variable ?? ['400', '600'],
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
