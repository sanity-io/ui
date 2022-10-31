import {forwardRef, memo} from 'react'
import {CSSObject} from 'styled-components'
import {useArrayProp} from '../../hooks'
import {compose} from '../../styles'
import {responsiveRadiusStyle, ResponsiveRadiusStyleProps} from '../../styles/internal'
import {Box} from '../box'
import {Code} from '../code'

/**
 * @public
 */
export interface KBDProps {
  as?: React.ElementType | keyof JSX.IntrinsicElements
  fontSize?: number | number[]
  padding?: number | number[]
  radius?: number | number[]
}

function kbdStyle(): CSSObject {
  return {
    background: 'var(--card-bg-color)',
    font: 'inherit',
    boxShadow: 'inset 0 0 0 1px var(--card-hairline-hard-color)',

    '&:not([hidden])': {
      display: 'inline-block',
    },
  }
}

const Root = memo(compose<ResponsiveRadiusStyleProps>('kbd', [responsiveRadiusStyle, kbdStyle]))

/**
 * @public
 */
export const KBD = forwardRef(function KBD(
  props: KBDProps & Omit<React.HTMLProps<HTMLElement>, 'as' | 'ref' | 'size'>,
  ref: React.ForwardedRef<HTMLDivElement>
) {
  const {children, fontSize = 1, padding = 1, radius = 2, ...restProps} = props

  return (
    <Root data-ui="KBD" {...restProps} $radius={useArrayProp(radius)} ref={ref}>
      <Box as="span" padding={padding}>
        <Code as="span" muted size={fontSize}>
          {children}
        </Code>
      </Box>
    </Root>
  )
})
