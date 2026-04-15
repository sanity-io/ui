import {Box, Code, FONT_CODE_SIZE} from '@sanity/ui'
import {useSelect, useText} from '@sanity/ui-workshop'

import {WORKSHOP_CODE_LANGUAGE_OPTIONS} from '$workshop'

export default function PropsStory(): React.JSX.Element {
  const code = useText('Code', `console.log('Hello, world')`)
  const language = useSelect('Language', WORKSHOP_CODE_LANGUAGE_OPTIONS, 'typescript')
  const size = useSelect('Size', [undefined, ...FONT_CODE_SIZE], 1)

  return (
    <Box padding={[4, 5, 6]}>
      <Code language={language} size={size}>
        {code}
      </Code>
    </Box>
  )
}
