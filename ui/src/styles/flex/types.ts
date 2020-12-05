export type FlexAlign = 'flex-start' | 'flex-end' | 'center' | 'baseline' | 'stretch'

export type FlexDirection = 'row' | 'row-reverse' | 'column' | 'column-reverse'

export type FlexJustify =
  | 'flex-start'
  | 'flex-end'
  | 'center'
  | 'space-between'
  | 'space-around'
  | 'space-evenly'

export type FlexWrap = 'wrap' | 'wrap-reverse' | 'nowrap'

export interface ResponsiveFlexStyleProps {
  align?: FlexAlign | FlexAlign[]
  direction?: FlexDirection | FlexDirection[]
  justify?: FlexJustify | FlexJustify[]
  wrap?: FlexWrap | FlexWrap[]
}

export interface ResponsiveFlexItemStyleProps {
  flex?: number | number[]
}
