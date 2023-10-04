import {ArrowDownIcon, ArrowUpIcon, CloseIcon, TrashIcon} from '@sanity/icons'
import type {Meta, StoryObj} from '@storybook/react'
import {useCallback, useState} from 'react'
import {Dialog} from '../../src/components'
import {Box, Button, Card, Inline, Stack, Text} from '../../src/primitives'
import {LayerProvider} from '../../src/utils'
import {
  getContainerWidthControls,
  getPositionControls,
  getRadiusControls,
  getShadowControls,
  getSpaceControls,
} from '../controls'

const meta: Meta<typeof Dialog> = {
  args: {header: 'This is a dialog!'},
  argTypes: {
    padding: getSpaceControls(),
    paddingBottom: getSpaceControls(),
    paddingLeft: getSpaceControls(),
    paddingRight: getSpaceControls(),
    paddingTop: getSpaceControls(),
    paddingX: getSpaceControls(),
    paddingY: getSpaceControls(),
    width: getContainerWidthControls(),
    cardRadius: getRadiusControls(),
    position: getPositionControls(),
    cardShadow: getShadowControls(),
    footer: {control: {disable: true}},
  },
  component: Dialog,
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof Dialog>

export const Default: Story = {
  render: (props) => {
    return (
      <Dialog
        footer={
          <Card padding={4} style={{textAlign: 'right'}}>
            <Inline space={[3, 3, 4]}>
              <Button fontSize={[2, 2, 3]} padding={[3, 3, 4]} text="Close" mode="bleed" />
            </Inline>
          </Card>
        }
        {...props}
      >
        <ContentText />
      </Dialog>
    )
  },
}

export const OpenDialogWithButton: Story = {
  render: () => {
    return <OpenDialogButton />
  },
}
export const Positioning: Story = {
  render: (props) => {
    return (
      <Box padding={4}>
        <Box style={{padding: 'calc(100vh - 100px) 0'}}>
          <Stack space={3}>
            <Text align="center">
              <ArrowUpIcon />
            </Text>
            <Text align="center">Scrollable</Text>
            <Text align="center">
              <ArrowDownIcon />
            </Text>
          </Stack>

          <LayerProvider>
            <Dialog {...props} />
          </LayerProvider>
        </Box>
      </Box>
    )
  },
}

const OpenDialogButton = () => {
  const [open, setOpen] = useState(false)
  const onClose = useCallback(() => setOpen(false), [])
  const onOpen = useCallback(() => setOpen(true), [])

  return (
    <>
      <Button onClick={onOpen} text="Open dialog" />
      {open && (
        <Dialog
          id="open-dialog-with-button"
          onClose={onClose}
          header="This is a dialog!"
          open={open}
          footer={
            <Card padding={4} style={{textAlign: 'center'}}>
              <Inline space={[3, 3, 4]}>
                <Button
                  fontSize={[2, 2, 3]}
                  icon={CloseIcon}
                  padding={[3, 3, 4]}
                  text="Cancel"
                  mode="bleed"
                  onClick={onClose}
                />
                <Button
                  fontSize={[2, 2, 3]}
                  icon={TrashIcon}
                  padding={[3, 3, 4]}
                  text="Delete"
                  tone="critical"
                />
              </Inline>
            </Card>
          }
        >
          <ContentText />
        </Dialog>
      )}
    </>
  )
}

function ContentText() {
  return (
    <Box padding={4}>
      <Text>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque at nisl at sem tempor
        hendrerit scelerisque ut libero. Maecenas iaculis efficitur lorem, ac faucibus mi imperdiet
        quis. Cras a consectetur erat. Fusce imperdiet, dolor et pellentesque iaculis, ex quam
        luctus felis, non ultrices enim sem vitae quam. Duis lorem velit, lacinia at rhoncus a,
        tempus vel neque. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere
        cubilia curae; Sed id mauris quam. Nam finibus sapien non lacinia ultricies. Integer
        fermentum tortor at pellentesque faucibus. In venenatis commodo placerat. Curabitur commodo
        tortor libero, vel pellentesque elit luctus sodales. Donec mattis tristique nunc ac lacinia.
        Vestibulum non pulvinar turpis, posuere consequat arcu. Fusce ut urna blandit, finibus nisi
        a, molestie elit. Nulla sed eleifend mi.
      </Text>
    </Box>
  )
}
