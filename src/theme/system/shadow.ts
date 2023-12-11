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
 * @public
 */
export interface ThemeShadow {
  umbra: ThemeBoxShadow
  penumbra: ThemeBoxShadow
  ambient: ThemeBoxShadow
}
