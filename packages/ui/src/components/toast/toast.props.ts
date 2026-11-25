import type {ComponentProps} from 'react'

import type {PropDef} from '../../types/PropDef'
import type {Tone} from '../../types/Tone'

export const TOAST_TONE = ['neutral', 'positive', 'caution', 'critical'] as const satisfies Tone[]

/** @beta */
export type ToastTone = (typeof TOAST_TONE)[number]

/**
 * Tones whose announcements wait for the screen reader to finish its current speech
 * (`role="status"`). The other tones are urgent and interrupt (`role="alert"`).
 */
export function isPoliteTone(tone: ToastTone): boolean {
  return tone === 'neutral' || tone === 'positive'
}

/** @beta */
export interface ToastProps extends ComponentProps<'div'> {
  /** A short title to be shown on the Toast */
  title: string
  /** An optional brief description, used to provide supplemental information or context */
  description?: string
  /** If true, users can dismiss the Toast manually via a close button */
  closable?: boolean
  /** A subset of the global tones. Has accessibility implications - please see the Toast docs. */
  tone?: ToastTone
  /** Called when the user clicks the close button. Only applies when `closable` is `true`. */
  onClose?: () => void
}

export const toastProps: Record<string, PropDef> = {
  tone: {
    type: 'union',
    className: 'tone',
    values: TOAST_TONE,
  },
}
