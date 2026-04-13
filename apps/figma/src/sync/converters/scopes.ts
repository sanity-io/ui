import type {SanityTokenScope} from '@sanity/ui-tokens/lib'

// Unsupported Figma scopes:
//   | 'ALL_SCOPES'
//   | 'TEXT_CONTENT'
//   | 'ALL_FILLS'
//   | 'OPACITY'
//   | 'FONT_FAMILY'
//   | 'FONT_STYLE'
//   | 'FONT_WEIGHT'
//   | 'FONT_SIZE'
//   | 'LINE_HEIGHT'
//   | 'LETTER_SPACING'
//   | 'PARAGRAPH_SPACING'
//   | 'PARAGRAPH_INDENT'

const scopeMap: Record<string, VariableScope> = {
  'corner/radius': 'CORNER_RADIUS',
  // 'corner/shape': 'CORNER_SMOOTHING',
  'fill/frame': 'FRAME_FILL',
  'fill/shape': 'SHAPE_FILL',
  'fill/text': 'TEXT_FILL',
  'stroke/color': 'STROKE_COLOR',
  'effect/color': 'EFFECT_COLOR',
  'effect/float': 'EFFECT_FLOAT',
  'gap': 'GAP',
  'stroke/float': 'STROKE_FLOAT',
  'width': 'WIDTH_HEIGHT',
}

export function parseFigmaScopes(sanityScopes: SanityTokenScope[]): VariableScope[] {
  return sanityScopes
    .map((scope) => {
      const mapped = scopeMap[scope]

      if (!mapped) {
        // eslint-disable-next-line no-console
        console.warn(`Unknown scope: ${scope}`)
        return undefined
      }

      return mapped
    })
    .filter(Boolean) as VariableScope[]
}
