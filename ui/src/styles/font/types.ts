import {ThemeFontWeightKey} from '../../theme'
import {TextAlign} from '../../types'

/**
 * @beta Should not be used in production, as this might change.
 */
export interface ResponsiveFontSizeStyleProps {
  $size?: number | number[]
}

/**
 * @beta Should not be used in production, as this might change.
 */
export interface FontWeightStyleProps {
  $weight?: ThemeFontWeightKey
}

export interface ResponsiveTextAlignStyleProps {
  $align?: TextAlign | TextAlign[]
}

/**
 * @beta Should not be used in production, as this might change.
 */
export interface ResponsiveFontStyleProps
  extends FontWeightStyleProps,
    ResponsiveFontSizeStyleProps {
  $accent?: boolean
  $muted?: boolean
}
