import {
  THEME_COLOR_CARD_TONES,
  THEME_COLOR_STATE_TONES,
  ThemeColorCardToneKey,
  ThemeColorSchemeKey,
  ThemeColorStateToneKey,
} from '../../v2'
import {CardColorTokens} from './card'
import {
  ThemeColor_v3,
  ThemeColorCard_v3,
  ThemeColorElement,
  // ThemeColorElement,
  ThemeColorScheme_v3,
  ThemeColorVariant,
} from './color'
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
    card: THEME_COLOR_CARD_TONES.reduce(
      (acc, tone) => {
        acc[tone] = buildColorCard_v3(tokens[tone], {cardTone: tone, scheme})

        return acc
      },
      {} as Record<ThemeColorCardToneKey, ThemeColorCard_v3>,
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
  const context: RenderColorContext = {bgVar: `--color-bg-1`, hue: tokens._hue, scheme}

  return {
    _hue: tokens._hue ?? 'gray',
    // ...buildColorElement_v3(tokens, {cardTone, scheme}),
    focusRing: renderColor(tokens.focusRing, context),
    shadow: {
      outline: renderColor(tokens.shadow.outline, context),
      umbra: renderColor(tokens.shadow.umbra, context),
      penumbra: renderColor(tokens.shadow.penumbra, context),
      ambient: renderColor(tokens.shadow.ambient, context),
    },
    variant: {
      solid: {
        ...THEME_COLOR_STATE_TONES.reduce(
          (acc, tone) => ({
            ...acc,
            [tone]: buildColorElement_v3(tokens.variant.solid[tone], {
              cardTone,
              debugId: `solid`,
              scheme,
              tone,
            }),
          }),
          {} as ThemeColorVariant,
        ),
      },
      tinted: {
        ...THEME_COLOR_STATE_TONES.reduce(
          (acc, tone) => ({
            ...acc,
            [tone]: buildColorElement_v3(tokens.variant.tinted[tone], {
              cardTone,
              debugId: `tinted`,
              scheme,
              tone,
            }),
          }),
          {} as ThemeColorVariant,
        ),
      },
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
): ThemeColorElement {
  const {cardTone, debugId, scheme, tone} = options

  const path = [scheme, cardTone, debugId, tone].filter(Boolean).join('/')

  if (debug) {
    // eslint-disable-next-line no-console
    console.log(nodeLen, path)
    nodeLen += 1
  }

  const context: RenderColorContext = {bgVar: `--bg`, hue: tokens._hue, scheme}

  return {
    _hue: tokens._hue ?? 'gray',
    bg: {
      0: renderColor(tokens.bg[0], context),
      4: renderColor(tokens.bg[4], context),
    },
    border: {
      0: renderColor(tokens.border[0], context),
      4: renderColor(tokens.border[4], context),
    },
    fg: {
      0: renderColor(tokens.fg[0], context),
      4: renderColor(tokens.fg[4], context),
    },
  }
}
