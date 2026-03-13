import {_composeClassNames} from '../../lib/class-names/_composeClassNames'
import {_responsiveClassName} from '../../lib/class-names/_responsiveClassName'
import {
  paddingBottomOptions,
  paddingLeftOptions,
  paddingOptions,
  paddingRightOptions,
  paddingTopOptions,
  paddingXOptions,
  paddingYOptions,
} from './padding.css'
import type {PaddingStyleProps} from './types'

/** @public */
export function padding(props: PaddingStyleProps): string | undefined {
  return _composeClassNames(
    _responsiveClassName(paddingOptions, props.padding),
    _responsiveClassName(paddingXOptions, props.paddingX),
    _responsiveClassName(paddingYOptions, props.paddingY),
    _responsiveClassName(paddingTopOptions, props.paddingTop),
    _responsiveClassName(paddingRightOptions, props.paddingRight),
    _responsiveClassName(paddingBottomOptions, props.paddingBottom),
    _responsiveClassName(paddingLeftOptions, props.paddingLeft),
  )
}
