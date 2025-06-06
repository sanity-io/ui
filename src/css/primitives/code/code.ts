import {_composeClassNames} from '../../_composeClassNames'
import {_responsiveClassName} from '../../_responsiveClassName'
import {display} from '../../props/display/display'
import {flex} from '../../props/flex/flex'
import {font} from '../../props/font/font'
import {root, scale} from './code.css'
import type {CodeStyleProps} from './types'

/** @public */
export function code(props: CodeStyleProps): string | undefined {
  return _composeClassNames(
    props.className,
    root,
    _responsiveClassName(scale, props.size ?? 1),
    display({display: 'block'}),
    flex(props),
    font(props),
  )
}
