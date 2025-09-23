import {Flex, Text} from '@sanity/ui'
import {vars} from '@sanity/ui/css'
import type {AvatarColor} from '@sanity/ui/theme'
import {useSelect} from '@sanity/ui-workshop'
import {assignInlineVars} from '@vanilla-extract/dynamic'

import {WORKSHOP_AVATAR_COLOR_OPTIONS} from '$workshop'

export default function ColoredTextStory(): React.JSX.Element {
  // @ts-expect-error - TODO: fix this
  const color: AvatarColor = useSelect('Color', WORKSHOP_AVATAR_COLOR_OPTIONS, 'gray') ?? 'gray'

  return (
    <Flex align="center" height="fill" justify="center" padding={[4, 5, 6]} sizing="border">
      <Text
        align="center"
        size={4}
        weight="bold"
        style={assignInlineVars({[vars.color.fg]: vars.color.avatar[color].bg})}
      >
        {color}
      </Text>
    </Flex>
  )
}
