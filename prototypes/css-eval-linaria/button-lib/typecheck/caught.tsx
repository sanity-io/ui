/**
 * Every line below carries `@ts-expect-error`, so `tsc -p tsconfig.json`
 * passes only if each misuse really is a compile error.
 */
import {Button} from '../src/Button'
import {type ThemeValues, v} from '../src/theme'

export const wrongTone = (
  // @ts-expect-error 'purple' is not a ButtonTone
  <Button tone="purple">x</Button>
)

export const wrongMode = (
  // @ts-expect-error 'outline' is not a ButtonMode
  <Button mode="outline">x</Button>
)

export const wrongDynamicProp = (
  // @ts-expect-error minWidth is a number, not a CSS length string
  <Button minWidth="160px">x</Button>
)

// @ts-expect-error '--sui-color-background' is not a token name
export const wrongToken = v('--sui-color-background')

// @ts-expect-error a theme must assign every token
export const incompleteTheme: ThemeValues = {'--sui-color-bg': '#fff'}
