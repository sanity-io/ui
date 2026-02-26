// import {Box, Button, Grid, Heading, Inline, Toast, ToastProvider, useToast} from '@sanity/ui'
import {Toast, ToastProvider, useToast} from '@sanity/ui/components/toast'
import {Box} from '@sanity/ui/primitives/box'
import {Button} from '@sanity/ui/primitives/button'
import {Grid} from '@sanity/ui/primitives/grid'
import {Heading} from '@sanity/ui/primitives/heading'
import {Inline} from '@sanity/ui/primitives/inline'
import type {Meta, StoryFn, StoryObj} from '@storybook/react-vite'
import {useId} from 'react'

const meta: Meta<typeof Toast> = {
  args: {title: 'Toast title', description: 'Toast description'},
  component: Toast,
  decorators: [
    (Story: StoryFn): React.JSX.Element => (
      <ToastProvider>
        {/* @ts-expect-error fix later */}
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
  render: function WithHook() {
    const toast = useToast()
    const id1 = useId()
    const id2 = useId()
    const id3 = useId()

    // Based on https://github.com/sanity-io/sanity/blob/54af2dd01d670367ace54f34d0f479af4b2b28db/packages/sanity/src/structure/panes/document/documentPanel/documentViews/useConditionalToast.ts#L5-L29
    const syncLockToast = () => {
      const id = 'sync-lock'
      const status = 'warning' as const
      const title = 'Syncing document…'
      const description =
        'Please hold tight while the document is synced. This usually happens right after the document has been published, and it should not take more than a few seconds'
      const closable = true

      toast.push({
        id,
        status,
        title,
        description,
        closable,
        duration: 1000 * 60 * 60 * 24 * 24,
      })

      return () => toast.push({id, status, title, description, closable, duration: 0.01})
    }

    return (
      <Grid gap={4} gridTemplateColumns={1}>
        <Grid gap={2} gridTemplateColumns={1}>
          <Heading>Default duration</Heading>
          <Inline gap={2}>
            <Button
              text="Push info"
              tone="primary"
              onClick={() =>
                toast.push({
                  id: id1,
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
            />
            <Button
              text="Push warning"
              tone="caution"
              onClick={() =>
                toast.push({
                  id: id1,
                  closable: true,
                  title: 'Warning',
                  status: 'warning',
                })
              }
            />
            <Button
              text="Push error"
              tone="critical"
              onClick={() =>
                toast.push({
                  id: id1,
                  closable: true,
                  title: 'Error',
                  status: 'error',
                })
              }
            />
            <Button
              text="Push some message"
              onClick={() =>
                toast.push({
                  closable: true,
                  title: 'Some message',
                })
              }
            />
          </Inline>
        </Grid>
        <Grid gap={2} gridTemplateColumns={1}>
          <Heading>10s duration</Heading>
          <Inline gap={2}>
            <Button
              text="Push info"
              tone="primary"
              onClick={() =>
                toast.push({
                  id: id2,
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
                  duration: 10_000,
                })
              }
            />
            <Button
              text="Push warning"
              tone="caution"
              onClick={() =>
                toast.push({
                  id: id2,
                  closable: true,
                  title: 'Warning',
                  status: 'warning',
                  duration: 10_000,
                })
              }
            />
            <Button
              text="Push error"
              tone="critical"
              onClick={() =>
                toast.push({
                  id: id2,
                  closable: true,
                  title: 'Error',
                  status: 'error',
                  duration: 10_000,
                })
              }
            />
            <Button
              text="Push some message"
              onClick={() =>
                toast.push({
                  closable: true,
                  title: 'Some message',
                  duration: 10_000,
                })
              }
            />
          </Inline>
        </Grid>
        <Grid gap={2} gridTemplateColumns={1}>
          <Heading>Infinite duration</Heading>
          <Inline gap={2}>
            <Button
              text="Push info"
              tone="primary"
              onClick={() =>
                toast.push({
                  id: id3,
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
                  duration: Infinity,
                })
              }
            />
            <Button
              text="Push warning"
              tone="caution"
              onClick={() =>
                toast.push({
                  id: id3,
                  closable: true,
                  title: 'Warning',
                  status: 'warning',
                  duration: Infinity,
                })
              }
            />
            <Button
              text="Push error"
              tone="critical"
              onClick={() =>
                toast.push({
                  id: id3,
                  closable: true,
                  title: 'Error',
                  status: 'error',
                  duration: Infinity,
                })
              }
            />
            <Button
              text="Push some message"
              onClick={() =>
                toast.push({
                  closable: true,
                  title: 'Some message',
                  duration: Infinity,
                })
              }
            />
          </Inline>
        </Grid>
        <Grid gap={2} gridTemplateColumns={1}>
          <Heading>Sanity Studio patterns</Heading>
          <Inline gap={2}>
            <Button
              text="New package available"
              tone="primary"
              onClick={() =>
                toast.push({
                  // Based on https://github.com/sanity-io/sanity/blob/4945f0ad8a07a916d717cc4024179362edf73118/packages/sanity/src/core/studio/packageVersionStatus/PackageVersionStatusProvider.tsx#L31-L53
                  id: 'new-package-available',
                  title: 'Sanity Studio is ready to update!',
                  description: (
                    <Box paddingTop={2}>
                      <Button
                        gap={3}
                        padding={3}
                        text="Push to reload"
                        tone="primary"
                        onClick={() => window.location.reload()}
                      />
                    </Box>
                  ),
                  closable: true,
                  status: 'info',
                  duration: 1000 * 60 * 60 * 24 * 24,
                })
              }
            />
            <Button
              text="Sync before publish"
              tone="caution"
              onClick={async () => {
                const hide = syncLockToast()

                await new Promise((resolve) => setTimeout(resolve, 1_000))
                hide()

                toast.push({
                  closable: true,
                  title: 'Document published',
                  status: 'success',
                })
              }}
            />
            <Button
              text="Sync eventually fails"
              tone="critical"
              onClick={async () => {
                const hide = syncLockToast()

                await new Promise((resolve) => setTimeout(resolve, 2_000))
                hide()

                toast.push({
                  closable: true,
                  title: 'Document failed to sync',
                  status: 'error',
                  duration: 10_000,
                })
              }}
            />
            <Button
              text="Publish right away"
              onClick={() => {
                const hide = syncLockToast()

                hide()

                toast.push({
                  closable: true,
                  title: 'Document published',
                  status: 'success',
                })
              }}
            />
          </Inline>
        </Grid>
      </Grid>
    )
  },
}
