import {_composeClassNames, kbd, type RadiusStyleProps, type ResponsiveProp} from '@sanity/ui/css'
import type {FontTextSize} from '@sanity/ui/theme'

import type {ComponentType, Props} from '../../types'
import {Box, type BoxElementType, type BoxOwnProps} from '../box'
import {Text} from '../text'

/** @public */
export const DEFAULT_KBD_ELEMENT = 'kbd'

/** @public */
export type KBDOwnProps = BoxOwnProps &
  RadiusStyleProps & {
    fontSize?: ResponsiveProp<FontTextSize>
  }

/** @public */
export type KBDElementType = 'kbd' | ComponentType

/** @public */
export type KBDProps<E extends KBDElementType = KBDElementType> = Props<KBDOwnProps, E>

/**
 * Used to define some text as keyboard input.
 *
 * @public
 */
export function KBD<E extends KBDElementType = typeof DEFAULT_KBD_ELEMENT>(props: KBDProps<E>) {
  const {
    as = DEFAULT_KBD_ELEMENT,
    children,
    className,
    display = 'inline-block',
    fontSize = 0,
    padding = 1,
    radius = 2,
    ...rest
  } = props as KBDProps<typeof DEFAULT_KBD_ELEMENT>

  return (
    <Box
      data-ui="KBD"
      {...rest}
      as={as as BoxElementType}
      className={_composeClassNames(className, kbd({radius}))}
      display={display}
      muted
      padding={padding}
    >
      <Text as="span" muted size={fontSize} weight="semibold">
        {children}
      </Text>
    </Box>
  )
}

KBD.displayName = 'KBD'
