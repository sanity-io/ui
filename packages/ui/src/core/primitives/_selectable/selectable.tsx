import {styled} from 'styled-components'

import {responsiveRadiusStyle, ResponsiveRadiusStyleProps} from '../../styles/radius'
import {Box} from '../box'
import {selectableBaseStyle, selectableColorStyle, SelectableStyleProps} from './style'

/**
 * @internal
 */
// The dist build's styled-components transform derives the DevTools
// `displayName` ("Selectable") from this variable name, inside the pure
// factory call where it does not block tree-shaking.
export const Selectable = styled(Box)<SelectableStyleProps & ResponsiveRadiusStyleProps>(
  responsiveRadiusStyle,
  selectableBaseStyle,
  selectableColorStyle,
)
