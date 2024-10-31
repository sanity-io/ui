import {Box, Text} from '@sanity/ui'
import {_input, _inputElement, _inputPresentation} from '@sanity/ui/css'

export default function CustomInputStory() {
  return (
    <Box padding={4}>
      <Box className={_input({border: true, padding: 3, radius: 2})}>
        <button className={_inputElement()} tabIndex={0}>
          <Text>Input text</Text>
        </button>

        <Box className={_inputPresentation()} padding={3}></Box>
      </Box>
    </Box>
  )
}
