import {Button, Toast, ToastProvider, useToast} from '@sanity/ui'
import {withKnobs} from '@storybook/addon-knobs'
import React from 'react'
import {withCentered} from '~/storybook/decorators'

export default {
  decorators: [withCentered, withKnobs],
  title: 'Components/Toast',
}

export const toast = () => <Toast title="Test" />

export const hook = () => (
  <ToastProvider>
    <UseToastExample />
  </ToastProvider>
)

function UseToastExample() {
  const toast = useToast()

  return (
    <Button
      onClick={() =>
        toast.push({
          closable: true,
          description: <>Sanity autosaves your work</>,
          status: 'info',
        })
      }
      text="Push toast"
    />
  )
}
