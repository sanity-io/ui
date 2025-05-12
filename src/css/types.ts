import {
  type AvatarSize,
  type ContainerWidth,
  type FontCodeSize,
  type FontHeadingSize,
  type FontLabelSize,
  type FontTextSize,
  type FontWeight,
  type Hue,
  type Radius,
  type Shadow,
  type Space,
  type ThemeColorAvatarColorKey as AvatarColor,
  type ThemeColorCardToneKey as CardTone,
  type ThemeColorSchemeKey as Scheme,
  type ThemeColorStateToneKey as ElementTone,
  type Tint,
} from '@sanity/ui/theme'
import CSS from 'csstype'

/** @public */
export type ResponsiveProp<T> = T | Array<T | null | undefined>

/** @public */
export type PaletteVarName = `--black` | `--white` | `--${Hue}-${Tint}`

/** @public */
export type ElementColorVariant = 'solid' | 'tinted'

/** @public */
export type ElementColorVariantKey =
  | 'bg-0'
  | 'bg-1'
  | 'bg-2'
  | 'bg-3'
  | 'bg-4'
  | 'border-0'
  | 'border-1'
  | 'border-2'
  | 'border-3'
  | 'border-4'
  | 'fg-0'
  | 'fg-1'
  | 'fg-2'
  | 'fg-3'
  | 'fg-4'

/** @public */
export type ThemeVarName =
  | `--avatar-focus-ring-offset`
  | `--avatar-focus-ring-width`
  | `--avatar-${AvatarSize}-distance`
  | `--avatar-${AvatarSize}-size`
  | `--button-border-width`
  | `--button-focus-ring-offset`
  | `--button-focus-ring-width`
  | `--button-text-weight`
  | `--card-border-width`
  | `--card-focus-ring-offset`
  | `--card-focus-ring-width`
  | `--shadow-outline`
  | `--container-${ContainerWidth}`
  | `--font-code-family`
  | `--font-code-feature-settings`
  | `--font-code-weight-${FontWeight}`
  | `--font-code-${FontCodeSize}-ascender-height`
  | `--font-code-${FontCodeSize}-descender-height`
  // | `--font-code-${FontCodeSize}-cap-height`
  | `--font-code-${FontCodeSize}-size`
  | `--font-code-${FontCodeSize}-line-height`
  | `--font-code-${FontCodeSize}-letter-spacing`
  | `--font-code-${FontCodeSize}-icon-size`
  | `--font-heading-family`
  | `--font-heading-feature-settings`
  | `--font-heading-weight-${FontWeight}`
  | `--font-heading-${FontHeadingSize}-ascender-height`
  | `--font-heading-${FontHeadingSize}-descender-height`
  // | `--font-heading-${FontHeadingSize}-cap-height`
  | `--font-heading-${FontHeadingSize}-size`
  | `--font-heading-${FontHeadingSize}-line-height`
  | `--font-heading-${FontHeadingSize}-letter-spacing`
  | `--font-heading-${FontHeadingSize}-icon-size`
  | `--font-label-family`
  | `--font-label-feature-settings`
  | `--font-label-weight-${FontWeight}`
  | `--font-label-${FontLabelSize}-ascender-height`
  | `--font-label-${FontLabelSize}-descender-height`
  // | `--font-label-${FontLabelSize}-cap-height`
  | `--font-label-${FontLabelSize}-size`
  | `--font-label-${FontLabelSize}-line-height`
  | `--font-label-${FontLabelSize}-letter-spacing`
  | `--font-label-${FontLabelSize}-icon-size`
  | `--font-text-family`
  | `--font-text-feature-settings`
  | `--font-text-weight-${FontWeight}`
  | `--font-text-${FontTextSize}-ascender-height`
  | `--font-text-${FontTextSize}-descender-height`
  // | `--font-text-${FontTextSize}-cap-height`
  | `--font-text-${FontTextSize}-size`
  | `--font-text-${FontTextSize}-line-height`
  | `--font-text-${FontTextSize}-letter-spacing`
  | `--font-text-${FontTextSize}-icon-size`
  | `--input-border-width`
  | `--input-box-shadow`
  | `--input-checkbox-focus-ring-offset`
  | `--input-checkbox-focus-ring-width`
  | `--input-checkbox-size`
  | `--input-radio-focus-ring-offset`
  | `--input-radio-focus-ring-width`
  | `--input-radio-mark-size`
  | `--input-radio-size`
  | `--input-select-focus-ring-offset`
  | `--input-select-focus-ring-width`
  | `--input-switch-focus-ring-offset`
  | `--input-switch-focus-ring-width`
  | '--input-switch-width'
  | '--input-switch-height'
  | '--input-switch-padding'
  | '--input-switch-transition-duration-ms'
  | '--input-switch-transition-timing-function'
  | '--input-text-focus-ring-offset'
  | '--input-text-focus-ring-width'
  | '--layer-dialog-z-offset'
  | `--radius-${Radius}`
  | `--space-${Exclude<Space, 0.5> | '0_5'}`
  | `--shadow-${Shadow}-umbra`
  | `--shadow-${Shadow}-penumbra`
  | `--shadow-${Shadow}-ambient`

