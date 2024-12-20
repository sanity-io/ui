import {ArrowDownIcon, ArrowUpIcon} from '@sanity/icons'
import {Button, Flex, Stack} from '@sanity/ui/index'
import type {Meta, StoryObj} from '@storybook/react'
import {PopoverButton, PopoverButtonProps} from '../../src/core/components/popover-button'

function StoryComponent(props: PopoverButtonProps) {
  // De-structure props that we should not be forwarded to the PopoverButton component.
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const {renderButton, renderContent, ariaHasPopUp, ...rest} = props

  return (
    <Flex align="center" justify="center" height="fill" padding={5}>
      <PopoverButton
        ariaHasPopUp={ariaHasPopUp || 'true'}
        renderButton={({isOpen}) => (
          <Button
            mode="bleed"
            text={isOpen ? 'Close' : 'Open'}
            icon={isOpen ? ArrowDownIcon : ArrowUpIcon}
          />
        )}
        renderContent={({close}) => (
          <Stack role="menu">
            <Button mode="bleed" role="menuitem" text="First" />
            <Button mode="bleed" role="menuitem" text="Second" />
            <Button mode="bleed" role="menuitem" text="Third" onClick={close} />
          </Stack>
        )}
        padding={2}
        {...rest}
      />
    </Flex>
  )
}

const meta: Meta<PopoverButtonProps> = {
  component: PopoverButton,
}

export default meta
type Story = StoryObj<PopoverButtonProps>

export const Default: Story = {
  render: StoryComponent,
}
