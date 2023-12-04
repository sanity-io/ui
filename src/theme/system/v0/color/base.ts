/**
 * @public
 * @deprecated Use `ThemeColorCard_v2` instead.
 */
export interface ThemeColorBase {
  bg: string
  fg: string
  border: string
  focusRing: string
  backdrop?: string
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
