import {type GapProps, gapProps} from '../../props/gap'
import {type PropDef} from '../../types/PropDef'

/** @public */
export interface HStackProps<T extends React.ElementType = 'div'> extends Pick<GapProps, 'gap'> {
  /**
   * HTML element or component to render.
   */
  as?: T
}

export const hStackProps: Record<string, PropDef> = {
  as: {
    type: 'string',
  },
  gap: gapProps['gap'] as PropDef,
}
