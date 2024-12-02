import {
  AvatarSize,
  ContainerWidth,
  FontCodeSize,
  FontHeadingSize,
  FontLabelSize,
  FontTextSize,
  FontWeight,
  Hue,
  Radius,
  Shadow,
  Space,
  ThemeColorAvatarColorKey,
  // ThemeColorButtonModeKey,
  ThemeColorCardToneKey,
  // ThemeColorInputModeKey,
  // ThemeColorInputStateKey,
  ThemeColorSchemeKey,
  // ThemeColorStateKey,
  ThemeColorStateToneKey,
  Tint,
} from '@sanity/ui/theme'
import * as CSS from 'csstype'

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

  // `--color-${scheme}-${cardTone}-${colorVariant}-${elementTone}` as const
  | `--color-${ThemeColorSchemeKey}-${ThemeColorCardToneKey}-accent-fg`
  | `--color-${ThemeColorSchemeKey}-${ThemeColorCardToneKey}-avatar-${ThemeColorAvatarColorKey}-bg`
  | `--color-${ThemeColorSchemeKey}-${ThemeColorCardToneKey}-avatar-${ThemeColorAvatarColorKey}-fg`
  | `--color-${ThemeColorSchemeKey}-${ThemeColorCardToneKey}-backdrop`
  // | `--color-${ThemeColorSchemeKey}-${ThemeColorCardToneKey}-badge-${ThemeColorStateToneKey}-bg`
  // | `--color-${ThemeColorSchemeKey}-${ThemeColorCardToneKey}-badge-${ThemeColorStateToneKey}-dot`
  // | `--color-${ThemeColorSchemeKey}-${ThemeColorCardToneKey}-badge-${ThemeColorStateToneKey}-fg`
  // | `--color-${ThemeColorSchemeKey}-${ThemeColorCardToneKey}-badge-${ThemeColorStateToneKey}-icon`
  // | `--color-${ThemeColorSchemeKey}-${ThemeColorCardToneKey}-bg`
  // | `--color-${ThemeColorSchemeKey}-${ThemeColorCardToneKey}-bg-0`
  // | `--color-${ThemeColorSchemeKey}-${ThemeColorCardToneKey}-bg-1`
  // | `--color-${ThemeColorSchemeKey}-${ThemeColorCardToneKey}-bg-2`
  // | `--color-${ThemeColorSchemeKey}-${ThemeColorCardToneKey}-bg-3`
  // | `--color-${ThemeColorSchemeKey}-${ThemeColorCardToneKey}-bg-4`
  // | `--color-${ThemeColorSchemeKey}-${ThemeColorCardToneKey}-border`
  // | `--color-${ThemeColorSchemeKey}-${ThemeColorCardToneKey}-button-${ThemeColorButtonModeKey}-${ThemeColorStateToneKey}-${ThemeColorStateKey}-accent-fg`
  // | `--color-${ThemeColorSchemeKey}-${ThemeColorCardToneKey}-button-${ButtonMode}-${ThemeColorStateToneKey}-${ThemeColorStateKey}-avatar`
  // | `--color-${ThemeColorSchemeKey}-${ThemeColorCardToneKey}-button-${ButtonMode}-${ThemeColorStateToneKey}-${ThemeColorStateKey}-badge`
  // | `--color-${ThemeColorSchemeKey}-${ThemeColorCardToneKey}-button-${ThemeColorButtonModeKey}-${ThemeColorStateToneKey}-${ThemeColorStateKey}-bg`
  // | `--color-${ThemeColorSchemeKey}-${ThemeColorCardToneKey}-button-${ThemeColorButtonModeKey}-${ThemeColorStateToneKey}-${ThemeColorStateKey}-bg-1`
  // | `--color-${ThemeColorSchemeKey}-${ThemeColorCardToneKey}-button-${ThemeColorButtonModeKey}-${ThemeColorStateToneKey}-${ThemeColorStateKey}-bg-2`
  // | `--color-${ThemeColorSchemeKey}-${ThemeColorCardToneKey}-button-${ThemeColorButtonModeKey}-${ThemeColorStateToneKey}-${ThemeColorStateKey}-bg-3`
  // | `--color-${ThemeColorSchemeKey}-${ThemeColorCardToneKey}-button-${ThemeColorButtonModeKey}-${ThemeColorStateToneKey}-${ThemeColorStateKey}-bg-4`
  // | `--color-${ThemeColorSchemeKey}-${ThemeColorCardToneKey}-button-${ThemeColorButtonModeKey}-${ThemeColorStateToneKey}-${ThemeColorStateKey}-border`
  // | `--color-${ThemeColorSchemeKey}-${ThemeColorCardToneKey}-button-${ThemeColorButtonModeKey}-${ThemeColorStateToneKey}-${ThemeColorStateKey}-code-bg`
  // | `--color-${ThemeColorSchemeKey}-${ThemeColorCardToneKey}-button-${ThemeColorButtonModeKey}-${ThemeColorStateToneKey}-${ThemeColorStateKey}-code-fg`
  // | `--color-${ThemeColorSchemeKey}-${ThemeColorCardToneKey}-button-${ThemeColorButtonModeKey}-${ThemeColorStateToneKey}-${ThemeColorStateKey}-fg`
  // | `--color-${ThemeColorSchemeKey}-${ThemeColorCardToneKey}-button-${ThemeColorButtonModeKey}-${ThemeColorStateToneKey}-${ThemeColorStateKey}-icon`
  // | `--color-${ThemeColorSchemeKey}-${ThemeColorCardToneKey}-button-${ButtonMode}-${ThemeColorStateToneKey}-${ThemeColorStateKey}-kbd`
  // | `--color-${ThemeColorSchemeKey}-${ThemeColorCardToneKey}-button-${ThemeColorButtonModeKey}-${ThemeColorStateToneKey}-${ThemeColorStateKey}-link-fg`
  // | `--color-${ThemeColorSchemeKey}-${ThemeColorCardToneKey}-button-${ThemeColorButtonModeKey}-${ThemeColorStateToneKey}-${ThemeColorStateKey}-muted-bg`
  // | `--color-${ThemeColorSchemeKey}-${ThemeColorCardToneKey}-button-${ThemeColorButtonModeKey}-${ThemeColorStateToneKey}-${ThemeColorStateKey}-muted-fg`
  // | `--color-${ThemeColorSchemeKey}-${ThemeColorCardToneKey}-button-${ThemeColorButtonModeKey}-${ThemeColorStateToneKey}-${ThemeColorStateKey}-skeleton-from`
  // | `--color-${ThemeColorSchemeKey}-${ThemeColorCardToneKey}-button-${ThemeColorButtonModeKey}-${ThemeColorStateToneKey}-${ThemeColorStateKey}-skeleton-to`
  // | `--color-${ThemeColorSchemeKey}-${ThemeColorCardToneKey}-code-bg`
  // | `--color-${ThemeColorSchemeKey}-${ThemeColorCardToneKey}-code-fg`
  | `--color-${ThemeColorSchemeKey}-${ThemeColorCardToneKey}-focus-ring`
  // | `--color-${ThemeColorSchemeKey}-${ThemeColorCardToneKey}-icon`
  // | `--color-${ThemeColorSchemeKey}-${ThemeColorCardToneKey}-kbd-bg`
  // | `--color-${ThemeColorSchemeKey}-${ThemeColorCardToneKey}-kbd-border`
  // | `--color-${ThemeColorSchemeKey}-${ThemeColorCardToneKey}-kbd-fg`
  // | `--color-${ThemeColorSchemeKey}-${ThemeColorCardToneKey}-link-fg`
  // | `--color-${ThemeColorSchemeKey}-${ThemeColorCardToneKey}-muted-bg`
  // | `--color-${ThemeColorSchemeKey}-${ThemeColorCardToneKey}-muted-fg`
  // | `--color-${ThemeColorSchemeKey}-${ThemeColorCardToneKey}-skeleton-from`
  // | `--color-${ThemeColorSchemeKey}-${ThemeColorCardToneKey}-skeleton-to`
  // input
  // | `--color-${ThemeColorSchemeKey}-${ThemeColorCardToneKey}-input-${ThemeColorInputModeKey}-${ThemeColorInputStateKey}-bg`
  // | `--color-${ThemeColorSchemeKey}-${ThemeColorCardToneKey}-input-${ThemeColorInputModeKey}-${ThemeColorInputStateKey}-border`
  // | `--color-${ThemeColorSchemeKey}-${ThemeColorCardToneKey}-input-${ThemeColorInputModeKey}-${ThemeColorInputStateKey}-fg`
  // | `--color-${ThemeColorSchemeKey}-${ThemeColorCardToneKey}-input-${ThemeColorInputModeKey}-${ThemeColorInputStateKey}-muted-bg`
  // | `--color-${ThemeColorSchemeKey}-${ThemeColorCardToneKey}-input-${ThemeColorInputModeKey}-${ThemeColorInputStateKey}-placeholder`
  // selectable
  | `--color-${ThemeColorSchemeKey}-${ThemeColorCardToneKey}-${ElementColorVariant}-${ThemeColorStateToneKey}-${ElementColorVariantKey}`
  // | `--color-${ThemeColorSchemeKey}-${ThemeColorCardToneKey}-shadow-umbra`
  // | `--color-${ThemeColorSchemeKey}-${ThemeColorCardToneKey}-shadow-penumbra`
  // | `--color-${ThemeColorSchemeKey}-${ThemeColorCardToneKey}-shadow-ambient`
  // | `--color-${ThemeColorSchemeKey}-${ThemeColorCardToneKey}-syntax-atrule`
  // | `--color-${ThemeColorSchemeKey}-${ThemeColorCardToneKey}-syntax-attrName`
  // | `--color-${ThemeColorSchemeKey}-${ThemeColorCardToneKey}-syntax-attrValue`
  // | `--color-${ThemeColorSchemeKey}-${ThemeColorCardToneKey}-syntax-attribute`
  // | `--color-${ThemeColorSchemeKey}-${ThemeColorCardToneKey}-syntax-boolean`
  // | `--color-${ThemeColorSchemeKey}-${ThemeColorCardToneKey}-syntax-builtin`
  // | `--color-${ThemeColorSchemeKey}-${ThemeColorCardToneKey}-syntax-cdata`
  // | `--color-${ThemeColorSchemeKey}-${ThemeColorCardToneKey}-syntax-char`
  // | `--color-${ThemeColorSchemeKey}-${ThemeColorCardToneKey}-syntax-class`
  // | `--color-${ThemeColorSchemeKey}-${ThemeColorCardToneKey}-syntax-className`
  // | `--color-${ThemeColorSchemeKey}-${ThemeColorCardToneKey}-syntax-comment`
  // | `--color-${ThemeColorSchemeKey}-${ThemeColorCardToneKey}-syntax-constant`
  // | `--color-${ThemeColorSchemeKey}-${ThemeColorCardToneKey}-syntax-deleted`
  // | `--color-${ThemeColorSchemeKey}-${ThemeColorCardToneKey}-syntax-doctype`
  // | `--color-${ThemeColorSchemeKey}-${ThemeColorCardToneKey}-syntax-entity`
  // | `--color-${ThemeColorSchemeKey}-${ThemeColorCardToneKey}-syntax-function`
  // | `--color-${ThemeColorSchemeKey}-${ThemeColorCardToneKey}-syntax-hexcode`
  // | `--color-${ThemeColorSchemeKey}-${ThemeColorCardToneKey}-syntax-id`
  // | `--color-${ThemeColorSchemeKey}-${ThemeColorCardToneKey}-syntax-important`
  // | `--color-${ThemeColorSchemeKey}-${ThemeColorCardToneKey}-syntax-inserted`
  // | `--color-${ThemeColorSchemeKey}-${ThemeColorCardToneKey}-syntax-keyword`
  // | `--color-${ThemeColorSchemeKey}-${ThemeColorCardToneKey}-syntax-number`
  // | `--color-${ThemeColorSchemeKey}-${ThemeColorCardToneKey}-syntax-operator`
  // | `--color-${ThemeColorSchemeKey}-${ThemeColorCardToneKey}-syntax-prolog`
  // | `--color-${ThemeColorSchemeKey}-${ThemeColorCardToneKey}-syntax-property`
  // | `--color-${ThemeColorSchemeKey}-${ThemeColorCardToneKey}-syntax-pseudoClass`
  // | `--color-${ThemeColorSchemeKey}-${ThemeColorCardToneKey}-syntax-pseudoElement`
  // | `--color-${ThemeColorSchemeKey}-${ThemeColorCardToneKey}-syntax-punctuation`
  // | `--color-${ThemeColorSchemeKey}-${ThemeColorCardToneKey}-syntax-regex`
  // | `--color-${ThemeColorSchemeKey}-${ThemeColorCardToneKey}-syntax-selector`
  // | `--color-${ThemeColorSchemeKey}-${ThemeColorCardToneKey}-syntax-string`
  // | `--color-${ThemeColorSchemeKey}-${ThemeColorCardToneKey}-syntax-symbol`
  // | `--color-${ThemeColorSchemeKey}-${ThemeColorCardToneKey}-syntax-tag`
  // | `--color-${ThemeColorSchemeKey}-${ThemeColorCardToneKey}-syntax-unit`
  // | `--color-${ThemeColorSchemeKey}-${ThemeColorCardToneKey}-syntax-url`
  // | `--color-${ThemeColorSchemeKey}-${ThemeColorCardToneKey}-syntax-variable`
  // | `--color-${ThemeColorSchemeKey}-${ThemeColorCardToneKey}-fg`
  | `--container-${ContainerWidth}`
  | `--font-code-family`
  | `--font-code-weight-${FontWeight}`
  | `--font-code-${FontCodeSize}-ascender-height`
  | `--font-code-${FontCodeSize}-descender-height`
  | `--font-code-${FontCodeSize}-size`
  | `--font-code-${FontCodeSize}-line-height`
  | `--font-code-${FontCodeSize}-letter-spacing`
  | `--font-code-${FontCodeSize}-icon-size`
  | `--font-heading-family`
  | `--font-heading-weight-${FontWeight}`
  | `--font-heading-${FontHeadingSize}-ascender-height`
  | `--font-heading-${FontHeadingSize}-descender-height`
  | `--font-heading-${FontHeadingSize}-size`
  | `--font-heading-${FontHeadingSize}-line-height`
  | `--font-heading-${FontHeadingSize}-letter-spacing`
  | `--font-heading-${FontHeadingSize}-icon-size`
  | `--font-label-family`
  | `--font-label-weight-${FontWeight}`
  | `--font-label-${FontLabelSize}-ascender-height`
  | `--font-label-${FontLabelSize}-descender-height`
  | `--font-label-${FontLabelSize}-size`
  | `--font-label-${FontLabelSize}-line-height`
  | `--font-label-${FontLabelSize}-letter-spacing`
  | `--font-label-${FontLabelSize}-icon-size`
  | `--font-text-family`
  | `--font-text-weight-${FontWeight}`
  | `--font-text-${FontTextSize}-ascender-height`
  | `--font-text-${FontTextSize}-descender-height`
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

