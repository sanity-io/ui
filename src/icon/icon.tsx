import React, {forwardRef} from 'react'
import icons, {IconSymbol} from './icons'
import styled from 'styled-components'
import {iconStyles} from './styles'

interface IconProps {
  as?: React.ElementType | keyof JSX.IntrinsicElements
  size?: number
  symbol: IconSymbol
}

const Root = styled.span(iconStyles)

export const Icon = forwardRef((props: React.HTMLProps<HTMLDivElement> & IconProps, ref) => {
  const {size, ...restProps} = props

  return (
    <Root data-ui="Icon" {...restProps} ref={ref} size={size} >
      {React.createElement(icons[props.symbol])}
    </Root>
  )
})

Icon.displayName = 'Icon'