import {type PropDef} from '../types/PropDef'
import {TONE_WITH_DEFAULT, TONE, type ToneWithDefault, type Tone} from '../types/Tone'

export type ToneProps = {
  tone?: Tone
}

export const toneProps: Record<string, PropDef> = {
  tone: {
    type: 'union',
    className: 'tone',
    values: TONE,
  },
}

export type ToneWithDefaultProps = {
  tone?: ToneWithDefault
}

export const toneWithDefaultProps: Record<string, PropDef> = {
  tone: {
    type: 'union',
    className: 'tone',
    values: TONE_WITH_DEFAULT,
  },
}
