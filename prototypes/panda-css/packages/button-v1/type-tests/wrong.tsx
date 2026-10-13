/**
 * Every line marked `// EXPECT-ERROR` must be rejected by `tsc`
 * (scripts/type-safety.mjs verifies exactly that, and that nothing else errors).
 * Config: `strictTokens: true` + `strictPropertyValues: true`.
 */
import {css} from '../styled-system/css'
import {badge} from '../styled-system/recipes'
import {token} from '../styled-system/tokens'
import {Button, button, themeToCssVars} from '../src'

// 1. Token that does not exist (typo in a semantic token path).
export const wrongToken: string = css({bg: 'tone.primary.nope'}) // EXPECT-ERROR

// 2. Raw CSS value where strictTokens requires a token or an explicit `[escape]`.
export const rawValue: string = css({padding: '13px'}) // EXPECT-ERROR

// 3. Invalid keyword for a property with a known value set (strictPropertyValues).
export const badKeyword: string = css({display: 'flexx'}) // EXPECT-ERROR

// 4. Typo in a property name.
export const badProperty: string = css({colour: 'red.500'}) // EXPECT-ERROR

// 5. Unknown condition name.
export const badCondition: string = css({_hovr: {bg: 'red.500'}}) // EXPECT-ERROR

// 6. Wrong variant VALUE on the atomic recipe.
export const badVariantValue: string = button({tone: 'brand'}) // EXPECT-ERROR

// 7. Unknown variant NAME on the atomic recipe.
export const badVariantName: string = button({size: 'lg'}) // EXPECT-ERROR

// 8. Same through the component props.
export const badProp = <Button tone="brand">x</Button> // EXPECT-ERROR

// 9. Wrong token path passed to token() / token.var().
export const badTokenFn: string = token('colors.tone.primary.nope') // EXPECT-ERROR
export const badTokenVar: string = token.var('radii.9') // EXPECT-ERROR

// 10. Config recipe: variant value that the recipe does not define.
export const badConfigRecipe: string = badge({tone: 'positive'}) // EXPECT-ERROR

// 11. Runtime theme override with an unknown semantic token path (library's own typing).
export const badThemePath = themeToCssVars('light', {'tone.primary.nope': '#fff'}) // EXPECT-ERROR

// 12. Wrong token CATEGORY for the property (a radius token where a color is expected).
export const wrongCategory: string = css({color: 'full'}) // EXPECT-ERROR
