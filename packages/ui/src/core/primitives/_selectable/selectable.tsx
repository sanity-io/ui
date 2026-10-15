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
  @layer u-styled {
    ${selectableBaseStyle}
  }
`

const SelectableColor = styled(SelectableBase)<SelectableStyleProps>`
  @layer u-styled {
    ${selectableColorStyle}
  }
`

const SelectableDisabled = styled(SelectableColor)<SelectableStyleProps>`
  @layer u-styled {
    ${selectableDisabledStyle}
  }
`

/**
 * @internal
 */
export const Selectable = styled(SelectableDisabled)<ResponsiveRadiusStyleProps>`
  @layer u-styled {
    ${responsiveRadiusStyle}
    ${selectableStyle}
  }
`
