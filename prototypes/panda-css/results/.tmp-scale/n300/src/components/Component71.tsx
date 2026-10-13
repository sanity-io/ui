import {css, cva} from '../../styled-system/css'
import type {RecipeRuntimeFn} from '../../styled-system/types'

export const box71: string = css({
  display: 'flex',
  gap: '2',
  padding: '4',
  bg: 'blue.500',
  color: 'blue.200',
  borderRadius: '1',
  _hover: {bg: 'blue.600'},
  _dark: {color: 'blue.700'},
})

export const recipe71: RecipeRuntimeFn<{size?: 'sm' | 'md' | 'lg'; tone?: 'a' | 'b' | 'c'}> = cva({
  base: {display: 'inline-flex', alignItems: 'center', fontFamily: 'sans', lineHeight: 'tight'},
  variants: {
    size: {
      sm: {fontSize: '0', paddingInline: '1', paddingBlock: '1'},
      md: {fontSize: '1', paddingInline: '2', paddingBlock: '2'},
      lg: {fontSize: '2', paddingInline: '3', paddingBlock: '3'},
    },
    tone: {
      a: {bg: 'blue.800', _hover: {bg: 'blue.900'}},
      b: {bg: 'blue.950', _focusVisible: {outlineColor: 'focusRing'}},
      c: {bg: 'blue.50', _disabled: {opacity: 0.4}},
    },
  },
  defaultVariants: {size: 'md', tone: 'a'},
})