/** @public */
export type CardScopedVarName =
  // | `--color-accent-fg`
  | `--color-avatar-${ThemeColorAvatarColorKey}-bg`
  | `--color-avatar-${ThemeColorAvatarColorKey}-fg`
  | `--color-backdrop`
  // | `--color-badge-bg`
  // | `--color-badge-dot`
  // | `--color-badge-fg`
  // | `--color-badge-icon`
  // | `--color-badge-${ThemeColorStateToneKey}-bg`
  // | `--color-badge-${ThemeColorStateToneKey}-dot`
  // | `--color-badge-${ThemeColorStateToneKey}-fg`
  // | `--color-badge-${ThemeColorStateToneKey}-icon`
  | `--color-${ElementColorVariant}-${ThemeColorStateToneKey}-${ElementColorVariantKey}`
  | `--color-bg`
  // | `--color-bg-0`
  // | `--color-bg-1`
  // | `--color-bg-2`
  // | `--color-bg-3`
  // | `--color-bg-4`
  | `--color-border`
  // | `--color-border-0`
  // | `--color-border-1`
  // | `--color-border-2`
  // | `--color-border-3`
  // | `--color-border-4`
  | `--color-code-bg`
  | `--color-code-fg`
  | `--color-fg`
  // | `--color-fg-0`
  // | `--color-fg-1`
  // | `--color-fg-2`
  // | `--color-fg-3`
  // | `--color-fg-4`
  | `--color-focus-ring`
  | `--color-icon`
  // | `--color-input-${ThemeColorInputModeKey}-${ThemeColorInputStateKey}-bg`
  // | `--color-input-${ThemeColorInputModeKey}-${ThemeColorInputStateKey}-border`
  // | `--color-input-${ThemeColorInputModeKey}-${ThemeColorInputStateKey}-fg`
  // | `--color-input-${ThemeColorInputModeKey}-${ThemeColorInputStateKey}-muted-bg`
  // | `--color-input-${ThemeColorInputModeKey}-${ThemeColorInputStateKey}-placeholder`
  // | `--color-kbd-bg`
  // | `--color-kbd-border`
  // | `--color-kbd-fg`
  // | `--color-link-fg`
  | `--color-muted-bg`
  | `--color-muted-fg`
  | `--color-shadow-outline`
  | `--color-shadow-umbra`
  | `--color-shadow-penumbra`
  | `--color-shadow-ambient`
  | `--color-skeleton-from`
  | `--color-skeleton-to`
  | `--color-syntax-atrule`
  | `--color-syntax-attrName`
  | `--color-syntax-attrValue`
  | `--color-syntax-attribute`
  | `--color-syntax-boolean`
  | `--color-syntax-builtin`
  | `--color-syntax-cdata`
  | `--color-syntax-char`
  | `--color-syntax-class`
  | `--color-syntax-className`
  | `--color-syntax-comment`
  | `--color-syntax-constant`
  | `--color-syntax-deleted`
  | `--color-syntax-doctype`
  | `--color-syntax-entity`
  | `--color-syntax-function`
  | `--color-syntax-hexcode`
  | `--color-syntax-id`
  | `--color-syntax-important`
  | `--color-syntax-inserted`
  | `--color-syntax-keyword`
  | `--color-syntax-number`
  | `--color-syntax-operator`
  | `--color-syntax-prolog`
  | `--color-syntax-property`
  | `--color-syntax-pseudoClass`
  | `--color-syntax-pseudoElement`
  | `--color-syntax-punctuation`
  | `--color-syntax-regex`
  | `--color-syntax-selector`
  | `--color-syntax-string`
  | `--color-syntax-symbol`
  | `--color-syntax-tag`
  | `--color-syntax-unit`
  | `--color-syntax-url`
  | `--color-syntax-variable`
  // legacy
  | `--card-accent-fg-color`
  | `--card-avatar-${ThemeColorAvatarColorKey}-bg-color`
  | `--card-avatar-${ThemeColorAvatarColorKey}-fg-color`
  | `--card-backdrop-color`
  | `--card-badge-${ThemeColorStateToneKey}-bg-color`
  | `--card-badge-${ThemeColorStateToneKey}-dot-color`
  | `--card-badge-${ThemeColorStateToneKey}-fg-color`
  | `--card-badge-${ThemeColorStateToneKey}-icon-color`
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
  // todo
  | `--avatar-bg-color`
  | `--avatar-fg-color`
  | `--avatar-distance`
  | `--avatar-size`
  | `--color-checkbox-bg`
  | `--color-checkbox-fg`
  | `--color-checkbox-border`
  | `--font-ascender-height`
  | `--font-cap-height`
  | `--font-descender-height`
  | `--font-family`
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
  | `--input-bg-color`
  | `--input-border-color`
  | `--input-fg-color`
  | `--padding-top`
  | `--padding-right`
  | `--padding-bottom`
  | `--padding-left`

