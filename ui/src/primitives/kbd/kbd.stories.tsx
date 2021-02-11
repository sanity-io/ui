import {Card, KBD} from '@sanity/ui'
import {withKnobs} from '@storybook/addon-knobs'
import React from 'react'
import {withCentered} from '$storybook/decorators'

export default {
  title: 'Atoms/KBD',
  decorators: [withCentered, withKnobs],
}

export const plain = () => (
  <Card padding={4}>
    <KBD style={{verticalAlign: 'top'}}>Ctrl</KBD>
  </Card>
)
