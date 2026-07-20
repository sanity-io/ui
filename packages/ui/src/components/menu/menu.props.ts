import {type PropDef} from '../../types/PropDef'

/** @public */
export interface MenuProps<T extends React.ElementType> {
  /** Focusable trigger element */
  trigger: React.ReactElement<Record<string, unknown>>
}

export const menuProps: Record<string, PropDef> = {
  button: {
    type: 'string',
  },
}
