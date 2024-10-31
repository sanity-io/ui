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
  SPACE,
  type Space,
  THEME_COLOR_STATE_TONES,
  type ThemeColorCardToneKey as CardTone,
  type ThemeColorSchemeKey as Scheme,
} from '@sanity/ui/theme'

import {
  type ColorCardVarNames,
  type ColorVariantVarNames,
  type CSSVarName,
  type FontSizeVarNames,
  type VarNames,
} from './types'

export const varNames: VarNames = {
  avatar: {
    distance: `--avatar-distance`,
    focusRing: {
      offset: `--avatar-focus-ring-offset`,
      width: `--avatar-focus-ring-width`,
    },
    size: `--avatar-size`,
    sizes: AVATAR_SIZE.reduce(
      (acc, size) => {
        return {
          ...acc,
          [size]: {
            distance: `--avatar-${size}-distance`,
            size: `--avatar-${size}-size`,
          } satisfies {distance: CSSVarName; size: CSSVarName},
        }
      },
      {} as Record<AvatarSize, {distance: CSSVarName; size: CSSVarName}>,
    ),
  },
  color: {
    // card scope
    accent: {
      fg: `--color-accent-fg`,
    },
    avatar: {
      bg: `--color-avatar-bg`,
      fg: `--color-avatar-fg`,

      gray: {
        bg: `--color-avatar-gray-bg`,
        fg: `--color-avatar-gray-fg`,
      },
      blue: {
        bg: `--color-avatar-blue-bg`,
        fg: `--color-avatar-blue-fg`,
      },
      purple: {
        bg: `--color-avatar-purple-bg`,
        fg: `--color-avatar-purple-fg`,
      },
      magenta: {
        bg: `--color-avatar-magenta-bg`,
        fg: `--color-avatar-magenta-fg`,
      },
      red: {
        bg: `--color-avatar-red-bg`,
        fg: `--color-avatar-red-fg`,
      },
      orange: {
        bg: `--color-avatar-orange-bg`,
        fg: `--color-avatar-gray-fg`,
      },
      yellow: {
        bg: `--color-avatar-yellow-bg`,
        fg: `--color-avatar-yellow-fg`,
      },
      green: {
        bg: `--color-avatar-green-bg`,
        fg: `--color-avatar-green-fg`,
      },
      cyan: {
        bg: `--color-avatar-cyan-bg`,
        fg: `--color-avatar-yellow-fg`,
      },
    },
    backdrop: `--color-backdrop`,
    bg: `--color-bg`,
    border: `--color-border`,
    fg: `--color-fg`,
    focusRing: `--color-focus-ring`,
    input: {
      bg: `--color-input-bg`,
      border: `--color-input-border`,
      fg: `--color-input-fg`,
      placeholder: `--color-input-placeholder`,
    },
    link: {
      fg: `--color-link-fg`,
    },
    muted: {
      bg: `--color-muted-bg`,
      fg: `--color-muted-fg`,
    },
    shadow: {
      outline: `--color-shadow-outline`,
      umbra: `--color-shadow-umbra`,
      penumbra: `--color-shadow-penumbra`,
      ambient: `--color-shadow-ambient`,
    },
    skeleton: {
      from: `--color-skeleton-from`,
      to: `--color-skeleton-to`,
    },
    token: {
      atrule: `--color-token-atrule`,
      attrName: `--color-token-attr-name`,
      attrValue: `--color-token-attr-value`,
      attribute: `--color-token-attribute`,
      boolean: `--color-token-boolean`,
      builtin: `--color-token-builtin`,
      cdata: `--color-token-cdata`,
      char: `--color-token-char`,
      class: `--color-token-class`,
      className: `--color-token-class-name`,
      comment: `--color-token-comment`,
      constant: `--color-token-constant`,
      deleted: `--color-token-deleted`,
      doctype: `--color-token-doctype`,
      entity: `--color-token-entity`,
      function: `--color-token-function`,
      hexcode: `--color-token-hexcode`,
      id: `--color-token-id`,
      important: `--color-token-important`,
      inserted: `--color-token-inserted`,
      keyword: `--color-token-keyword`,
      number: `--color-token-number`,
      operator: `--color-token-operator`,
      prolog: `--color-token-prolog`,
      property: `--color-token-property`,
      pseudoClass: `--color-token-pseudo-class`,
      pseudoElement: `--color-token-pseudo-element`,
      punctuation: `--color-token-punctuation`,
      regex: `--color-token-regex`,
      selector: `--color-token-selector`,
      string: `--color-token-string`,
      symbol: `--color-token-symbol`,
      tag: `--color-token-tag`,
      unit: `--color-token-unit`,
      url: `--color-token-url`,
      variable: `--color-token-variable`,
    },

    solid: buildColorVariantVarNames({variant: 'solid'}),
    tinted: buildColorVariantVarNames({variant: 'tinted'}),

    // tone scopes
    transparent: buildColorCardVarNames({tone: 'transparent'}),
    default: buildColorCardVarNames({tone: 'default'}),
    neutral: buildColorCardVarNames({tone: 'neutral'}),
    primary: buildColorCardVarNames({tone: 'primary'}),
    suggest: buildColorCardVarNames({tone: 'suggest'}),
    positive: buildColorCardVarNames({tone: 'positive'}),
    caution: buildColorCardVarNames({tone: 'caution'}),
    critical: buildColorCardVarNames({tone: 'critical'}),

    // scheme scope
    dark: {
      transparent: buildColorCardVarNames({scheme: 'dark', tone: 'transparent'}),
      default: buildColorCardVarNames({scheme: 'dark', tone: 'default'}),
      neutral: buildColorCardVarNames({scheme: 'dark', tone: 'neutral'}),
      primary: buildColorCardVarNames({scheme: 'dark', tone: 'primary'}),
      suggest: buildColorCardVarNames({scheme: 'dark', tone: 'neutral'}),
      positive: buildColorCardVarNames({scheme: 'dark', tone: 'positive'}),
      caution: buildColorCardVarNames({scheme: 'dark', tone: 'caution'}),
      critical: buildColorCardVarNames({scheme: 'dark', tone: 'critical'}),
    },
    light: {
      transparent: buildColorCardVarNames({scheme: 'light', tone: 'transparent'}),
      default: buildColorCardVarNames({scheme: 'light', tone: 'default'}),
      neutral: buildColorCardVarNames({scheme: 'light', tone: 'neutral'}),
      primary: buildColorCardVarNames({scheme: 'light', tone: 'primary'}),
      suggest: buildColorCardVarNames({scheme: 'light', tone: 'suggest'}),
      positive: buildColorCardVarNames({scheme: 'light', tone: 'positive'}),
      caution: buildColorCardVarNames({scheme: 'light', tone: 'caution'}),
      critical: buildColorCardVarNames({scheme: 'light', tone: 'critical'}),
    },
  },
  font: {
    code: {
      family: `--font-code-family`,
      sizes: FONT_CODE_SIZE.reduce(
        (acc, size) => {
          return {
            ...acc,
            [size]: {
              fontSize: `--font-code-${size}-size`,
              ascenderHeight: `--font-code-${size}-ascender-height`,
              descenderHeight: `--font-code-${size}-descender-height`,
              lineHeight: `--font-code-${size}-line-height`,
              letterSpacing: `--font-code-${size}-letter-spacing`,
              iconSize: `--font-code-${size}-icon-size`,
            },
          }
        },
        {} as Record<FontCodeSize, FontSizeVarNames>,
      ),
    },
    heading: {
      family: `--font-heading-family`,
      sizes: FONT_HEADING_SIZE.reduce(
        (acc, size) => {
          return {
            ...acc,
            [size]: {
              fontSize: `--font-heading-${size}-size`,
              ascenderHeight: `--font-heading-${size}-ascender-height`,
              descenderHeight: `--font-heading-${size}-descender-height`,
              lineHeight: `--font-heading-${size}-line-height`,
              letterSpacing: `--font-heading-${size}-letter-spacing`,
              iconSize: `--font-heading-${size}-icon-size`,
            },
          }
        },
        {} as Record<FontHeadingSize, FontSizeVarNames>,
      ),
    },
    label: {
      family: `--font-label-family`,
      sizes: FONT_LABEL_SIZE.reduce(
        (acc, size) => {
          return {
            ...acc,
            [size]: {
              fontSize: `--font-label-${size}-size`,
              ascenderHeight: `--font-label-${size}-ascender-height`,
              descenderHeight: `--font-label-${size}-descender-height`,
              lineHeight: `--font-label-${size}-line-height`,
              letterSpacing: `--font-label-${size}-letter-spacing`,
              iconSize: `--font-label-${size}-icon-size`,
            },
          }
        },
        {} as Record<FontLabelSize, FontSizeVarNames>,
      ),
    },
    text: {
      family: `--font-text-family`,
      sizes: FONT_TEXT_SIZE.reduce(
        (acc, size) => {
          return {
            ...acc,
            [size]: {
              fontSize: `--font-text-${size}-size`,
              ascenderHeight: `--font-text-${size}-ascender-height`,
              descenderHeight: `--font-text-${size}-descender-height`,
              lineHeight: `--font-text-${size}-line-height`,
              letterSpacing: `--font-text-${size}-letter-spacing`,
              iconSize: `--font-text-${size}-icon-size`,
            },
          }
        },
        {} as Record<FontTextSize, FontSizeVarNames>,
      ),
    },
  },
  input: {
    fontSize: `--input-font-size`,
    lineHeight: `--input-line-height`,
    letterSpacing: `--input-letter-spacing`,
    ascenderHeight: `--input-ascender-height`,
    descenderHeight: `--input-descender-height`,
    // capHeight: `--input-cap-height`,

    gap: `--input-gap`,
    padding: `--input-padding`,
  },
  space: Object.fromEntries(
    SPACE.map((space) => [space, `--space-${String(space).replace('.', '_')}` as CSSVarName]),
  ) as Record<Space, CSSVarName>,
} as const

