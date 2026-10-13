import {css, cva} from '../../styled-system/css'
import type {RecipeRuntimeFn} from '../../styled-system/types'

export const box270: string = css({
  display: 'flex',
  gap: '1',
  padding: '3',
  bg: 'gray.600',
  color: 'gray.900',
  borderRadius: '0',
  _hover: {bg: 'gray.700'},
  _dark: {color: 'gray.800'},
})

export const recipe270: RecipeRuntimeFn<{size?: 'sm' | 'md' | 'lg'; tone?: 'a' | 'b' | 'c'}> = cva({
  base: {display: 'inline-flex', alignItems: 'center', fontFamily: 'sans', lineHeight: 'tight'},
  variants: {
    size: {
      sm: {fontSize: '0', paddingInline: '1', paddingBlock: '1'},
      md: {fontSize: '1', paddingInline: '2', paddingBlock: '2'},
      lg: {fontSize: '2', paddingInline: '3', paddingBlock: '3'},
    },
    tone: {
      a: {bg: 'gray.900', _hover: {bg: 'gray.950'}},
      b: {bg: 'gray.50', _focusVisible: {outlineColor: 'focusRing'}},
      c: {bg: 'gray.100', _disabled: {opacity: 0.4}},
    },
  },
  defaultVariants: {size: 'md', tone: 'a'},
})
