import {
  AVATAR_SIZE,
  AvatarSize,
  FONT_CODE_SIZE,
  FONT_HEADING_SIZE,
  FONT_LABEL_SIZE,
  FONT_TEXT_SIZE,
  type FontCodeSize,
  type FontHeadingSize,
  type FontLabelSize,
  type FontTextSize,
  RADIUS,
  Radius,
  SPACE,
  type Space,
  THEME_COLOR_AVATAR_COLORS,
  THEME_COLOR_CARD_TONES,
  THEME_COLOR_STATE_TONES,
  type ThemeColorCardToneKey as CardTone,
  type ThemeColorSchemeKey as Scheme,
} from '@sanity/ui/theme'

import {
  type ColorAvatarVars,
  type ColorCardVars,
  type ColorSchemeVars,
  type ColorVariantVars,
  type CSSVar,
  type FontSizeVars,
  type Vars,
} from './types'
import {varNames} from './varNames'

const darkColorVars = {} as ColorSchemeVars

for (const tone of THEME_COLOR_CARD_TONES) {
  darkColorVars[tone] = buildColorCardVars({scheme: 'dark', tone})
}

const lightColorVars = {} as ColorSchemeVars

for (const tone of THEME_COLOR_CARD_TONES) {
  lightColorVars[tone] = buildColorCardVars({scheme: 'light', tone})
}

const colorVars: Vars['color'] = {
  accent: {
    fg: `var(${varNames.color.accent.fg})`,
  },
  avatar: {
    bg: `var(${varNames.color.avatar.bg})`,
    fg: `var(${varNames.color.avatar.fg})`,
    gray: {
      bg: `var(${varNames.color.avatar.gray.bg})`,
      fg: `var(${varNames.color.avatar.gray.fg})`,
    },
    blue: {
      bg: `var(${varNames.color.avatar.blue.bg})`,
      fg: `var(${varNames.color.avatar.blue.fg})`,
    },
    purple: {
      bg: `var(${varNames.color.avatar.purple.bg})`,
      fg: `var(${varNames.color.avatar.purple.fg})`,
    },
    magenta: {
      bg: `var(${varNames.color.avatar.magenta.bg})`,
      fg: `var(${varNames.color.avatar.magenta.fg})`,
    },
    red: {
      bg: `var(${varNames.color.avatar.red.bg})`,
      fg: `var(${varNames.color.avatar.red.fg})`,
    },
    orange: {
      bg: `var(${varNames.color.avatar.orange.bg})`,
      fg: `var(${varNames.color.avatar.orange.fg})`,
    },
    yellow: {
      bg: `var(${varNames.color.avatar.yellow.bg})`,
      fg: `var(${varNames.color.avatar.yellow.fg})`,
    },
    green: {
      bg: `var(${varNames.color.avatar.green.bg})`,
      fg: `var(${varNames.color.avatar.green.fg})`,
    },
    cyan: {
      bg: `var(${varNames.color.avatar.cyan.bg})`,
      fg: `var(${varNames.color.avatar.cyan.fg})`,
    },
  },
  backdrop: `var(${varNames.color.backdrop})`,
  bg: `var(${varNames.color.bg})`,
  border: `var(${varNames.color.border})`,
  fg: `var(${varNames.color.fg})`,
  focusRing: `var(${varNames.color.focusRing})`,
  input: {
    bg: `var(${varNames.color.input.bg})`,
    border: `var(${varNames.color.input.border})`,
    fg: `var(${varNames.color.input.fg})`,
    placeholder: `var(${varNames.color.input.placeholder})`,
  },
  link: {
    fg: `var(${varNames.color.link.fg})`,
  },
  muted: {
    bg: `var(${varNames.color.muted.bg})`,
    fg: `var(${varNames.color.muted.fg})`,
  },
  shadow: {
    outline: `var(${varNames.color.shadow.outline})`,
    umbra: `var(${varNames.color.shadow.umbra})`,
    penumbra: `var(${varNames.color.shadow.penumbra})`,
    ambient: `var(${varNames.color.shadow.ambient})`,
  },
  skeleton: {
    from: `var(${varNames.color.skeleton.from})`,
    to: `var(${varNames.color.skeleton.to})`,
  },
  token: {
    atrule: `var(${varNames.color.token.atrule})`,
    attrName: `var(${varNames.color.token.attrName})`,
    attrValue: `var(${varNames.color.token.attrValue})`,
    attribute: `var(${varNames.color.token.attribute})`,
    boolean: `var(${varNames.color.token.boolean})`,
    builtin: `var(${varNames.color.token.builtin})`,
    cdata: `var(${varNames.color.token.cdata})`,
    char: `var(${varNames.color.token.char})`,
    class: `var(${varNames.color.token.class})`,
    className: `var(${varNames.color.token.className})`,
    comment: `var(${varNames.color.token.comment})`,
    constant: `var(${varNames.color.token.constant})`,
    deleted: `var(${varNames.color.token.deleted})`,
    doctype: `var(${varNames.color.token.doctype})`,
    entity: `var(${varNames.color.token.entity})`,
    function: `var(${varNames.color.token.function})`,
    hexcode: `var(${varNames.color.token.hexcode})`,
    id: `var(${varNames.color.token.id})`,
    important: `var(${varNames.color.token.important})`,
    inserted: `var(${varNames.color.token.inserted})`,
    keyword: `var(${varNames.color.token.keyword})`,
    number: `var(${varNames.color.token.number})`,
    operator: `var(${varNames.color.token.operator})`,
    prolog: `var(${varNames.color.token.prolog})`,
    property: `var(${varNames.color.token.property})`,
    pseudoClass: `var(${varNames.color.token.pseudoClass})`,
    pseudoElement: `var(${varNames.color.token.pseudoElement})`,
    punctuation: `var(${varNames.color.token.punctuation})`,
    regex: `var(${varNames.color.token.regex})`,
    selector: `var(${varNames.color.token.selector})`,
    string: `var(${varNames.color.token.string})`,
    symbol: `var(${varNames.color.token.symbol})`,
    tag: `var(${varNames.color.token.tag})`,
    unit: `var(${varNames.color.token.unit})`,
    url: `var(${varNames.color.token.url})`,
    variable: `var(${varNames.color.token.variable})`,
  },

  solid: buildColorVariantVars({variant: 'solid'}),
  tinted: buildColorVariantVars({variant: 'tinted'}),

  ...THEME_COLOR_CARD_TONES.reduce((acc, tone) => {
    return {
      ...acc,
      [tone]: buildColorCardVars({tone}),
    }
  }, {} as ColorSchemeVars),

  dark: darkColorVars,
  light: lightColorVars,
}

