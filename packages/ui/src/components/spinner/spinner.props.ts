import {ICON_SIZE, type IconSize} from '../../types/Icon'
import {type PropDef} from '../../types/PropDef'
import type {Responsive} from '../../types/Responsive'

/** @public */
export interface SpinnerProps extends React.ComponentProps<'svg'> {
  /**
   * Size of the spinner icon.
   */
  size?: Responsive<IconSize>
}

export const spinnerProps: Record<string, PropDef> = {
  size: {
    type: 'union',
    className: 'icon-body',
    values: ICON_SIZE,
  },
}