export type ColorCardVarName =
  | `--color-${Scheme}-${CardTone}-accent-fg`
  | `--color-${Scheme}-${CardTone}-avatar-${AvatarColor}-bg`
  | `--color-${Scheme}-${CardTone}-avatar-${AvatarColor}-fg`
  | `--color-${Scheme}-${CardTone}-backdrop`
  | `--color-${Scheme}-${CardTone}-focus-ring`
  | `--color-${Scheme}-${CardTone}-link-fg`
  | `--color-${Scheme}-${CardTone}-muted-bg`
  | `--color-${Scheme}-${CardTone}-muted-fg`
  | `--color-${Scheme}-${CardTone}-${ElementColorVariant}-${ElementTone}-${ElementColorVariantKey}`
  | `--color-${Scheme}-${CardTone}-shadow-outline`
  | `--color-${Scheme}-${CardTone}-shadow-umbra`
  | `--color-${Scheme}-${CardTone}-shadow-penumbra`
  | `--color-${Scheme}-${CardTone}-shadow-ambient`
  | `--color-${Scheme}-${CardTone}-skeleton-from`
  | `--color-${Scheme}-${CardTone}-skeleton-to`
  | `--color-${Scheme}-${CardTone}-token-atrule`
  | `--color-${Scheme}-${CardTone}-token-attr-name`
  | `--color-${Scheme}-${CardTone}-token-attr-value`
  | `--color-${Scheme}-${CardTone}-token-attribute`
  | `--color-${Scheme}-${CardTone}-token-boolean`
  | `--color-${Scheme}-${CardTone}-token-builtin`
  | `--color-${Scheme}-${CardTone}-token-cdata`
  | `--color-${Scheme}-${CardTone}-token-char`
  | `--color-${Scheme}-${CardTone}-token-class`
  | `--color-${Scheme}-${CardTone}-token-class-name`
  | `--color-${Scheme}-${CardTone}-token-comment`
  | `--color-${Scheme}-${CardTone}-token-constant`
  | `--color-${Scheme}-${CardTone}-token-deleted`
  | `--color-${Scheme}-${CardTone}-token-doctype`
  | `--color-${Scheme}-${CardTone}-token-entity`
  | `--color-${Scheme}-${CardTone}-token-function`
  | `--color-${Scheme}-${CardTone}-token-hexcode`
  | `--color-${Scheme}-${CardTone}-token-id`
  | `--color-${Scheme}-${CardTone}-token-important`
  | `--color-${Scheme}-${CardTone}-token-inserted`
  | `--color-${Scheme}-${CardTone}-token-keyword`
  | `--color-${Scheme}-${CardTone}-token-number`
  | `--color-${Scheme}-${CardTone}-token-operator`
  | `--color-${Scheme}-${CardTone}-token-prolog`
  | `--color-${Scheme}-${CardTone}-token-property`
  | `--color-${Scheme}-${CardTone}-token-pseudo-class`
  | `--color-${Scheme}-${CardTone}-token-pseudo-element`
  | `--color-${Scheme}-${CardTone}-token-punctuation`
  | `--color-${Scheme}-${CardTone}-token-regex`
  | `--color-${Scheme}-${CardTone}-token-selector`
  | `--color-${Scheme}-${CardTone}-token-string`
  | `--color-${Scheme}-${CardTone}-token-symbol`
  | `--color-${Scheme}-${CardTone}-token-tag`
  | `--color-${Scheme}-${CardTone}-token-unit`
  | `--color-${Scheme}-${CardTone}-token-url`
  | `--color-${Scheme}-${CardTone}-token-variable`

