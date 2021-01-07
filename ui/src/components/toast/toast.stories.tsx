import {Button, Inline, Toast, ToastProvider, useToast} from '@sanity/ui'
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
    <Inline space={2}>
      <Button
        onClick={() =>
          toast.push({
            id: 'status',
            // closable: true,
            title: 'Information',
            status: 'info',
          })
        }
        text="Push info"
        tone="primary"
      />

      <Button
        onClick={() =>
          toast.push({
            id: 'status',
            // closable: true,
            title: 'Warning',
            status: 'warning',
          })
        }
        text="Push warning"
        tone="caution"
      />

      <Button
        onClick={() =>
          toast.push({
            id: 'status',
            // closable: true,
            title: 'Error',
            status: 'error',
          })
        }
        text="Push error"
        tone="critical"
      />

      <Button
        onClick={() =>
          toast.push({
            // id: 'status',
            // closable: true,
            title: 'Some message',
            // status: 'error',
          })
        }
        text="Push some message"
      />
    </Inline>
  )
}
