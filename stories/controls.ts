/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import {icons} from '@sanity/icons'
import {buildTheme, ThemeFontKey} from '../src/theme'

const theme = buildTheme()

export const getAlignControls = () => {
  return {
    control: {type: 'radio'},
    options: ['left', 'center', 'right', 'initial'],
  } as const
}

export const getAvatarSizeControls = () => {
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
      ...icons,
    },
    options: ['(none)', ...Object.keys(icons)],
  } as const
}

export const getOverflowControls = () => {
  return {
    control: {type: 'radio'},
    options: ['visible', 'hidden', 'auto'],
  } as const
}

export const getRadiusControls = () => {
  const numRadiusSizes = theme.radius.length

  return {
    control: {type: 'select'},
    options: [...Array(numRadiusSizes).keys(), 'full'],
  } as const
}

export const getShadowControls = () => {
  const numShadowSizes = theme.shadows.length

  return {
    control: {type: 'number', min: 0, max: numShadowSizes - 1},
    options: [...Array(numShadowSizes).keys()],
  } as const
}

export const getSpaceControls = () => {
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