function buildColorCardVarNames(props: {scheme?: Scheme; tone: CardTone}): ColorCardVarNames {
  const {scheme, tone} = props

  const sourcePrefix = scheme
    ? (`--color-${scheme}-${tone}` as const)
    : (`--color-${tone}` as const)

  return {
    accent: {
      fg: `${sourcePrefix}-accent-fg`,
    },
    avatar: {
      gray: {
        bg: `${sourcePrefix}-avatar-gray-bg`,
        fg: `${sourcePrefix}-avatar-gray-fg`,
      },
      blue: {
        bg: `${sourcePrefix}-avatar-blue-bg`,
        fg: `${sourcePrefix}-avatar-blue-fg`,
      },
      purple: {
        bg: `${sourcePrefix}-avatar-purple-bg`,
        fg: `${sourcePrefix}-avatar-purple-fg`,
      },
      magenta: {
        bg: `${sourcePrefix}-avatar-magenta-bg`,
        fg: `${sourcePrefix}-avatar-magenta-fg`,
      },
      red: {
        bg: `${sourcePrefix}-avatar-red-bg`,
        fg: `${sourcePrefix}-avatar-red-fg`,
      },
      orange: {
        bg: `${sourcePrefix}-avatar-orange-bg`,
        fg: `${sourcePrefix}-avatar-gray-fg`,
      },
      yellow: {
        bg: `${sourcePrefix}-avatar-yellow-bg`,
        fg: `${sourcePrefix}-avatar-yellow-fg`,
      },
      green: {
        bg: `${sourcePrefix}-avatar-green-bg`,
        fg: `${sourcePrefix}-avatar-green-fg`,
      },
      cyan: {
        bg: `${sourcePrefix}-avatar-cyan-bg`,
        fg: `${sourcePrefix}-avatar-yellow-fg`,
      },
    },
    backdrop: `${sourcePrefix}-backdrop`,
    focusRing: `${sourcePrefix}-focus-ring`,
    link: {
      fg: `${sourcePrefix}-link-fg`,
    },
    muted: {
      bg: `${sourcePrefix}-muted-bg`,
      fg: `${sourcePrefix}-muted-fg`,
    },
    shadow: {
      outline: `${sourcePrefix}-shadow-outline`,
      umbra: `${sourcePrefix}-shadow-umbra`,
      penumbra: `${sourcePrefix}-shadow-penumbra`,
      ambient: `${sourcePrefix}-shadow-ambient`,
    },
    skeleton: {
      from: `${sourcePrefix}-skeleton-from`,
      to: `${sourcePrefix}-skeleton-to`,
    },
    token: {
      atrule: `${sourcePrefix}-token-atrule`,
      attrName: `${sourcePrefix}-token-attr-name`,
      attrValue: `${sourcePrefix}-token-attr-value`,
      attribute: `${sourcePrefix}-token-attribute`,
      boolean: `${sourcePrefix}-token-boolean`,
      builtin: `${sourcePrefix}-token-builtin`,
      cdata: `${sourcePrefix}-token-cdata`,
      char: `${sourcePrefix}-token-char`,
      class: `${sourcePrefix}-token-class`,
      className: `${sourcePrefix}-token-class-name`,
      comment: `${sourcePrefix}-token-comment`,
      constant: `${sourcePrefix}-token-constant`,
      deleted: `${sourcePrefix}-token-deleted`,
      doctype: `${sourcePrefix}-token-doctype`,
      entity: `${sourcePrefix}-token-entity`,
      function: `${sourcePrefix}-token-function`,
      hexcode: `${sourcePrefix}-token-hexcode`,
      id: `${sourcePrefix}-token-id`,
      important: `${sourcePrefix}-token-important`,
      inserted: `${sourcePrefix}-token-inserted`,
      keyword: `${sourcePrefix}-token-keyword`,
      number: `${sourcePrefix}-token-number`,
      operator: `${sourcePrefix}-token-operator`,
      prolog: `${sourcePrefix}-token-prolog`,
      property: `${sourcePrefix}-token-property`,
      pseudoClass: `${sourcePrefix}-token-pseudo-class`,
      pseudoElement: `${sourcePrefix}-token-pseudo-element`,
      punctuation: `${sourcePrefix}-token-punctuation`,
      regex: `${sourcePrefix}-token-regex`,
      selector: `${sourcePrefix}-token-selector`,
      string: `${sourcePrefix}-token-string`,
      symbol: `${sourcePrefix}-token-symbol`,
      tag: `${sourcePrefix}-token-tag`,
      unit: `${sourcePrefix}-token-unit`,
      url: `${sourcePrefix}-token-url`,
      variable: `${sourcePrefix}-token-variable`,
    },
    solid: buildColorVariantVarNames({scheme, tone, variant: 'solid'}),
    tinted: buildColorVariantVarNames({scheme, tone, variant: 'tinted'}),
  }
}

