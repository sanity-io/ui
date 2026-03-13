import {_composeClassNames} from '../../lib/class-names/_composeClassNames'
import {text} from '../text/text'
import {root} from './kbd.css'
import type {KBDStyleProps} from './types'

/** @public */
export function kbd(props: KBDStyleProps): string | undefined {
  return _composeClassNames(
    props.className,
    root,
    text({
      display: 'block',
      flex: 'none',
      muted: true,
      size: 1,
      weight: 'medium',
    }),
  )
}
