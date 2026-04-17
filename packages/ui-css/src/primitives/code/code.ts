import {_composeClassNames} from '../../lib/class-names/_composeClassNames'
import {_responsiveClassName} from '../../lib/class-names/_responsiveClassName'
import {display} from '../../props/display/display'
import {flexProp} from '../../props/flex/flex'
import {margin} from '../../props/margin/margin'
import {maxWidth} from '../../props/maxWidth/maxWidth'
import {width} from '../../props/width/width'
import {codeVarsClassName} from '../../vars/component/code.css'
import {_font} from '../_font/_font'
import {root, scale} from './code.css'
import type {CodeStyleProps} from './types'

/** @public */
export function code(props: CodeStyleProps): string | undefined {
  return _composeClassNames(
    props.className,
    root,
    codeVarsClassName,
    _responsiveClassName(scale, props.size ?? 2),
    display({display: 'block'}),
    flexProp(props),
    _font({...props, weight: props.weight ?? 'regular'}),
    margin({...props, margin: props.margin ?? 0}),
    maxWidth(props),
    width(props),
  )
}
