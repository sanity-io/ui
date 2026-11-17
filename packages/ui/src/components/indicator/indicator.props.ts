import type {ElementType} from 'react'

import {type ToneProps, toneProps} from '../../props/tone'
import type {Polymorphic} from '../../types/Polymorphic'
import type {PropDef} from '../../types/PropDef'

/** @beta */
export type IndicatorProps<T extends ElementType = 'span'> = Polymorphic<
  T,
  ToneProps & {
    /**
     * HTML element to render.
     */
    as?: T
    /**
     * Accessible label.
     */
    label?: string
  }
>

export const indicatorProps: Record<string, PropDef> = {
  as: {
    type: 'string',
  },
  label: {
    type: 'string',
  },
  ...toneProps,
}
