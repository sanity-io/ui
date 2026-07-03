import {Flex, Text, ThemeProps} from '@sanity/ui'
import {getTheme_v2, ThemeColorAvatarColorKey, ThemeColorSpotKey} from '@sanity/ui/theme'
import {useSelect} from '@sanity/ui-workshop'
import {css, styled} from 'styled-components'

import {WORKSHOP_SPOT_COLOR_OPTIONS} from '../../../__workshop__/constants'

const ColoredText = styled(Text)<{$color?: ThemeColorSpotKey}>((
  props: {
    $color?: ThemeColorAvatarColorKey
  } & ThemeProps,
) => {
  const {color} = getTheme_v2(props.theme)

  return css`
    color: ${color.avatar[props.$color || 'gray'].bg};
  `
})

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
