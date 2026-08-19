import {type ToneProps, toneProps} from '../../props/tone'
import {type PropDef} from '../../types/PropDef'

/** @beta */
export interface IndicatorProps<T extends React.ElementType = 'span'> extends ToneProps {
  /** Element to render */
  as?: T
  /** Label for aria-label attribute */
  label?: string
}

export const indicatorProps: Record<string, PropDef> = {
  as: {
    type: 'string',
  },
  label: {
    type: 'string',
  },
  ...toneProps,
}
