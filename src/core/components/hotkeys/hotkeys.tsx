import type {GapStyleProps, RadiusStyleProps, ResponsiveProp} from '@sanity/ui/css'
import type {FontTextSize, Space} from '@sanity/ui/theme'
import type {ReactElement} from 'react'

import {Box} from '../../primitives/box/box'
import {KBD} from '../../primitives/kbd/kbd'
import type {ComponentType, Props} from '../../types'

/** @public */
export const DEFAULT_HOTKEYS_ELEMENT = 'kbd'

/** @public */
export interface HotkeysOwnProps extends GapStyleProps, RadiusStyleProps {
  fontSize?: ResponsiveProp<FontTextSize>
  padding?: ResponsiveProp<Space>
  keys?: string[]
}

/** @public */
export type HotkeysElementType = 'kbd' | ComponentType

/** @public */
export type HotkeysProps<E extends HotkeysElementType = HotkeysElementType> = Props<
  HotkeysOwnProps,
  E
>

/**
 * Represent hotkeys (a keyboard combination) with semantic `<kbd>` elements.
 *
 * @public
 */
export function Hotkeys<E extends HotkeysElementType = typeof DEFAULT_HOTKEYS_ELEMENT>(
  props: HotkeysProps<E>,
): ReactElement | undefined {
  const {
    as = DEFAULT_HOTKEYS_ELEMENT,
    fontSize,
    gap = 1,
    gapX,
    gapY,
    keys,
    padding,
    radius,
    ...rest
  } = props as HotkeysProps<typeof DEFAULT_HOTKEYS_ELEMENT>

  if (!keys || keys.length === 0) {
    return undefined
  }

  return (
    <Box as={as} data-ui="Hotkeys" {...rest} display="flex" gap={gap} gapX={gapX} gapY={gapY}>
      {keys.map((key, i) => (
        <KBD fontSize={fontSize} key={i} padding={padding} radius={radius}>
          {key}
        </KBD>
      ))}
    </Box>
  )
}
