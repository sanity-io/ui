import {_resp} from '../../_resp'
import {composeClassNames} from '../../composeClassNames'
import {FlexStyleProps} from './types'

const prefixes = {
  align: `align`, // `flex-align`
  direction: undefined, // `
  justify: `justify`, // `flex-justify`
  wrap: `wrap`, // `flex-wrap`
}

/** @public */
export function flex(props: FlexStyleProps): string | undefined {
  return composeClassNames(
    _resp(prefixes.align, props.align),
    _resp(prefixes.direction, props.direction),
    _resp(prefixes.justify, props.justify),
    _resp(prefixes.wrap, props.wrap),
  )
}
