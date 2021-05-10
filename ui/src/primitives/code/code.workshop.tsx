import {Box, Code} from '@sanity/ui'
import {defineScope, useSelect, useText} from '@sanity/ui-workshop'
import React from 'react'

const CODE_LANGUAGE_OPTIONS = {
  JavaScript: 'javascript',
  JSON: 'json',
  JSX: 'jsx',
  TypeScript: 'typescript',
}

const FONT_SIZE_OPTIONS = {'0': 0, '1': 1, '2': 2, '3': 3, '4': 4}

export default defineScope('primitives/code', 'Code', [
  {name: 'props', title: 'Props', component: PropsStory},
])

function PropsStory() {
  const code = useText('Code', `console.log('Hello, world')`, 'Props')
  const language = useSelect('Language', CODE_LANGUAGE_OPTIONS, 'typescript', 'Props')
  const size = useSelect('Size', FONT_SIZE_OPTIONS, undefined, 'Props')

  return (
    <Box padding={[4, 5, 6]}>
      <Code language={language} size={size}>
        {code}
      </Code>
    </Box>
  )
}
