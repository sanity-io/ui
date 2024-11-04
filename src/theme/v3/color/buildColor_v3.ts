import {
  THEME_COLOR_CARD_TONES,
  THEME_COLOR_STATE_TONES,
  ThemeColorCardToneKey,
  ThemeColorSchemeKey,
  ThemeColorStateToneKey,
} from '../../v2'
import {CardColorTokens} from './card'
import {ThemeColor_v3, ThemeColorCard_v3, ThemeColorElement_v3, ThemeColorScheme_v3} from './color'
import {ElementColorTokens} from './element'
import {renderColor, RenderColorContext} from './renderColor'
import {ColorTokens} from './tokens'

const debug = false

let nodeLen = 0

/** @internal */
export function buildColor_v3(tokens: ColorTokens): ThemeColor_v3 {
  return {
    dark: buildColorScheme_v3(tokens, {scheme: 'dark'}),
    light: buildColorScheme_v3(tokens, {scheme: 'light'}),
  }
}

function buildColorScheme_v3(
  tokens: ColorTokens,
  options: {scheme: ThemeColorSchemeKey},
): ThemeColorScheme_v3 {
  const {scheme} = options

  // console.log('buildColorScheme_v3', tokens)

  return {
    ...THEME_COLOR_CARD_TONES.reduce(
      (acc, tone) => ({
        ...acc,
        [tone]: buildColorCard_v3(tokens[tone], {cardTone: tone, scheme}),
      }),
      {} as ThemeColorScheme_v3,
    ),
  }
}

function buildColorCard_v3(
  tokens: CardColorTokens,
  options: {
    cardTone: ThemeColorCardToneKey
    scheme: ThemeColorSchemeKey
  },
): ThemeColorCard_v3 {
  const {cardTone, scheme} = options

  const i = scheme === 'dark' ? 0 : 1

  const context: RenderColorContext = {bgVar: `--color-bg-1`, hue: tokens._hue}

  return {
    ...buildColorElement_v3(tokens, {cardTone, scheme}),
    focusRing: renderColor(tokens.focusRing[i], context),
    solid: {
      ...THEME_COLOR_STATE_TONES.reduce(
        (acc, tone) => ({
          ...acc,
          [tone]: buildColorElement_v3(tokens.solid[tone], {
            cardTone,
            debugId: `solid`,
            scheme,
            tone,
          }),
        }),
        {} as Record<ThemeColorStateToneKey, ThemeColorElement_v3>,
      ),
    },
    shadow: {
      outline: renderColor(tokens.shadow.outline[i], context),
      umbra: renderColor(tokens.shadow.umbra[i], context),
      penumbra: renderColor(tokens.shadow.penumbra[i], context),
      ambient: renderColor(tokens.shadow.ambient[i], context),
    },
    tinted: {
      ...THEME_COLOR_STATE_TONES.reduce(
        (acc, tone) => ({
          ...acc,
          [tone]: buildColorElement_v3(tokens.tinted[tone], {
            cardTone,
            debugId: `tinted`,
            scheme,
            tone,
          }),
        }),
        {} as Record<ThemeColorStateToneKey, ThemeColorElement_v3>,
      ),
    },
  }
}

function buildColorElement_v3(
  tokens: ElementColorTokens,
  options: {
    cardTone: ThemeColorCardToneKey
    debugId?: string
    scheme: ThemeColorSchemeKey
    tone?: ThemeColorStateToneKey
  },
): ThemeColorElement_v3 {
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

  return {
    bg: {
      1: renderColor(tokens.bg[1][i], context),
      2: renderColor(tokens.bg[2][i], context),
      3: renderColor(tokens.bg[3][i], context),
      4: renderColor(tokens.bg[4][i], context),
    },
    border: {
      1: renderColor(tokens.border[1][i], context),
      2: renderColor(tokens.border[2][i], context),
      3: renderColor(tokens.border[3][i], context),
      4: renderColor(tokens.border[4][i], context),
    },
    fg: {
      1: renderColor(tokens.fg[1][i], context),
      2: renderColor(tokens.fg[2][i], context),
      3: renderColor(tokens.fg[3][i], context),
      4: renderColor(tokens.fg[4][i], context),
    },
  }
}
