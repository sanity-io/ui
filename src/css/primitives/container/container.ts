import {_comp} from '../../_comp'
import {maxWidth} from '../../aspects'
import {ContainerStyleProps} from './types'

/** @public */
export function container(props: ContainerStyleProps): string | undefined {
  return _comp('container', maxWidth({maxWidth: props.width}))
}
