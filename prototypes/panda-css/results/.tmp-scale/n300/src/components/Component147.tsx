import {css, cva} from '../../styled-system/css'
import type {RecipeRuntimeFn} from '../../styled-system/types'

export const box147: string = css({
  display: 'flex',
  gap: '3',
  padding: '4',
  bg: 'green.400',
  color: 'green.600',
  borderRadius: '2',
  _hover: {bg: 'green.500'},
  _dark: {color: 'green.600'},
})

export const recipe147: RecipeRuntimeFn<{size?: 'sm' | 'md' | 'lg'; tone?: 'a' | 'b' | 'c'}> = cva({
  base: {display: 'inline-flex', alignItems: 'center', fontFamily: 'sans', lineHeight: 'tight'},
  variants: {
    size: {
      sm: {fontSize: '0', paddingInline: '1', paddingBlock: '1'},
      md: {fontSize: '1', paddingInline: '2', paddingBlock: '2'},
      lg: {fontSize: '2', paddingInline: '3', paddingBlock: '3'},
    },
    tone: {
      a: {bg: 'green.700', _hover: {bg: 'green.800'}},
      b: {bg: 'green.900', _focusVisible: {outlineColor: 'focusRing'}},
      c: {bg: 'green.950', _disabled: {opacity: 0.4}},
    },
  },
  defaultVariants: {size: 'md', tone: 'a'},
})
