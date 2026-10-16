import {type PropDef} from '../../types/PropDef'

/** @public */
export interface HotkeysProps extends React.ComponentProps<'kbd'> {
  /**
   * The keys in the shortcut, in order. Each one renders as a KBD.
   */
  keys?: string[]
}

export const hotkeysProps: Record<string, PropDef> = {
  keys: {
    type: 'string',
  },
}