/** @public */
export type ElementColorVariantScopedVarName =
  `--color-${ElementColorVariant}-${ElementColorVariantKey}`

/** @public */
export type InputScopedVarName =
  | `--input-padding`
  | `--input-font-size`
  | `--input-line-height`
  | `--input-ascender-height`
  | `--input-descender-height`

// export type CardVarName = `--card-${CardSize}-${CardVariant}-${CardState}-${CardElement}`

/** @public */
export type CSSVarName =
  | PaletteVarName
  | ThemeVarName
  | CardScopedVarName
  | ElementColorVariantScopedVarName // `--${string}`
  | InputScopedVarName

/** @public */
export interface CustomCSSProperties extends Record<CSSVarName, string> {}

/** @public */
export interface Properties extends CSS.PropertiesFallback, Partial<CustomCSSProperties> {
  '@keyframes'?: Record<string, Record<string, Properties>>
  '@media'?: Record<string, Properties>
  '@nest'?: Record<string, Properties>
}

/** @public */
export interface Rules {
  [className: string]: Properties
}

/** @public */
export type CSSVar = `var(${CSSVarName})`

/** @public */
export interface ColorAvatarColorVarNames {
  bg: CSSVarName
  fg: CSSVarName
}

// export interface ColorBadgeToneVarNames {
//   bg: CSSVarName
//   dot: CSSVarName
//   fg: CSSVarName
//   icon: CSSVarName
// }