function buildColorVariantVarNames(options: {
  scheme?: Scheme
  tone?: CardTone
  variant: 'solid' | 'tinted'
}): ColorVariantVarNames {
  const {scheme, tone, variant} = options

  const _prefix =
    scheme && tone
      ? (`--color-${scheme}-${tone}-${variant}` as const)
      : tone
        ? (`--color-${tone}-${variant}` as const)
        : (`--color-${variant}` as const)

  const vars = {
    bg: {
      0: `${_prefix}-bg-0`,
      1: `${_prefix}-bg-1`,
      2: `${_prefix}-bg-2`,
      3: `${_prefix}-bg-3`,
      4: `${_prefix}-bg-4`,
    },
    border: {
      0: `${_prefix}-border-0`,
      1: `${_prefix}-border-1`,
      2: `${_prefix}-border-2`,
      3: `${_prefix}-border-3`,
      4: `${_prefix}-border-4`,
    },
    fg: {
      0: `${_prefix}-fg-0`,
      1: `${_prefix}-fg-1`,
      2: `${_prefix}-fg-2`,
      3: `${_prefix}-fg-3`,
      4: `${_prefix}-fg-4`,
    },
  } as ColorVariantVarNames

  for (const elementTone of THEME_COLOR_STATE_TONES) {
    const prefix =
      scheme && tone
        ? (`--color-${scheme}-${tone}-${variant}-${elementTone}` as const)
        : tone
          ? (`--color-${tone}-${variant}-${elementTone}` as const)
          : (`--color-${variant}-${elementTone}` as const)

    vars[elementTone] = {
      bg: {
        0: `${prefix}-bg-0`,
        1: `${prefix}-bg-1`,
        2: `${prefix}-bg-2`,
        3: `${prefix}-bg-3`,
        4: `${prefix}-bg-4`,
      },
      border: {
        0: `${prefix}-border-0`,
        1: `${prefix}-border-1`,
        2: `${prefix}-border-2`,
        3: `${prefix}-border-3`,
        4: `${prefix}-border-4`,
      },
      fg: {
        0: `${prefix}-fg-0`,
        1: `${prefix}-fg-1`,
        2: `${prefix}-fg-2`,
        3: `${prefix}-fg-3`,
        4: `${prefix}-fg-4`,
      },
    }
  }

  return vars
}
