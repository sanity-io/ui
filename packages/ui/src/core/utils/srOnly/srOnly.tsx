import {forwardRef} from 'react'
import {styled} from 'styled-components'

/**
 * @public
 */
export interface SrOnlyProps {
  as?: React.ElementType | keyof React.JSX.IntrinsicElements
  children?: React.ReactNode
}

const StyledSrOnly = styled.div`
  display: block;
  width: 0;
  height: 0;
  position: absolute;
  overflow: hidden;
  overflow: clip;
`

/**
 * @public
 */
export const SrOnly = forwardRef(function SrOnly(
  props: SrOnlyProps & Omit<React.HTMLProps<HTMLDivElement>, 'aria-hidden' | 'as'>,
  ref: React.Ref<HTMLDivElement>,
) {
  const {as, children} = props

  return (
    <StyledSrOnly aria-hidden as={as} data-ui="SrOnly" ref={ref}>
      {children}
    </StyledSrOnly>
  )
})
SrOnly.displayName = 'ForwardRef(SrOnly)'
