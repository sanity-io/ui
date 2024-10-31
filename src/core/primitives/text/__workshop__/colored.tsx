import {Flex, Text} from '@sanity/ui'
import {varNames, vars} from '@sanity/ui/css'
import type {AvatarColor} from '@sanity/ui/theme'
import {useSelect} from '@sanity/ui-workshop'
import {styled} from 'styled-components'

import {WORKSHOP_AVATAR_COLOR_OPTIONS} from '$workshop'

const ColoredText = styled(Text)<{$color: AvatarColor}>`
  ${varNames.color.fg}: ${({$color}) => vars.color.avatar[$color].bg};
`

export default function ColoredTextStory() {
  const color = useSelect('Color', WORKSHOP_AVATAR_COLOR_OPTIONS, 'gray') ?? 'gray'

  return (
    <Flex align="center" height="fill" justify="center" padding={[4, 5, 6]} sizing="border">
      <ColoredText align="center" $color={color} size={4} weight="bold">
        {color}
      </ColoredText>
    </Flex>
  )
}
