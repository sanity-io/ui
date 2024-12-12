import {_resp} from '../../_resp'
import {composeClassNames} from '../../composeClassNames'
import {FontStyleProps} from './types'

const prefixes = {
  align: 'text-align',
  weight: 'font',
} as const

/** @public */
export function font(props: FontStyleProps): string | undefined {
  return composeClassNames(
    'font',
    props.weight && `${prefixes.weight}-${props.weight}`,
    _resp(prefixes.align, props.align),
  )
}
