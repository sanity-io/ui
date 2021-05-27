import React, {forwardRef} from 'react'
import styled from 'styled-components'

const Root = styled.div`
  display: block;
  width: 0;
  height: 0;
  position: absolute;
  overflow: hidden;
`

/**
 * @public
 */
export const SrOnly = forwardRef(function SrOnly(
  props: {
    as?: React.ElementType | keyof JSX.IntrinsicElements
    children?: React.ReactNode
  },
  ref: React.Ref<HTMLDivElement>
) {
  const {as, children} = props

  return (
    <Root aria-hidden as={as} data-ui="SrOnly" ref={ref}>
      {children}
    </Root>
  )
})
