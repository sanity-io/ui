import {_comp} from '../../_comp'
import {_resp} from '../../_resp'
import {flexItem, font} from '../../aspects'
import {HeadingStyleProps} from './types'

/** @public */
export function heading(props: HeadingStyleProps): string | undefined {
  return _comp(
    'block',
    'heading',
    font(props),
    props.accent && 'heading-accent',
    props.muted && 'heading-muted',
    _resp(`heading`, props.size),
    flexItem(props),
  )
}
