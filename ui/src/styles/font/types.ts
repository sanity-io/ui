import {ThemeFontWeightKey} from '../../theme'

export interface ResponsiveFontSizeProps {
  size?: number | number[]
}

export interface FontWeightProps {
  weight?: ThemeFontWeightKey
}

export interface ResponsiveFontProps extends FontWeightProps, ResponsiveFontSizeProps {
  accent?: boolean
  muted?: boolean
}
