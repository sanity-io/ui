import {type PropDef} from '../../types/PropDef'

/** @public */
export interface KBDProps {
  /**
   * Sets KBD's key label.
   */
  text?: string
  /**
   * Not accepted.
   * @remarks Pass the key label via `text`.
   */
  children?: never
}

export const kbdProps: Record<string, PropDef> = {
  text: {
    type: 'string',
  },
}
