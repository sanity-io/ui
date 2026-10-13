import {css, cva} from '../../styled-system/css'
import type {RecipeRuntimeFn} from '../../styled-system/types'

export const box149: string = css({
  display: 'flex',
  gap: '5',
  padding: '2',
  bg: 'red.600',
  color: 'red.900',
  borderRadius: 'full',
  _hover: {bg: 'red.700'},
  _dark: {color: 'red.800'},
})

export const recipe149: RecipeRuntimeFn<{size?: 'sm' | 'md' | 'lg'; tone?: 'a' | 'b' | 'c'}> = cva({
  base: {display: 'inline-flex', alignItems: 'center', fontFamily: 'sans', lineHeight: 'tight'},
  variants: {
    size: {
      sm: {fontSize: '0', paddingInline: '1', paddingBlock: '1'},
      md: {fontSize: '1', paddingInline: '2', paddingBlock: '2'},
      lg: {fontSize: '2', paddingInline: '3', paddingBlock: '3'},
    },
    tone: {
      a: {bg: 'red.900', _hover: {bg: 'red.950'}},
      b: {bg: 'red.50', _focusVisible: {outlineColor: 'focusRing'}},
      c: {bg: 'red.100', _disabled: {opacity: 0.4}},
    },
  },
  defaultVariants: {size: 'md', tone: 'a'},
})
