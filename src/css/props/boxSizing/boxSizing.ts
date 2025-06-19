import {options} from './boxSizing.css'
import type {BoxSizingStyleProps} from './types'

/** @internal */
export function boxSizing(props: BoxSizingStyleProps): string | undefined {
  return props.boxSizing && options[props.boxSizing]
}
