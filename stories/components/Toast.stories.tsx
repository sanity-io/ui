/* eslint-disable react-hooks/rules-of-hooks */
import type {Meta, StoryFn, StoryObj} from '@storybook/react'
import {Toast, ToastProvider, useToast} from '../../src/core/components'
import {Button, Inline} from '../../src/core/primitives'
import {styled} from 'styled-components'
import {LayerProvider} from '@sanity/ui/_visual-editing'

const Foo = styled.div.attrs<{$color: string}>((props) => ({style: {color: props.$color}}))`
  display: block;
`

const meta: Meta<typeof Toast> = {
  args: {title: 'Toast title', description: 'Toast description'},
  component: Toast,
  decorators: [
    (Story: StoryFn): React.JSX.Element => (
      <LayerProvider zOffset={1}>
        <ToastProvider padding={5} zOffset={10}>
          {/* @ts-expect-error fix later */}
          <Foo $color="red" style={{color: 'blue', background: 'blue'}}>
            Bar
          </Foo>
          <LayerProvider>
            <Story />
          </LayerProvider>
        </ToastProvider>
      </LayerProvider>
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
              // duration: Infinity,
              duration: 30_000,
              title: 'Some message',
            })
          }
          text="Push some message"
        />
      </Inline>
    )
  },
}
