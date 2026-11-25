import type {Meta, StoryObj} from '@storybook/react-vite'
import {expect, userEvent, waitFor, screen} from 'storybook/test'

import {Button} from '../../../../packages/ui/src/components/button/Button'
import {Menu} from '../../../../packages/ui/src/components/menu/Menu'

const meta: Meta<typeof Menu> = {
  title: 'Components/Menu',
  args: {},
  component: Menu,
  tags: ['autodocs'],
  parameters: {
    a11y: {
      context: '[data-ui="Menu"]',
    },
    performance: {
      component: Menu,
    },
  },
}

export default meta
type Story = StoryObj<typeof Menu>

export const Default: Story = {
  render: (props) => {
    return (
      <Menu
        {...props}
        menu={
          <Menu.Content aria-label="Menu">
            {Array.from({length: 5}, (_value, i) => (
              <Menu.Button key={i} text={`Menu Item ${i + 1}`} />
            ))}
          </Menu.Content>
        }
      >
        <Button text="Open Menu" level="tertiary" />
      </Menu>
    )
  },
  play: async ({canvas}) => {
    const trigger = await canvas.getByRole('button', {name: 'Open Menu'})
    await userEvent.click(trigger)
    const menu = await canvas.findByLabelText('Menu')
    await waitFor(async () => await expect(menu).toBeVisible(), {timeout: 500})
    await userEvent.click(trigger)
    trigger.blur()
  },
}

export const WithSubmenus: Story = {
  render: (props) => {
    return (
      <Menu
        {...props}
        portal
        menu={
          <Menu.Content aria-label="Menu">
            {Array.from({length: 3}, (_value, i) => (
              <Menu.Button key={i} text={`Menu Item ${i + 1}`} />
            ))}
            <Menu.Submenu
              menu={
                <Menu.Content aria-label="Submenu 1">
                  {Array.from({length: 10}, (_value, i) => (
                    <Menu.Button key={i} text={`Submenu 1 Item ${i + 1}`} />
                  ))}
                </Menu.Content>
              }
            >
              <Menu.Button text="Submenu 1" />
            </Menu.Submenu>
            <Menu.Submenu
              menu={
                <Menu.Content aria-label="Submenu 2">
                  {Array.from({length: 20}, (_value, i) => (
                    <Menu.Button key={i} text={`Submenu 2 Item ${i + 1}`} />
                  ))}
                </Menu.Content>
              }
            >
              <Menu.Button text="Submenu 2" />
            </Menu.Submenu>
          </Menu.Content>
        }
      >
        <Button text="Open Menu" level="tertiary" />
      </Menu>
    )
  },
  play: async ({canvas, step}) => {
    const trigger = await canvas.getByRole('button', {name: 'Open Menu'})
    let submenu: HTMLElement | undefined

    await step('Open the menu on click', async () => {
      await userEvent.click(trigger)
      const menu = await screen.findByLabelText('Menu')
      await waitFor(async () => await expect(menu).toBeVisible(), {timeout: 500})
    })

    await step('Open the submenu on hover, focus on click', async () => {
      const submenuTrigger = await screen.getByRole('menuitem', {name: 'Submenu 1'})
      await userEvent.hover(submenuTrigger)
      submenu = await screen.findByLabelText('Submenu 1')
      await waitFor(async () => await expect(submenu).toBeVisible(), {timeout: 500})
      await userEvent.click(submenuTrigger)
      const submenuFirstItem = await screen.getByRole('menuitem', {name: 'Submenu 1 Item 1'})
      await expect(submenuFirstItem).toHaveFocus()
    })

    await step('Close the submenu when hover shifts', async () => {
      const menuFirstItem = await screen.getByRole('menuitem', {name: 'Menu Item 1'})
      await userEvent.hover(menuFirstItem)
      await expect(submenu).not.toBeVisible()
    })

    await userEvent.click(trigger)
    trigger.blur()
  },
}

