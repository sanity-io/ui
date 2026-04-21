import {type PropDef} from '../types/PropDef'
import {TONE, type Tone, TONE_LEVEL, type ToneLevel} from '../types/Tone'

export type ToneProps = {
  /** CSS **background-color** property */
  tone?: Tone
  toneLevel?: ToneLevel
}

export const toneProps: Record<string, PropDef> = {
  tone: {
    type: 'union',
    className: 'tone',
    values: TONE,
  },
  toneLevel: {
    type: 'union',
    className: 'tone-level',
    values: TONE_LEVEL,
  },
}
