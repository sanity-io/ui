import {withCentered} from '~/storybook/decorators'
import {Button} from '@sanity/ui'
import {action} from '@storybook/addon-actions'
import {select, withKnobs} from '@storybook/addon-knobs'
import React from 'react'

export default {
  title: 'Button',
  decorators: [withCentered, withKnobs],
}

export const plain = () => (
  <Button
    onClick={action('onClick')}
    tone={select('Tone', {Default: undefined, Brand: 'brand'}, undefined, 'Props')}
  >
    Plain
  </Button>
)
