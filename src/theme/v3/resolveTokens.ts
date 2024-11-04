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
    1: ['950', '50'],
    2: ['900', '100'],
    3: ['800', '200'],
    4: ['700', '300'],
  },
  border: {
    1: ['700', '300'],
    2: ['600', '400'],
    3: ['500', '500'],
    4: ['400', '600'],
  },
  fg: {
    1: ['100', '900'],
    2: ['200', '800'],
    3: ['300', '700'],
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
    ...resolveElementTokens(tokens),
    focusRing: tokens?.focusRing ?? ['500', '500'],
    tinted: {
      '*': resolveElementTokens(tokens?.tinted?.['*']),
      ...THEME_COLOR_STATE_TONES.reduce(
        (acc, tone) => {
          return {
            ...acc,
            [tone]: resolveElementTokens(
              //
              merge(tokens, tokens?.tinted?.['*'], tokens?.tinted?.[tone]),
            ),
          }
        },
        {} as Record<ThemeColorStateToneKey, ElementColorTokens>,
      ),
    },
    shadow: {
      outline: tokens?.shadow?.outline ?? ['500', '500'],
      umbra: tokens?.shadow?.umbra ?? ['500', '500'],
      penumbra: tokens?.shadow?.penumbra ?? ['500', '500'],
      ambient: tokens?.shadow?.ambient ?? ['500', '500'],
    },
    solid: {
      '*': resolveElementTokens(tokens?.solid?.['*']),
      ...THEME_COLOR_STATE_TONES.reduce(
        (acc, tone) => {
          return {
            ...acc,
            [tone]: resolveElementTokens(
              //
              merge(tokens, tokens?.solid?.['*'], tokens?.solid?.[tone]),
            ),
          }
        },
        {} as Record<ThemeColorStateToneKey, ElementColorTokens>,
      ),
    },
  }
}

function resolveElementTokens(tokens?: PartialTokens<ElementColorTokens>): ElementColorTokens {
  return {
    _hue: tokens?._hue ?? 'gray',
    bg: {
      1: tokens?.bg?.[1] ?? defaultElementTokens.bg[1],
      2: tokens?.bg?.[2] ?? defaultElementTokens.bg[2],
      3: tokens?.bg?.[3] ?? defaultElementTokens.bg[3],
      4: tokens?.bg?.[4] ?? defaultElementTokens.bg[4],
    },
    border: {
      1: tokens?.border?.[1] ?? defaultElementTokens.border[1],
      2: tokens?.border?.[2] ?? defaultElementTokens.border[2],
      3: tokens?.border?.[3] ?? defaultElementTokens.border[3],
      4: tokens?.border?.[4] ?? defaultElementTokens.border[4],
    },
    fg: {
      1: tokens?.fg?.[1] ?? defaultElementTokens.fg[1],
      2: tokens?.fg?.[2] ?? defaultElementTokens.fg[2],
      3: tokens?.fg?.[3] ?? defaultElementTokens.fg[3],
      4: tokens?.fg?.[4] ?? defaultElementTokens.fg[4],
    },
  }
}
