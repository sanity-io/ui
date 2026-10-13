/**
 * Type-safety probe. Every misuse below is marked `@ts-expect-error`; `tsc`
 * fails if a directive is unused, i.e. if StyleX's types do NOT catch the case.
 * Cases StyleX types deliberately do not catch are in `gaps.tsx`.
 */
import * as stylex from '@stylexjs/stylex'
import {Button} from 'stylex-button-v1'
import {button, tokens} from 'stylex-button-v1/tokens.stylex'

// --- tokens -----------------------------------------------------------------

export const unknownToken = stylex.create({
  // @ts-expect-error `radius9` is not a token of this group
  a: {borderRadius: tokens.radius9},
})

// @ts-expect-error unknown key in a theme override
export const unknownOverride = stylex.createTheme(tokens, {radius9: '1px'})

// @ts-expect-error `bg` is a key of `tokens`, not of the `button` group
export const wrongGroup = stylex.createTheme(button, {bg: 'red'})

// @ts-expect-error a theme must be created from a `defineVars()` group
export const notAGroup = stylex.createTheme({bg: 'red'}, {bg: 'blue'})

// --- variants (component props) --------------------------------------------

// @ts-expect-error `danger` is not a ButtonTone
export const wrongTone = <Button tone="danger" text="x" />

// @ts-expect-error `outline` is not a ButtonMode
export const wrongMode = <Button mode="outline" text="x" />

// @ts-expect-error 9 is outside the padding scale
export const wrongPadding = <Button padding={9} text="x" />

// @ts-expect-error width accepts `'fill'` or a number
export const wrongWidth = <Button width="100%" text="x" />

// --- style prop restrictions -----------------------------------------------

const consumer = stylex.create({
  display: {display: 'block'},
  margin: {marginTop: 8},
})

// @ts-expect-error `display` is excluded by StyleXStylesWithout<{display: unknown}>
export const forbiddenOverride = <Button xstyle={consumer.display} text="x" />

// @ts-expect-error a plain object is not a compiled StyleX style
export const plainObject = <Button xstyle={{marginTop: 8}} text="x" />

export const allowedOverride = <Button xstyle={consumer.margin} text="x" />

// --- dynamic styles ---------------------------------------------------------

const dynamic = stylex.create({
  width: (width: number) => ({width}),
})

// @ts-expect-error the dynamic style parameter is a number
export const wrongDynamicArg = stylex.props(dynamic.width('wide'))

// --- props() ---------------------------------------------------------------

// @ts-expect-error props() takes compiled styles, not class name strings
export const stringToProps = stylex.props('x1abc')
