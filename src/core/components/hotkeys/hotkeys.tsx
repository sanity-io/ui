import {RadiusStyleProps, ResponsiveProp} from '@sanity/ui/css'
import {FontTextSize, Space} from '@sanity/ui/theme'
import {forwardRef} from 'react'
import {useArrayProp} from '../../hooks'
import {Box, Inline, KBD} from '../../primitives'

/**
 * @public
 */
export interface HotkeysProps extends RadiusStyleProps {
  fontSize?: ResponsiveProp<FontTextSize>
  padding?: ResponsiveProp<Space>
  space?: ResponsiveProp<Space>
  keys?: string[]
}

/**
 * Represent hotkeys (a keyboard combination) with semantic `<kbd>` elements.
 *
 * @public
 */
export const Hotkeys = forwardRef(function Hotkeys(
  props: HotkeysProps &
    Omit<
      React.HTMLProps<HTMLDivElement>,
      'as' | 'display' | 'height' | 'ref' | 'rows' | 'size' | 'width' | 'wrap'
    >,
  ref: React.Ref<HTMLDivElement>,
) {
  const {fontSize, keys, padding, radius, space: spaceProp = 0.5, ...restProps} = props
  const space = useArrayProp(spaceProp)

  if (!keys || keys.length === 0) {
    return <></>
  }

  return (
    <Box as="kbd" data-ui="Hotkeys" {...restProps} display="flex" gap={spaceProp} ref={ref}>
      <Inline as="span" space={space}>
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
