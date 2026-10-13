/** Correct usages: `tsc` must report zero errors here. */
import {css, cva} from '../styled-system/css'
import {badge} from '../styled-system/recipes'
import {token} from '../styled-system/tokens'
import type {RecipeRuntimeFn} from '../styled-system/types'
import {Button, button, themeToCssVars} from '../src'

export const ok1: string = css({
  bg: 'tone.primary.bg',
  color: 'fg.base',
  padding: '[13px]', // explicit escape hatch for a raw value under strictTokens
  display: 'flex',
  borderRadius: 'full',
  _hover: {bg: 'blue.500'},
  _dark: {color: 'gray.100'},
  '&[data-selected]': {bg: 'tone.primary.bgHover'},
  '--sui-anything': '{colors.tone.caution.bg}',
})
export const ok2: string = button({tone: 'primary', mode: 'ghost'})
export const ok3: string = badge({tone: 'critical'})
export const ok4: string = token('colors.blue.500')
export const ok5: string = token.var('radii.full')
export const ok6 = <Button tone="positive" mode="bleed" width={120} radius="full">x</Button>
export const ok7 = themeToCssVars('dark', {'tone.primary.bg': '#000'})
export const ok8: RecipeRuntimeFn<{size?: 'sm' | 'lg' | undefined}> = cva({
  base: {fontFamily: 'sans'},
  variants: {size: {sm: {fontSize: '0'}, lg: {fontSize: '2'}}},
})