export const vars: Vars = {
  avatar: {
    distance: `var(${varNames.avatar.distance})`,
    size: `var(${varNames.avatar.size})`,
    sizes: AVATAR_SIZE.reduce(
      (acc, size) => {
        return {
          ...acc,
          [size]: {
            size: `var(${varNames.avatar.sizes[size].size})`,
            distance: `var(${varNames.avatar.sizes[size].distance})`,
          },
        }
      },
      {} as Record<AvatarSize, {distance: CSSVar; size: CSSVar}>,
    ),
  },
  color: colorVars,
  container: {
    0: `var(${varNames.container[0]})`,
    1: `var(${varNames.container[1]})`,
    2: `var(${varNames.container[2]})`,
    3: `var(${varNames.container[3]})`,
    4: `var(${varNames.container[4]})`,
    5: `var(${varNames.container[5]})`,
  },
  font: {
    code: {
      family: `var(${varNames.font.code.family})`,
      sizes: FONT_CODE_SIZE.reduce(
        (acc, size) => {
          return {
            ...acc,
            [size]: {
              fontSize: `var(${varNames.font.code.sizes[size].fontSize})`,
              ascenderHeight: `var(${varNames.font.code.sizes[size].ascenderHeight})`,
              descenderHeight: `var(${varNames.font.code.sizes[size].descenderHeight})`,
              lineHeight: `var(${varNames.font.code.sizes[size].lineHeight})`,
              letterSpacing: `var(${varNames.font.code.sizes[size].letterSpacing})`,
              iconSize: `var(${varNames.font.code.sizes[size].iconSize})`,
            },
          }
        },
        {} as Record<FontCodeSize, FontSizeVars>,
      ),
    },
    heading: {
      family: `var(${varNames.font.heading.family})`,
      sizes: FONT_HEADING_SIZE.reduce(
        (acc, size) => {
          return {
            ...acc,
            [size]: {
              fontSize: `var(${varNames.font.heading.sizes[size].fontSize})`,
              ascenderHeight: `var(${varNames.font.heading.sizes[size].ascenderHeight})`,
              descenderHeight: `var(${varNames.font.heading.sizes[size].descenderHeight})`,
              lineHeight: `var(${varNames.font.heading.sizes[size].lineHeight})`,
              letterSpacing: `var(${varNames.font.heading.sizes[size].letterSpacing})`,
              iconSize: `var(${varNames.font.heading.sizes[size].iconSize})`,
            },
          }
        },
        {} as Record<FontHeadingSize, FontSizeVars>,
      ),
    },
    label: {
      family: `var(${varNames.font.label.family})`,
      sizes: FONT_LABEL_SIZE.reduce(
        (acc, size) => {
          return {
            ...acc,
            [size]: {
              fontSize: `var(${varNames.font.label.sizes[size].fontSize})`,
              ascenderHeight: `var(${varNames.font.label.sizes[size].ascenderHeight})`,
              descenderHeight: `var(${varNames.font.label.sizes[size].descenderHeight})`,
              lineHeight: `var(${varNames.font.label.sizes[size].lineHeight})`,
              letterSpacing: `var(${varNames.font.label.sizes[size].letterSpacing})`,
              iconSize: `var(${varNames.font.label.sizes[size].iconSize})`,
            },
          }
        },
        {} as Record<FontLabelSize, FontSizeVars>,
      ),
    },
    text: {
      family: `var(${varNames.font.text.family})`,
      sizes: FONT_TEXT_SIZE.reduce(
        (acc, size) => {
          return {
            ...acc,
            [size]: {
              fontSize: `var(${varNames.font.text.sizes[size].fontSize})`,
              ascenderHeight: `var(${varNames.font.text.sizes[size].ascenderHeight})`,
              descenderHeight: `var(${varNames.font.text.sizes[size].descenderHeight})`,
              lineHeight: `var(${varNames.font.text.sizes[size].lineHeight})`,
              letterSpacing: `var(${varNames.font.text.sizes[size].letterSpacing})`,
              iconSize: `var(${varNames.font.text.sizes[size].iconSize})`,
            },
          }
        },
        {} as Record<FontTextSize, FontSizeVars>,
      ),
    },
  },
  input: {
    fontSize: `var(--input-font-size)`,
    lineHeight: `var(--input-line-height)`,
    letterSpacing: `var(--input-letter-spacing)`,
    ascenderHeight: `var(--input-ascender-height)`,
    descenderHeight: `var(--input-descender-height)`,
    // capHeight: `var(--input-cap-height)`,

    gap: `var(--input-gap)`,
    padding: `var(--input-padding)`,

    text: {
      focusRing: {
        width: `var(--input-text-focus-ring-width)`,
        offset: `var(--input-text-focus-ring-offset)`,
      },
    },
  },
  radius: Object.fromEntries(
    RADIUS.map((radius) => [radius, `var(${varNames.radius[radius]})` as const]),
  ) as Record<Radius, CSSVar>,
  space: Object.fromEntries(
    SPACE.map((space) => [space, `var(${varNames.space[space]})` as const]),
  ) as Record<Space, CSSVar>,
} as const

