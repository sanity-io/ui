import {color} from '@sanity/color'
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
          hovered: {
            bg: color.gray['600'].hex,
            fg: color.white.hex,
          },
        },
        brand: {
          enabled: {
            bg: color.blue['500'].hex,
            fg: color.white.hex,
          },
          hovered: {
            bg: color.blue['600'].hex,
            fg: color.white.hex,
          },
        },
      },
    },
    card: {
      tones: {
        default: {
          bg: color.white.hex,
          fg: color.black.hex,
        },
        transparent: {
          bg: color.gray['100'].hex,
          fg: color.black.hex,
        },
        contrast: {
          bg: color.black.hex,
          fg: color.white.hex,
        },
      },
    },
  },
  container: [320, 640, 960, 1280, 1600, 1920],
  fonts: {
    code: {
      family: '-apple-system-ui-monospace, "SF Mono", Menlo, Monaco, Consolas, monospace',
      weights: [400],
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
    heading: {
      family:
        'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", sans-serif',
      weights: [600],
      sizes: [
        {
          ascenderHeight: 3,
          descenderHeight: 3,
          fontSize: 10,
          lineHeight: 13,
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
          fontSize: 21,
          lineHeight: 27,
          letterSpacing: 0,
        },
        {
          ascenderHeight: 7,
          descenderHeight: 7,
          fontSize: 27,
          lineHeight: 33,
          letterSpacing: 0,
        },
        {
          ascenderHeight: 11,
          descenderHeight: 11,
          fontSize: 33,
          lineHeight: 45,
          letterSpacing: 0,
        },
      ],
    },
    label: {
      family:
        'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", sans-serif',
      weights: [500],
      sizes: [
        {
          ascenderHeight: 2,
          descenderHeight: 2,
          fontSize: 8.5,
          lineHeight: 10,
          letterSpacing: 0,
        },
        {
          ascenderHeight: 2,
          descenderHeight: 2,
          fontSize: 10,
          lineHeight: 11,
          letterSpacing: 0,
        },
        {
          ascenderHeight: 2,
          descenderHeight: 2,
          fontSize: 11,
          lineHeight: 12,
          letterSpacing: 0,
        },
        {
          ascenderHeight: 3,
          descenderHeight: 3,
          fontSize: 13,
          lineHeight: 15,
          letterSpacing: 0,
        },
        {
          ascenderHeight: 4,
          descenderHeight: 3,
          fontSize: 14,
          lineHeight: 17,
          letterSpacing: 0,
        },
      ],
    },
    text: {
      family:
        'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", sans-serif',
      weights: [400,500,600],
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
  radius: [0, 1, 3, 6, 9, 12, 21],
  space: [0, 4, 8, 12, 20, 32, 52, 84, 136, 220],
}
