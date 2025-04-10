import {Flex, Text} from '@sanity/ui'
import {ThemeColorAvatarColorKey} from '@sanity/ui/theme'
import {useSelect} from '@sanity/ui-workshop'
import {styled} from 'styled-components'

import {WORKSHOP_SPOT_COLOR_OPTIONS} from '../../../../../workshop/constants'
import {varNames} from '../../../../css/varNames'

const ColoredText = styled(Text)<{$color?: ThemeColorAvatarColorKey}>`
  ${varNames.color.fg}: var(--color-avatar-${(props) => props.$color}-bg);
`

export default function ColoredTextStory() {
  const color = useSelect('Color', WORKSHOP_SPOT_COLOR_OPTIONS, 'gray')

  return (
    <Flex align="center" height="fill" justify="center" padding={[4, 5, 6]} sizing="border">
      <ColoredText align="center" $color={color} size={4} weight="bold">
        {color}
      </ColoredText>
    </Flex>
  )
}
