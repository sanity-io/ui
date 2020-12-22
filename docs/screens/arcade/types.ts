export type CanvasWidth = 0 | 1 | 2 | 3

export interface ArcadeQueryParams {
  mode?: 'jsx' | 'hook'
  jsx: string
  hook?: string
  title?: string
  description?: string
  width?: CanvasWidth | null
}
