import {kbd, type ResponsiveProp} from '@sanity/ui-css'
import type {FontTextSize} from '@sanity/ui-tokens'

import type {ComponentType, Props} from '../../types'
import {Box, type BoxElementType, type BoxOwnProps} from '../box/Box'
import {Text} from '../text/Text'

/** @public */
export const DEFAULT_KBD_ELEMENT = 'kbd'

/** @public */
export type KBDOwnProps = BoxOwnProps & {
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
export function KBD<E extends KBDElementType = typeof DEFAULT_KBD_ELEMENT>(
  props: KBDProps<E>,
): React.JSX.Element {
  const {
    as = DEFAULT_KBD_ELEMENT,
    children,
    className,
    display = 'inline-block',
    fontSize = 1,
    padding = 1,
    ...rest
  } = props as KBDProps<typeof DEFAULT_KBD_ELEMENT>

  return (
    <Box
      data-ui="KBD"
      {...rest}
      as={as as BoxElementType}
      className={kbd({className})}
      display={display}
      muted
      padding={padding}
    >
      <Text as="span" muted size={fontSize} weight="medium">
        {children}
      </Text>
    </Box>
  )
}
