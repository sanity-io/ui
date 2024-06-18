import {Flex, Text} from '@sanity/ui'
import {ReactElement} from 'react'
import {theme} from '../../../theme.css'
import {Box} from '../Box'

export default function PropsStory(): ReactElement {
  return (
    <div className={theme.className}>
      <Flex>
        <Box
          as="ul"
          flex={1}
          padding={[0, 2, 4, 6, 8, 9]}
          style={{outline: '1px solid red', outlineOffset: -1}}
        >
          <Text>pigment box</Text>
        </Box>
        <Box
          as="ul"
          flex={2}
          padding={[0, 2, 4, 6, 8, 9]}
          style={{outline: '1px solid blue', outlineOffset: -1}}
        >
          <Text>pigment box</Text>
        </Box>
      </Flex>
    </div>
  )
}
