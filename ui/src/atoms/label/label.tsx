import React, {forwardRef} from 'react'
import styled from 'styled-components'
import {responsiveLabelFont, responsiveTextAlignStyle} from '../../styles'
import {ThemeFontWeightKey} from '../../theme'
import {TextAlign} from '../../types'
import {labelBaseStyles} from './styles'

interface LabelProps {
  accent?: boolean
  align?: TextAlign | TextAlign[]
  as?: React.ElementType | keyof JSX.IntrinsicElements
  muted?: boolean
  size?: number | number[]
  weight?: ThemeFontWeightKey
}

const Root = styled.div<{align?: TextAlign | TextAlign[]; muted: boolean; size: number[]}>(
  responsiveLabelFont,
  responsiveTextAlignStyle,
  labelBaseStyles
)

export const Label = forwardRef(
  (props: LabelProps & Omit<React.HTMLProps<HTMLDivElement>, 'size'>, ref) => {
    const {children, muted = false, size = 2, ...restProps} = props

    return (
      <Root data-ui="Label" {...restProps} muted={muted} ref={ref} size={size}>
        {children}
      </Root>
    )
  }
)

Label.displayName = 'Label'
