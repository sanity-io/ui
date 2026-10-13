import {css, cva} from '../../styled-system/css'
import type {RecipeRuntimeFn} from '../../styled-system/types'

export const box107: string = css({
  display: 'flex',
  gap: '3',
  padding: '4',
  bg: 'green.800',
  color: 'green.100',
  borderRadius: '2',
  _hover: {bg: 'green.900'},
  _dark: {color: 'green.950'},
})

export const recipe107: RecipeRuntimeFn<{size?: 'sm' | 'md' | 'lg'; tone?: 'a' | 'b' | 'c'}> = cva({
  base: {display: 'inline-flex', alignItems: 'center', fontFamily: 'sans', lineHeight: 'tight'},
  variants: {
    size: {
      sm: {fontSize: '0', paddingInline: '1', paddingBlock: '1'},
      md: {fontSize: '1', paddingInline: '2', paddingBlock: '2'},
      lg: {fontSize: '2', paddingInline: '3', paddingBlock: '3'},
    },
    tone: {
      a: {bg: 'green.50', _hover: {bg: 'green.100'}},
      b: {bg: 'green.200', _focusVisible: {outlineColor: 'focusRing'}},
      c: {bg: 'green.300', _disabled: {opacity: 0.4}},
    },
  },
  defaultVariants: {size: 'md', tone: 'a'},
})
