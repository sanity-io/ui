import {Flex, Text} from '@sanity/ui'
import {ReactElement} from 'react'
import {Box} from '../Box'

export default function PropsStory(): ReactElement {
  return (
    <Flex>
      <Box
        as="ul"
        flex={1}
        padding={[0, 2, 4, 6, 8]}
        style={{outline: '1px solid red', outlineOffset: -1}}
      >
        <Text>pigment box</Text>
      </Box>
      <Box
        as="ul"
        flex={2}
        padding={[0, 2, 4, 6, 8]}
        style={{outline: '1px solid blue', outlineOffset: -1}}
      >
        <Text>pigment box</Text>
      </Box>
    </Flex>
  )
}