// export interface ColorInputStateVarNames {
//   bg: CSSVarName
//   border: CSSVarName
//   fg: CSSVarName
//   muted: {
//     bg: CSSVarName
//   }
//   placeholder: CSSVarName
// }

// export interface ColorStateVarNames {
//   accent: {
//     fg: CSSVarName
//   }
//   avatar: Record<ThemeColorAvatarColorKey, ColorAvatarColorVarNames>
//   badge: Record<ThemeColorStateToneKey, ColorBadgeToneVarNames>
//   // badge
//   // bg: CSSVarName
//   bg: {
//     0: CSSVarName
//     1: CSSVarName
//     2: CSSVarName
//     3: CSSVarName
//     4: CSSVarName
//   }
//   border: {
//     0: CSSVarName
//     1: CSSVarName
//     2: CSSVarName
//     3: CSSVarName
//     4: CSSVarName
//   }
//   code: {
//     bg: CSSVarName
//     fg: CSSVarName
//   }
//   fg: {
//     0: CSSVarName
//     1: CSSVarName
//     2: CSSVarName
//     3: CSSVarName
//     4: CSSVarName
//   }
//   icon: CSSVarName
//   // kbd
//   kbd: {
//     bg: CSSVarName
//     border: CSSVarName
//     fg: CSSVarName
//   }
//   link: {
//     fg: CSSVarName
//   }
//   muted: {
//     bg: CSSVarName
//     fg: CSSVarName
//   }
//   shadow: {
//     outline: CSSVarName
//     umbra: CSSVarName
//     penumbra: CSSVarName
//     ambient: CSSVarName
//   }
//   skeleton: {
//     from: CSSVarName
//     to: CSSVarName
//   }
//   syntax: {
//     atrule: CSSVarName
//     attrName: CSSVarName
//     attrValue: CSSVarName
//     attribute: CSSVarName
//     boolean: CSSVarName
//     builtin: CSSVarName
//     cdata: CSSVarName
//     char: CSSVarName
//     class: CSSVarName
//     className: CSSVarName
//     comment: CSSVarName
//     constant: CSSVarName
//     deleted: CSSVarName
//     doctype: CSSVarName
//     entity: CSSVarName
//     function: CSSVarName
//     hexcode: CSSVarName
//     id: CSSVarName
//     important: CSSVarName
//     inserted: CSSVarName
//     keyword: CSSVarName
//     number: CSSVarName
//     operator: CSSVarName
//     prolog: CSSVarName
//     property: CSSVarName
//     pseudoClass: CSSVarName
//     pseudoElement: CSSVarName
//     punctuation: CSSVarName
//     regex: CSSVarName
//     selector: CSSVarName
//     string: CSSVarName
//     symbol: CSSVarName
//     tag: CSSVarName
//     unit: CSSVarName
//     url: CSSVarName
//     variable: CSSVarName
//   }
// }

