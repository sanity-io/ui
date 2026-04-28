import {type PropDef} from '../types/PropDef'
import {TONE, type Tone} from '../types/Tone'

export type ToneProps = {
  /** CSS **background-color** property */
  tone?: Tone
}

export const toneProps: Record<string, PropDef> = {
  tone: {
    type: 'union',
    className: 'tone',
    values: TONE,
  },
}
