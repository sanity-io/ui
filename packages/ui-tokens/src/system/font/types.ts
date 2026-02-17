import type {DTCGStringToken} from '../_dtcg/schema'
import type {
  FONT_CODE_SIZE,
  FONT_HEADING_SIZE,
  FONT_LABEL_SIZE,
  FONT_TEXT_SIZE,
  FONT_WEIGHT,
} from './constants'
import type {SanityFontFamilyToken, SanityFontStyleToken, SanityFontWeightToken} from './schema'

/** @internal */
export type FontCodeSize = (typeof FONT_CODE_SIZE)[number]

/** @internal */
export type FontHeadingSize = (typeof FONT_HEADING_SIZE)[number]

/** @internal */
export type FontLabelSize = (typeof FONT_LABEL_SIZE)[number]

/** @internal */
export type FontTextSize = (typeof FONT_TEXT_SIZE)[number]

/** @internal */
export type FontWeight = (typeof FONT_WEIGHT)[number]

/** @internal */
export type SanityFontToken<FontSize extends number = number> = {
  family: SanityFontFamilyToken
  featureSettings: DTCGStringToken
  scale: Record<FontSize, SanityFontStyleToken>
  weight: Record<FontWeight, SanityFontWeightToken>
}
