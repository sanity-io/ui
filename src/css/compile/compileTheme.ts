import {
  type ThemeColorCardToneKey,
  type ThemeColorSchemeKey,
  type RootTheme_v2,
  type ThemeBoxShadow,
  THEME_COLOR_AVATAR_COLORS,
  THEME_COLOR_STATE_TONES,
} from '@sanity/ui/theme'
import {Properties} from '../types'
import {varNames} from '../varNames'
import {vars} from '../vars'
import {compileRule} from './compileRule'

type CardTone = ThemeColorCardToneKey
type Scheme = ThemeColorSchemeKey

function rem(value: number) {
  if (value === 0) return '0'

  return `${value / 16}rem`
}

function px(value: number) {
  if (value === 0) return '0'

  return `${value}px`
}

function toBoxShadow(value: ThemeBoxShadow | undefined) {
  if (!value) return 'none'

  return value.map((n) => px(n)).join(' ')
}

function countThemeEntries(obj: Record<string, unknown> | unknown[]): number {
  let count = 0

  if (isArray(obj)) {
    for (let i = 0; i < obj.length; i++) {
      const value = obj[i]

      if (isRecord(value) || isArray(value)) {
        count += countThemeEntries(value)
      } else {
        count++
      }
    }
  } else {
    for (const [key, value] of Object.entries(obj)) {
      if (key.startsWith('_')) continue

      if (isRecord(value) || isArray(value)) {
        count += countThemeEntries(value)
      } else {
        count++
      }
    }
  }

  return count
}

