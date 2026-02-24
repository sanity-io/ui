import {_composeClassNames} from '../../_composeClassNames'
import {_responsiveClassName} from '../../_responsiveClassName'
import {display} from '../../props/display/display'
import {flex} from '../../props/flex/flex'
import {font} from '../../props/font/font'
import {margin} from '../../props/margin/margin'
import {maxWidth} from '../../props/maxWidth/maxWidth'
import {textAlign} from '../../props/textAlign/textAlign'
import {muted, root, sizes} from './heading.css'
import type {HeadingStyleProps} from './types'

/** @public */
export function heading(props: HeadingStyleProps): string | undefined {
  return _composeClassNames(
    props.className,
    root,
    props.muted && muted,
    _responsiveClassName(sizes, props.size ?? 1),
    display({display: 'block'}),
    flex(props),
    font(props),
    margin(props),
    maxWidth(props),
    textAlign({textAlign: props.align}),
  )
}
