import {type MarginProps, marginProps} from '../../props/margin'
import {type PropDef} from '../../types/PropDef'

/** @public */
export interface DividerProps extends React.ComponentProps<'hr'>, MarginProps {}

export const dividerProps: Record<string, PropDef> = {
  ...marginProps,
}
