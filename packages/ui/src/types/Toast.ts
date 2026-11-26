import type {Tone} from './Tone'

export const TOAST_TONE = ['neutral', 'positive', 'caution', 'critical'] as const satisfies Tone[]
/** @beta */
export type ToastTone = (typeof TOAST_TONE)[number]
