import React, {forwardRef} from 'react'
import styled from 'styled-components'
import {getResponsiveProp} from '../helpers'
import {labelBaseStyles, labelSizeStyles} from './styles'

interface LabelProps {
  as?: React.ElementType | keyof JSX.IntrinsicElements
  muted?: boolean
  size?: number | number[]
}

const Root = styled.div<{uiMuted?: boolean; size: number[]}>(labelBaseStyles, labelSizeStyles)

export const Label = forwardRef(
  (props: LabelProps & Omit<React.HTMLProps<HTMLDivElement>, 'size'>, ref) => {
    const {children, muted, size: sizeProp = 2, ...restProps} = props
    const size = getResponsiveProp(sizeProp)

    return (
      <Root data-ui="Label" {...restProps} uiMuted={muted} ref={ref} size={size}>
        {children}
      </Root>
    )
  }
)

Label.displayName = 'Label'
