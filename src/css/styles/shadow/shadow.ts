import {_resp} from '../../_resp'
import {composeClassNames} from '../../composeClassNames'
import {ShadowStyleProps} from './types'

export function shadow(props: ShadowStyleProps): string | undefined {
  return composeClassNames(_resp('shadow', props.shadow))
}
