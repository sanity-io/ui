export type ContainerWidth = number | 'auto'

export interface ArcadeQueryParams {
  mode?: 'jsx' | 'hook'
  jsx: string
  hook?: string
  width?: ContainerWidth
}
