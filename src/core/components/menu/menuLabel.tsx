import {forwardRef} from 'react'

import {Box, Label} from '../../primitives'
import {ResponsivePaddingProps} from '../../primitives/types'

/**
 * @public
 */
export interface MenuLabelProps extends ResponsivePaddingProps {
  fontSize?: number | number[]
  text?: React.ReactNode
}

/**
 * The `MenuLabel` component is a non-interactive label for menus.
 *
 * @public
 */
export const MenuLabel = forwardRef(function MenuLabel(
  props: MenuLabelProps & Omit<React.HTMLProps<HTMLDivElement>, 'as' | 'height'>,
  forwardedRef: React.ForwardedRef<HTMLDivElement>,
) {
  const {
    children,
    fontSize = 1,
    padding,
    paddingX = 3,
    paddingY,
    paddingTop = 3,
    paddingRight,
    paddingBottom = 1,
    paddingLeft,
    text,
    ...restProps
  } = props

  return (
    <Box
      data-ui="MenuLabel"
      role="presentation"
      {...restProps}
      padding={padding}
      paddingX={paddingX}
      paddingY={paddingY}
      paddingTop={paddingTop}
      paddingRight={paddingRight}
      paddingBottom={paddingBottom}
      paddingLeft={paddingLeft}
      ref={forwardedRef}
    >
      {text && (
        <Label muted size={fontSize} weight="medium">
          {text}
        </Label>
      )}
      {children}
    </Box>
  )
})
MenuLabel.displayName = 'ForwardRef(MenuLabel)'
