import {_composeClassNames} from '../../lib/class-names/_composeClassNames'
import {box} from '../box/box'
import type {FlexStyleProps} from './types'

/** @public */
export function flex(props: FlexStyleProps): string | undefined {
  const {align, direction, justify, wrap, ...rest} = props

  return _composeClassNames(
    box({
      ...rest,
      alignItems: align,
      display: 'flex',
      flexDirection: direction ?? 'row',
      flexWrap: wrap,
      justifyContent: justify,
    }),
  )
}
