/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import {icons} from '@sanity/icons'
import {buildTheme, ThemeFontKey} from '../src/theme'

const theme = buildTheme()

export const getAlignControls = () => {
  return {
    control: {type: 'radio'},
    options: ['left', 'center', 'right', 'initial'],
  }
}

export const getAvatarSizeControls = () => {
  const numSizes = theme.avatar.sizes.length

  return {
    control: {type: 'number', min: 0, max: numSizes - 1},
    options: [...Array(numSizes).keys()],
  }
}

export const getButtonWidthControls = () => {
  return {
    control: {type: 'select'},
    options: ['(none)', 'fill'],
    mapping: {
      '(none)': '',
      fill: 'fill',
    },
  }
}

export const getContainerWidthControls = () => {
  const numContainerSizes = theme.container.length

  return {
    control: {type: 'number', min: 0, max: numContainerSizes - 1},
    options: [...Array(numContainerSizes).keys()],
  }
}

export const getDirectionControls = () => {
  return {
    control: {type: 'radio'},
    options: ['row', 'column', 'row-reverse', 'column-reverse'],
  }
}

export const getFlexAlignControls = () => {
  return {
    control: {type: 'radio'},
    options: ['flex-start', 'flex-end', 'center', 'baseline', 'stretch'],
  }
}

export const getFontSizeControls = (themeFontKey: ThemeFontKey) => {
  const numSizes = theme.fonts[themeFontKey].sizes.length

  return {
    control: {type: 'number', min: 0, max: numSizes - 1},
    options: [...Array(numSizes).keys()],
  }
}

export const getHeightControls = () => {
  return {
    control: {type: 'radio'},
    options: ['fill', 'stretch'],
  }
}

export const getPositionControls = () => {
  return {
    control: {type: 'radio'},
    options: ['fixed', 'absolute'],
  }
}

export const getIconControls = () => {
  return {
    control: {type: 'select'},
    mapping: {
      '(none)': '',
      ...icons,
    },
    options: ['(none)', ...Object.keys(icons)],
  }
}

export const getOverflowControls = () => {
  return {
    control: {type: 'radio'},
    options: ['visible', 'hidden', 'auto'],
  }
}

export const getRadiusControls = () => {
  const numRadiusSizes = theme.radius.length

  return {
    control: {type: 'select'},
    options: [...Array(numRadiusSizes).keys(), 'full'],
  }
}

export const getShadowControls = () => {
  const numShadowSizes = theme.shadows.length

  return {
    control: {type: 'number', min: 0, max: numShadowSizes - 1},
    options: [...Array(numShadowSizes).keys()],
  }
}

export const getSpaceControls = () => {
  const numSpaceSizes = theme.space.length

  return {
    control: {type: 'number', min: 0, max: numSpaceSizes - 1},
    options: [...Array(numSpaceSizes).keys()],
  }
}

export const getTextOverflowControls = () => {
  return {
    control: 'radio',
    mapping: {
      '(none)': '',
      ellipsis: 'ellipsis',
    },
    options: ['(none)', 'ellipsis'],
  }
}
