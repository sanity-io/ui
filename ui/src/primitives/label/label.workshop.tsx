import {Flex, Label, ThemeFontWeightKey} from '@sanity/ui'
import {defineScope, useSelect, useText} from '@sanity/ui-workshop'
import React from 'react'

const FONT_SIZE_OPTIONS = {'0': 0, '1': 1, '2': 2, '3': 3, '4': 4}

const TEXT_OVERFLOW_OPTIONS: {[key: string]: 'ellipsis' | ''} = {
  None: '',
  Ellipsis: 'ellipsis',
}

const FONT_WEIGHT_OPTIONS: {[key: string]: ThemeFontWeightKey} = {
  Regular: 'regular',
  Medium: 'medium',
  Semibold: 'semibold',
  Bold: 'bold',
}

export default defineScope('primitives/label', 'Label', [
  {name: 'plain', title: 'Plain', component: PlainStory},
])

function PlainStory() {
  const size = useSelect('Size', FONT_SIZE_OPTIONS, undefined, 'Props')
  const textChild = useText('Text', 'Label text', 'Props')
  const textOverflow = useSelect('Text overflow', TEXT_OVERFLOW_OPTIONS, '', 'Props') || undefined
  const weight = useSelect('Weight', FONT_WEIGHT_OPTIONS, undefined, 'Props')

  return (
    <Flex align="center" height="fill" justify="center" padding={[4, 5, 6]} sizing="border">
      <Label size={size} textOverflow={textOverflow} weight={weight}>
        {textChild}
      </Label>
    </Flex>
  )
}
