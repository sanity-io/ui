import {type ToneProps, toneProps} from '../../props/tone'
import {type PropDef} from '../../types/PropDef'

/** @public */
export interface BadgeProps<T extends React.ElementType = 'span'> extends ToneProps {
  /**
   * HTML element to render.
   */
  as?: T
  /**
   * Shows an icon in the start position (left side in left-to-right languages).
   */
  iconStart?: React.ElementType | React.ReactNode
  /**
   * Sets Badge's text label. Use instead of children unless you have a special use case.
   */
  text?: string
}

export const badgeProps: Record<string, PropDef> = {
  as: {
    type: 'string',
  },
  iconStart: {
    type: 'string',
  },
  text: {
    type: 'string',
  },
  ...toneProps,
}
