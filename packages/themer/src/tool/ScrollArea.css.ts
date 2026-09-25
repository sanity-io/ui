import {style} from '@vanilla-extract/css'

/** Always reserves the scrollbar's space, so the content never shifts */
export const root = style({
  scrollbarGutter: 'stable',
})
