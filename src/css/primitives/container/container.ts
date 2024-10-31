import {_composeClassNames} from '../../_composeClassNames'
import {_scopeClassNames} from '../../_scopeClassNames'
import {maxWidth} from '../../aspects'
import type {ContainerStyleProps} from './types'

/** @public */
export function container(props: ContainerStyleProps): string | undefined {
  return _composeClassNames(_scopeClassNames('container'), maxWidth({maxWidth: props.width}))
}
