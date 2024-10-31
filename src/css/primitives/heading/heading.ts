import {_resp} from '../../_resp'
import {composeClassNames} from '../../composeClassNames'
import {font} from '../../styles/font'
import {HeadingStyleProps} from './types'

/** @public */
export function heading(props: HeadingStyleProps): string {
  return composeClassNames(
    'heading',
    'block',
    font(props),
    props.accent && 'heading-accent',
    props.muted && 'heading-muted',
    _resp(`heading`, props.size),
  )
}