function buildColorCardVars(props: {scheme?: Scheme; tone: CardTone}): ColorCardVars {
  const {scheme, tone} = props

  const prefix = scheme ? varNames.color[scheme][tone] : varNames.color[tone]

  return {
    accent: {
      fg: `var(${prefix.accent.fg})`,
    },
    avatar: {
      ...THEME_COLOR_AVATAR_COLORS.reduce((acc, color) => {
        return {
          ...acc,
          [color]: {
            bg: `var(${prefix.avatar[color].bg})`,
            fg: `var(${prefix.avatar[color].fg})`,
          },
        }
      }, {} as ColorAvatarVars),
    },
    backdrop: `var(${prefix.backdrop})`,
    focusRing: `var(${prefix.focusRing})`,
    link: {
      fg: `var(${prefix.link.fg})`,
    },
    muted: {
      bg: `var(${prefix.muted.bg})`,
      fg: `var(${prefix.muted.fg})`,
    },
    shadow: {
      outline: `var(${prefix.shadow.outline})`,
      umbra: `var(${prefix.shadow.umbra})`,
      penumbra: `var(${prefix.shadow.penumbra})`,
      ambient: `var(${prefix.shadow.ambient})`,
    },
    skeleton: {
      from: `var(${prefix.skeleton.from})`,
      to: `var(${prefix.skeleton.to})`,
    },
    token: {
      atrule: `var(${prefix.token.atrule})`,
      attrName: `var(${prefix.token.attrName})`,
      attrValue: `var(${prefix.token.attrValue})`,
      attribute: `var(${prefix.token.attribute})`,
      boolean: `var(${prefix.token.boolean})`,
      builtin: `var(${prefix.token.builtin})`,
      cdata: `var(${prefix.token.cdata})`,
      char: `var(${prefix.token.char})`,
      class: `var(${prefix.token.class})`,
      className: `var(${prefix.token.className})`,
      comment: `var(${prefix.token.comment})`,
      constant: `var(${prefix.token.constant})`,
      deleted: `var(${prefix.token.deleted})`,
      doctype: `var(${prefix.token.doctype})`,
      entity: `var(${prefix.token.entity})`,
      function: `var(${prefix.token.function})`,
      hexcode: `var(${prefix.token.hexcode})`,
      id: `var(${prefix.token.id})`,
      important: `var(${prefix.token.important})`,
      inserted: `var(${prefix.token.inserted})`,
      keyword: `var(${prefix.token.keyword})`,
      number: `var(${prefix.token.number})`,
      operator: `var(${prefix.token.operator})`,
      prolog: `var(${prefix.token.prolog})`,
      property: `var(${prefix.token.property})`,
      pseudoClass: `var(${prefix.token.pseudoClass})`,
      pseudoElement: `var(${prefix.token.pseudoElement})`,
      punctuation: `var(${prefix.token.punctuation})`,
      regex: `var(${prefix.token.regex})`,
      selector: `var(${prefix.token.selector})`,
      string: `var(${prefix.token.string})`,
      symbol: `var(${prefix.token.symbol})`,
      tag: `var(${prefix.token.tag})`,
      unit: `var(${prefix.token.unit})`,
      url: `var(${prefix.token.url})`,
      variable: `var(${prefix.token.variable})`,
    },

    solid: buildColorVariantVars({scheme, tone, variant: 'solid'}),
    tinted: buildColorVariantVars({scheme, tone, variant: 'tinted'}),
  }
}