/** @public */
export function compileTheme(theme: RootTheme_v2): string {
  for (const [key, val] of Object.entries(theme.color.light.default)) {
    if (isRecord(val) || isArray(val)) {
      // eslint-disable-next-line no-console
      console.log(key, countThemeEntries(val))
    }
  }

  return [
    compileRule(`:root`, {
      [varNames.avatar.focusRing.offset]: px(theme.avatar.focusRing.offset),
      [varNames.avatar.focusRing.width]: px(theme.avatar.focusRing.width),
      // [varNames.avatar.size[0].distance]: px(theme.avatar.size[0].distance),
      // [varNames.avatar.size[0].size]: px(theme.avatar.size[0].size),
      '--avatar-0-distance': px(theme.avatar.sizes[0].distance),
      '--avatar-0-size': px(theme.avatar.sizes[0].size),
      '--avatar-1-distance': px(theme.avatar.sizes[1].distance),
      '--avatar-1-size': px(theme.avatar.sizes[1].size),
      '--avatar-2-distance': px(theme.avatar.sizes[2].distance),
      '--avatar-2-size': px(theme.avatar.sizes[2].size),
      '--avatar-3-distance': px(theme.avatar.sizes[3].distance),
      '--avatar-3-size': px(theme.avatar.sizes[3].size),
      '--button-border-width': px(theme.button.border.width),
      '--button-focus-ring-offset': px(theme.button.focusRing.offset),
      '--button-focus-ring-width': px(theme.button.focusRing.width),
      '--button-text-weight': `${theme.button.textWeight}`,
      '--card-border-width': px(theme.card.border.width),
      '--card-focus-ring-offset': px(theme.card.focusRing.offset),
      '--card-focus-ring-width': px(theme.card.focusRing.width),
      '--card-shadow-outline': `0 0 0 ${px(theme.card.shadow.outline)}`,

      '--font-code-family': theme.font.code.family,
      '--font-code-weight-regular': `${theme.font.code.weights.regular}`,
      '--font-code-weight-medium': `${theme.font.code.weights.medium}`,
      '--font-code-weight-semibold': `${theme.font.code.weights.semibold}`,
      '--font-code-weight-bold': `${theme.font.code.weights.bold}`,
      '--font-code-0-size': rem(theme.font.code.sizes[0].fontSize),
      '--font-code-0-line-height': rem(theme.font.code.sizes[0].lineHeight),
      '--font-code-0-ascender-height': px(theme.font.code.sizes[0].ascenderHeight),
      '--font-code-0-descender-height': px(theme.font.code.sizes[0].descenderHeight),
      '--font-code-0-letter-spacing': px(theme.font.code.sizes[0].letterSpacing),
      '--font-code-0-icon-size': px(theme.font.code.sizes[0].iconSize),
      '--font-code-1-size': rem(theme.font.code.sizes[1].fontSize),
      '--font-code-1-line-height': px(theme.font.code.sizes[1].lineHeight),
      '--font-code-1-ascender-height': px(theme.font.code.sizes[1].ascenderHeight),
      '--font-code-1-descender-height': px(theme.font.code.sizes[1].descenderHeight),
      '--font-code-1-letter-spacing': px(theme.font.code.sizes[1].letterSpacing),
      '--font-code-1-icon-size': px(theme.font.code.sizes[1].iconSize),
      '--font-code-2-size': rem(theme.font.code.sizes[2].fontSize),
      '--font-code-2-line-height': rem(theme.font.code.sizes[2].lineHeight),
      '--font-code-2-ascender-height': px(theme.font.code.sizes[2].ascenderHeight),
      '--font-code-2-descender-height': px(theme.font.code.sizes[2].descenderHeight),
      '--font-code-2-letter-spacing': px(theme.font.code.sizes[2].letterSpacing),
      '--font-code-2-icon-size': px(theme.font.code.sizes[2].iconSize),
      '--font-code-3-size': rem(theme.font.code.sizes[3].fontSize),
      '--font-code-3-line-height': rem(theme.font.code.sizes[3].lineHeight),
      '--font-code-3-ascender-height': px(theme.font.code.sizes[3].ascenderHeight),
      '--font-code-3-descender-height': px(theme.font.code.sizes[3].descenderHeight),
      '--font-code-3-letter-spacing': px(theme.font.code.sizes[3].letterSpacing),
      '--font-code-3-icon-size': px(theme.font.code.sizes[3].iconSize),
      '--font-code-4-size': rem(theme.font.code.sizes[4].fontSize),
      '--font-code-4-line-height': rem(theme.font.code.sizes[4].lineHeight),
      '--font-code-4-ascender-height': px(theme.font.code.sizes[4].ascenderHeight),
      '--font-code-4-descender-height': px(theme.font.code.sizes[4].descenderHeight),
      '--font-code-4-letter-spacing': px(theme.font.code.sizes[4].letterSpacing),
      '--font-code-4-icon-size': px(theme.font.code.sizes[4].iconSize),

      '--font-heading-family': theme.font.heading.family,
      '--font-heading-weight-regular': `${theme.font.heading.weights.regular}`,
      '--font-heading-weight-medium': `${theme.font.heading.weights.medium}`,
      '--font-heading-weight-semibold': `${theme.font.heading.weights.semibold}`,
      '--font-heading-weight-bold': `${theme.font.heading.weights.bold}`,
      '--font-heading-0-size': rem(theme.font.heading.sizes[0].fontSize),
      '--font-heading-0-line-height': rem(theme.font.heading.sizes[0].lineHeight),
      '--font-heading-0-ascender-height': px(theme.font.heading.sizes[0].ascenderHeight),
      '--font-heading-0-descender-height': px(theme.font.heading.sizes[0].descenderHeight),
      '--font-heading-0-letter-spacing': px(theme.font.heading.sizes[0].letterSpacing),
      '--font-heading-0-icon-size': px(theme.font.heading.sizes[0].iconSize),
      '--font-heading-1-size': rem(theme.font.heading.sizes[1].fontSize),
      '--font-heading-1-line-height': rem(theme.font.heading.sizes[1].lineHeight),
      '--font-heading-1-ascender-height': px(theme.font.heading.sizes[1].ascenderHeight),
      '--font-heading-1-descender-height': px(theme.font.heading.sizes[1].descenderHeight),
      '--font-heading-1-letter-spacing': px(theme.font.heading.sizes[1].letterSpacing),
      '--font-heading-1-icon-size': px(theme.font.heading.sizes[1].iconSize),
      '--font-heading-2-size': rem(theme.font.heading.sizes[2].fontSize),
      '--font-heading-2-line-height': rem(theme.font.heading.sizes[2].lineHeight),
      '--font-heading-2-ascender-height': px(theme.font.heading.sizes[2].ascenderHeight),
      '--font-heading-2-descender-height': px(theme.font.heading.sizes[2].descenderHeight),
      '--font-heading-2-letter-spacing': px(theme.font.heading.sizes[2].letterSpacing),
      '--font-heading-2-icon-size': px(theme.font.heading.sizes[2].iconSize),
      '--font-heading-3-size': rem(theme.font.heading.sizes[3].fontSize),
      '--font-heading-3-line-height': rem(theme.font.heading.sizes[3].lineHeight),
      '--font-heading-3-ascender-height': px(theme.font.heading.sizes[3].ascenderHeight),
      '--font-heading-3-descender-height': px(theme.font.heading.sizes[3].descenderHeight),
      '--font-heading-3-letter-spacing': px(theme.font.heading.sizes[3].letterSpacing),
      '--font-heading-3-icon-size': px(theme.font.heading.sizes[3].iconSize),
      '--font-heading-4-size': rem(theme.font.heading.sizes[4].fontSize),
      '--font-heading-4-line-height': rem(theme.font.heading.sizes[4].lineHeight),
      '--font-heading-4-ascender-height': px(theme.font.heading.sizes[4].ascenderHeight),
      '--font-heading-4-descender-height': px(theme.font.heading.sizes[4].descenderHeight),
      '--font-heading-4-letter-spacing': px(theme.font.heading.sizes[4].letterSpacing),
      '--font-heading-4-icon-size': px(theme.font.heading.sizes[4].iconSize),
      '--font-heading-5-size': rem(theme.font.heading.sizes[5].fontSize),
      '--font-heading-5-line-height': rem(theme.font.heading.sizes[5].lineHeight),
      '--font-heading-5-ascender-height': px(theme.font.heading.sizes[5].ascenderHeight),
      '--font-heading-5-descender-height': px(theme.font.heading.sizes[5].descenderHeight),
      '--font-heading-5-letter-spacing': px(theme.font.heading.sizes[5].letterSpacing),
      '--font-heading-5-icon-size': px(theme.font.heading.sizes[5].iconSize),

      '--font-label-family': theme.font.label.family,
      '--font-label-weight-regular': `${theme.font.label.weights.regular}`,
      '--font-label-weight-medium': `${theme.font.label.weights.medium}`,
      '--font-label-weight-semibold': `${theme.font.label.weights.semibold}`,
      '--font-label-weight-bold': `${theme.font.label.weights.bold}`,
      '--font-label-0-size': rem(theme.font.label.sizes[0].fontSize),
      '--font-label-0-line-height': rem(theme.font.label.sizes[0].lineHeight),
      '--font-label-0-ascender-height': px(theme.font.label.sizes[0].ascenderHeight),
      '--font-label-0-descender-height': px(theme.font.label.sizes[0].descenderHeight),
      '--font-label-0-letter-spacing': px(theme.font.label.sizes[0].letterSpacing),
      '--font-label-0-icon-size': px(theme.font.label.sizes[0].iconSize),
      '--font-label-1-size': rem(theme.font.label.sizes[1].fontSize),
      '--font-label-1-line-height': rem(theme.font.label.sizes[1].lineHeight),
      '--font-label-1-ascender-height': px(theme.font.label.sizes[1].ascenderHeight),
      '--font-label-1-descender-height': px(theme.font.label.sizes[1].descenderHeight),
      '--font-label-1-letter-spacing': px(theme.font.label.sizes[1].letterSpacing),
      '--font-label-1-icon-size': px(theme.font.label.sizes[1].iconSize),
      '--font-label-2-size': rem(theme.font.label.sizes[2].fontSize),
      '--font-label-2-line-height': rem(theme.font.label.sizes[2].lineHeight),
      '--font-label-2-ascender-height': px(theme.font.label.sizes[2].ascenderHeight),
      '--font-label-2-descender-height': px(theme.font.label.sizes[2].descenderHeight),
      '--font-label-2-letter-spacing': px(theme.font.label.sizes[2].letterSpacing),
      '--font-label-2-icon-size': px(theme.font.label.sizes[2].iconSize),
      '--font-label-3-size': rem(theme.font.label.sizes[3].fontSize),
      '--font-label-3-line-height': rem(theme.font.label.sizes[3].lineHeight),
      '--font-label-3-ascender-height': px(theme.font.label.sizes[3].ascenderHeight),
      '--font-label-3-descender-height': px(theme.font.label.sizes[3].descenderHeight),
      '--font-label-3-letter-spacing': px(theme.font.label.sizes[3].letterSpacing),
      '--font-label-3-icon-size': px(theme.font.label.sizes[3].iconSize),
      '--font-label-4-size': rem(theme.font.label.sizes[4].fontSize),
      '--font-label-4-line-height': rem(theme.font.label.sizes[4].lineHeight),
      '--font-label-4-ascender-height': px(theme.font.label.sizes[4].ascenderHeight),
      '--font-label-4-descender-height': px(theme.font.label.sizes[4].descenderHeight),
      '--font-label-4-letter-spacing': px(theme.font.label.sizes[4].letterSpacing),
      '--font-label-4-icon-size': px(theme.font.label.sizes[4].iconSize),
      '--font-label-5-size': rem(theme.font.label.sizes[5].fontSize),
      '--font-label-5-line-height': rem(theme.font.label.sizes[5].lineHeight),
      '--font-label-5-ascender-height': px(theme.font.label.sizes[5].ascenderHeight),
      '--font-label-5-descender-height': px(theme.font.label.sizes[5].descenderHeight),
      '--font-label-5-letter-spacing': px(theme.font.label.sizes[5].letterSpacing),
      '--font-label-5-icon-size': px(theme.font.label.sizes[5].iconSize),

      '--font-text-family': theme.font.text.family,
      '--font-text-weight-regular': `${theme.font.text.weights.regular}`,
      '--font-text-weight-medium': `${theme.font.text.weights.medium}`,
      '--font-text-weight-semibold': `${theme.font.text.weights.semibold}`,
      '--font-text-weight-bold': `${theme.font.text.weights.bold}`,
      '--font-text-0-size': rem(theme.font.text.sizes[0].fontSize),
      '--font-text-0-line-height': rem(theme.font.text.sizes[0].lineHeight),
      '--font-text-0-ascender-height': px(theme.font.text.sizes[0].ascenderHeight),
      '--font-text-0-descender-height': px(theme.font.text.sizes[0].descenderHeight),
      '--font-text-0-letter-spacing': px(theme.font.text.sizes[0].letterSpacing),
      '--font-text-0-icon-size': px(theme.font.text.sizes[0].iconSize),
      '--font-text-1-size': rem(theme.font.text.sizes[1].fontSize),
      '--font-text-1-line-height': rem(theme.font.text.sizes[1].lineHeight),
      '--font-text-1-ascender-height': px(theme.font.text.sizes[1].ascenderHeight),
      '--font-text-1-descender-height': px(theme.font.text.sizes[1].descenderHeight),
      '--font-text-1-letter-spacing': px(theme.font.text.sizes[1].letterSpacing),
      '--font-text-1-icon-size': px(theme.font.text.sizes[1].iconSize),
      '--font-text-2-size': rem(theme.font.text.sizes[2].fontSize),
      '--font-text-2-line-height': rem(theme.font.text.sizes[2].lineHeight),
      '--font-text-2-ascender-height': px(theme.font.text.sizes[2].ascenderHeight),
      '--font-text-2-descender-height': px(theme.font.text.sizes[2].descenderHeight),
      '--font-text-2-letter-spacing': px(theme.font.text.sizes[2].letterSpacing),
      '--font-text-2-icon-size': px(theme.font.text.sizes[2].iconSize),
      '--font-text-3-size': rem(theme.font.text.sizes[3].fontSize),
      '--font-text-3-line-height': rem(theme.font.text.sizes[3].lineHeight),
      '--font-text-3-ascender-height': px(theme.font.text.sizes[3].ascenderHeight),
      '--font-text-3-descender-height': px(theme.font.text.sizes[3].descenderHeight),
      '--font-text-3-letter-spacing': px(theme.font.text.sizes[3].letterSpacing),
      '--font-text-3-icon-size': px(theme.font.text.sizes[3].iconSize),
      '--font-text-4-size': rem(theme.font.text.sizes[4].fontSize),
      '--font-text-4-line-height': rem(theme.font.text.sizes[4].lineHeight),
      '--font-text-4-ascender-height': px(theme.font.text.sizes[4].ascenderHeight),
      '--font-text-4-descender-height': px(theme.font.text.sizes[4].descenderHeight),
      '--font-text-4-letter-spacing': px(theme.font.text.sizes[4].letterSpacing),
      '--font-text-4-icon-size': px(theme.font.text.sizes[4].iconSize),

      '--input-border-width': px(theme.input.border.width),
      '--input-checkbox-focus-ring-offset': px(theme.input.checkbox.focusRing.offset),
      '--input-checkbox-focus-ring-width': px(theme.input.checkbox.focusRing.width),
      '--input-checkbox-size': px(theme.input.checkbox.size),
      '--input-radio-focus-ring-offset': px(theme.input.radio.focusRing.offset),
      '--input-radio-focus-ring-width': px(theme.input.radio.focusRing.width),
      '--input-radio-mark-size': px(theme.input.radio.markSize),
      '--input-radio-size': px(theme.input.radio.size),
      '--input-select-focus-ring-offset': px(theme.input.select.focusRing.offset),
      '--input-select-focus-ring-width': px(theme.input.select.focusRing.width),
      '--input-switch-focus-ring-offset': px(theme.input.switch.focusRing.offset),
      '--input-switch-focus-ring-width': px(theme.input.switch.focusRing.width),
      '--input-switch-width': px(theme.input.switch.width),
      '--input-switch-height': px(theme.input.switch.height),
      '--input-switch-padding': px(theme.input.switch.padding),
      '--input-switch-transition-duration-ms': px(theme.input.switch.transitionDurationMs),
      '--input-switch-transition-timing-function': theme.input.switch.transitionTimingFunction,
      '--input-text-focus-ring-offset': px(theme.input.text.focusRing.offset),
      '--input-text-focus-ring-width': px(theme.input.text.focusRing.width),

      '--container-0': px(theme.container[0]),
      '--container-1': px(theme.container[1]),
      '--container-2': px(theme.container[2]),
      '--container-3': px(theme.container[3]),
      '--container-4': px(theme.container[4]),
      '--container-5': px(theme.container[5]),

      '--radius-0': px(theme.radius[0]),
      '--radius-1': px(theme.radius[1]),
      '--radius-2': px(theme.radius[2]),
      '--radius-3': px(theme.radius[3]),
      '--radius-4': px(theme.radius[4]),
      '--radius-5': px(theme.radius[5]),
      '--radius-6': px(theme.radius[6]),

      [varNames.space[0]]: rem(theme.space[0]),
      [varNames.space[0.5]]: `calc(${rem(theme.space[1])} / 2)`,
      [varNames.space[1]]: rem(theme.space[1]),
      [varNames.space[2]]: rem(theme.space[2]),
      [varNames.space[3]]: rem(theme.space[3]),
      [varNames.space[4]]: rem(theme.space[4]),
      [varNames.space[5]]: rem(theme.space[5]),
      [varNames.space[6]]: rem(theme.space[6]),
      [varNames.space[7]]: rem(theme.space[7]),
      [varNames.space[8]]: rem(theme.space[8]),
      [varNames.space[9]]: rem(theme.space[9]),

      '--shadow-0-umbra': toBoxShadow(theme.shadow[0]?.umbra), //`${theme.shadow[0]?.umbra || 'none'}`,
      '--shadow-0-penumbra': toBoxShadow(theme.shadow[0]?.penumbra),
      '--shadow-0-ambient': toBoxShadow(theme.shadow[0]?.ambient),
      '--shadow-1-umbra': toBoxShadow(theme.shadow[1]?.umbra),
      '--shadow-1-penumbra': toBoxShadow(theme.shadow[1]?.penumbra),
      '--shadow-1-ambient': toBoxShadow(theme.shadow[1]?.ambient),
      '--shadow-2-umbra': toBoxShadow(theme.shadow[2]?.umbra),
      '--shadow-2-penumbra': toBoxShadow(theme.shadow[2]?.penumbra),
      '--shadow-2-ambient': toBoxShadow(theme.shadow[2]?.ambient),
      '--shadow-3-umbra': toBoxShadow(theme.shadow[3]?.umbra),
      '--shadow-3-penumbra': toBoxShadow(theme.shadow[3]?.penumbra),
      '--shadow-3-ambient': toBoxShadow(theme.shadow[3]?.ambient),
      '--shadow-4-umbra': toBoxShadow(theme.shadow[4]?.umbra),
      '--shadow-4-penumbra': toBoxShadow(theme.shadow[4]?.penumbra),
      '--shadow-4-ambient': toBoxShadow(theme.shadow[4]?.ambient),
      '--shadow-5-umbra': toBoxShadow(theme.shadow[5]?.umbra),
      '--shadow-5-penumbra': toBoxShadow(theme.shadow[5]?.penumbra),
      '--shadow-5-ambient': toBoxShadow(theme.shadow[5]?.ambient),
      ...Object.fromEntries(
        getThemeEntries(theme.color as unknown as Record<string, string>, ['color']),
      ),
    }),
    compileCardCss({scheme: 'dark', tone: 'transparent'}),
    compileCardCss({scheme: 'dark', tone: 'default'}),
    compileCardCss({scheme: 'dark', tone: 'primary'}),
    compileCardCss({scheme: 'dark', tone: 'positive'}),
    compileCardCss({scheme: 'dark', tone: 'caution'}),
    compileCardCss({scheme: 'dark', tone: 'critical'}),
    compileCardCss({scheme: 'light', tone: 'transparent'}),
    compileCardCss({scheme: 'light', tone: 'default'}),
    compileCardCss({scheme: 'light', tone: 'primary'}),
    compileCardCss({scheme: 'light', tone: 'positive'}),
    compileCardCss({scheme: 'light', tone: 'caution'}),
    compileCardCss({scheme: 'light', tone: 'critical'}),
  ].join('\n\n')
}

