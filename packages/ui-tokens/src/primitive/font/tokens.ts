import {_defineToken} from '../../lib/_defineToken'
import {_defineTokenGroup} from '../../lib/_defineTokenGroup'
import {_defineTokens} from '../../lib/_defineTokens'
import {_px} from '../../lib/_px'
import type {TokenScale} from '../../lib/types'
import type {
  FontCodeSize,
  FontHeadingSize,
  FontLabelSize,
  FontTextSize,
  FontWeight,
} from '../../types'
import type {SanityTypographyToken} from './lib/types'

/** @public */
export const fontTokens = _defineTokens({
  font: {
    code: {
      family: _defineToken({
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
      }),
      featureSettings: _defineToken({
        $type: 'string',
        $value: '',
      }),
      scale: _defineTokenGroup({
        $type: 'typography',
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
      }) satisfies TokenScale<FontCodeSize, 'typography'>,
      textTransform: _defineToken({
        $type: 'string',
        $value: 'none',
      }),
      weight: _defineTokenGroup({
        $type: 'fontWeight',
        regular: {
          $value: 400,
          $extensions: {'io.sanity': {figma: {value: 'Regular'}}},
        },
        medium: {
          $value: 500,
          $extensions: {'io.sanity': {figma: {value: 'Medium'}}},
        },
        semibold: {
          $value: 600,
          $extensions: {'io.sanity': {figma: {value: 'Semibold'}}},
        },
        bold: {
          $value: 700,
          $extensions: {'io.sanity': {figma: {value: 'Bold'}}},
        },
      }) satisfies TokenScale<FontWeight, 'fontWeight'>,
    },
    heading: {
      family: _defineToken({
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
      }),
      featureSettings: _defineToken({
        $type: 'string',
        $value: `'liga' 1, 'calt' 1, 'ss01' 1, 'ss03' 1, 'zero' 1`,
      }),
      scale: _defineTokenGroup({
        $type: 'typography',
        0: fontStyleToken({
          fontFamily: 'heading',
          ascenderHeight: 5,
          descenderHeight: 5,
          fontSize: 13,
          iconSize: 19,
          lineHeight: 17,
          letterSpacing: 0,
          customIconSize: 14,
        }),
        1: fontStyleToken({
          fontFamily: 'heading',
          ascenderHeight: 6,
          descenderHeight: 6,
          fontSize: 16, // +3
          iconSize: 25,
          lineHeight: 23,
          letterSpacing: 0,
          customIconSize: 20,
        }),
        2: fontStyleToken({
          fontFamily: 'heading',
          ascenderHeight: 7,
          descenderHeight: 7,
          fontSize: 21, // +5
          iconSize: 33,
          lineHeight: 29,
          letterSpacing: 0,
          customIconSize: 28,
        }),
        3: fontStyleToken({
          fontFamily: 'heading',
          ascenderHeight: 8,
          descenderHeight: 8,
          fontSize: 27, // +5
          iconSize: 41,
          lineHeight: 35,
          letterSpacing: 0,
          customIconSize: 36,
        }),
        4: fontStyleToken({
          fontFamily: 'heading',
          ascenderHeight: 9,
          descenderHeight: 9,
          fontSize: 33, // +5
          iconSize: 49,
          lineHeight: 41,
          letterSpacing: -0.5,
          customIconSize: 44,
        }),
        5: fontStyleToken({
          fontFamily: 'heading',
          ascenderHeight: 10,
          descenderHeight: 10,
          fontSize: 38, // +5
          iconSize: 53,
          lineHeight: 47,
          letterSpacing: -1,
          customIconSize: 48,
        }),
        6: fontStyleToken({
          fontFamily: 'heading',
          ascenderHeight: 11,
          descenderHeight: 11,
          fontSize: 48, // +10
          iconSize: 68,
          lineHeight: 54,
          letterSpacing: -2,
          customIconSize: 60,
        }),
        7: fontStyleToken({
          fontFamily: 'heading',
          ascenderHeight: 13,
          descenderHeight: 13,
          fontSize: 63, // +15
          iconSize: 90,
          lineHeight: 70,
          letterSpacing: -3,
          customIconSize: 80,
        }),
        8: fontStyleToken({
          fontFamily: 'heading',
          ascenderHeight: 15,
          descenderHeight: 15,
          fontSize: 84, // +20
          iconSize: 118,
          lineHeight: 90,
          letterSpacing: -4,
          customIconSize: 105,
        }),
        9: fontStyleToken({
          fontFamily: 'heading',
          ascenderHeight: 16,
          descenderHeight: 16,
          fontSize: 112, // +28
          iconSize: 156,
          lineHeight: 113,
          letterSpacing: -4.5,
          customIconSize: 140,
        }),
      }) satisfies TokenScale<FontHeadingSize, 'typography'>,
      textTransform: _defineToken({
        $type: 'string',
        $value: 'none',
      }),
      weight: _defineTokenGroup({
        $type: 'fontWeight',
        regular: {
          $value: 400,
          $extensions: {'io.sanity': {figma: {value: 'Regular'}}},
        },
        medium: {
          $value: 500,
          $extensions: {'io.sanity': {figma: {value: 'Medium'}}},
        },
        semibold: {
          $value: 600,
          $extensions: {'io.sanity': {figma: {value: 'SemiBold'}}},
        },
        bold: {
          $value: 700,
          $extensions: {'io.sanity': {figma: {value: 'Bold'}}},
        },
      }) satisfies TokenScale<FontWeight, 'fontWeight'>,
    },
    label: {
      family: _defineToken({
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
      }),
      featureSettings: _defineToken({
        $type: 'string',
        $value: '',
      }),
      scale: _defineTokenGroup({
        $type: 'typography',
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
      }) satisfies TokenScale<FontLabelSize, 'typography'>,
      textTransform: _defineToken({
        $type: 'string',
        $value: 'uppercase',
      }),
      weight: _defineTokenGroup({
        $type: 'fontWeight',
        regular: {
          $value: 400,
          $extensions: {'io.sanity': {figma: {value: 'Regular'}}},
        },
        medium: {
          $value: 500,
          $extensions: {'io.sanity': {figma: {value: 'Medium'}}},
        },
        semibold: {
          $value: 600,
          $extensions: {'io.sanity': {figma: {value: 'SemiBold'}}},
        },
        bold: {
          $value: 700,
          $extensions: {'io.sanity': {figma: {value: 'Bold'}}},
        },
      }) satisfies TokenScale<FontWeight, 'fontWeight'>,
    },
    text: {
      family: _defineToken({
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
      }),
      featureSettings: _defineToken({
        $type: 'string',
        $value: '',
      }),
      scale: _defineTokenGroup({
        $type: 'typography',
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
      }) satisfies TokenScale<FontTextSize, 'typography'>,
      textTransform: _defineToken({
        $type: 'string',
        $value: 'none',
      }),
      weight: _defineTokenGroup({
        $type: 'fontWeight',
        regular: {
          $value: 400,
          $extensions: {'io.sanity': {figma: {value: 'Regular'}}},
        },
        medium: {
          $value: 500,
          $extensions: {'io.sanity': {figma: {value: 'Medium'}}},
        },
        semibold: {
          $value: 600,
          $extensions: {'io.sanity': {figma: {value: 'SemiBold'}}},
        },
        bold: {
          $value: 700,
          $extensions: {'io.sanity': {figma: {value: 'Bold'}}},
        },
      }) satisfies TokenScale<FontWeight, 'fontWeight'>,
    },
  },
})

function fontStyleToken(options: {
  fontFamily: 'code' | 'heading' | 'label' | 'text'
  fontSize: number
  lineHeight: number
  letterSpacing: number
  ascenderHeight: number
  descenderHeight: number
  iconSize: number
  customIconSize: number
}): Omit<SanityTypographyToken, '$type'> {
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
