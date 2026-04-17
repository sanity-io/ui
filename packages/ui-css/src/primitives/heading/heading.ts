import {_composeClassNames} from '../../lib/class-names/_composeClassNames'
import {_responsiveClassName} from '../../lib/class-names/_responsiveClassName'
import {display} from '../../props/display/display'
import {flexProp} from '../../props/flex/flex'
import {margin} from '../../props/margin/margin'
import {maxWidth} from '../../props/maxWidth/maxWidth'
import {textAlign} from '../../props/textAlign/textAlign'
import {width} from '../../props/width/width'
import {_font} from '../_font/_font'
import {muted, root, scale} from './heading.css'
import type {HeadingStyleProps} from './types'

/** @public */
export function heading(props: HeadingStyleProps): string | undefined {
  return _composeClassNames(
    props.className,
    root,
    props.muted && muted,
    _responsiveClassName(scale, props.size ?? 2),
    display({display: 'block'}),
    flexProp(props),
    _font({...props, weight: props.weight ?? 'semibold'}),
    margin({...props, margin: props.margin ?? 0}),
    maxWidth(props),
    textAlign({textAlign: props.align}),
    width(props),
  )
}