export type ColorCardToneScopedVarName =
  | `--color-${CardTone}-accent-fg`
  | `--color-${CardTone}-avatar-${AvatarColor}-bg`
  | `--color-${CardTone}-avatar-${AvatarColor}-fg`
  | `--color-${CardTone}-backdrop`
  | `--color-${CardTone}-focus-ring`
  | `--color-${CardTone}-link-fg`
  | `--color-${CardTone}-muted-bg`
  | `--color-${CardTone}-muted-fg`
  | `--color-${CardTone}-${ElementColorVariant}-${ElementTone}-${ElementColorVariantKey}`
  | `--color-${CardTone}-shadow-outline`
  | `--color-${CardTone}-shadow-umbra`
  | `--color-${CardTone}-shadow-penumbra`
  | `--color-${CardTone}-shadow-ambient`
  | `--color-${CardTone}-skeleton-from`
  | `--color-${CardTone}-skeleton-to`
  | `--color-${CardTone}-token-atrule`
  | `--color-${CardTone}-token-attr-name`
  | `--color-${CardTone}-token-attr-value`
  | `--color-${CardTone}-token-attribute`
  | `--color-${CardTone}-token-boolean`
  | `--color-${CardTone}-token-builtin`
  | `--color-${CardTone}-token-cdata`
  | `--color-${CardTone}-token-char`
  | `--color-${CardTone}-token-class`
  | `--color-${CardTone}-token-class-name`
  | `--color-${CardTone}-token-comment`
  | `--color-${CardTone}-token-constant`
  | `--color-${CardTone}-token-deleted`
  | `--color-${CardTone}-token-doctype`
  | `--color-${CardTone}-token-entity`
  | `--color-${CardTone}-token-function`
  | `--color-${CardTone}-token-hexcode`
  | `--color-${CardTone}-token-id`
  | `--color-${CardTone}-token-important`
  | `--color-${CardTone}-token-inserted`
  | `--color-${CardTone}-token-keyword`
  | `--color-${CardTone}-token-number`
  | `--color-${CardTone}-token-operator`
  | `--color-${CardTone}-token-prolog`
  | `--color-${CardTone}-token-property`
  | `--color-${CardTone}-token-pseudo-class`
  | `--color-${CardTone}-token-pseudo-element`
  | `--color-${CardTone}-token-punctuation`
  | `--color-${CardTone}-token-regex`
  | `--color-${CardTone}-token-selector`
  | `--color-${CardTone}-token-string`
  | `--color-${CardTone}-token-symbol`
  | `--color-${CardTone}-token-tag`
  | `--color-${CardTone}-token-unit`
  | `--color-${CardTone}-token-url`
  | `--color-${CardTone}-token-variable`

