import {_resp} from '../../_resp'
import {composeClassNames} from '../../composeClassNames'
import {flexItem, font} from '../../styles'
import {HeadingStyleProps} from './types'

/** @public */
export function heading(props: HeadingStyleProps): string | undefined {
  return composeClassNames(
    'heading',
    'block',
    flexItem(props),
    font(props),
    props.accent && 'heading-accent',
    props.muted && 'heading-muted',
    _resp(`heading`, props.size),
  )
}
