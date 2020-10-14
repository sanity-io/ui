import {KBD} from '@sanity/ui'
import {withKnobs} from '@storybook/addon-knobs'
import React from 'react'
import {withCentered} from '~/storybook/decorators'

export default {
  title: 'Atoms/KBD',
  decorators: [withCentered, withKnobs],
}

export const plain = () => (
  <>
    <KBD>Ctrl</KBD>+<KBD>Ctrl</KBD>+<KBD>Ctrl</KBD>
  </>
)
