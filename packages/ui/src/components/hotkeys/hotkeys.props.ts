import {type PropDef} from '../../types/PropDef'

/** @public */
export interface HotkeysProps {
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
