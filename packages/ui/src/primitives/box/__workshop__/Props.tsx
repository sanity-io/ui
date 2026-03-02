import {Box, type BoxProps, Text} from '@sanity/ui'
import {BORDER_STYLE, BORDER_WIDTH, RADIUS, SHADOW, SPACE} from '@sanity/ui/theme'
import {useBoolean, useSelect} from '@sanity/ui-workshop'

import {CardWrapper} from '$workshop'

export default function PropsStory(): React.JSX.Element {
  const boxProps: BoxProps = {
    border: useSelect('Border', BORDER_STYLE),
    borderWidth: useSelect('Border Width', BORDER_WIDTH),
    muted: useBoolean('Muted'),
    padding: useSelect('Padding', SPACE),
    radius: useSelect('Radius', RADIUS),
    shadow: useSelect('Shadow', SHADOW),
  }

  return (
    <CardWrapper>
      <Box {...boxProps}>
        <Text muted size={1}>
          Text within box with props
        </Text>
      </Box>
    </CardWrapper>
  )
}
