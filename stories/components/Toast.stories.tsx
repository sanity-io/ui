/* eslint-disable react-hooks/rules-of-hooks */
import type {Meta, StoryFn, StoryObj} from '@storybook/react'
import {Toast, ToastProvider, useToast} from '../../src/components'
import {Button, Inline} from '../../src/primitives'

const meta: Meta<typeof Toast> = {
  args: {title: 'Toast title', description: 'Toast description'},
  component: Toast,
  decorators: [
    (Story: StoryFn): JSX.Element => (
      <ToastProvider>
        <Story />
      </ToastProvider>
    ),
  ],
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof Toast>

export const Default: Story = {
  render: (props) => {
    return <Toast {...props} />
  },
}

export const WithHook: Story = {
  parameters: {
    docs: {
      story: {
        inline: false,
        iframeHeight: 250,
      },
    },
  },
  render: () => {
    const toast = useToast()

    return (
      <Inline space={2}>
        <Button
          onClick={() =>
            toast.push({
              id: 'status',
              closable: true,
              title: 'Information',
              status: 'info',
              description: (
                <>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis faucibus
                  pellentesque luctus. Curabitur sed tortor a elit tempus malesuada. Quisque sed
                  dapibus ligula, id pulvinar nisl.
                </>
              ),
            })
          }
          text="Push info"
          tone="primary"
        />

        <Button
          onClick={() =>
            toast.push({
              id: 'status',
              closable: true,
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
              closable: true,
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
              closable: true,
              title: 'Some message',
            })
          }
          text="Push some message"
        />
      </Inline>
    )
  },
}
