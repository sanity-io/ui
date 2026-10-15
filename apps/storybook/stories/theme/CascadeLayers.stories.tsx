import {Button, Card, Flex, Stack, Text} from '@sanity/ui'
import {Code} from '@sanity/ui/code'
import type {Meta, StoryObj} from '@storybook/react-vite'
import {expect, waitFor} from 'storybook/test'

const meta: Meta = {
  parameters: {controls: {include: []}},
}

export default meta
type Story = StoryObj

const APP_CSS = `@layer app {
  .app-button {
    background-color: rgb(240, 62, 47);
  }
}`

export const LayeredOverride: Story = {
  render: () => (
    <Stack gap={4}>
      <style>{APP_CSS}</style>
      <Text muted size={1}>
        The page declares <code>app</code> after <code>u-styled</code>, so the class below beats the
        background that <code>Button</code> sets with styled-components.
      </Text>
      <Card padding={3} radius={2} tone="transparent">
        <Code size={1}>{APP_CSS}</Code>
      </Card>
      <Flex gap={3}>
        <Button id="ui-button" text="Button" tone="primary" />
        <Button className="app-button" id="app-button" text="Button.app-button" tone="primary" />
      </Flex>
    </Stack>
  ),
  play: async ({canvasElement}) => {
    const uiButton = canvasElement.querySelector('#ui-button')!
    const appButton = canvasElement.querySelector('#app-button')!

    await waitFor(() =>
      expect(getComputedStyle(appButton).backgroundColor).toBe('rgb(240, 62, 47)'),
    )
    await expect(getComputedStyle(uiButton).backgroundColor).not.toBe('rgb(240, 62, 47)')
  },
}
