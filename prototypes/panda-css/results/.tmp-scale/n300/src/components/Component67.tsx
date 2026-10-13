import {css, cva} from '../../styled-system/css'
import type {RecipeRuntimeFn} from '../../styled-system/types'

export const box67: string = css({
  display: 'flex',
  gap: '3',
  padding: '4',
  bg: 'green.100',
  color: 'green.700',
  borderRadius: '2',
  _hover: {bg: 'green.200'},
  _dark: {color: 'green.300'},
})

export const recipe67: RecipeRuntimeFn<{size?: 'sm' | 'md' | 'lg'; tone?: 'a' | 'b' | 'c'}> = cva({
  base: {display: 'inline-flex', alignItems: 'center', fontFamily: 'sans', lineHeight: 'tight'},
  variants: {
    size: {
      sm: {fontSize: '0', paddingInline: '1', paddingBlock: '1'},
      md: {fontSize: '1', paddingInline: '2', paddingBlock: '2'},
      lg: {fontSize: '2', paddingInline: '3', paddingBlock: '3'},
    },
    tone: {
      a: {bg: 'green.400', _hover: {bg: 'green.500'}},
      b: {bg: 'green.600', _focusVisible: {outlineColor: 'focusRing'}},
      c: {bg: 'green.700', _disabled: {opacity: 0.4}},
    },
  },
  defaultVariants: {size: 'md', tone: 'a'},
})
