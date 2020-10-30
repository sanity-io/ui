import React, {forwardRef} from 'react'
import styled from 'styled-components'
import {labelFont} from '../../styles'
import {labelBaseStyles} from './styles'

interface LabelProps {
  as?: React.ElementType | keyof JSX.IntrinsicElements
  muted?: boolean
  size?: number | number[]
}

const Root = styled.div<{muted: boolean; size: number[]}>(labelBaseStyles, labelFont)

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
