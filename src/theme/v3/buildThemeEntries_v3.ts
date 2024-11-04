import {color, COLOR_HUES, COLOR_TINTS} from '@sanity/color'
import {FONT_CODE_SIZE, FONT_HEADING_SIZE, FONT_LABEL_SIZE, FONT_TEXT_SIZE} from '../_constants'
import {ThemeBoxShadow} from '../v0'
import {buildTheme_v3} from './buildTheme_v3'
import {buildColorEntries_v3} from './color/buildColorEntries_v3'
import {resolveTokens} from './resolveTokens'
import {ThemeEntry, ThemeOptions} from './types'

function rem(value: number): string {
  return value / 16 + 'rem'
}

function px(value: number): string {
  return value + 'px'
}

function toBoxShadow(value: ThemeBoxShadow | undefined) {
  if (!value) return 'none'

  return value.map((n) => px(n)).join(' ')
}

export function buildThemeEntries_v3(options?: ThemeOptions): ThemeEntry[] {
  const theme = buildTheme_v3(options)
  const tokens = resolveTokens(options)

  // console.log(theme.font)

  // theme.card.shadow.outline

  return [
    ...buildColorPaletteEntries_v3(),
    ...buildColorEntries_v3(tokens.color),

    ['--font-code-family', theme.font.code.family],
    ['--font-code-weight-regular', `${theme.font.code.weights.regular}`],
    ['--font-code-weight-medium', `${theme.font.code.weights.medium}`],
    ['--font-code-weight-semibold', `${theme.font.code.weights.semibold}`],
    ['--font-code-weight-bold', `${theme.font.code.weights.bold}`],

    ...FONT_CODE_SIZE.reduce<ThemeEntry[]>((acc, size) => {
      return [
        ...acc,
        [`--font-code-${size}-size`, rem(theme.font.code.sizes[size].fontSize)],
        [`--font-code-${size}-line-height`, rem(theme.font.code.sizes[size].lineHeight)],
        [`--font-code-${size}-ascender-height`, px(theme.font.code.sizes[size].ascenderHeight)],
        [`--font-code-${size}-descender-height`, px(theme.font.code.sizes[size].descenderHeight)],
        [`--font-code-${size}-letter-spacing`, px(theme.font.code.sizes[size].letterSpacing)],
        [`--font-code-${size}-icon-size`, px(theme.font.code.sizes[size].iconSize)],
      ]
    }, []),

    ['--font-heading-family', theme.font.heading.family],
    ['--font-heading-weight-regular', `${theme.font.heading.weights.regular}`],
    ['--font-heading-weight-medium', `${theme.font.heading.weights.medium}`],
    ['--font-heading-weight-semibold', `${theme.font.heading.weights.semibold}`],
    ['--font-heading-weight-bold', `${theme.font.heading.weights.bold}`],

    ...FONT_HEADING_SIZE.reduce<ThemeEntry[]>((acc, size) => {
      return [
        ...acc,
        [`--font-heading-${size}-size`, rem(theme.font.heading.sizes[size].fontSize)],
        [`--font-heading-${size}-line-height`, rem(theme.font.heading.sizes[size].lineHeight)],
        [
          `--font-heading-${size}-ascender-height`,
          px(theme.font.heading.sizes[size].ascenderHeight),
        ],
        [
          `--font-heading-${size}-descender-height`,
          px(theme.font.heading.sizes[size].descenderHeight),
        ],
        [`--font-heading-${size}-letter-spacing`, px(theme.font.heading.sizes[size].letterSpacing)],
        [`--font-heading-${size}-icon-size`, px(theme.font.heading.sizes[size].iconSize)],
      ]
    }, []),

    ['--font-label-family', theme.font.label.family],
    ['--font-label-weight-regular', `${theme.font.label.weights.regular}`],
    ['--font-label-weight-medium', `${theme.font.label.weights.medium}`],
    ['--font-label-weight-semibold', `${theme.font.label.weights.semibold}`],
    ['--font-label-weight-bold', `${theme.font.label.weights.bold}`],

    ...FONT_LABEL_SIZE.reduce<ThemeEntry[]>((acc, size) => {
      return [
        ...acc,
        [`--font-label-${size}-size`, rem(theme.font.label.sizes[size].fontSize)],
        [`--font-label-${size}-line-height`, rem(theme.font.label.sizes[size].lineHeight)],
        [`--font-label-${size}-ascender-height`, px(theme.font.label.sizes[size].ascenderHeight)],
        [`--font-label-${size}-descender-height`, px(theme.font.label.sizes[size].descenderHeight)],
        [`--font-label-${size}-letter-spacing`, px(theme.font.label.sizes[size].letterSpacing)],
        [`--font-label-${size}-icon-size`, px(theme.font.label.sizes[size].iconSize)],
      ]
    }, []),

    ['--font-text-family', theme.font.text.family],
    ['--font-text-weight-regular', `${theme.font.text.weights.regular}`],
    ['--font-text-weight-medium', `${theme.font.text.weights.medium}`],
    ['--font-text-weight-semibold', `${theme.font.text.weights.semibold}`],
    ['--font-text-weight-bold', `${theme.font.text.weights.bold}`],

    ...FONT_TEXT_SIZE.reduce<ThemeEntry[]>((acc, size) => {
      return [
        ...acc,
        [`--font-text-${size}-size`, rem(theme.font.text.sizes[size].fontSize)],
        [`--font-text-${size}-line-height`, rem(theme.font.text.sizes[size].lineHeight)],
        [`--font-text-${size}-ascender-height`, px(theme.font.text.sizes[size].ascenderHeight)],
        [`--font-text-${size}-descender-height`, px(theme.font.text.sizes[size].descenderHeight)],
        [`--font-text-${size}-letter-spacing`, px(theme.font.text.sizes[size].letterSpacing)],
        [`--font-text-${size}-icon-size`, px(theme.font.text.sizes[size].iconSize)],
      ]
    }, []),

    [`--radius-0`, rem(theme.radius[0])],
    [`--radius-1`, rem(theme.radius[1])],
    [`--radius-2`, rem(theme.radius[2])],
    [`--radius-3`, rem(theme.radius[3])],
    [`--radius-4`, rem(theme.radius[4])],
    [`--radius-5`, rem(theme.radius[5])],
    [`--radius-6`, rem(theme.radius[6])],

    [`--shadow-outline`, `0 0 0 ${theme.card.shadow.outline}px`],
    [`--shadow-0-umbra`, toBoxShadow(theme.shadow[0]?.umbra)],
    [`--shadow-0-penumbra`, toBoxShadow(theme.shadow[0]?.penumbra)],
    [`--shadow-0-ambient`, toBoxShadow(theme.shadow[0]?.ambient)],
    [`--shadow-1-umbra`, toBoxShadow(theme.shadow[1]?.umbra)],
    [`--shadow-1-penumbra`, toBoxShadow(theme.shadow[1]?.penumbra)],
    [`--shadow-1-ambient`, toBoxShadow(theme.shadow[1]?.ambient)],
    [`--shadow-2-umbra`, toBoxShadow(theme.shadow[2]?.umbra)],
    [`--shadow-2-penumbra`, toBoxShadow(theme.shadow[2]?.penumbra)],
    [`--shadow-2-ambient`, toBoxShadow(theme.shadow[2]?.ambient)],
    [`--shadow-3-umbra`, toBoxShadow(theme.shadow[3]?.umbra)],
    [`--shadow-3-penumbra`, toBoxShadow(theme.shadow[3]?.penumbra)],
    [`--shadow-3-ambient`, toBoxShadow(theme.shadow[3]?.ambient)],
    [`--shadow-4-umbra`, toBoxShadow(theme.shadow[4]?.umbra)],
    [`--shadow-4-penumbra`, toBoxShadow(theme.shadow[4]?.penumbra)],
    [`--shadow-4-ambient`, toBoxShadow(theme.shadow[4]?.ambient)],
    [`--shadow-5-umbra`, toBoxShadow(theme.shadow[5]?.umbra)],
    [`--shadow-5-penumbra`, toBoxShadow(theme.shadow[5]?.penumbra)],
    [`--shadow-5-ambient`, toBoxShadow(theme.shadow[5]?.ambient)],

    [`--space-0`, rem(theme.space[0])],
    [`--space-1`, rem(theme.space[1])],
    [`--space-2`, rem(theme.space[2])],
    [`--space-3`, rem(theme.space[3])],
    [`--space-4`, rem(theme.space[4])],
    [`--space-5`, rem(theme.space[5])],
    [`--space-6`, rem(theme.space[6])],
    [`--space-7`, rem(theme.space[7])],
    [`--space-8`, rem(theme.space[8])],
    [`--space-9`, rem(theme.space[9])],
  ]
}

function buildColorPaletteEntries_v3(): ThemeEntry[] {
  return [
    [`--black`, color.black.hex],
    [`--white`, color.white.hex],
    ...COLOR_HUES.reduce<ThemeEntry[]>(
      (acc, hue) => [
        ...acc,
        ...COLOR_TINTS.reduce<ThemeEntry[]>(
          (acc, tint) => [...acc, [`--${hue}-${tint}`, color[hue][tint].hex]],
          [],
        ),
      ],
      [],
    ),
  ]
}
