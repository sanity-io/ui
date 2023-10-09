import {cssVars} from '../../theme'
import {getCardCssVariable} from '../../theme/lib/theme/color/cssVariables/card'
import {getToneCssVar} from '../../theme/lib/theme/color/cssVariables/tones'
import {CSSObject} from '../../types/styled'

/**
 * @internal
 * This variables can be changed by other components besides the `Card` component itself.
 */
export const mutableCardVariables = {
  'bg-color': '--card-bg-color',
  'muted-fg-color': '--card-muted-fg-color',
  'icon-color': '--card-icon-color',
  'fg-color': '--card-fg-color',
  'bg-image': '--card-bg-image',
  'accent-color': '--card-accent-fg-color',
} as const

/**
 * @internal
 * This variables can not be changed by other components, they are here for backwards compatibility.
 * Shouldn't be used inside any component in @sanity/ui
 */
const legacyFixedVariables = [
  '--card-shadow-outline-color',
  '--card-shadow-umbra-color',
  '--card-shadow-penumbra-color',
  '--card-shadow-ambient-color',
  '--card-focus-ring-color',
  '--card-link-fg-color',
  '--card-code-bg-color',
  '--card-code-fg-color',
  '--card-skeleton-color-from',
  '--card-skeleton-color-to',
  '--card-link-color',
  '--card-hairline-soft-color',
  '--card-hairline-hard-color',
  '--card-bg2-color',
] as const

const allVariables = [...Object.values(mutableCardVariables), ...legacyFixedVariables] as const

type CardVariable = keyof typeof mutableCardVariables
type VariablesNames = (typeof allVariables)[number]

/**
 * @internal
 * This are the only variables that are exposed, as they can be updated and used by other components.
 */
export const cardCssVariables: Record<CardVariable, string> = Object.keys(
  mutableCardVariables,
).reduce(
  (acc, key) => {
    const item = key as CardVariable

    acc[item] = `var(${mutableCardVariables[item]})`

    return acc
  },
  {} as Record<CardVariable, string>,
)

/**
 * @internal
 */
export function _colorVarsStyle(checkered = false): Record<VariablesNames, string | undefined> {
  return {
    '--card-shadow-outline-color': cssVars.default['base-shadow-outline-color'],
    '--card-shadow-umbra-color': cssVars.default['base-shadow-umbra-color'],
    '--card-shadow-penumbra-color': cssVars.default['base-shadow-penumbra-color'],
    '--card-shadow-ambient-color': cssVars.default['base-shadow-ambient-color'],
    '--card-focus-ring-color': cssVars.positive['bg-accent'],
    '--card-icon-color': cssVars.default['icon-default'],

    // Card
    '--card-bg-color': cssVars.default['bg-base'],

    '--card-bg-image': checkered
      ? `repeating-conic-gradient(${cssVars.default['card-base-bg']} 0% 25%, ${cssVars.default['bg-tint']} 0% 50%)`
      : undefined,

    '--card-fg-color': cssVars.default['text-primary'],

    '--card-muted-fg-color': cssVars.default['text-secondary'],
    '--card-accent-fg-color': cssVars.card['accent-color'],
    '--card-link-fg-color': cssVars.card['link-color'],
    '--card-code-bg-color': cssVars.default['bg-tint-code'],
    '--card-code-fg-color': cssVars.default['text-code'],

    '--card-skeleton-color-from': cssVars.default['skeleton-from'],
    '--card-skeleton-color-to': cssVars.default['skeleton-to'],

    // @todo: deprecate
    '--card-link-color': cssVars.card['link-color'],
    '--card-hairline-soft-color': cssVars.default['border-base'],
    '--card-hairline-hard-color': cssVars.default['border-base'],

    // Card
    '--card-bg2-color': cssVars.default['bg-tint'],
  }
}

/**
 * @internal
 * Card overrides in disabled states
 */
export function _colorVarStyleDisabled(checkered = false): CSSObject {
  return {
    [getCardCssVariable('link-color')]: cssVars.default['text-secondary'],
    [getCardCssVariable('accent-color')]: cssVars.default['text-secondary'],
    [getToneCssVar('default', 'text-code')]: cssVars.default['text-secondary'],
    [getToneCssVar('default', 'text-primary')]: cssVars.default['text-secondary'],

    [mutableCardVariables['fg-color']]: cssVars.primary['text-inactive'],
    [mutableCardVariables['muted-fg-color']]: cssVars.primary['text-inactive'],
    [mutableCardVariables['icon-color']]: cssVars.primary['border-base'],
    [mutableCardVariables['accent-color']]: cssVars.primary['card-base-bg'],
    [mutableCardVariables['bg-color']]: cssVars.primary['bg-tint'],
    [mutableCardVariables['bg-image']]: checkered
      ? `repeating-conic-gradient(${cssVars.default['card-base-bg']} 0% 25%, ${cssVars.default['bg-tint']} 0% 50%)`
      : undefined,
  }
}

export function _colorVarStyleSelected(): CSSObject {
  return {
    [mutableCardVariables['bg-color']]: cssVars.default['bg-accent'],
    [mutableCardVariables['fg-color']]: cssVars.default['bg-base'],
    [mutableCardVariables['muted-fg-color']]: cssVars.default['card-base-bg'],
    [mutableCardVariables['accent-color']]: cssVars.default['card-base-bg'],
  }
}

export function _colorVarStyleHover(): CSSObject {
  return {
    [mutableCardVariables['bg-color']]: cssVars.default['bg-base-hover'],
  }
}

export function _colorVarStyleActive(): CSSObject {
  return {
    [mutableCardVariables['bg-color']]: cssVars.default['bg-base-active'],
  }
}
