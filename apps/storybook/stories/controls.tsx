import {Icon, icons, type IconSymbol} from '@sanity/icons'
import {buildTheme, ThemeFontKey} from '@sanity/ui/theme'

const theme = buildTheme()

// The entries in the v5 `icons` map are `React.lazy` components that suspend
// on first render, and stories don't render a `Suspense` boundary. Map each
// option to the dynamic `Icon` component instead, which wraps the lazy icon
// in its own `Suspense` boundary (with an svg-shell fallback).
const iconOptions = Object.fromEntries(
  // oxlint-disable-next-line no-unsafe-type-assertion -- Object.keys() widens to string[]
  (Object.keys(icons) as IconSymbol[]).map((symbol) => [symbol, () => <Icon symbol={symbol} />]),
)

export const getAlignControls = () => {
  return {
    control: {type: 'radio'},
    options: ['left', 'center', 'right', 'initial'],
  } as const
}

export const getAvatarSizeControls = () => {
  // oxlint-disable-next-line no-deprecated
  const numSizes = theme.avatar.sizes.length

  return {
    control: {type: 'number', min: 0, max: numSizes - 1},
    options: [...Array(numSizes).keys()],
  } as const
}

export const getButtonWidthControls = () => {
  return {
    control: {type: 'select'},
    options: ['(none)', 'fill'],
    mapping: {
      '(none)': '',
      'fill': 'fill',
    },
  } as const
}

export const getContainerWidthControls = () => {
  // oxlint-disable-next-line no-deprecated
  const numContainerSizes = theme.container.length

  return {
    control: {type: 'number', min: 0, max: numContainerSizes - 1},
    options: [...Array(numContainerSizes).keys()],
  } as const
}

export const getDirectionControls = () => {
  return {
    control: {type: 'radio'},
    options: ['row', 'column', 'row-reverse', 'column-reverse'],
  } as const
}

export const getFlexAlignControls = () => {
  return {
    control: {type: 'radio'},
    options: ['flex-start', 'flex-end', 'center', 'baseline', 'stretch'],
  } as const
}

export const getFontSizeControls = (themeFontKey: ThemeFontKey) => {
  // oxlint-disable-next-line no-deprecated
  const numSizes = theme.fonts[themeFontKey].sizes.length

  return {
    control: {type: 'number', min: 0, max: numSizes - 1},
    options: [...Array(numSizes).keys()],
  } as const
}

export const getHeightControls = () => {
  return {
    control: {type: 'radio'},
    options: ['fill', 'stretch'],
  } as const
}

export const getPositionControls = () => {
  return {
    control: {type: 'radio'},
    options: ['fixed', 'absolute'],
  } as const
}

export const getIconControls = () => {
  return {
    control: {type: 'select'},
    mapping: {
      '(none)': '',
      ...iconOptions,
    },
    options: ['(none)', ...Object.keys(iconOptions)],
  } as const
}

export const getOverflowControls = () => {
  return {
    control: {type: 'radio'},
    options: ['visible', 'hidden', 'auto'],
  } as const
}

export const getRadiusControls = () => {
  // oxlint-disable-next-line no-deprecated
  const numRadiusSizes = theme.radius.length

  return {
    control: {type: 'select'},
    options: [...Array(numRadiusSizes).keys(), 'full'],
  } as const
}

export const getShadowControls = () => {
  // oxlint-disable-next-line no-deprecated
  const numShadowSizes = theme.shadows.length

  return {
    control: {type: 'number', min: 0, max: numShadowSizes - 1},
    options: [...Array(numShadowSizes).keys()],
  } as const
}

export const getSpaceControls = () => {
  // oxlint-disable-next-line no-deprecated
  const numSpaceSizes = theme.space.length

  return {
    control: {type: 'number', min: 0, max: numSpaceSizes - 1},
    options: [...Array(numSpaceSizes).keys()],
  } as const
}

export const getTextOverflowControls = () => {
  return {
    control: 'radio',
    mapping: {
      '(none)': '',
      'ellipsis': 'ellipsis',
    },
    options: ['(none)', 'ellipsis'],
  } as const
}