/** @public */
export type CardScopedVarName =
  | `--color-accent-fg`
  | `--color-avatar-bg`
  | `--color-avatar-fg`
  | `--color-avatar-${AvatarColor}-bg`
  | `--color-avatar-${AvatarColor}-fg`
  | `--color-backdrop`
  | `--color-${ElementColorVariant}-${ElementTone}-${ElementColorVariantKey}`
  | `--color-bg`
  | `--color-border`
  | `--color-code-bg`
  | `--color-code-fg`
  | `--color-fg`
  | `--color-focus-ring`
  | `--color-link-fg`
  | `--color-muted-bg`
  | `--color-muted-fg`
  | `--color-shadow-outline`
  | `--color-shadow-umbra`
  | `--color-shadow-penumbra`
  | `--color-shadow-ambient`
  | `--color-skeleton-from`
  | `--color-skeleton-to`
  | `--color-token-atrule`
  | `--color-token-attr-name`
  | `--color-token-attr-value`
  | `--color-token-attribute`
  | `--color-token-boolean`
  | `--color-token-builtin`
  | `--color-token-cdata`
  | `--color-token-char`
  | `--color-token-class`
  | `--color-token-class-name`
  | `--color-token-comment`
  | `--color-token-constant`
  | `--color-token-deleted`
  | `--color-token-doctype`
  | `--color-token-entity`
  | `--color-token-function`
  | `--color-token-hexcode`
  | `--color-token-id`
  | `--color-token-important`
  | `--color-token-inserted`
  | `--color-token-keyword`
  | `--color-token-number`
  | `--color-token-operator`
  | `--color-token-prolog`
  | `--color-token-property`
  | `--color-token-pseudo-class`
  | `--color-token-pseudo-element`
  | `--color-token-punctuation`
  | `--color-token-regex`
  | `--color-token-selector`
  | `--color-token-string`
  | `--color-token-symbol`
  | `--color-token-tag`
  | `--color-token-unit`
  | `--color-token-url`
  | `--color-token-variable`
  // todo
  | `--color-checkbox-bg`
  | `--color-checkbox-fg`
  | `--color-checkbox-border`
  | `--font-ascender-height`
  // | `--font-cap-height`
  | `--font-descender-height`
  | `--font-family`
  | `--font-feature-settings`
  | `--font-icon-offset`
  | `--font-icon-size`
  | `--font-letter-spacing`
  | `--font-line-height`
  | `--font-size`
  | `--font-skeleton-line-height`
  | `--font-skeleton-ascender-height`
  | `--font-skeleton-descender-height`
  | `--font-weight-regular`
  | `--font-weight-medium`
  | `--font-weight-semibold`
  | `--font-weight-bold`
  | `--font-weight`
  | `--fg-color`
  | `--padding-top`
  | `--padding-right`
  | `--padding-bottom`
  | `--padding-left`

export type AvatarScopedVarName =
  | `--avatar-bg-color`
  | `--avatar-fg-color`
  | `--avatar-distance`
  | `--avatar-size`

export type LegacyCardScopedVarName =
  // legacy
  | `--card-accent-fg-color`
  | `--card-avatar-${AvatarColor}-bg-color`
  | `--card-avatar-${AvatarColor}-fg-color`
  | `--card-backdrop-color`
  | `--card-badge-${ElementTone}-bg-color`
  | `--card-badge-${ElementTone}-dot-color`
  | `--card-badge-${ElementTone}-fg-color`
  | `--card-badge-${ElementTone}-icon-color`
  | `--card-bg-color`
  | `--card-bg-image`
  | `--card-bg2-color`
  | `--card-border-color`
  | `--card-code-bg-color`
  | `--card-code-fg-color`
  | `--card-fg-color`
  | `--card-focus-ring-color`
  | `--card-hairline-soft-color`
  | `--card-hairline-hard-color`
  | `--card-icon-color`
  | `--card-kbd-bg-color`
  | `--card-kbd-border-color`
  | `--card-kbd-fg-color`
  | `--card-link-color`
  | `--card-link-fg-color`
  | `--card-muted-bg-color`
  | `--card-muted-fg-color`
  | `--card-shadow-outline-color`
  | `--card-shadow-umbra-color`
  | `--card-shadow-penumbra-color`
  | `--card-shadow-ambient-color`
  | `--card-skeleton-from-color`
  | `--card-skeleton-to-color`

