export type FontKey = 'code' | 'heading' | 'label' | 'text'
export type FontWeight = 'regular' | 'medium' | 'semibold' | 'bold'

export interface ResponsiveFontSizeProps {
  size?: number | number[]
}

export interface FontWeightProps {
  weight?: FontWeight
}

export interface ResponsiveFontProps extends FontWeightProps, ResponsiveFontSizeProps {
  accent?: boolean
  muted?: boolean
}
