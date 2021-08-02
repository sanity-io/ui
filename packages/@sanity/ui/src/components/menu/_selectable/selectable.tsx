import styled from 'styled-components'
import {Box} from '../../../primitives'
import {responsiveBorderStyle, ResponsiveBorderStyleProps} from '../../../styles/border'
import {responsiveRadiusStyle, ResponsiveRadiusStyleProps} from '../../../styles/radius'
import {selectableBaseStyle, selectableColorStyle, SelectableStyleProps} from './style'

/**
 * @internal
 */
export const Selectable = styled(Box)<
  SelectableStyleProps & ResponsiveRadiusStyleProps & ResponsiveBorderStyleProps
>(responsiveBorderStyle, responsiveRadiusStyle, selectableBaseStyle, selectableColorStyle)
