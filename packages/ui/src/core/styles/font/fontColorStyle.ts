import {CSSObject} from '../../../theme/system/css'

/**
 * @internal
 */
export function fontColorStyle(props: {
  $accent?: boolean
  $muted?: boolean
}): CSSObject | undefined {
  if (props.$muted) return {color: 'var(--card-muted-fg-color)'}
  if (props.$accent) return {color: 'var(--card-accent-fg-color)'}
  return undefined
}
