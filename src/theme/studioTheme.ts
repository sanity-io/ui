import color from '@sanity/color'
import {Theme} from './types'

export const studioTheme: Theme = {
  color: {
    button: {
      tones: {
        default: {
          enabled: {
            bg: color.gray['500'].hex,
            fg: color.white.hex,
          },
        },
        brand: {
          enabled: {
            bg: color.blue['500'].hex,
            fg: color.white.hex,
          },
        },
      },
    },
  },
  fonts: {
    code: {
      family: '-apple-system-ui-monospace, "SF Mono", Menlo, Monaco, Consolas, monospace',
      sizes: [],
    },
    heading: {
      family:
        'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", sans-serif',
      sizes: [],
    },
    label: {
      family:
        'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", sans-serif',
      sizes: [],
    },
    text: {
      family:
        'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", sans-serif',
      sizes: [
        {
          ascenderHeight: 3,
          descenderHeight: 3,
          fontSize: 10,
          lineHeight: 13,
          letterSpacing: 0,
        },
        {
          ascenderHeight: 4,
          descenderHeight: 4,
          fontSize: 13,
          lineHeight: 17,
          letterSpacing: 0,
        },
        {
          ascenderHeight: 5,
          descenderHeight: 5,
          fontSize: 16,
          lineHeight: 21,
          letterSpacing: 0,
        },
        {
          ascenderHeight: 6,
          descenderHeight: 6,
          fontSize: 19,
          lineHeight: 25,
          letterSpacing: 0,
        },
        {
          ascenderHeight: 7,
          descenderHeight: 7,
          fontSize: 22,
          lineHeight: 29,
          letterSpacing: 0,
        },
      ],
    },
  },
  media: [320, 640, 960, 1280, 1600, 1920],
  space: [0, 4, 8, 12, 20, 32, 52, 84, 136, 220],
}
