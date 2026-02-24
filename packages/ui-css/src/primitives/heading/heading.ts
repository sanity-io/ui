import {_composeClassNames} from '../../_composeClassNames'
import {_responsiveClassName} from '../../_responsiveClassName'
import {display} from '../../props/display/display'
import {flexProp} from '../../props/flex/flex'
import {font} from '../../props/font/font'
import {margin} from '../../props/margin/margin'
import {maxWidth} from '../../props/maxWidth/maxWidth'
import {textAlign} from '../../props/textAlign/textAlign'
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
    font({...props, weight: props.weight ?? 'semibold'}),
    margin({...props, margin: props.margin ?? 0}),
    maxWidth(props),
    textAlign({textAlign: props.align}),
  )
}
