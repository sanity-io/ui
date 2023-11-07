/**
 * @public
 */
export type ThemeBoxShadow = [
  // offsetX, offsetY, blurRadius, spreadRadius
  number,
  number,
  number,
  number,
]

/**
 * @deprecated Use `ThemeBoxShadow` instead
 */
export type BoxShadow = ThemeBoxShadow

/**
 * @public
 */
export interface ThemeShadow {
  umbra: ThemeBoxShadow
  penumbra: ThemeBoxShadow
  ambient: ThemeBoxShadow
}