/** @public */
export interface ColorCardVarNames {
  avatar: Record<ThemeColorAvatarColorKey, ColorAvatarColorVarNames>
  backdrop: ThemeVarName
  focusRing: ThemeVarName
  // input: Record<ThemeColorInputModeKey, Record<ThemeColorInputStateKey, ColorInputStateVarNames>>
}

/** @public */
export type ColorSchemeVarNames = Record<ThemeColorCardToneKey, ColorCardVarNames>

// export interface ScopedColorVarNames extends Omit<ColorStateVarNames, 'badge'> {
//   badge: Record<ThemeColorStateToneKey, ColorBadgeToneVarNames> & ColorBadgeToneVarNames
// }

/** @public */
export interface VarNames {
  color: Record<ThemeColorSchemeKey, ColorSchemeVarNames>
  // & ScopedColorVarNames
  avatar: {
    focusRing: {
      offset: CSSVarName
      width: CSSVarName
    }
  }
  space: Record<Space, CSSVarName>
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
export interface ColorVariantVars extends Record<ThemeColorStateToneKey, ColorElementVars> {}

/** @public */
export interface ColorCardVars {
  // extends ColorStateVars
  accent: {
    fg: CSSVar
  }
  avatar: ColorAvatarVars
  backdrop: CSSVar
  // badge: ColorBadgeVars & ColorBadgeToneVars
  focusRing: CSSVar
  // input: Record<ThemeColorInputModeKey, Record<ThemeColorInputStateKey, ColorInputStateVars>>
  variant: {
    solid: ColorVariantVars
    tinted: ColorVariantVars
  }
}

/** @public */
export interface ColorBadgeToneVars {
  bg: CSSVar
  dot: CSSVar
  fg: CSSVar
  icon: CSSVar
}

/** @public */
export type ColorBadgeVars = Record<ThemeColorStateToneKey, ColorBadgeToneVars>

/** @public */
export type ColorAvatarVars = Record<ThemeColorAvatarColorKey, ColorAvatarColorVars>

// export interface ColorInputStateVars {
//   bg: CSSVar
//   border: CSSVar
//   fg: CSSVar
//   muted: {
//     bg: CSSVar
//   }
//   placeholder: CSSVar
// }

// export type ColorInputModeVars = Record<ThemeColorInputStateKey, ColorInputStateVars>

// export type ColorInputVars = Record<ThemeColorInputModeKey, ColorInputModeVars>

// export interface ColorStateVars {
//   accent: {
//     fg: CSSVar
//   }
//   avatar: ColorAvatarVars
//   bg: {
//     0: CSSVar
//     1: CSSVar
//     2: CSSVar
//     3: CSSVar
//     4: CSSVar
//   }
//   border: {
//     0: CSSVar
//     1: CSSVar
//     2: CSSVar
//     3: CSSVar
//     4: CSSVar
//   }
//   code: {
//     bg: CSSVar
//     fg: CSSVar
//   }
//   fg: {
//     0: CSSVar
//     1: CSSVar
//     2: CSSVar
//     3: CSSVar
//     4: CSSVar
//   }
//   icon: CSSVar
//   input: ColorInputVars
//   kbd: {
//     bg: CSSVar
//     border: CSSVar
//     fg: CSSVar
//   }
//   link: {
//     fg: CSSVar
//   }
//   muted: {
//     bg: CSSVar
//     fg: CSSVar
//   }
//   shadow: {
//     outline: CSSVar
//     umbra: CSSVar
//     penumbra: CSSVar
//     ambient: CSSVar
//   }
//   skeleton: {
//     from: CSSVar
//     to: CSSVar
//   }
//   syntax: {
//     atrule: CSSVar
//     attrName: CSSVar
//     attrValue: CSSVar
//     attribute: CSSVar
//     boolean: CSSVar
//     builtin: CSSVar
//     cdata: CSSVar
//     char: CSSVar
//     class: CSSVar
//     className: CSSVar
//     comment: CSSVar
//     constant: CSSVar
//     deleted: CSSVar
//     doctype: CSSVar
//     entity: CSSVar
//     function: CSSVar
//     hexcode: CSSVar
//     id: CSSVar
//     important: CSSVar
//     inserted: CSSVar
//     keyword: CSSVar
//     number: CSSVar
//     operator: CSSVar
//     prolog: CSSVar
//     property: CSSVar
//     pseudoClass: CSSVar
//     pseudoElement: CSSVar
//     punctuation: CSSVar
//     regex: CSSVar
//     selector: CSSVar
//     string: CSSVar
//     symbol: CSSVar
//     tag: CSSVar
//     unit: CSSVar
//     url: CSSVar
//     variable: CSSVar
//   }
// }

/** @public */
export interface ColorAvatarColorVars {
  bg: CSSVar
  fg: CSSVar
}

/** @public */
export interface ColorSchemeVars extends Record<ThemeColorCardToneKey, ColorCardVars> {}

// export interface ScopedColorVars extends Omit<ColorStateVars, 'badge'> {
//   badge: ColorBadgeVars & ColorBadgeToneVars
// }

// export interface ScopedColorVars extends ColorStateVars {
//   tinted: Record<ThemeColorStateToneKey, ColorStateVars>
//   solid: Record<ThemeColorStateToneKey, ColorStateVars>
// }

/** @public */
export interface FontSizeVars {
  ascenderHeight: CSSVar
  descenderHeight: CSSVar
  fontSize: CSSVar
  lineHeight: CSSVar
  letterSpacing: CSSVar
  iconSize: CSSVar
}

/** @public */
export interface FontVars<Size extends number> {
  family: CSSVar
  sizes: Record<Size, FontSizeVars>
}

/** @public */
export interface Vars {
  color: {
    dark: ColorSchemeVars
    light: ColorSchemeVars
  }
  //  & ScopedColorVars
  font: {
    code: FontVars<FontCodeSize>
    heading: FontVars<FontHeadingSize>
    label: FontVars<FontLabelSize>
    text: FontVars<FontTextSize>
  }
  space: Record<Space, CSSVar>
}
