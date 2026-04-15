import {type StyleProp} from '../types/StyleProp'
import {type Responsive} from '../types/Responsive'
import {TONE, type Tone} from '../types/Tone'

export type ToneProps = {
  /** CSS **background-color** property */
  tone?: Responsive<Tone>
}

export const toneProps: Record<string, StyleProp> = {
  tone: {
    type: 'union',
    className: 'tone',
    values: TONE,
  },
}
