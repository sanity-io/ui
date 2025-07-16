import {_composeClassNames} from '../../_composeClassNames'
import {display} from '../../props/display/display'
import {flex} from '../../props/flex/flex'
import {font} from '../../props/font/font'
import {textAlign} from '../../props/textAlign/textAlign'
import {muted, root, sprinkles} from './heading.css'
import type {HeadingStyleProps} from './types'

/** @public */
export function heading(props: HeadingStyleProps): string | undefined {
  return _composeClassNames(
    props.className,
    root,
    props.muted && muted,
    sprinkles({size: props.size ?? 1}),
    display({display: 'block'}),
    flex(props),
    font(props),
    textAlign({textAlign: props.align}),
  )
}
