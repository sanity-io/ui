import {_resp} from '../../_resp'
import {composeClassNames} from '../../composeClassNames'
import {flexItem, font} from '../../styles'
import {TextStyleProps} from './types'

/** @public */
export function text(props: TextStyleProps): string | undefined {
  return composeClassNames(
    'text',
    'block',
    flexItem(props),
    font(props),
    props.accent && 'text-accent',
    props.muted && 'text-muted',
    _resp(`text`, props.size),
  )
}
