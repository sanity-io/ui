import {withKnobs} from '@storybook/addon-knobs'
import React from 'react'
import {useMediaIndex} from './useMediaIndex'

export default {
  decorators: [withKnobs],
  title: 'Hooks/useMediaIndex',
}

export const test = () => {
  return <TestExample />
}

function TestExample() {
  const mediaIndex = useMediaIndex()

  return <div>{mediaIndex}</div>
}
