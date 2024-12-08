import {_resp} from '../../_resp'
import {composeClassNames} from '../../composeClassNames'
import {flexItem} from '../../styles/flexItem'
import {font} from '../../styles/font'
import {TextStyleProps} from './types'

/** @public */
export function text(props: TextStyleProps): string {
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
