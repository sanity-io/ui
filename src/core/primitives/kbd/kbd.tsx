import {composeClassNames, kbd, RadiusStyleProps, ResponsiveProp} from '@sanity/ui/css'
import {FontTextSize, Space} from '@sanity/ui/theme'
import {forwardRef} from 'react'
import {Box, BoxProps} from '../box'
import {Text} from '../text'

/**
 * @public
 */
export interface KBDProps extends BoxProps, RadiusStyleProps {
  as?: React.ElementType | keyof JSX.IntrinsicElements
  fontSize?: ResponsiveProp<FontTextSize>
  padding?: ResponsiveProp<Space>
}

/**
 * Used to define some text as keyboard input.
 *
 * @public
 */
export const KBD = forwardRef(function KBD(
  props: KBDProps & Omit<React.HTMLProps<HTMLElement>, 'as' | 'ref' | 'size'>,
  ref: React.ForwardedRef<HTMLDivElement>,
) {
  const {
    as = 'kbd',
    children,
    className,
    display = 'inline-block',
    fontSize = 1,
    padding = 1,
    radius = 2,
    ...restProps
  } = props

  return (
    <Box
      data-ui="KBD"
      {...restProps}
      as={as}
      className={composeClassNames(className, kbd({radius}))}
      display={display}
      muted
      padding={padding}
      ref={ref}
    >
      <Text as="span" muted size={fontSize}>
        {children}
      </Text>
    </Box>
  )
})

KBD.displayName = 'ForwardRef(KBD)'