function buildColorVariantVars(options: {
  scheme?: Scheme
  tone?: CardTone
  variant: 'solid' | 'tinted'
}): ColorVariantVars {
  const {scheme, tone, variant} = options

  const _prefix =
    scheme && tone
      ? (`--color-${scheme}-${tone}-${variant}` as const)
      : tone
        ? (`--color-${tone}-${variant}` as const)
        : (`--color-${variant}` as const)

  const vars = {
    bg: {
      0: `var(${_prefix}-bg-0)`,
      1: `var(${_prefix}-bg-1)`,
      2: `var(${_prefix}-bg-2)`,
      3: `var(${_prefix}-bg-3)`,
      4: `var(${_prefix}-bg-4)`,
    },
    border: {
      0: `var(${_prefix}-border-0)`,
      1: `var(${_prefix}-border-1)`,
      2: `var(${_prefix}-border-2)`,
      3: `var(${_prefix}-border-3)`,
      4: `var(${_prefix}-border-4)`,
    },
    fg: {
      0: `var(${_prefix}-fg-0)`,
      1: `var(${_prefix}-fg-1)`,
      2: `var(${_prefix}-fg-2)`,
      3: `var(${_prefix}-fg-3)`,
      4: `var(${_prefix}-fg-4)`,
    },
  } as ColorVariantVars

  for (const elementTone of THEME_COLOR_STATE_TONES) {
    const prefix =
      scheme && tone
        ? (`--color-${scheme}-${tone}-${variant}-${elementTone}` as const)
        : tone
          ? (`--color-${tone}-${variant}-${elementTone}` as const)
          : (`--color-${variant}-${elementTone}` as const)

    vars[elementTone] = {
      bg: {
        0: `var(${prefix}-bg-0)`,
        1: `var(${prefix}-bg-1)`,
        2: `var(${prefix}-bg-2)`,
        3: `var(${prefix}-bg-3)`,
        4: `var(${prefix}-bg-4)`,
      },
      border: {
        0: `var(${prefix}-border-0)`,
        1: `var(${prefix}-border-1)`,
        2: `var(${prefix}-border-2)`,
        3: `var(${prefix}-border-3)`,
        4: `var(${prefix}-border-4)`,
      },
      fg: {
        0: `var(${prefix}-fg-0)`,
        1: `var(${prefix}-fg-1)`,
        2: `var(${prefix}-fg-2)`,
        3: `var(${prefix}-fg-3)`,
        4: `var(${prefix}-fg-4)`,
      },
    }
  }

  return vars
}
