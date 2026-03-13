import {z} from 'zod'

import {_DTCGDimensionTokenSchema, _DTCGNumberTokenSchema} from '../dtcg/schema'

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
/** @internal */
export const SanityTokenScopeSchema = z.enum([
  'effect/color', // EFFECT_COLOR
  'effect/float', // EFFECT_FLOAT
  'fill/frame', // FRAME_FILL
  'fill/shape', // SHAPE_FILL
  'fill/text', // TEXT_FILL
  'gap', // GAP
  'corner/radius', // CORNER_RADIUS
  'corner/shape',
  'stroke/color', // STROKE_COLOR
  'stroke/float', // STROKE_FLOAT
  'width', // WIDTH_HEIGHT
])

/** @internal */
export const SanityDimensionExtensionSchema = z.object({
  'io.sanity': z.object({
    scopes: z.array(SanityTokenScopeSchema).optional(),
  }),
})

/** @internal */
export const SanityDimensionTokenSchema = _DTCGDimensionTokenSchema.and(
  z.object({
    $extensions: SanityDimensionExtensionSchema.optional(),
  }),
)

/** @internal */
export const SanityNumberExtensionSchema = z.object({
  'io.sanity': z.object({
    scopes: z.array(SanityTokenScopeSchema).optional(),
  }),
})

/** @internal */
export const SanityNumberTokenSchema = _DTCGNumberTokenSchema.and(
  z.object({
    $extensions: SanityNumberExtensionSchema.optional(),
  }),
)
