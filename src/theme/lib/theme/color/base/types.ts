/**
 * @public
 */
export interface ThemeColorBase {
  bg: string
  fg: string
  border: string
  focusRing: string
  shadow: {
    outline: string
    umbra: string
    penumbra: string
    ambient: string
  }
  skeleton?: {
    from: string
    to: string
  }
}
