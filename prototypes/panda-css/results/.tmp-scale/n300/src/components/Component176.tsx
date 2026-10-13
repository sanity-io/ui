import {css, cva} from '../../styled-system/css'
import type {RecipeRuntimeFn} from '../../styled-system/types'

export const box176: string = css({
  display: 'flex',
  gap: '2',
  padding: '1',
  bg: 'blue.50',
  color: 'blue.50',
  borderRadius: '1',
  _hover: {bg: 'blue.100'},
  _dark: {color: 'blue.200'},
})

export const recipe176: RecipeRuntimeFn<{size?: 'sm' | 'md' | 'lg'; tone?: 'a' | 'b' | 'c'}> = cva({
  base: {display: 'inline-flex', alignItems: 'center', fontFamily: 'sans', lineHeight: 'tight'},
  variants: {
    size: {
      sm: {fontSize: '0', paddingInline: '1', paddingBlock: '1'},
      md: {fontSize: '1', paddingInline: '2', paddingBlock: '2'},
      lg: {fontSize: '2', paddingInline: '3', paddingBlock: '3'},
    },
    tone: {
      a: {bg: 'blue.300', _hover: {bg: 'blue.400'}},
      b: {bg: 'blue.500', _focusVisible: {outlineColor: 'focusRing'}},
      c: {bg: 'blue.600', _disabled: {opacity: 0.4}},
    },
  },
  defaultVariants: {size: 'md', tone: 'a'},
})
