import {_composeClassNames} from '../../_composeClassNames'
import {_responsiveClassName} from '../../_responsiveClassName'
import {display} from '../../props/display/display'
import {flexProp} from '../../props/flex/flex'
import {font} from '../../props/font/font'
import {margin} from '../../props/margin/margin'
import {maxWidth} from '../../props/maxWidth/maxWidth'
import {textAlign} from '../../props/textAlign/textAlign'
import {muted, root, sizes} from './text.css'
import type {TextStyleProps} from './types'

/** @public */
export function text(props: TextStyleProps): string | undefined {
  return _composeClassNames(
    props.className,
    root,
    props.muted && muted,
    _responsiveClassName(sizes, props.size ?? 2),
    display({display: props.display ?? 'block'}),
    flexProp(props),
    font(props),
    margin({...props, margin: props.margin ?? 0}),
    maxWidth({maxWidth: props.maxWidth ?? 'fill'}),
    textAlign({textAlign: props.align}),
  )
}
