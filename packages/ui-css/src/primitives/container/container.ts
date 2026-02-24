import {_composeClassNames} from '../../_composeClassNames'
import {box} from '../box/box'
import type {ContainerStyleProps} from './types'

/** @public */
export function container(props: ContainerStyleProps): string | undefined {
  return _composeClassNames(
    box({
      ...props,
      marginX: props.marginX ?? 'auto',
      maxWidth: props.width ?? 2,
      width: 'fill',
    }),
  )
}
