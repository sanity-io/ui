// Type-safety probes. Every `@ts-expect-error` line below MUST be a compile error for
// `pnpm typecheck` to pass (an unused directive is itself an error), so this file documents
// exactly which mistakes vanilla-extract catches at compile time — and, at the bottom, which
// it does not.
import {assignInlineVars} from '@vanilla-extract/dynamic'
import {createTheme, style} from '@vanilla-extract/css'

import {button} from '../lib-v1/src/button.css'
import {Button} from '../lib-v1/src/button'
import type {ButtonProps} from '../lib-v1/src/button'
import {vars} from '../lib-v1/src/theme.css'

// 1. Unknown variant value: `tone` is 'default' | 'primary' | 'positive' | 'caution' | 'critical'.
// @ts-expect-error
button({tone: 'brand'})

// 2. Unknown variant group.
// @ts-expect-error
button({size: 'large'})

// 3. Unknown theme token path.
// @ts-expect-error
export const nope: string = vars.color.brand.bg

// 4. Unknown nested token leaf.
// @ts-expect-error
export const nope2: string = vars.radius.nope

// 5. Misspelled CSS property name (csstype).
// @ts-expect-error
style({colr: 'red'})

// 6. Wrong value type for a property that is a union of keywords (no `string` escape hatch).
// @ts-expect-error
style({position: 'fixedd'})

// 7. Theme implementation missing a token the contract requires.
// @ts-expect-error
createTheme(vars, {radius: {control: '3px'}})

// 8. Dynamic vars against the contract: unknown token.
// @ts-expect-error
assignInlineVars(vars, {radius: {control: '4px', extra: '1px'}, space: {}, font: {}, color: {}})

// 9. Component prop typed from the recipe.
// @ts-expect-error
export const badTone: ButtonProps = {tone: 'brand'}
// @ts-expect-error
export const badMode: ButtonProps = {mode: 'outline'}
Button satisfies (props: ButtonProps) => unknown

// --- Known gaps (these compile; listed so the limitation is explicit) ------------------------

// A. Most csstype properties accept `(string & {})`, so a typo in a *value* of an open-ended
//    property is not caught (`display` allows arbitrary strings for vendor values).
style({display: 'flexx'})

// B. The string form of assignInlineVars accepts any key; only the contract form is checked.
assignInlineVars({'--not-a-var': 'red'})
