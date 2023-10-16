import {tonesCssVariables} from './tones'

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
 * This are the only variables that are exposed, as they can be updated and used by other components.
 */
export const mutableVariables: Record<keyof typeof mutableCardVariables, string> = Object.keys(
  mutableCardVariables,
).reduce(
  (acc, key) => {
    const item = key as keyof typeof mutableCardVariables

    acc[item] = `var(${mutableCardVariables[item]})`

    return acc
  },
  {} as Record<keyof typeof mutableCardVariables, string>,
)

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

type CardCssVariable = (typeof allVariables)[number]

/**
 * @internal
 */
export const cardVariables: Record<CardCssVariable, string> = {
  '--card-shadow-outline-color': tonesCssVariables.default['base-shadow-outline-color'],
  '--card-shadow-umbra-color': tonesCssVariables.default['base-shadow-umbra-color'],
  '--card-shadow-penumbra-color': tonesCssVariables.default['base-shadow-penumbra-color'],
  '--card-shadow-ambient-color': tonesCssVariables.default['base-shadow-ambient-color'],
  '--card-focus-ring-color': tonesCssVariables.positive['bg-accent'],
  '--card-icon-color': tonesCssVariables.default['icon-default'],
  '--card-bg-image': 'inherit',

  // Card
  '--card-bg-color': tonesCssVariables.default['bg-base'],

  '--card-fg-color': tonesCssVariables.default['text-primary'],

  '--card-muted-fg-color': tonesCssVariables.default['text-secondary'],
  '--card-accent-fg-color': tonesCssVariables.default['text-accent'],
  '--card-link-fg-color': tonesCssVariables.default['text-link'],
  '--card-code-bg-color': tonesCssVariables.default['bg-tint'],
  '--card-code-fg-color': tonesCssVariables.default['text-secondary'],

  '--card-skeleton-color-from': tonesCssVariables.default['skeleton-from'],
  '--card-skeleton-color-to': tonesCssVariables.default['skeleton-to'],

  // @todo: deprecate
  '--card-link-color': tonesCssVariables.default['text-link'],
  '--card-hairline-soft-color': tonesCssVariables.default['border-base'],
  '--card-hairline-hard-color': tonesCssVariables.default['border-base'],

  // Card
  '--card-bg2-color': tonesCssVariables.default['bg-tint'],
}
