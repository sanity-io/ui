import {memo} from 'react'
import styled from 'styled-components'
import {responsiveRadiusStyle, ResponsiveRadiusStyleProps} from '../../styles/radius'
import {Box} from '../box'
import {selectableBaseStyle, selectableColorStyle, SelectableStyleProps} from './style'

/**
 * @internal
 */
export const Selectable = memo(
  styled(Box)<SelectableStyleProps & ResponsiveRadiusStyleProps>(
    responsiveRadiusStyle,
    selectableBaseStyle,
    selectableColorStyle
  )
)
