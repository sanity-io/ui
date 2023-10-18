import {Flex, Text, useTheme} from '@sanity/ui'
import {useSelect} from '@sanity/ui-workshop'
import styled, {css} from 'styled-components'
import {WORKSHOP_SPOT_COLOR_OPTIONS} from '../../../__workshop__/constants'
import {useToneContext} from '../../../theme/toneContext/useToneContext'
import {spotColor} from '../../avatar/spotColors'

const ColoredText = styled(Text)<{color: string}>((props: {color: string}) => {
  return css`
    color: ${props.color};
  `
})

export default function ColoredTextStory() {
  const theme = useTheme()
  const selectedColor = useSelect('Color', WORKSHOP_SPOT_COLOR_OPTIONS, 'gray')
  const {scheme} = useToneContext()
  const color = spotColor[selectedColor ?? 'gray'][scheme]

  return (
    <Flex align="center" height="fill" justify="center" padding={[4, 5, 6]} sizing="border">
      <ColoredText align="center" color={color.hex} size={4} theme={theme} weight="bold">
        {color.title}
      </ColoredText>
    </Flex>
  )
}
