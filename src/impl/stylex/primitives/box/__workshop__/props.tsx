import {Flex, Text} from '@sanity/ui'
import {ReactElement} from 'react'
import {Box} from '../Box'

export default function PropsStory(): ReactElement {
  return (
    <Flex>
      <Box
        as="ul"
        className="test"
        flex={1}
        padding={4}
        style={{outline: '1px solid red', outlineOffset: -1}}
      >
        <Text>pigment box</Text>
      </Box>
      <Box
        as="ul"
        className="test"
        flex={2}
        padding={[4, 8]}
        style={{outline: '1px solid blue', outlineOffset: -1}}
      >
        <Text>pigment box</Text>
      </Box>
    </Flex>
  )
}
