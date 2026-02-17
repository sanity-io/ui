import {_fromEntries} from '../_fromEntries'
import {_px} from '../_px'
import type {TokenCollection} from '../types'
import type {SanityFontStyleToken} from './schema'
import type {
  FontCodeSize,
  FontHeadingSize,
  FontLabelSize,
  FontTextSize,
  SanityFontToken,
} from './types'

export const FONT_NAMESPACE = 'font'

export interface FontCollectionTokens {
  [FONT_NAMESPACE]: {
    code: SanityFontToken<FontCodeSize>
    heading: SanityFontToken<FontHeadingSize>
    label: SanityFontToken<FontLabelSize>
    text: SanityFontToken<FontTextSize>
  }
}

export type FontCollection = TokenCollection<typeof FONT_NAMESPACE, 'default', FontCollectionTokens>

export const fontCollection: FontCollection = {
  namespace: FONT_NAMESPACE,
  title: 'Font',
  modes: {
    default: {
      [FONT_NAMESPACE]: {
        code: {
          family: {
            $type: 'fontFamily',
            $value: [
              'ui-monospace',
              'SFMono-Regular',
              'SF Mono',
              'Menlo',
              'Consolas',
              'Liberation Mono',
              'monospace',
            ],
            $extensions: {
              'io.sanity': {
                figma: {value: 'SF Mono'},
                textBoxEdge: 'cap-height',
              },
            },
          },
          featureSettings: {
            $type: 'string',
            $value: '',
          },
          scale: {
            0: fontStyleToken({
              fontFamily: 'code',
              ascenderHeight: 4,
              descenderHeight: 5,
              fontSize: 10,
              iconSize: 17,
              lineHeight: 15,
              letterSpacing: 0,
              customIconSize: 12,
            }),
            1: fontStyleToken({
              fontFamily: 'code',
              ascenderHeight: 5,
              descenderHeight: 5,
              fontSize: 13,
              iconSize: 21,
              lineHeight: 19,
              letterSpacing: 0,
              customIconSize: 16,
            }),
            2: fontStyleToken({
              fontFamily: 'code',
              ascenderHeight: 6,
              descenderHeight: 6,
              fontSize: 16,
              iconSize: 25,
              lineHeight: 23,
              letterSpacing: 0,
              customIconSize: 20,
            }),
            3: fontStyleToken({
              fontFamily: 'code',
              ascenderHeight: 7,
              descenderHeight: 7,
              fontSize: 18.75,
              iconSize: 29,
              lineHeight: 27,
              letterSpacing: 0,
              customIconSize: 24,
            }),
            4: fontStyleToken({
              fontFamily: 'code',
              ascenderHeight: 8,
              descenderHeight: 8,
              fontSize: 21.5,
              iconSize: 33,
              lineHeight: 31,
              letterSpacing: 0,
              customIconSize: 28,
            }),
          },
          weight: {
            regular: {
              $type: 'fontWeight',
              $value: '400',
              $extensions: {'io.sanity': {figma: {value: 'Regular'}}},
            },
            medium: {
              $type: 'fontWeight',
              $value: '500',
              $extensions: {'io.sanity': {figma: {value: 'Medium'}}},
            },
            semibold: {
              $type: 'fontWeight',
              $value: '600',
              $extensions: {'io.sanity': {figma: {value: 'Semibold'}}},
            },
            bold: {
              $type: 'fontWeight',
              $value: '700',
              $extensions: {'io.sanity': {figma: {value: 'Bold'}}},
            },
          },
        },
        heading: {
          family: {
            $type: 'fontFamily',
            $value: [
              'Inter',
              '-apple-system',
              'BlinkMacSystemFont',
              '"Segoe UI"',
              'Roboto',
              '"Helvetica Neue"',
              '"Liberation Sans"',
            ],
            $extensions: {
              'io.sanity': {
                figma: {value: 'Inter Variable'},
                textBoxEdge: 'cap-height',
              },
            },
          },
          featureSettings: {
            $type: 'string',
            // liga = ?
            // card = Contextual alternates
            // ss01 = Alternate digits
            // ss03 = Round quotes & comma
            // zero = Slashed zero
            $value: `'liga' 1, 'calt' 1, 'ss01' 1, 'ss03' 1, 'zero' 1`,
          },
          scale: {
            0: fontStyleToken({
              fontFamily: 'heading',
              ascenderHeight: 4,
              descenderHeight: 4,
              fontSize: 10,
              iconSize: 17,
              lineHeight: 15,
              letterSpacing: 0,
              customIconSize: 12,
            }),
            1: fontStyleToken({
              fontFamily: 'heading',
              ascenderHeight: 5,
              descenderHeight: 5,
              fontSize: 13,
              iconSize: 21,
              lineHeight: 19,
              letterSpacing: 0,
              customIconSize: 16,
            }),
            2: fontStyleToken({
              fontFamily: 'heading',
              ascenderHeight: 6,
              descenderHeight: 6,
              fontSize: 16,
              iconSize: 25,
              lineHeight: 23,
              letterSpacing: 0,
              customIconSize: 20,
            }),
            3: fontStyleToken({
              fontFamily: 'heading',
              ascenderHeight: 7,
              descenderHeight: 7,
              fontSize: 18.75,
              iconSize: 29,
              lineHeight: 27,
              letterSpacing: 0,
              customIconSize: 24,
            }),
            4: fontStyleToken({
              fontFamily: 'heading',
              ascenderHeight: 8,
              descenderHeight: 8,
              fontSize: 21.5,
              iconSize: 33,
              lineHeight: 31,
              letterSpacing: 0,
              customIconSize: 28,
            }),
            5: fontStyleToken({
              fontFamily: 'heading',
              ascenderHeight: 9.5,
              descenderHeight: 8.5,
              fontSize: 24.25,
              iconSize: 37,
              lineHeight: 35,
              letterSpacing: 0,
              customIconSize: 32,
            }),
          },
          weight: {
            regular: {
              $type: 'fontWeight',
              $value: 400,
              $extensions: {'io.sanity': {figma: {value: 'Regular'}}},
            },
            medium: {
              $type: 'fontWeight',
              $value: 500,
              $extensions: {'io.sanity': {figma: {value: 'Medium'}}},
            },
            semibold: {
              $type: 'fontWeight',
              $value: 600,
              $extensions: {'io.sanity': {figma: {value: 'SemiBold'}}},
            },
            bold: {
              $type: 'fontWeight',
              $value: 700,
              $extensions: {'io.sanity': {figma: {value: 'Bold'}}},
            },
          },
        },
        label: {
          family: {
            $type: 'fontFamily',
            $value: [
              'Inter',
              '-apple-system',
              'BlinkMacSystemFont',
              '"Segoe UI"',
              'Roboto',
              '"Helvetica Neue"',
              '"Liberation Sans"',
            ],
            $extensions: {
              'io.sanity': {
                figma: {value: 'Inter Variable'},
                textBoxEdge: 'cap-height',
              },
            },
          },
          featureSettings: {
            $type: 'string',
            $value: '',
          },
          scale: {
            0: fontStyleToken({
              fontFamily: 'label',
              ascenderHeight: 2,
              descenderHeight: 2,
              fontSize: 8.1,
              iconSize: 13,
              lineHeight: 10,
              letterSpacing: 0.5,
              customIconSize: 8,
            }),
            1: fontStyleToken({
              fontFamily: 'label',
              ascenderHeight: 1.5,
              descenderHeight: 2.5,
              fontSize: 9.5,
              iconSize: 15,
              lineHeight: 11,
              letterSpacing: 0.5,
              customIconSize: 10,
            }),
            2: fontStyleToken({
              fontFamily: 'label',
              ascenderHeight: 2,
              descenderHeight: 2,
              fontSize: 10.8,
              iconSize: 17,
              lineHeight: 12,
              letterSpacing: 0.5,
              customIconSize: 12,
            }),
            3: fontStyleToken({
              fontFamily: 'label',
              ascenderHeight: 2,
              descenderHeight: 2,
              fontSize: 12.25,
              iconSize: 19,
              lineHeight: 13,
              letterSpacing: 0.5,
              customIconSize: 14,
            }),
            4: fontStyleToken({
              fontFamily: 'label',
              ascenderHeight: 1.5,
              descenderHeight: 2.5,
              fontSize: 13.6,
              iconSize: 21,
              lineHeight: 14,
              letterSpacing: 0.5,
              customIconSize: 16,
            }),
            5: fontStyleToken({
              fontFamily: 'label',
              ascenderHeight: 2,
              descenderHeight: 2,
              fontSize: 15,
              iconSize: 23,
              lineHeight: 15,
              letterSpacing: 0.5,
              customIconSize: 18,
            }),
          },
          weight: {
            regular: {
              $type: 'fontWeight',
              $value: 400,
              $extensions: {'io.sanity': {figma: {value: 'Regular'}}},
            },
            medium: {
              $type: 'fontWeight',
              $value: 500,
              $extensions: {'io.sanity': {figma: {value: 'Medium'}}},
            },
            semibold: {
              $type: 'fontWeight',
              $value: 600,
              $extensions: {'io.sanity': {figma: {value: 'SemiBold'}}},
            },
            bold: {
              $type: 'fontWeight',
              $value: 700,
              $extensions: {'io.sanity': {figma: {value: 'Bold'}}},
            },
          },
        },
        text: {
          family: {
            $type: 'fontFamily',
            $value: [
              'Inter',
              '-apple-system',
              'BlinkMacSystemFont',
              '"Segoe UI"',
              'Roboto',
              '"Helvetica Neue"',
              '"Liberation Sans"',
            ],
            $extensions: {
              'io.sanity': {
                figma: {value: 'Inter Variable'},
                textBoxEdge: 'cap-height',
              },
            },
          },
          featureSettings: {
            $type: 'string',
            $value: '',
          },
          scale: {
            0: fontStyleToken({
              fontFamily: 'text',
              ascenderHeight: 4,
              descenderHeight: 4,
              fontSize: 10,
              iconSize: 17,
              lineHeight: 15,
              letterSpacing: 0,
              customIconSize: 12,
            }),
            1: fontStyleToken({
              fontFamily: 'text',
              ascenderHeight: 5,
              descenderHeight: 5,
              fontSize: 13,
              iconSize: 21,
              lineHeight: 19,
              letterSpacing: 0,
              customIconSize: 16,
            }),
            2: fontStyleToken({
              fontFamily: 'text',
              ascenderHeight: 6,
              descenderHeight: 6,
              fontSize: 16,
              iconSize: 25,
              lineHeight: 23,
              letterSpacing: 0,
              customIconSize: 20,
            }),
            3: fontStyleToken({
              fontFamily: 'text',
              ascenderHeight: 7,
              descenderHeight: 7,
              fontSize: 18.75,
              iconSize: 29,
              lineHeight: 27,
              letterSpacing: 0,
              customIconSize: 24,
            }),
            4: fontStyleToken({
              fontFamily: 'text',
              ascenderHeight: 8,
              descenderHeight: 8,
              fontSize: 21.5,
              iconSize: 33,
              lineHeight: 31,
              letterSpacing: 0,
              customIconSize: 28,
            }),
          },
          weight: {
            regular: {
              $type: 'fontWeight',
              $value: 400,
              $extensions: {'io.sanity': {figma: {value: 'Regular'}}},
            },
            medium: {
              $type: 'fontWeight',
              $value: 500,
              $extensions: {'io.sanity': {figma: {value: 'Medium'}}},
            },
            semibold: {
              $type: 'fontWeight',
              $value: 600,
              $extensions: {'io.sanity': {figma: {value: 'SemiBold'}}},
            },
            bold: {
              $type: 'fontWeight',
              $value: 700,
              $extensions: {'io.sanity': {figma: {value: 'Bold'}}},
            },
          },
        },
      },
    },
  },
}

function fontStyleToken(options: {
  fontFamily: 'code' | 'heading' | 'label' | 'text'
  fontSize: number
  lineHeight: number
  letterSpacing: number
  ascenderHeight: number
  descenderHeight: number
  iconSize: number
  customIconSize: number
}): SanityFontStyleToken {
  const {
    fontFamily,
    fontSize,
    lineHeight,
    letterSpacing,
    ascenderHeight,
    descenderHeight,
    iconSize,
    customIconSize,
  } = options

  return {
    $type: 'typography',
    $value: {
      fontFamily: `{font.${fontFamily}.family}`,
      fontSize: _px(fontSize).$value,
      fontWeight: `{font.${fontFamily}.weight.regular}`,
      lineHeight: lineHeight / fontSize,
      letterSpacing: {value: letterSpacing, unit: 'px'},
    },
    $extensions: {
      'io.sanity': {
        ascenderHeight: {value: ascenderHeight, unit: 'px'},
        descenderHeight: {value: descenderHeight, unit: 'px'},
        iconSize: {value: iconSize, unit: 'px'},
        customIconSize: {value: customIconSize, unit: 'px'},
        lineHeight: {value: lineHeight, unit: 'px'},
      },
    },
  }
}
