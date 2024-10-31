import {composeClassNames} from '../../composeClassNames'
import {maxWidth} from '../../styles'
import {ContainerStyleProps} from './types'

export function container(props: ContainerStyleProps): string | undefined {
  return composeClassNames('container', maxWidth({maxWidth: props.width}))
}
