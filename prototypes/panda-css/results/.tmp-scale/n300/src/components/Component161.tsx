import {css, cva} from '../../styled-system/css'
import type {RecipeRuntimeFn} from '../../styled-system/types'

export const box161: string = css({
  display: 'flex',
  gap: '2',
  padding: '2',
  bg: 'blue.700',
  color: 'blue.500',
  borderRadius: '1',
  _hover: {bg: 'blue.800'},
  _dark: {color: 'blue.900'},
})

export const recipe161: RecipeRuntimeFn<{size?: 'sm' | 'md' | 'lg'; tone?: 'a' | 'b' | 'c'}> = cva({
  base: {display: 'inline-flex', alignItems: 'center', fontFamily: 'sans', lineHeight: 'tight'},
  variants: {
    size: {
      sm: {fontSize: '0', paddingInline: '1', paddingBlock: '1'},
      md: {fontSize: '1', paddingInline: '2', paddingBlock: '2'},
      lg: {fontSize: '2', paddingInline: '3', paddingBlock: '3'},
    },
    tone: {
      a: {bg: 'blue.950', _hover: {bg: 'blue.50'}},
      b: {bg: 'blue.100', _focusVisible: {outlineColor: 'focusRing'}},
      c: {bg: 'blue.200', _disabled: {opacity: 0.4}},
    },
  },
  defaultVariants: {size: 'md', tone: 'a'},
})
