import type {CSSProperties, FocusEvent, MouseEvent} from 'react'

/** @public */
export type TriggerProps = {
  'popoverTarget'?: string
  'interestfor'?: string
  'aria-describedby'?: string
  'style'?: CSSProperties
  'onClick'?: (e: MouseEvent<Element>) => void
  'onBlur'?: (e: FocusEvent<Element>) => void
  'onMouseLeave'?: (e: MouseEvent<Element>) => void
}
