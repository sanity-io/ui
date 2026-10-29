import type {Meta, StoryObj} from '@storybook/react-vite'
import {useState} from 'react'
import {expect, userEvent} from 'storybook/test'

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

    await expect(await canvas.findByRole('tablist', {name: 'Basic tabs'})).toBeInTheDocument()
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

// Test click and keyboard interactions as per https://www.w3.org/WAI/ARIA/apg/patterns/tabs
// Runs only with Vitest, not surfaced in Storybook
export const Interactions: Story = {
  tags: ['!dev', '!autodocs'],
  render: (props) => <TabsDefaultStory {...props} />,
  play: async ({canvas, step}) => {
    const firstTab = await canvas.findByRole('tab', {name: 'First Tab'})
    const secondTab = await canvas.findByRole('tab', {name: 'Second Tab'})
    const thirdTab = await canvas.findByRole('tab', {name: 'Third Tab'})

    await step('Click selects a tab and shows its panel', async () => {
      await userEvent.click(secondTab)

      await expect(secondTab).toHaveAttribute('aria-selected', 'true')
      await expect(firstTab).toHaveAttribute('aria-selected', 'false')
      await expect(canvas.getByText('Second tab panel')).toBeVisible()
      await expect(canvas.getByText('First tab panel')).not.toBeVisible()
    })

    await step('Only the selected tab is in the tab sequence', async () => {
      await expect(secondTab).toHaveAttribute('tabindex', '0')
      await expect(firstTab).toHaveAttribute('tabindex', '-1')
      await expect(thirdTab).toHaveAttribute('tabindex', '-1')
    })

    await step('Arrow keys move focus without a change to the selection', async () => {
      secondTab.focus()

      await userEvent.keyboard('{ArrowRight}')
      await expect(thirdTab).toHaveFocus()
      await expect(secondTab).toHaveAttribute('aria-selected', 'true')

      await userEvent.keyboard('{ArrowLeft}')
      await expect(secondTab).toHaveFocus()
    })

    await step('Arrow keys wrap at the ends', async () => {
      thirdTab.focus()
      await userEvent.keyboard('{ArrowRight}')
      await expect(firstTab).toHaveFocus()

      await userEvent.keyboard('{ArrowLeft}')
      await expect(thirdTab).toHaveFocus()
    })

    await step('Home and End move focus to the first and last tab', async () => {
      await userEvent.keyboard('{Home}')
      await expect(firstTab).toHaveFocus()

      await userEvent.keyboard('{End}')
      await expect(thirdTab).toHaveFocus()
    })

    await step('Up and Down arrows do not move focus', async () => {
      await userEvent.keyboard('{ArrowDown}')
      await expect(thirdTab).toHaveFocus()

      await userEvent.keyboard('{ArrowUp}')
      await expect(thirdTab).toHaveFocus()
    })

    await step('Enter and Space select the focused tab', async () => {
      await userEvent.keyboard('{Enter}')
      await expect(thirdTab).toHaveAttribute('aria-selected', 'true')
      await expect(canvas.getByText('Third tab panel')).toBeVisible()

      await userEvent.keyboard('{Home}')
      await userEvent.keyboard(' ')
      await expect(firstTab).toHaveAttribute('aria-selected', 'true')
      await expect(canvas.getByText('First tab panel')).toBeVisible()
    })

    await step(
      'Tab moves focus to the panel, and Shift+Tab returns to the selected tab',
      async () => {
        await userEvent.keyboard('{End}')
        await expect(thirdTab).toHaveFocus()

        await userEvent.tab()
        await expect(canvas.getByText('First tab panel')).toHaveFocus()

        await userEvent.tab({shift: true})
        await expect(firstTab).toHaveFocus()
      },
    )
  },
}