/** @public */
export type ElementColorVariantScopedVarName =
  `--color-${ElementColorVariant}-${ElementColorVariantKey}`

export type ButtonScopedVarName = '--button-box-shadow'

/** @public */
export type InputScopedVarName =
  | `--color-input-bg`
  | `--color-input-border`
  | `--color-input-fg`
  | `--color-input-placeholder`
  | `--input-ascender-height`
  | `--input-descender-height`
  // | `--input-cap-height`
  | `--input-font-size`
  | `--input-gap`
  | `--input-letter-spacing`
  | `--input-line-height`
  | `--input-padding`

/** @public */
export type SwitchScopedVarName =
  | `--switch-bg-color`
  | `--switch-fg-color`
  | '--switch-thumb-offset'
  | '--switch-thumb-size'

/** @public */
export type VarName =
  | AvatarScopedVarName
  | LegacyCardScopedVarName
  | PaletteVarName
  | ThemeVarName
  | ColorCardVarName
  // scoped var names
  | ButtonScopedVarName
  | ColorCardToneScopedVarName
  | CardScopedVarName
  | ElementColorVariantScopedVarName
  | InputScopedVarName
  | SwitchScopedVarName

/** @public */
export type PropertiesWithVars = CSS.Properties &
  Partial<Record<VarName, string>> & {
    _prefix?: boolean
  }

/** @public */
export type PropertiesWithVarsAndNested = PropertiesWithVars & {
  '@nest'?: Record<string, PropertiesWithVars>
}

/** @public */
export type Properties = PropertiesWithVarsAndNested & {
  '@media'?: Record<string, PropertiesWithVarsAndNested>
}

/** @public */
// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface CustomCSSProperties extends Record<VarName, string> {}

/** @public */
export type StyleSelector = `.${string}` | `#${string}` | `:root`

/** @public */
export type StyleRules = Partial<Record<StyleSelector, Properties>>

/** @public */
export type StyleKeyframes = Record<string, Record<string, Properties>>

/** @public */
export type StyleLayers = Record<string, StyleRules>

/** @public */
export type Style = {
  // todo
  // containers?: StyleContainers
  keyframes?: StyleKeyframes
  layers?: StyleLayers
  rules?: StyleRules
}

// /** @public */
// export interface Properties extends CSS.PropertiesFallback, Partial<CustomCSSProperties> {
//   '@keyframes'?: Record<string, Record<string, Properties>>
//   '@media'?: Record<string, Properties>
//   '@nest'?: Record<string, Properties>
// }

/** @public */
export interface Rules {
  [className: string]: Properties
}

/** @public */
export type CSSVar = `var(${VarName})`

/** @public */
export interface ColorAvatarColorVarNames {
  bg: VarName
  fg: VarName
}

/** @public */
export interface ColorElementVarNames {
  bg: {
    0: VarName
    1: VarName
    2: VarName
    3: VarName
    4: VarName
  }
  border: {
    0: VarName
    1: VarName
    2: VarName
    3: VarName
    4: VarName
  }
  fg: {
    0: VarName
    1: VarName
    2: VarName
    3: VarName
    4: VarName
  }
}

export interface ColorVariantVarNames
  extends ColorElementVarNames,
    Record<ElementTone, ColorElementVarNames> {}

