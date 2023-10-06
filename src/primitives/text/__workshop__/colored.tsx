import {Flex, Text, useTheme} from '@sanity/ui'
import {useSelect} from '@sanity/ui-workshop'
import styled, {css} from 'styled-components'
import {WORKSHOP_SPOT_COLOR_OPTIONS} from '../../../__workshop__/constants'
import {ThemeColorSpotKey, cssVars} from '../../../theme/lib/theme/color/cssVariables'

const ColoredText = styled(Text)<{color?: ThemeColorSpotKey}>((props: {
  color?: ThemeColorSpotKey
}) => {
  const {color} = props

  return css`
    color: ${color ? cssVars.spot[color] : cssVars.spot.gray};
  `
})

export default function ColoredTextStory() {
  const theme = useTheme()
  const color = useSelect('Color', WORKSHOP_SPOT_COLOR_OPTIONS, 'gray')

  return (
    <Flex align="center" height="fill" justify="center" padding={[4, 5, 6]} sizing="border">
      <ColoredText align="center" color={color} size={4} theme={theme} weight="bold">
        {color}
      </ColoredText>
    </Flex>
  )
}
