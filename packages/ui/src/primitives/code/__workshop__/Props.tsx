import {Box, Code} from '@sanity/ui'
import {useSelect, useText} from '@sanity/ui-workshop'

import {WORKSHOP_CODE_LANGUAGE_OPTIONS, WORKSHOP_TEXT_FONT_SIZE_OPTIONS} from '$workshop'

export default function PropsStory(): React.JSX.Element {
  const code = useText('Code', `console.log('Hello, world')`)
  const language = useSelect('Language', WORKSHOP_CODE_LANGUAGE_OPTIONS, 'typescript')
  const size = useSelect('Size', WORKSHOP_TEXT_FONT_SIZE_OPTIONS, 1)

  return (
    <Box padding={[4, 5, 6]}>
      <Code language={language} size={size}>
        {code}
      </Code>
    </Box>
  )
}