/** @public */
export interface ColorCardVarNames {
  accent: {
    fg: VarName
  }
  avatar: Record<AvatarColor, ColorAvatarColorVarNames>
  backdrop: VarName
  focusRing: VarName
  link: {
    fg: VarName
  }
  muted: {
    bg: VarName
    fg: VarName
  }
  shadow: {
    outline: VarName
    umbra: VarName
    penumbra: VarName
    ambient: VarName
  }
  skeleton: {
    from: VarName
    to: VarName
  }
  token: {
    atrule: VarName
    attrName: VarName
    attrValue: VarName
    attribute: VarName
    boolean: VarName
    builtin: VarName
    cdata: VarName
    char: VarName
    class: VarName
    className: VarName
    comment: VarName
    constant: VarName
    deleted: VarName
    doctype: VarName
    entity: VarName
    function: VarName
    hexcode: VarName
    id: VarName
    important: VarName
    inserted: VarName
    keyword: VarName
    number: VarName
    operator: VarName
    prolog: VarName
    property: VarName
    pseudoClass: VarName
    pseudoElement: VarName
    punctuation: VarName
    regex: VarName
    selector: VarName
    string: VarName
    symbol: VarName
    tag: VarName
    unit: VarName
    url: VarName
    variable: VarName
  }
  // variant: {
  solid: ColorVariantVarNames
  tinted: ColorVariantVarNames
  // }
}

/** @public */
export type ColorSchemeVarNames = Record<CardTone, ColorCardVarNames>

export interface ScopedColorVarNames extends Omit<ColorCardVarNames, 'avatar'> {
  accent: {
    fg: VarName
  }
  avatar: Record<AvatarColor, ColorAvatarColorVarNames> & ColorAvatarColorVarNames
  bg: VarName
  border: VarName
  fg: VarName
  input: {
    bg: VarName
    border: VarName
    fg: VarName
    placeholder: VarName
  }
}

/** @public */
export interface FontSizeVarNames {
  ascenderHeight: VarName
  descenderHeight: VarName
  fontSize: VarName
  lineHeight: VarName
  letterSpacing: VarName
  iconSize: VarName
}

export interface FontVarNames<Size extends number> {
  family: VarName
  sizes: Record<Size, FontSizeVarNames>
}

/** @public */
export interface VarNames {
  color: Record<Scheme, ColorSchemeVarNames> &
    ScopedColorVarNames &
    Record<CardTone, ColorCardVarNames>
  container: Record<ContainerWidth, VarName>
  avatar: {
    distance: VarName
    focusRing: {
      offset: VarName
      width: VarName
    }
    size: VarName
    sizes: Record<AvatarSize, {distance: VarName; size: VarName}>
  }
  font: {
    code: FontVarNames<FontCodeSize>
    heading: FontVarNames<FontHeadingSize>
    label: FontVarNames<FontLabelSize>
    text: FontVarNames<FontTextSize>
  }
  input: {
    fontSize: VarName
    lineHeight: VarName
    letterSpacing: VarName
    ascenderHeight: VarName
    descenderHeight: VarName
    // capHeight: CSSVarName
    gap: VarName
    padding: VarName
  }
  radius: Record<Radius, VarName>
  space: Record<Space, VarName>
}

/** @public */
export interface ColorInputStateVars {
  bg: CSSVar
  border: CSSVar
  fg: CSSVar
  muted: {
    bg: CSSVar
  }
  placeholder: CSSVar
}

/** @public */
export interface ColorElementVars {
  bg: {
    0: CSSVar
    1: CSSVar
    2: CSSVar
    3: CSSVar
    4: CSSVar
  }
  border: {
    0: CSSVar
    1: CSSVar
    2: CSSVar
    3: CSSVar
    4: CSSVar
  }
  fg: {
    0: CSSVar
    1: CSSVar
    2: CSSVar
    3: CSSVar
    4: CSSVar
  }
}

/** @public */
export interface ColorVariantVars extends Record<ElementTone, ColorElementVars>, ColorElementVars {}

