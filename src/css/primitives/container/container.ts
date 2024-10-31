import {composeClassNames} from '../../composeClassNames'
import {maxWidth} from '../../styles/maxWidth'
import {ContainerStyleProps} from './types'

export function container(props: ContainerStyleProps): string {
  return composeClassNames('container', maxWidth({maxWidth: props.width}))
}
