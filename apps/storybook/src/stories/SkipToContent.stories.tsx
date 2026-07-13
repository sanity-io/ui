import type {Meta, StoryObj} from '@storybook/react-vite'
import {expect, userEvent, waitFor} from 'storybook/test'

import {Flex} from '../../../../packages/ui/src/components/flex/Flex'
import {SkipToContent} from '../../../../packages/ui/src/components/skip-to-content/SkipToContent'
import {skipToContentProps} from '../../../../packages/ui/src/components/skip-to-content/skipToContent.props'
import {Square} from '../components/Square'
import {getArgTypes} from '../utils/getArgTypes'

const argTypes = getArgTypes(skipToContentProps)

const meta: Meta<typeof SkipToContent> = {
  title: 'Components/SkipToContent',
  component: SkipToContent,
  tags: ['autodocs'],
  args: {
    hash: '#main',
    label: 'Skip to content',
  },
  argTypes,
  parameters: {
    a11y: {context: '[data-ui="SkipToContent"]'},
    performance: {
      component: SkipToContent,
    },
  },
}

export default meta
type Story = StoryObj<typeof SkipToContent>

export const Default: Story = {
  render: (args) => (
    <>
      <SkipToContent {...args} target="_self" />

      <Flex flexDirection="column" gap={4}>
        <Square>Skippable Content</Square>

        <main id="main" tabIndex={-1}>
          <Square>Main Content</Square>
        </main>
      </Flex>
    </>
  ),
  play: async ({canvas}) => {
    const link = await canvas.findByRole('link', {name: 'Skip to content'})
    await userEvent.tab()
    await expect(document.activeElement).toBe(link)
    userEvent.keyboard('{Enter}')

    await waitFor(async () => {
      await expect(document.activeElement).toBe(document.getElementById('main'))
    })
  },
}
