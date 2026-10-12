import {styled} from 'styled-components'

import {responsiveRadiusStyle} from '../../styles/radius/radiusStyle'
import {ResponsiveRadiusStyleProps} from '../../styles/radius/types'
import {Box} from '../box/box'
import {
  selectableBaseStyle,
  selectableColorStyle,
  selectableDisabledStyle,
  selectableStyle,
  SelectableStyleProps,
} from './style'

const SelectableBase = styled(Box)`
  ${selectableBaseStyle}
`

const SelectableColor = styled(SelectableBase)<SelectableStyleProps>(selectableColorStyle)

const SelectableDisabled = styled(SelectableColor)<SelectableStyleProps>(selectableDisabledStyle)

/**
 * @internal
 */
export const Selectable = styled(SelectableDisabled)<ResponsiveRadiusStyleProps>(
  responsiveRadiusStyle,
  selectableStyle,
)
