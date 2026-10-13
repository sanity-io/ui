import {css, cva} from '../../styled-system/css'
import type {RecipeRuntimeFn} from '../../styled-system/types'

export const box73: string = css({
  display: 'flex',
  gap: '4',
  padding: '2',
  bg: 'yellow.700',
  color: 'yellow.500',
  borderRadius: '3',
  _hover: {bg: 'yellow.800'},
  _dark: {color: 'yellow.900'},
})

export const recipe73: RecipeRuntimeFn<{size?: 'sm' | 'md' | 'lg'; tone?: 'a' | 'b' | 'c'}> = cva({
  base: {display: 'inline-flex', alignItems: 'center', fontFamily: 'sans', lineHeight: 'tight'},
  variants: {
    size: {
      sm: {fontSize: '0', paddingInline: '1', paddingBlock: '1'},
      md: {fontSize: '1', paddingInline: '2', paddingBlock: '2'},
      lg: {fontSize: '2', paddingInline: '3', paddingBlock: '3'},
    },
    tone: {
      a: {bg: 'yellow.950', _hover: {bg: 'yellow.50'}},
      b: {bg: 'yellow.100', _focusVisible: {outlineColor: 'focusRing'}},
      c: {bg: 'yellow.200', _disabled: {opacity: 0.4}},
    },
  },
  defaultVariants: {size: 'md', tone: 'a'},
})
