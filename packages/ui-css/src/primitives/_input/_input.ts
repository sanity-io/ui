import {_composeClassNames} from '../../lib/class-names/_composeClassNames'
import {_responsiveClassName} from '../../lib/class-names/_responsiveClassName'
import {flexProp} from '../../props/flex/flex'
import {position} from '../../props/position/position'
import {radius} from '../../props/radius/radius'
import {width} from '../../props/width/width'
import {
  border,
  element,
  fontSize,
  fontWeightOptions,
  gap,
  padding,
  prefix,
  presentation,
  root,
  suffix,
} from './_input.css'
import type {InputStyleProps} from './types'

/** @internal */
export function _input(props: InputStyleProps): string | undefined {
  return _composeClassNames(
    root,
    props.border !== false && border,
    fontWeightOptions[props.fontWeight ?? 'regular'],
    _responsiveClassName(fontSize, props.fontSize ?? 2),
    _responsiveClassName(padding, props.padding ?? 3),
    _responsiveClassName(gap, props.gap ?? 3),
    flexProp(props),
    position({position: 'relative'}),
    radius({radius: props.radius ?? 3}),
    width(props),
  )
}

/** @internal */
export function _input_element(): string | undefined {
  return element
}

/** @internal */
export function _input_presentation(): string | undefined {
  return presentation
}

/** @internal */
export function _input_prefix(): string | undefined {
  return prefix
}

/** @internal */
export function _input_suffix(): string | undefined {
  return suffix
}
