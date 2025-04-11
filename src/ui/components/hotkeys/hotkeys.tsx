import {GapStyleProps, RadiusStyleProps, ResponsiveProp} from '@sanity/ui/css'
import {FontTextSize, Space} from '@sanity/ui/theme'
import {ForwardedRef, forwardRef} from 'react'

import {Box, KBD} from '../../primitives'
import {Props} from '../../types'

/**
 * @public
 */
export interface HotkeysProps extends GapStyleProps, RadiusStyleProps {
  fontSize?: ResponsiveProp<FontTextSize>
  padding?: ResponsiveProp<Space>
  /** @deprecated Use `gap` instead. */
  space?: ResponsiveProp<Space>
  keys?: string[]
}

/**
 * Represent hotkeys (a keyboard combination) with semantic `<kbd>` elements.
 *
 * @public
 */
export const Hotkeys = forwardRef(function Hotkeys(
  props: Props<HotkeysProps, 'div'>,
  ref: ForwardedRef<HTMLDivElement>,
) {
  const {fontSize, gap, gapX, gapY, keys, padding, radius, space = 0.5, ...restProps} = props

  if (!keys || keys.length === 0) {
    return undefined
  }

  return (
    <Box
      as="kbd"
      data-ui="Hotkeys"
      {...restProps}
      display="flex"
      gap={gap ?? space}
      gapX={gapX}
      gapY={gapY}
      ref={ref}
    >
      {keys.map((key, i) => (
        <KBD fontSize={fontSize} key={i} padding={padding} radius={radius}>
          {key}
        </KBD>
      ))}
    </Box>
  )
})

Hotkeys.displayName = 'ForwardRef(Hotkeys)'
