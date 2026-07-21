import {AddCircleIcon} from '@sanity/icons/AddCircle'
import {Box, Card, Flex, Label, Stack} from '@sanity/ui'
import type {Meta, StoryObj} from '@storybook/react-vite'

import {getAlignControls, getFontSizeControls} from '../controls'

const meta: Meta<typeof Label> = {
  component: Label,
  args: {
    children: 'Jackdaws love my big sphinx of quartz',
  },
  argTypes: {
    align: getAlignControls(),
    size: getFontSizeControls('label'),
  },
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof Label>

export const Default: Story = {
  render: (props) => <Label {...props} />,
}

export const Accent: Story = {
  args: {
    accent: true,
  },
  parameters: {
    controls: {
      include: ['accent', 'size'],
    },
  },
  render: (props) => {
    return <Label {...props} />
  },
}

export const Muted: Story = {
  args: {
    muted: true,
  },
  parameters: {
    controls: {
      include: ['muted', 'size'],
    },
  },
  render: (props) => {
    return <Label {...props} />
  },
}

export const Sizes: Story = {
  parameters: {
    controls: {
      include: ['muted'],
    },
  },
  render: (props) => {
    return (
      // oxlint-disable-next-line no-deprecated
      <Stack space={3}>
        <Label {...props} size={4} />
        <Label {...props} size={3} />
        <Label {...props} size={2} />
        <Label {...props} size={1} />
        <Label {...props} size={0} />
      </Stack>
    )
  },
}

export const Weights: Story = {
  parameters: {
    controls: {
      include: ['muted'],
    },
  },
  render: (props) => {
    return (
      // oxlint-disable-next-line no-deprecated
      <Stack space={3}>
        <Label {...props} />
        <Label {...props} weight="medium" />
        <Label {...props} weight="semibold" />
        <Label {...props} weight="bold" />
      </Stack>
    )
  },
}

export const OpticalAlignment: Story = {
  parameters: {controls: {include: []}},
  render: () => (
    <Box padding={[4, 5, 6]}>
      {/* oxlint-disable-next-line no-deprecated */}
      <Stack space={1}>
        {([4, 3, 2, 1, 0] as const).map((size) => (
          <Flex key={size}>
            <Card padding={0} tone="suggest">
              <Label size={size}>Hamburgefonstiv M</Label>
            </Card>
          </Flex>
        ))}

        <Flex>
          <Card padding={2} tone="suggest">
            <Label>
              <AddCircleIcon />
            </Label>
          </Card>
        </Flex>
      </Stack>
    </Box>
  ),
}
