import {
  THEME_COLOR_CARD_TONES,
  THEME_COLOR_STATE_TONES,
  ThemeColorCardToneKey,
  ThemeColorSchemeKey,
  ThemeColorStateToneKey,
} from '../../v2'
import {ThemeEntry} from '../types'
import {CardColorTokens} from './card'
import {ElementColorTokens} from './element'
import {renderColor, RenderColorContext} from './renderColor'
import {ColorTokens} from './tokens'

const debug = false

let nodeLen = 0

/** @internal */
export function buildColorEntries_v3(tokens: ColorTokens): ThemeEntry[] {
  return [
    ...buildColorSchemeEntries_v3(tokens, {scheme: 'dark'}),
    ...buildColorSchemeEntries_v3(tokens, {scheme: 'light'}),
  ]
}

function buildColorSchemeEntries_v3(
  tokens: ColorTokens,
  options: {scheme: ThemeColorSchemeKey},
): ThemeEntry[] {
  const {scheme} = options

  return [
    ...THEME_COLOR_CARD_TONES.reduce(
      (acc, tone) => [...acc, ...buildColorCardEntries_v3(tokens[tone], {cardTone: tone, scheme})],
      [] as ThemeEntry[],
    ),
  ]
}

function buildColorCardEntries_v3(
  tokens: CardColorTokens,
  options: {
    cardTone: ThemeColorCardToneKey
    scheme: ThemeColorSchemeKey
  },
): ThemeEntry[] {
  const {cardTone, scheme} = options

  const i = scheme === 'dark' ? 0 : 1

  const context: RenderColorContext = {bgVar: `--bg`, hue: tokens._hue}

  const prefix = `--color-${scheme}-${cardTone}` as const

  return [
    ...buildColorElementEntries_v3(tokens, {cardTone, scheme}),
    [`${prefix}-focus-ring`, renderColor(tokens.focusRing[i], context)],
    [`${prefix}-shadow-outline`, renderColor(tokens.shadow.outline[i], context)],
    [`${prefix}-shadow-umbra`, renderColor(tokens.shadow.umbra[i], context)],
    [`${prefix}-shadow-penumbra`, renderColor(tokens.shadow.penumbra[i], context)],
    [`${prefix}-shadow-ambient`, renderColor(tokens.shadow.ambient[i], context)],
    ...THEME_COLOR_STATE_TONES.reduce(
      (acc, tone) => [
        ...acc,
        ...buildColorElementEntries_v3(tokens.solid[tone], {
          cardTone,
          debugId: `solid`,
          scheme,
          tone,
        }),
      ],
      [] as ThemeEntry[],
    ),
    ...THEME_COLOR_STATE_TONES.reduce(
      (acc, tone) => [
        ...acc,
        ...buildColorElementEntries_v3(tokens.tinted[tone], {
          cardTone,
          debugId: `tinted`,
          scheme,
          tone,
        }),
      ],
      [] as ThemeEntry[],
    ),
  ]
}

function buildColorElementEntries_v3(
  tokens: ElementColorTokens,
  options: {
    cardTone: ThemeColorCardToneKey
    debugId?: string
    scheme: ThemeColorSchemeKey
    tone?: ThemeColorStateToneKey
  },
): ThemeEntry[] {
  const {cardTone, debugId, scheme, tone} = options
  const i = scheme === 'dark' ? 0 : 1

  // console.log({card: cardTone, scheme, tone}, 'buildColorCard_v3', tokens._hue)

  const path = [scheme, cardTone, debugId, tone].filter(Boolean).join('/')

  if (debug) {
    // eslint-disable-next-line no-console
    console.log(nodeLen, path)
    nodeLen += 1
  }

  const context: RenderColorContext = {bgVar: `--bg`, hue: tokens._hue}

  const prefix =
    debugId && tone
      ? (`--color-${scheme}-${cardTone}-${debugId}-${tone}` as const)
      : (`--color-${scheme}-${cardTone}` as const)

  return [
    [`${prefix}-bg-1`, renderColor(tokens.bg[1][i], context)],
    [`${prefix}-bg-2`, renderColor(tokens.bg[2][i], context)],
    [`${prefix}-bg-3`, renderColor(tokens.bg[3][i], context)],
    [`${prefix}-bg-4`, renderColor(tokens.bg[4][i], context)],

    [`${prefix}-border-1`, renderColor(tokens.border[1][i], context)],
    [`${prefix}-border-2`, renderColor(tokens.border[2][i], context)],
    [`${prefix}-border-3`, renderColor(tokens.border[3][i], context)],
    [`${prefix}-border-4`, renderColor(tokens.border[4][i], context)],

    [`${prefix}-fg-1`, renderColor(tokens.fg[1][i], context)],
    [`${prefix}-fg-2`, renderColor(tokens.fg[2][i], context)],
    [`${prefix}-fg-3`, renderColor(tokens.fg[3][i], context)],
    [`${prefix}-fg-4`, renderColor(tokens.fg[4][i], context)],
  ]
}