function compileCardCss(props: {scheme: Scheme; tone: CardTone}) {
  const {scheme, tone} = props

  const cardVars = vars.color[scheme][tone]

  return compileRule(`.card[data-scheme="${scheme}"][data-tone="${tone}"]`, {
    '--color-accent-fg': cardVars.accent.fg,

    ...THEME_COLOR_AVATAR_COLORS.reduce((acc, color) => {
      return {
        ...acc,
        [`--color-avatar-${color}-bg`]: cardVars.avatar[color].bg,
        [`--color-avatar-${color}-fg`]: cardVars.avatar[color].fg,
      }
    }, {} as Properties),

    '--color-backdrop': cardVars.backdrop,
    ...THEME_COLOR_STATE_TONES.reduce((acc, tone) => {
      return {
        ...acc,
        [`--color-badge-${tone}-bg`]: cardVars.badge[tone].bg,
        [`--color-badge-${tone}-dot`]: cardVars.badge[tone].dot,
        [`--color-badge-${tone}-fg`]: cardVars.badge[tone].fg,
        [`--color-badge-${tone}-icon`]: cardVars.badge[tone].icon,
      }
    }, {} as Properties),

    '--color-bg': cardVars.bg,
    '--color-border': cardVars.border,
    // todo: button
    '--color-code-bg': cardVars.code.bg,
    '--color-code-fg': cardVars.code.fg,
    '--color-fg': cardVars.fg,
    '--color-focus-ring': cardVars.focusRing,
    '--color-icon': cardVars.icon,

    '--color-input-default-enabled-bg': cardVars.input.default.enabled.bg,
    '--color-input-default-enabled-border': cardVars.input.default.enabled.border,
    '--color-input-default-enabled-fg': cardVars.input.default.enabled.fg,
    '--color-input-default-enabled-muted-bg': cardVars.input.default.enabled.muted.bg,
    '--color-input-default-enabled-placeholder': cardVars.input.default.enabled.placeholder,
    '--color-input-default-hovered-bg': cardVars.input.default.hovered.bg,
    '--color-input-default-hovered-border': cardVars.input.default.hovered.border,
    '--color-input-default-hovered-fg': cardVars.input.default.hovered.fg,
    '--color-input-default-hovered-muted-bg': cardVars.input.default.hovered.muted.bg,
    '--color-input-default-hovered-placeholder': cardVars.input.default.hovered.placeholder,
    '--color-input-default-readOnly-bg': cardVars.input.default.readOnly.bg,
    '--color-input-default-readOnly-border': cardVars.input.default.readOnly.border,
    '--color-input-default-readOnly-fg': cardVars.input.default.readOnly.fg,
    '--color-input-default-readOnly-muted-bg': cardVars.input.default.readOnly.muted.bg,
    '--color-input-default-readOnly-placeholder': cardVars.input.default.readOnly.placeholder,
    '--color-input-default-disabled-bg': cardVars.input.default.disabled.bg,
    '--color-input-default-disabled-border': cardVars.input.default.disabled.border,
    '--color-input-default-disabled-fg': cardVars.input.default.disabled.fg,
    '--color-input-default-disabled-muted-bg': cardVars.input.default.disabled.muted.bg,
    '--color-input-default-disabled-placeholder': cardVars.input.default.disabled.placeholder,

    '--color-input-invalid-enabled-bg': cardVars.input.invalid.enabled.bg,
    '--color-input-invalid-enabled-border': cardVars.input.invalid.enabled.border,
    '--color-input-invalid-enabled-fg': cardVars.input.invalid.enabled.fg,
    '--color-input-invalid-enabled-muted-bg': cardVars.input.invalid.enabled.muted.bg,
    '--color-input-invalid-enabled-placeholder': cardVars.input.invalid.enabled.placeholder,
    '--color-input-invalid-hovered-bg': cardVars.input.invalid.hovered.bg,
    '--color-input-invalid-hovered-border': cardVars.input.invalid.hovered.border,
    '--color-input-invalid-hovered-fg': cardVars.input.invalid.hovered.fg,
    '--color-input-invalid-hovered-muted-bg': cardVars.input.invalid.hovered.muted.bg,
    '--color-input-invalid-hovered-placeholder': cardVars.input.invalid.hovered.placeholder,
    '--color-input-invalid-readOnly-bg': cardVars.input.invalid.readOnly.bg,
    '--color-input-invalid-readOnly-border': cardVars.input.invalid.readOnly.border,
    '--color-input-invalid-readOnly-fg': cardVars.input.invalid.readOnly.fg,
    '--color-input-invalid-readOnly-muted-bg': cardVars.input.invalid.readOnly.muted.bg,
    '--color-input-invalid-readOnly-placeholder': cardVars.input.invalid.readOnly.placeholder,
    '--color-input-invalid-disabled-bg': cardVars.input.invalid.disabled.bg,
    '--color-input-invalid-disabled-border': cardVars.input.invalid.disabled.border,
    '--color-input-invalid-disabled-fg': cardVars.input.invalid.disabled.fg,
    '--color-input-invalid-disabled-muted-bg': cardVars.input.invalid.disabled.muted.bg,
    '--color-input-invalid-disabled-placeholder': cardVars.input.invalid.disabled.placeholder,

    '--color-kbd-bg': cardVars.kbd.bg,
    '--color-kbd-border': cardVars.kbd.border,
    '--color-kbd-fg': cardVars.kbd.fg,
    '--color-link-fg': cardVars.link.fg,
    '--color-muted-bg': cardVars.muted.bg,
    '--color-muted-fg': cardVars.muted.fg,
    // todo: selectable
    '--color-shadow-outline': cardVars.shadow.outline,
    '--color-shadow-umbra': cardVars.shadow.umbra,
    '--color-shadow-penumbra': cardVars.shadow.penumbra,
    '--color-shadow-ambient': cardVars.shadow.outline,
    '--color-skeleton-from': cardVars.skeleton.from,
    '--color-skeleton-to': cardVars.skeleton.to,
    // todo: syntax
    '--color-syntax-atrule': cardVars.syntax.atrule,
    '--color-syntax-attrName': cardVars.syntax.attrName,
    '--color-syntax-attrValue': cardVars.syntax.attrValue,
    '--color-syntax-attribute': cardVars.syntax.attribute,
    '--color-syntax-boolean': cardVars.syntax.boolean,
    '--color-syntax-builtin': cardVars.syntax.builtin,
    '--color-syntax-cdata': cardVars.syntax.cdata,
    '--color-syntax-char': cardVars.syntax.char,
    '--color-syntax-class': cardVars.syntax.class,
    '--color-syntax-className': cardVars.syntax.className,
    '--color-syntax-comment': cardVars.syntax.comment,
    '--color-syntax-constant': cardVars.syntax.constant,
    '--color-syntax-deleted': cardVars.syntax.deleted,
    '--color-syntax-doctype': cardVars.syntax.doctype,
    '--color-syntax-entity': cardVars.syntax.entity,
    '--color-syntax-function': cardVars.syntax.function,
    '--color-syntax-hexcode': cardVars.syntax.hexcode,
    '--color-syntax-id': cardVars.syntax.id,
    '--color-syntax-important': cardVars.syntax.important,
    '--color-syntax-inserted': cardVars.syntax.inserted,
    '--color-syntax-keyword': cardVars.syntax.keyword,
    '--color-syntax-number': cardVars.syntax.number,
    '--color-syntax-operator': cardVars.syntax.operator,
    '--color-syntax-prolog': cardVars.syntax.prolog,
    '--color-syntax-property': cardVars.syntax.property,
    '--color-syntax-pseudoClass': cardVars.syntax.pseudoClass,
    '--color-syntax-pseudoElement': cardVars.syntax.pseudoElement,
    '--color-syntax-punctuation': cardVars.syntax.punctuation,
    '--color-syntax-regex': cardVars.syntax.regex,
    '--color-syntax-selector': cardVars.syntax.selector,
    '--color-syntax-string': cardVars.syntax.string,
    '--color-syntax-symbol': cardVars.syntax.symbol,
    '--color-syntax-tag': cardVars.syntax.tag,
    '--color-syntax-unit': cardVars.syntax.unit,
    '--color-syntax-url': cardVars.syntax.url,
    '--color-syntax-variable': cardVars.syntax.variable,
  })
}

function getThemeEntries(
  obj: Record<string, unknown> | unknown[],
  path: string[] = [],
): [string, string][] {
  const entries: [string, string][] = []

  if (isArray(obj)) {
    for (let i = 0; i < obj.length; i++) {
      const key = String(i)
      const value = obj[i]

      if (isRecord(value) || isArray(value)) {
        entries.push(...getThemeEntries(value, [...path, key]))
      } else {
        entries.push([`--${path.concat(key).join('-')}`, value as string])
      }
    }
  } else {
    for (const [key, value] of Object.entries(obj)) {
      if (key.startsWith('_')) continue

      if (key === 'button') {
        continue
      }

      if (key === 'selectable') {
        continue
      }

      if (isRecord(value) || isArray(value)) {
        entries.push(...getThemeEntries(value, [...path, key]))
      } else {
        entries.push([`--${path.concat(key).join('-')}`, value as string])
      }
    }
  }

  return entries
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return value !== null && typeof value === 'object' && !Array.isArray(value)
}

function isArray(value: unknown): value is unknown[] {
  return Array.isArray(value)
}
