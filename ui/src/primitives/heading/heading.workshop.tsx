import {Flex, Heading, ThemeFontWeightKey} from '@sanity/ui'
import {defineScope, useBoolean, useSelect, useText} from '@sanity/ui-workshop'
import React from 'react'

const FONT_SIZE_OPTIONS = {'0': 0, '1': 1, '2 (default)': 2, '3': 3, '4': 4}

const TEXT_OVERFLOW_OPTIONS: {[key: string]: 'ellipsis' | ''} = {None: '', Ellipsis: 'ellipsis'}

const FONT_WEIGHT_OPTIONS: {[key: string]: ThemeFontWeightKey} = {
  Regular: 'regular',
  Medium: 'medium',
  Semibold: 'semibold',
  Bold: 'bold',
}

export default defineScope('primitives/heading', 'Heading', [
  {name: 'plain', title: 'Plain', component: PlainStory},
])

function PlainStory() {
  const accent = useBoolean('Accent', false, 'Props')
  const muted = useBoolean('Muted', false, 'Props')
  const size = useSelect('Size', FONT_SIZE_OPTIONS, 2, 'Props')
  const textChild = useText('Text', 'Hello, world', 'Props')
  const textOverflow = useSelect('Text overflow', TEXT_OVERFLOW_OPTIONS, '', 'Props') || undefined
  const weight = useSelect('Weight', FONT_WEIGHT_OPTIONS, '', 'Props') || undefined

  return (
    <Flex align="center" height="fill" justify="center" padding={[4, 5, 6]} sizing="border">
      <Heading
        accent={accent}
        muted={muted}
        size={size}
        textOverflow={textOverflow}
        weight={weight}
      >
        {textChild}
      </Heading>
    </Flex>
  )
}
