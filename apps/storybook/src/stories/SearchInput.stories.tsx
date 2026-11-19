import type {Meta, StoryObj} from '@storybook/react-vite'
import {useState} from 'react'
import {expect, fn, userEvent} from 'storybook/test'

import {SearchInput} from '../../../../packages/ui/src/components/search-input/SearchInput'
import {searchInputProps} from '../../../../packages/ui/src/components/search-input/searchInput.props'
import {getArgTypes} from '../utils/getArgTypes'

const argTypes = getArgTypes(searchInputProps)

const meta: Meta<typeof SearchInput> = {
  title: 'Forms/SearchInput',
  args: {
    placeholder: 'Search for something…',
  },
  argTypes,
  component: SearchInput,
  tags: ['autodocs'],
  parameters: {
    a11y: {
      context: '[data-ui="SearchInput"]',
    },
    performance: {
      component: SearchInput,
    },
  },
}

export default meta
type Story = StoryObj<typeof SearchInput>

const CLEAR_BUTTON_NAME = 'Clear search query'

export const Default: Story = {
  render: (props) => {
    return <SearchInput {...props} id="search-input" />
  },
  play: async ({canvas, canvasElement}) => {
    const input = await canvas.findByRole('searchbox')

    await expect(input).toHaveAttribute('type', 'search')
    await expect(input).toHaveAttribute('placeholder', 'Search for something…')
    await expect(input.classList).toContain('sui-px2')
    await expect(input.classList).toContain('sui-py1')

    const searchIcon = canvasElement.querySelector('[data-ui="Search-icon"] svg')
    await expect(searchIcon).toHaveAttribute('aria-hidden', 'true')
  },
}

// Checks rendering of non-default props
// Runs only with Vitest, not surfaced in Storybook
export const Rendering: Story = {
  tags: ['!dev', '!autodocs'],
  render: () => (
    <>
      <SearchInput aria-label="Loose density" density="loose" placeholder="Loose" />
      <SearchInput aria-label="No placeholder" />
    </>
  ),
  play: async ({canvas, step}) => {
    await step('Loose density sets larger padding classes', async () => {
      const input = canvas.getByRole('searchbox', {name: 'Loose density'})

      await expect(input.classList).toContain('sui-px3')
      await expect(input.classList).toContain('sui-py2')
    })

    await step('A placeholder of one space is set when no placeholder is given', async () => {
      const input = canvas.getByRole('searchbox', {name: 'No placeholder'})

      await expect(input).toHaveAttribute('placeholder', ' ')
    })
  },
}

// Tests the custom clear button on an uncontrolled input
// Runs only with Vitest, not surfaced in Storybook
export const ClearButton: Story = {
  tags: ['!dev', '!autodocs'],
  args: {
    onChange: fn(),
  },
  render: (props) => <SearchInput {...props} aria-label="Search" />,
  play: async ({args, canvas, step}) => {
    const input = canvas.getByRole('searchbox', {name: 'Search'})

    await step('The clear button is hidden when the input is empty', async () => {
      await expect(canvas.queryByRole('button', {name: CLEAR_BUTTON_NAME})).toBeNull()
    })

    await step('The clear button is shown when the input has a value', async () => {
      await userEvent.type(input, 'cats')

      await expect(canvas.getByRole('button', {name: CLEAR_BUTTON_NAME})).toBeVisible()
    })

    await step('The clear button is hidden when the user deletes the value', async () => {
      await userEvent.clear(input)

      await expect(canvas.queryByRole('button', {name: CLEAR_BUTTON_NAME})).toBeNull()
    })

    await step('A click on the clear button clears the input and calls onChange', async () => {
      await userEvent.type(input, 'cats')
      const onChange = args.onChange as ReturnType<typeof fn>
      onChange.mockClear()

      await userEvent.click(canvas.getByRole('button', {name: CLEAR_BUTTON_NAME}))

      await expect(input).toHaveValue('')
      await expect(onChange).toHaveBeenCalledOnce()
      await expect(canvas.queryByRole('button', {name: CLEAR_BUTTON_NAME})).toBeNull()
    })

    await step('The input has focus after a clear', async () => {
      await expect(input).toHaveFocus()
    })

    await step('The clear button clears the input from the keyboard', async () => {
      await userEvent.type(input, 'cats')
      await userEvent.tab()

      await expect(canvas.getByRole('button', {name: CLEAR_BUTTON_NAME})).toHaveFocus()

      await userEvent.keyboard('{Enter}')

      await expect(input).toHaveValue('')
      await expect(input).toHaveFocus()
    })
  },
}

function ControlledSearchInput() {
  const [value, setValue] = useState('cats')

  return (
    <>
      <SearchInput
        aria-label="Search"
        value={value}
        onChange={(event) => setValue(event.target.value)}
      />
      <p data-testid="state-value">{value}</p>
    </>
  )
}

// Tests the custom clear button on a controlled input
// Runs only with Vitest, not surfaced in Storybook
export const ClearButtonControlled: Story = {
  tags: ['!dev', '!autodocs'],
  render: () => <ControlledSearchInput />,
  play: async ({canvas, step}) => {
    const input = canvas.getByRole('searchbox', {name: 'Search'})
    const stateValue = canvas.getByTestId('state-value')

    await step('The clear button updates the state of the parent', async () => {
      await expect(input).toHaveValue('cats')

      await userEvent.click(canvas.getByRole('button', {name: CLEAR_BUTTON_NAME}))

      await expect(input).toHaveValue('')
      await expect(stateValue).toHaveTextContent(/^$/)
    })

    await step('The input accepts new text after a clear', async () => {
      await userEvent.type(input, 'dogs')

      await expect(input).toHaveValue('dogs')
      await expect(stateValue).toHaveTextContent('dogs')
    })
  },
}

// Tests that the clear button is not available when the input cannot be edited
// Runs only with Vitest, not surfaced in Storybook
export const ClearButtonNotEditable: Story = {
  tags: ['!dev', '!autodocs'],
  render: () => (
    <>
      <SearchInput aria-label="Disabled" defaultValue="cats" disabled />
      <SearchInput aria-label="Read-only" defaultValue="cats" readOnly />
    </>
  ),
  play: async ({canvas, step}) => {
    await step('The inputs have values', async () => {
      await expect(canvas.getByRole('searchbox', {name: 'Disabled'})).toHaveValue('cats')
      await expect(canvas.getByRole('searchbox', {name: 'Read-only'})).toHaveValue('cats')
    })

    await step('The clear button is hidden for disabled and read-only inputs', async () => {
      await expect(canvas.queryAllByRole('button', {name: CLEAR_BUTTON_NAME})).toHaveLength(0)
    })
  },
}
