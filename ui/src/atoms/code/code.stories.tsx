import {withCentered} from '~/storybook/decorators'
import {Card, Code} from '@sanity/ui'
import {select, text, withKnobs} from '@storybook/addon-knobs'
import React from 'react'
import Refractor from 'react-refractor'
import javascript from 'refractor/lang/javascript'
import json from 'refractor/lang/json'
import jsx from 'refractor/lang/jsx'
import typescript from 'refractor/lang/typescript'

Refractor.registerLanguage(javascript as any)
Refractor.registerLanguage(json as any)
Refractor.registerLanguage(jsx as any)
Refractor.registerLanguage(typescript as any)

export default {
  title: 'Atoms/Code',
  decorators: [
    withCentered,
    withKnobs({
      escapeHTML: false,
    }),
  ],
}

export const plain = () => {
  const code = text('Code', `console.log('Hello, world')`, 'Props')

  const language = select(
    'Language',
    {JavaScript: 'javascript', JSON: 'json', JSX: 'jsx', TypeScript: 'typescript'},
    'typescript',
    'Props'
  )

  const size = select(
    'Size',
    {'0': 0, '1': 1, '2 (default)': undefined, '3': 3, '4': 4},
    undefined,
    'Props'
  )

  return (
    <Card padding={4} radius={2} shadow={2}>
      <Code language={language} size={size}>
        {code}
      </Code>
    </Card>
  )
}
