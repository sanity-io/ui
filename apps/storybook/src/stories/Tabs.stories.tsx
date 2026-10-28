import type {Meta, StoryObj} from '@storybook/react-vite'
import {useState} from 'react'
import {expect} from 'storybook/test'

import {Box} from '../../../../packages/ui/src/components/box/Box'
import {Card} from '../../../../packages/ui/src/components/card/Card'
import {Tabs} from '../../../../packages/ui/src/components/tabs/Tabs'
import {type TabsProps, tabsProps} from '../../../../packages/ui/src/components/tabs/tabs.props'
import {getArgTypes} from '../utils/getArgTypes'

const argTypes = getArgTypes(tabsProps)

const meta: Meta<typeof Tabs> = {
  title: 'Components/Tabs',
  args: {},
  argTypes,
  component: Tabs,
  tags: ['autodocs'],
  parameters: {
    a11y: {
      context: '[data-ui="Tabs"]',
    },
    performance: {
      component: Tabs,
    },
  },
}

export default meta
type Story = StoryObj<typeof Tabs>

function TabsDefaultStory(props: TabsProps) {
  const [value, setValue] = useState('1')

  return (
    <Tabs {...props} value={value} onValueChange={setValue}>
      <Tabs.List aria-label="Basic tabs">
        <Tabs.Tab label="First Tab" value="1" />
        <Tabs.Tab label="Second Tab" value="2" />
        <Tabs.Tab label="Third Tab" value="3" />
      </Tabs.List>
      <Box marginTop={3}>
        <Tabs.Panel value="1">First tab panel</Tabs.Panel>
        <Tabs.Panel value="2">Second tab panel</Tabs.Panel>
        <Tabs.Panel value="3">Third tab panel</Tabs.Panel>
      </Box>
    </Tabs>
  )
}

function TabsTonesStory(props: TabsProps) {
  const [value, setValue] = useState('neutral')

  return (
    <Tabs {...props} value={value} onValueChange={setValue}>
      <Tabs.List aria-label="Toned tabs">
        <Tabs.Tab label="Neutral Tab" value="neutral" />
        <Tabs.Tab label="Positive Tab" value="positive" tone="positive" />
        <Tabs.Tab label="Suggest Tab" value="suggest" tone="suggest" />
        <Tabs.Tab label="Caution Tab" value="caution" tone="caution" />
        <Tabs.Tab label="Critical Tab" value="critical" tone="critical" />
      </Tabs.List>
      <Box marginTop={3}>
        <Tabs.Panel value="neutral">
          <Card tone="neutral">Neutral Card in tab panel</Card>
        </Tabs.Panel>
        <Tabs.Panel value="positive">
          <Card tone="positive">Positive Card in tab panel</Card>
        </Tabs.Panel>
        <Tabs.Panel value="suggest">
          <Card tone="suggest">Suggest Card in tab panel</Card>
        </Tabs.Panel>
        <Tabs.Panel value="caution">
          <Card tone="caution">Caution Card in tab panel</Card>
        </Tabs.Panel>
        <Tabs.Panel value="critical">
          <Card tone="critical">Critical Card in tab panel</Card>
        </Tabs.Panel>
      </Box>
    </Tabs>
  )
}

export const Default: Story = {
  render: (props) => <TabsDefaultStory {...props} />,
  play: async ({canvas}) => {
    const firstTab = await canvas.findByRole('tab', {name: 'First Tab'})
    const secondTab = await canvas.findByRole('tab', {name: 'Second Tab'})

    await expect(await canvas.findByRole('tablist')).toBeInTheDocument()
    await expect(firstTab).toHaveAttribute('type', 'button')

    await expect(firstTab).toHaveAttribute('aria-selected', 'true')
    await expect(secondTab).toHaveAttribute('aria-selected', 'false')
    await expect(canvas.getByText('First tab panel')).toBeVisible()
    await expect(canvas.getByText('Second tab panel')).not.toBeVisible()

    await expect(canvas.getByText('First tab panel')).toHaveAttribute(
      'aria-labelledby',
      firstTab.id,
    )
    await expect(firstTab).toHaveAttribute('aria-controls', canvas.getByText('First tab panel').id)
  },
}

export const Tones: Story = {
  render: (props) => <TabsTonesStory {...props} />,
  play: async ({canvas}) => {
    await expect((await canvas.findByRole('tab', {name: 'Neutral Tab'})).classList).toContain(
      'sui-tone-neutral',
    )
    await expect((await canvas.findByRole('tab', {name: 'Positive Tab'})).classList).toContain(
      'sui-tone-positive',
    )
    await expect((await canvas.findByRole('tab', {name: 'Suggest Tab'})).classList).toContain(
      'sui-tone-suggest',
    )
    await expect((await canvas.findByRole('tab', {name: 'Caution Tab'})).classList).toContain(
      'sui-tone-caution',
    )
    await expect((await canvas.findByRole('tab', {name: 'Critical Tab'})).classList).toContain(
      'sui-tone-critical',
    )

    await expect(canvas.getByText('Neutral Card in tab panel')).toBeVisible()
    await expect(canvas.getByText('Critical Card in tab panel')).not.toBeVisible()
  },
}