export const MenuKeyboardControls: Story = {
  // tags: ['!dev', '!autodocs'],
  render: () => {
    return (
      <Menu
        menu={
          <Menu.Content aria-label="Menu">
            {Array.from({length: 5}, (_value, i) => (
              <Menu.Button key={i} text={`Menu Item ${i + 1}`} />
            ))}
          </Menu.Content>
        }
      >
        <Button text="Open Menu" level="tertiary" />
      </Menu>
    )
  },
  play: async ({canvas, step}) => {
    const trigger = await canvas.getByRole('button', {name: 'Open Menu'})
    let menu: HTMLElement | undefined
    let firstItem: HTMLElement | undefined

    await step('Open, focus, and navigate on arrow down', async () => {
      trigger.focus()
      await userEvent.keyboard('{ArrowDown}')
      menu = await canvas.findByLabelText('Menu')
      await waitFor(async () => await expect(menu).toBeVisible(), {timeout: 500})
      firstItem = await canvas.findByRole('menuitem', {name: 'Menu Item 1'})
      const secondItem = await canvas.getByRole('menuitem', {name: 'Menu Item 2'})
      await expect(firstItem).toHaveFocus()
      await userEvent.keyboard('{ArrowDown}')
      await expect(secondItem).toHaveFocus()
    })

    await step('Close on tab', async () => {
      await userEvent.keyboard('{Tab}')
      await expect(menu).not.toBeVisible()
    })

    await step('Open, focus, and navigate on arrow up', async () => {
      trigger.focus()
      await userEvent.keyboard('{ArrowUp}')
      await waitFor(async () => await expect(menu).toBeVisible(), {timeout: 500})
      const fifthItem = await canvas.getByRole('menuitem', {name: 'Menu Item 5'})
      const fourthItem = await canvas.getByRole('menuitem', {name: 'Menu Item 4'})
      await expect(fifthItem).toHaveFocus()
      await userEvent.keyboard('{ArrowUp}')
      await expect(fourthItem).toHaveFocus()
    })

    await step('Close on tab', async () => {
      await userEvent.keyboard('{Tab}')
      await expect(menu).not.toBeVisible()
    })

    await step('Open and focus on enter', async () => {
      trigger.focus()
      await userEvent.keyboard('{Enter}')
      await waitFor(async () => await expect(menu).toBeVisible(), {timeout: 500})
      await expect(firstItem).toHaveFocus()
    })
  },
}

export const SubmenuKeyboardControls: Story = {
  // tags: ['!dev', '!autodocs'],
  render: () => {
    return (
      <Menu
        menu={
          <Menu.Content aria-label="Menu">
            {Array.from({length: 2}, (_value, i) => (
              <Menu.Button key={i} text={`Menu Item ${i + 1}`} />
            ))}
            <Menu.Submenu
              menu={
                <Menu.Content aria-label="Submenu 1">
                  {Array.from({length: 3}, (_value, i) => (
                    <Menu.Button key={i} text={`Submenu 1 Item ${i + 1}`} />
                  ))}
                </Menu.Content>
              }
            >
              <Menu.Button text="Submenu 1" />
            </Menu.Submenu>
          </Menu.Content>
        }
      >
        <Button text="Open Menu" level="tertiary" />
      </Menu>
    )
  },
  play: async ({canvas, step}) => {
    const trigger = await canvas.getByRole('button', {name: 'Open Menu'})
    let menu: HTMLElement | undefined
    let submenu: HTMLElement | undefined

    await step('Open menu on arrow down', async () => {
      trigger.focus()
      await userEvent.keyboard('{ArrowDown}')
      menu = await canvas.findByLabelText('Menu')
      await waitFor(async () => await expect(menu).toBeVisible(), {timeout: 500})
    })

    await step('Open submenu and focus on arrow right', async () => {
      await userEvent.keyboard('{ArrowDown}')
      await userEvent.keyboard('{ArrowDown}')
      await userEvent.keyboard('{ArrowRight}')
      submenu = await screen.findByLabelText('Submenu 1')
      await waitFor(async () => await expect(submenu).toBeVisible(), {timeout: 500})
      const submenuFirstItem = await screen.getByRole('menuitem', {name: 'Submenu 1 Item 1'})
      await expect(submenuFirstItem).toHaveFocus()
    })

    await step('Close submenu and refocus on trigger on arrow left', async () => {
      const submenuTrigger = await canvas.getByRole('menuitem', {name: 'Submenu 1'})
      await userEvent.keyboard('{ArrowLeft}')
      await expect(submenu).not.toBeVisible()
      await expect(submenuTrigger).toHaveFocus()
    })

    await step('Open submenu and focus on enter', async () => {
      await userEvent.keyboard('{Enter}')
      await waitFor(async () => await expect(submenu).toBeVisible(), {timeout: 500})
      const submenuFirstItem = await screen.getByRole('menuitem', {name: 'Submenu 1 Item 1'})
      await expect(submenuFirstItem).toHaveFocus()
    })

    await step('Shift focus on hover', async () => {
      const submenuSecondItem = await screen.getByRole('menuitem', {name: 'Submenu 1 Item 2'})
      await userEvent.hover(submenuSecondItem)
      await expect(submenu).toHaveFocus()
    })
  },
}
