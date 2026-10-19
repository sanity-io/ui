import {type PropDef} from '../types/PropDef'
import {LAYOUT_TONE, TONE, type LayoutTone, type Tone} from '../types/Tone'

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

export type LayoutToneProps = {
  tone?: LayoutTone
}

export const layoutToneProps: Record<string, PropDef> = {
  tone: {
    type: 'union',
    className: 'tone',
    values: LAYOUT_TONE,
  },
}
