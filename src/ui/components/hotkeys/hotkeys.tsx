import {GapStyleProps, RadiusStyleProps, ResponsiveProp} from '@sanity/ui/css'
import {FontTextSize, Space} from '@sanity/ui/theme'
import {ForwardedRef, forwardRef} from 'react'

import {Box, Inline, KBD} from '../../primitives'
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
  const {fontSize, gap, gapX, gapY, keys, padding, radius, space = 1, ...restProps} = props

  if (!keys || keys.length === 0) {
    return <></>
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
      <Inline as="span" gap={gap}>
        {keys.map((key, i) => (
          <KBD display="block" fontSize={fontSize} key={i} padding={padding} radius={radius}>
            {key}
          </KBD>
        ))}
      </Inline>
    </Box>
  )
})

Hotkeys.displayName = 'ForwardRef(Hotkeys)'
