import {_composeClassNames} from '../../lib/class-names/_composeClassNames'
import {box} from '../box/box'
import {root} from './stack.css'
import type {StackStyleProps} from './types'

/** @public */
export function stack(props: StackStyleProps): string | undefined {
  return _composeClassNames(
    props.className,
    root,
    box({
      ...props,
      display: 'grid',
      gridAutoRows: 'min',
    }),
  )
}
