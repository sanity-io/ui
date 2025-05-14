import {
  THEME_COLOR_AVATAR_COLORS,
  THEME_COLOR_CARD_TONES,
  THEME_COLOR_STATE_TONES,
  ThemeColorAvatar_v2,
  ThemeColorCardToneKey,
  ThemeColorSchemeKey,
  ThemeColorStateToneKey,
} from '../../v2'
import {CardColorTokens} from './card'
import {
  ThemeColor_v3,
  ThemeColorCard_v3,
  ThemeColorElement,
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
    avatar: THEME_COLOR_AVATAR_COLORS.reduce<ThemeColorAvatar_v2>((acc, hue) => {
      const avatarTokens = tokens.avatar[hue]

      acc[hue] = {
        bg: renderColor(avatarTokens.bg, {bgVar: `--color-bg-1`, hue: avatarTokens._hue, scheme}),
        fg: renderColor(avatarTokens.fg, {bgVar: `--color-bg-1`, hue: avatarTokens._hue, scheme}),
      }

      return acc
    }, {} as ThemeColorAvatar_v2),
    backdrop: renderColor(tokens.backdrop, context),
    code: {
      bg: renderColor(tokens.code.bg, context),
      fg: renderColor(tokens.code.fg, context),
      token: {
        atrule: renderColor(tokens.code.token.atrule, context),
        attrName: renderColor(tokens.code.token.attrName, context),
        attrValue: renderColor(tokens.code.token.attrValue, context),
        attribute: renderColor(tokens.code.token.attribute, context),
        boolean: renderColor(tokens.code.token.boolean, context),
        builtin: renderColor(tokens.code.token.builtin, context),
        cdata: renderColor(tokens.code.token.cdata, context),
        char: renderColor(tokens.code.token.char, context),
        class: renderColor(tokens.code.token.class, context),
        className: renderColor(tokens.code.token.className, context),
        comment: renderColor(tokens.code.token.comment, context),
        constant: renderColor(tokens.code.token.constant, context),
        deleted: renderColor(tokens.code.token.deleted, context),
        doctype: renderColor(tokens.code.token.doctype, context),
        entity: renderColor(tokens.code.token.entity, context),
        function: renderColor(tokens.code.token.function, context),
        hexcode: renderColor(tokens.code.token.hexcode, context),
        id: renderColor(tokens.code.token.id, context),
        important: renderColor(tokens.code.token.important, context),
        inserted: renderColor(tokens.code.token.inserted, context),
        keyword: renderColor(tokens.code.token.keyword, context),
        number: renderColor(tokens.code.token.number, context),
        operator: renderColor(tokens.code.token.operator, context),
        prolog: renderColor(tokens.code.token.prolog, context),
        property: renderColor(tokens.code.token.property, context),
        pseudoClass: renderColor(tokens.code.token.pseudoClass, context),
        pseudoElement: renderColor(tokens.code.token.pseudoElement, context),
        punctuation: renderColor(tokens.code.token.punctuation, context),
        regex: renderColor(tokens.code.token.regex, context),
        selector: renderColor(tokens.code.token.selector, context),
        string: renderColor(tokens.code.token.string, context),
        symbol: renderColor(tokens.code.token.symbol, context),
        tag: renderColor(tokens.code.token.tag, context),
        unit: renderColor(tokens.code.token.unit, context),
        url: renderColor(tokens.code.token.url, context),
        variable: renderColor(tokens.code.token.variable, context),
      },
    },
    focusRing: renderColor(tokens.focusRing, context),
    shadow: {
      outline: renderColor(tokens.shadow.outline, context),
      umbra: renderColor(tokens.shadow.umbra, context),
      penumbra: renderColor(tokens.shadow.penumbra, context),
      ambient: renderColor(tokens.shadow.ambient, context),
    },
    skeleton: {
      from: renderColor(tokens.skeleton.from, context),
      to: renderColor(tokens.skeleton.to, context),
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