/** @public */
export interface ColorCardVars {
  accent: {
    fg: CSSVar
  }
  avatar: ColorAvatarVars
  backdrop: CSSVar
  focusRing: CSSVar
  link: {
    fg: CSSVar
  }
  muted: {
    bg: CSSVar
    fg: CSSVar
  }
  shadow: {
    outline: CSSVar
    umbra: CSSVar
    penumbra: CSSVar
    ambient: CSSVar
  }
  skeleton: {
    from: CSSVar
    to: CSSVar
  }
  token: {
    atrule: CSSVar
    attrName: CSSVar
    attrValue: CSSVar
    attribute: CSSVar
    boolean: CSSVar
    builtin: CSSVar
    cdata: CSSVar
    char: CSSVar
    class: CSSVar
    className: CSSVar
    comment: CSSVar
    constant: CSSVar
    deleted: CSSVar
    doctype: CSSVar
    entity: CSSVar
    function: CSSVar
    hexcode: CSSVar
    id: CSSVar
    important: CSSVar
    inserted: CSSVar
    keyword: CSSVar
    number: CSSVar
    operator: CSSVar
    prolog: CSSVar
    property: CSSVar
    pseudoClass: CSSVar
    pseudoElement: CSSVar
    punctuation: CSSVar
    regex: CSSVar
    selector: CSSVar
    string: CSSVar
    symbol: CSSVar
    tag: CSSVar
    unit: CSSVar
    url: CSSVar
    variable: CSSVar
  }
  // variant: {
  solid: ColorVariantVars
  tinted: ColorVariantVars
  // }
}

/** @public */
export interface ColorBadgeToneVars {
  bg: CSSVar
  dot: CSSVar
  fg: CSSVar
  icon: CSSVar
}

/** @public */
export type ColorBadgeVars = Record<ElementTone, ColorBadgeToneVars>

/** @public */
export type ColorAvatarVars = Record<AvatarColor, ColorAvatarColorVars>

/** @public */
export interface ColorAvatarColorVars {
  bg: CSSVar
  fg: CSSVar
}

/** @public */
// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface ColorSchemeVars extends Record<CardTone, ColorCardVars> {}

export interface ScopedColorVars extends Omit<ColorCardVars, 'avatar'> {
  avatar: ColorAvatarVars & ColorAvatarColorVars
  bg: CSSVar
  border: CSSVar
  fg: CSSVar
  input: {
    bg: CSSVar
    border: CSSVar
    fg: CSSVar
    placeholder: CSSVar
  }
}

/** @public */
export interface FontSizeVars {
  ascenderHeight: CSSVar
  descenderHeight: CSSVar
  fontSize: CSSVar
  lineHeight: CSSVar
  letterSpacing: CSSVar
  iconSize: CSSVar
  // capHeight: CSSVar
}

/** @public */
export interface FontVars<Size extends number> {
  family: CSSVar
  sizes: Record<Size, FontSizeVars>
}

/** @public */
export interface Vars {
  avatar: {
    distance: CSSVar
    size: CSSVar
    sizes: Record<AvatarSize, {distance: CSSVar; size: CSSVar}>
  }
  color: {
    dark: ColorSchemeVars
    light: ColorSchemeVars
  } & ScopedColorVars &
    Record<CardTone, ColorCardVars>
  container: Record<ContainerWidth, CSSVar>
  font: {
    code: FontVars<FontCodeSize>
    heading: FontVars<FontHeadingSize>
    label: FontVars<FontLabelSize>
    text: FontVars<FontTextSize>
  }
  input: {
    fontSize: CSSVar
    lineHeight: CSSVar
    letterSpacing: CSSVar
    ascenderHeight: CSSVar
    descenderHeight: CSSVar
    // capHeight: CSSVar

    gap: CSSVar
    padding: CSSVar

    text: {
      focusRing: {
        offset: CSSVar
        width: CSSVar
      }
    }
  }
  radius: Record<Radius, CSSVar>
  space: Record<Space, CSSVar>
}
