import {ThemeFontWeightKey} from '../../theme'

/**
 * @beta Should not be used in production, as this might change.
 */
export interface ResponsiveFontSizeProps {
  size?: number | number[]
}

/**
 * @beta Should not be used in production, as this might change.
 */
export interface FontWeightProps {
  weight?: ThemeFontWeightKey
}

/**
 * @beta Should not be used in production, as this might change.
 */
export interface ResponsiveFontProps extends FontWeightProps, ResponsiveFontSizeProps {
  accent?: boolean
  muted?: boolean
}
