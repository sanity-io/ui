import {withCentered} from '~/storybook/decorators'
import icons from '@sanity/icons'
import {Card, Icon, IconSymbol} from '@sanity/ui'
import {select, withKnobs} from '@storybook/addon-knobs'
import React from 'react'

export default {
  title: 'Icon',
  decorators: [withCentered, withKnobs],
}

const symbolOptions = Object.keys(icons).reduce((acc: {[key: string]: string}, key) => {
  acc[key] = key
  return acc
}, {})

export const plain = () => {
  const symbol = select('Symbol', symbolOptions, 'add-circle', 'Props') as IconSymbol

  return (
    <Card padding={2} style={{fontSize: '2em', lineHeight: 1}}>
      <Icon style={{verticalAlign: 'top'}} symbol={symbol} />
    </Card>
  )
}
