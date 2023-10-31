import {ColorTokensResolved, ColorTokens, BaseColorTokens} from '../config'
import {COLOR_BASE_TONES} from '../constants'

export const buildColorTokens = (tokens: ColorTokens): ColorTokensResolved => {
  const baseTokens: Record<(typeof COLOR_BASE_TONES)[number], BaseColorTokens> = {
    default: {
      ...tokens['*'],
      ...tokens['default'],
    },
    transparent: {
      ...tokens['*'],
      ...tokens['transparent'],
    },
    primary: {
      ...tokens['*'],
      ...tokens['primary'],
    },
    positive: {
      ...tokens['*'],
      ...tokens['positive'],
    },
    caution: {
      ...tokens['*'],
      ...tokens['caution'],
    },
    critical: {
      ...tokens['*'],
      ...tokens['critical'],
    },
  }
  const resolved: ColorTokensResolved = {
    ...baseTokens,
    button: {
      default: {
        default: {
          '*': {
            ...baseTokens.default,
            ...tokens.button?.['*']?.['default'],
            ...tokens.button?.['default']?.['default'],
          },
          hovered: {
            ...baseTokens.default,
            ...tokens.button?.['*']?.['default'],
            ...tokens.button?.['*']?.['default']?.['hovered'],
            ...tokens.button?.['default']?.['default']?.['hovered'],
          },
          pressed: {
            ...baseTokens.default,
            ...tokens.button?.['*']?.['default'],
            ...tokens.button?.['*']?.['default']?.['pressed'],
            ...tokens.button?.['default']?.['default']?.['pressed'],
          },
          selected: {
            ...baseTokens.default,
            ...tokens.button?.['*']?.['default'],
            ...tokens.button?.['*']?.['default']?.['selected'],
            ...tokens.button?.['default']?.['default']?.['selected'],
          },
          disabled: {
            ...baseTokens.default,
            ...tokens.button?.['*']?.['default'],
            ...tokens.button?.['*']?.['default']?.['disabled'],
            ...tokens.button?.['default']?.['default']?.['disabled'],
          },
        },
      },
    },
  }
  return resolved
}
