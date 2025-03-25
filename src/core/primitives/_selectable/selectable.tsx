import {styled} from 'styled-components'
import { responsiveRadiusStyle } from '../../styles/radius/radiusStyle'
import { ResponsiveRadiusStyleProps } from '../../styles/radius/types'
import { Box } from '../box/box'
import {selectableBaseStyle, selectableColorStyle, SelectableStyleProps} from './style'

/**
 * @internal
 */
export const Selectable = styled(Box)<SelectableStyleProps & ResponsiveRadiusStyleProps>(
  responsiveRadiusStyle,
  selectableBaseStyle,
  selectableColorStyle,
)
Selectable.displayName = 'Selectable'
