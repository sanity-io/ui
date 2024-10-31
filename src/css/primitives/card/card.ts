import {composeClassNames} from '../../composeClassNames'
import {border, BorderStyleProps} from '../../styles/border'
import {radius, RadiusStyleProps} from '../../styles/radius'
import {ResponsiveProp} from '../../types'
import {box, BoxStyleProps} from '../box'

export interface CardStyleProps extends BoxStyleProps, BorderStyleProps, RadiusStyleProps {
  checkered?: boolean
  shadow?: ResponsiveProp<number>
}

export function card(props: CardStyleProps): string {
  return composeClassNames(
    'card',
    props.checkered && 'card-checkered',
    box(props),
    border(props),
    radius(props),
    props.shadow === undefined ? undefined : `shadow-${props.shadow}`,
  )
}
