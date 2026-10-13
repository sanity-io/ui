import {css, cva} from '../../styled-system/css'
import type {RecipeRuntimeFn} from '../../styled-system/types'

export const box80: string = css({
  display: 'flex',
  gap: '1',
  padding: '1',
  bg: 'gray.300',
  color: 'gray.950',
  borderRadius: '0',
  _hover: {bg: 'gray.400'},
  _dark: {color: 'gray.500'},
})

export const recipe80: RecipeRuntimeFn<{size?: 'sm' | 'md' | 'lg'; tone?: 'a' | 'b' | 'c'}> = cva({
  base: {display: 'inline-flex', alignItems: 'center', fontFamily: 'sans', lineHeight: 'tight'},
  variants: {
    size: {
      sm: {fontSize: '0', paddingInline: '1', paddingBlock: '1'},
      md: {fontSize: '1', paddingInline: '2', paddingBlock: '2'},
      lg: {fontSize: '2', paddingInline: '3', paddingBlock: '3'},
    },
    tone: {
      a: {bg: 'gray.600', _hover: {bg: 'gray.700'}},
      b: {bg: 'gray.800', _focusVisible: {outlineColor: 'focusRing'}},
      c: {bg: 'gray.900', _disabled: {opacity: 0.4}},
    },
  },
  defaultVariants: {size: 'md', tone: 'a'},
})
