import {_composeClassNames} from '../../_composeClassNames'
import {_responsiveClassName} from '../../_responsiveClassName'
import {radius} from '../../props/radius/radius'
import {width} from '../../props/width/width'
import {border, element, fontSize, gap, padding, presentation, root} from './_input.css'
import type {InputStyleProps} from './types'

/** @internal */
export function _input(props: InputStyleProps): string | undefined {
  return _composeClassNames(
    root,
    props.border && border,
    _responsiveClassName(fontSize, props.fontSize ?? 2),
    _responsiveClassName(padding, props.padding ?? 3),
    _responsiveClassName(gap, props.gap ?? 3),
    radius(props),
    width(props),
  )
}

/** @internal */
export function _inputElement(): string | undefined {
  return element
}

/** @internal */
export function _inputPresentation(): string | undefined {
  return presentation
}
