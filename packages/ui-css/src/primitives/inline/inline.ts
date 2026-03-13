import {_composeClassNames} from '../../lib/class-names/_composeClassNames'
import {box} from '../box/box'
import type {InlineStyleProps} from './types'

/** @public */
export function inline(props: InlineStyleProps): string | undefined {
  return _composeClassNames(
    box({
      ...props,
      alignItems: 'center',
      display: 'flex',
      flexWrap: 'wrap',
    }),
  )
}
