import {Box, Code, FONT_CODE_SIZE} from '@sanity/ui'
import {useSelect, useText} from '@sanity/ui-workshop'

import {CardWrapper, WORKSHOP_CODE_LANGUAGE_OPTIONS} from '$workshop'

export default function PropsStory(): React.JSX.Element {
  const code = useText('Code', `console.log('Hello, world')`)
  const language = useSelect('Language', WORKSHOP_CODE_LANGUAGE_OPTIONS, 'typescript')
  const size = useSelect('Size', [undefined, ...FONT_CODE_SIZE], 1)

  return (
    <CardWrapper alignItems="center" display="flex" justifyContent="center">
      <Box muted overflow="auto" padding={3} radius={3}>
        <Code language={language} size={size}>
          {code}
        </Code>
      </Box>
    </CardWrapper>
  )
}
