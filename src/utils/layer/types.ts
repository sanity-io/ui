/** @public */
export interface LayerContextValue {
  version: 0.0
  isTopLayer: boolean
  level?: number
  registerChild: (childLevel?: number) => () => void
  size: number
  zIndex: number
}
