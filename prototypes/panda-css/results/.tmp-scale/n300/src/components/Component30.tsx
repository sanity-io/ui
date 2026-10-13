import {css, cva} from '../../styled-system/css'
import type {RecipeRuntimeFn} from '../../styled-system/types'

export const box30: string = css({
  display: 'flex',
  gap: '1',
  padding: '3',
  bg: 'gray.800',
  color: 'gray.100',
  borderRadius: '0',
  _hover: {bg: 'gray.900'},
  _dark: {color: 'gray.950'},
})

export const recipe30: RecipeRuntimeFn<{size?: 'sm' | 'md' | 'lg'; tone?: 'a' | 'b' | 'c'}> = cva({
  base: {display: 'inline-flex', alignItems: 'center', fontFamily: 'sans', lineHeight: 'tight'},
  variants: {
    size: {
      sm: {fontSize: '0', paddingInline: '1', paddingBlock: '1'},
      md: {fontSize: '1', paddingInline: '2', paddingBlock: '2'},
      lg: {fontSize: '2', paddingInline: '3', paddingBlock: '3'},
    },
    tone: {
      a: {bg: 'gray.50', _hover: {bg: 'gray.100'}},
      b: {bg: 'gray.200', _focusVisible: {outlineColor: 'focusRing'}},
      c: {bg: 'gray.300', _disabled: {opacity: 0.4}},
    },
  },
  defaultVariants: {size: 'md', tone: 'a'},
})
