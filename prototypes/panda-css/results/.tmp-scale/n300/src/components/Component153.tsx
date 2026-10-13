import {css, cva} from '../../styled-system/css'
import type {RecipeRuntimeFn} from '../../styled-system/types'

export const box153: string = css({
  display: 'flex',
  gap: '4',
  padding: '2',
  bg: 'yellow.950',
  color: 'yellow.400',
  borderRadius: '3',
  _hover: {bg: 'yellow.50'},
  _dark: {color: 'yellow.100'},
})

export const recipe153: RecipeRuntimeFn<{size?: 'sm' | 'md' | 'lg'; tone?: 'a' | 'b' | 'c'}> = cva({
  base: {display: 'inline-flex', alignItems: 'center', fontFamily: 'sans', lineHeight: 'tight'},
  variants: {
    size: {
      sm: {fontSize: '0', paddingInline: '1', paddingBlock: '1'},
      md: {fontSize: '1', paddingInline: '2', paddingBlock: '2'},
      lg: {fontSize: '2', paddingInline: '3', paddingBlock: '3'},
    },
    tone: {
      a: {bg: 'yellow.200', _hover: {bg: 'yellow.300'}},
      b: {bg: 'yellow.400', _focusVisible: {outlineColor: 'focusRing'}},
      c: {bg: 'yellow.500', _disabled: {opacity: 0.4}},
    },
  },
  defaultVariants: {size: 'md', tone: 'a'},
})
