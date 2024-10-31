import {_composeClassNames} from '../../_composeClassNames'
import {_resp} from '../../_resp'
import {_scopeClassNames} from '../../_scopeClassNames'
import {flexItem, font, textAlign} from '../../aspects'
import type {HeadingStyleProps} from './types'

/** @public */
export function heading(props: HeadingStyleProps): string | undefined {
  return _composeClassNames(
    _scopeClassNames(
      'block',
      'heading',
      props.muted && 'heading-muted',
      _resp(`heading`, props.size),
    ),
    font(props),
    flexItem(props),
    textAlign({textAlign: props.align}),
  )
}
