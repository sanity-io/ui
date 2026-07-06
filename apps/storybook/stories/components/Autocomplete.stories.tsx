import {SearchIcon} from '@sanity/icons'
import type {Meta, StoryFn, StoryObj} from '@storybook/react-vite'
import {useCallback, useState} from 'react'
import {expect, userEvent, waitFor} from 'storybook/test'

import {Autocomplete} from '../../../../packages/ui/src/core/components'
import countries from '../../../../packages/ui/src/core/components/autocomplete/__mocks__/countries'
import {
  Box,
  Button,
  Card,
  Code,
  Container,
  Stack,
  Text,
} from '../../../../packages/ui/src/core/primitives'
import {RADII} from '../constants'
import {rowBuilder} from '../helpers/rowBuilder'

const meta: Meta<typeof Autocomplete> = {
  args: {
    icon: SearchIcon,
    options: [{value: 'foo'}, {value: 'bar'}, {value: 'baz'}],
    placeholder: 'Search...',
  },
  component: Autocomplete,
  decorators: [
    (Story: StoryFn): React.JSX.Element => (
      <Card paddingBottom={8} paddingTop={3}>
        {/* @ts-expect-error fix later */}
        <Story />
      </Card>
    ),
  ],
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof Autocomplete>

export const Default: Story = {
  render: (props) => {
    return <Autocomplete {...props} />
  },
}

export const Loading: Story = {
  args: {loading: true},
  render: (props) => {
    return <Autocomplete {...props} />
  },
}

export const Radius: Story = {
  render: (props) => (
    <>
      {rowBuilder({
        gap: 4,
        renderItem: ({value, index}) => (
          <Autocomplete {...props} key={index} placeholder={String(value)} radius={value} />
        ),
        rows: RADII,
      })}
    </>
  ),
}

interface ExampleOption {
  value: string
  title: string
}

function CustomStory() {
  const data: ExampleOption[] = countries.map((d) => ({value: d.code, title: d.name}))
  const fontSize = 2
  const padding = 3
  const radius = 2
  const [value, setValue] = useState('')

  const renderOption = useCallback(
    (option: ExampleOption) => (
      <Card
        as="a"
        data-qa={`option-${option.value}`}
        href="#"
        key={option.value}
        onClick={(event) => event.preventDefault()}
        padding={padding}
        radius={radius - 1}
      >
        <Text size={fontSize}>{option.title}</Text>
      </Card>
    ),
    [],
  )

  const renderValue = useCallback((currentValue: string, option?: ExampleOption) => {
    return option ? option.title : currentValue
  }, [])

  const filterOption = useCallback((query: string, option: ExampleOption) => {
    return option.title.toLowerCase().indexOf(query.toLowerCase()) > -1
  }, [])

  const options = data.map((item) => ({value: item.value, title: item.title}))

  return (
    <Box paddingX={[4, 5, 6]} paddingY={[5, 6, 7]}>
      <Container width={0}>
        <Stack space={5}>
          <Stack space={3}>
            <Text as="label" htmlFor="custom" id="custom-label" size={1} weight="medium">
              Country
            </Text>
            <Autocomplete
              aria-describedby="custom-label"
              border
              filterOption={filterOption}
              fontSize={fontSize}
              id="custom"
              onChange={setValue}
              openButton
              options={options}
              padding={padding}
              placeholder="Search"
              radius={radius}
              renderOption={renderOption}
              renderValue={renderValue}
              value={value}
            />
          </Stack>

          <Card padding={3} radius={2} tone="transparent">
            <Code size={1}>{JSON.stringify(value)}</Code>
          </Card>
          <Box>
            <Button id="set-value-btn" onClick={() => setValue('NO')} text="Set to NO" />
          </Box>
        </Stack>
      </Container>
    </Box>
  )
}

export const Custom: Story = {
  parameters: {controls: {include: []}},
  render: () => <CustomStory />,
  play: async ({canvasElement, step}) => {
    const doc = canvasElement.ownerDocument
    const input = () => doc.getElementById('custom') as HTMLInputElement
    const listbox = () => doc.getElementById('custom-listbox')
    const option = (value: string) => doc.querySelector(`[data-qa="option-${value}"]`)

    await step('should use key arrows', async () => {
      await userEvent.click(input())

      // Search for "nor"
      await userEvent.type(input(), 'nor')

      // The listbox is expanded
      await waitFor(() => expect(input()).toHaveAttribute('aria-expanded', 'true'))
      await waitFor(() => expect(listbox()).toBeInTheDocument())

      // Arrow down 3 times
      await userEvent.keyboard('{ArrowDown}')
      await userEvent.keyboard('{ArrowDown}')
      await userEvent.keyboard('{ArrowDown}')

      // The 3rd option should be focused
      await waitFor(() => expect(option('NO')).toHaveFocus())

      // Escape to close listbox and clear input
      await userEvent.keyboard('{Escape}')
      await waitFor(() => expect(input()).toHaveAttribute('aria-expanded', 'false'))
      expect(input()).toHaveValue('')
    })

    await step('should press clear button to clear', async () => {
      await userEvent.click(input())

      // Search for "nor"
      await userEvent.type(input(), 'nor')

      // Arrow down 3 times
      await waitFor(() => expect(listbox()).toBeInTheDocument())
      await userEvent.keyboard('{ArrowDown}')
      await userEvent.keyboard('{ArrowDown}')
      await userEvent.keyboard('{ArrowDown}')

      // Enter to select
      await waitFor(() => expect(option('NO')).toHaveFocus())
      await userEvent.keyboard('{Enter}')

      // Tab 1 time
      await waitFor(() => expect(input()).toHaveFocus())
      await userEvent.tab()

      // Enter to clear
      const clearButton = doc.querySelector<HTMLButtonElement>('[data-qa="clear-button"]')!

      await waitFor(() => expect(clearButton).toHaveFocus())
      await userEvent.click(clearButton)

      // The input should be empty and focused
      await waitFor(() => expect(input()).toHaveValue(''))
      expect(input()).toHaveFocus()
    })

    await step('should collapse when tabbing out', async () => {
      // Click to focus
      await userEvent.click(input())
      await waitFor(() => expect(input()).toHaveFocus())

      // Search for "nor"
      await userEvent.type(input(), 'nor')

      // The input is expanded and focused
      await waitFor(() => expect(input()).toHaveAttribute('aria-expanded', 'true'))
      expect(input()).toHaveFocus()

      // Focus the next focusable element
      doc.getElementById('set-value-btn')!.focus()

      // Should be collapsed
      await waitFor(() => expect(input()).toHaveAttribute('aria-expanded', 'false'))
    })

    await step('should clear query on blur', async () => {
      // Click to focus
      await userEvent.click(input())

      // Search for "nor"
      await userEvent.type(input(), 'nor')

      // Arrow down 3 times
      await waitFor(() => expect(listbox()).toBeInTheDocument())
      await userEvent.keyboard('{ArrowDown}')
      await userEvent.keyboard('{ArrowDown}')
      await userEvent.keyboard('{ArrowDown}')

      // Enter to select
      await waitFor(() => expect(option('NO')).toHaveFocus())
      await userEvent.keyboard('{Enter}')

      await waitFor(() => expect(input()).toHaveValue('Norway'))
      expect(input()).toHaveFocus()

      // Click to focus
      await userEvent.click(input())

      // Search for "net"
      await userEvent.keyboard('{Backspace}{Backspace}{Backspace}{Backspace}{Backspace}{Backspace}')
      await userEvent.type(input(), 'net')

      // Tab out of autocomplete
      doc.getElementById('set-value-btn')!.focus()

      // Expect the value to be "Norway" and autocomplete to be collapsed
      await waitFor(() => expect(input()).toHaveAttribute('aria-expanded', 'false'))
      await waitFor(() => expect(input()).toHaveValue('Norway'))
    })

    await step('should search anew after selecting a value', async () => {
      // Click to focus
      await userEvent.click(input())

      // Search for "net"
      await userEvent.keyboard('{Backspace}{Backspace}{Backspace}{Backspace}{Backspace}{Backspace}')
      await userEvent.type(input(), 'net')

      // Arrow down 1 time
      await waitFor(() => expect(listbox()).toBeInTheDocument())
      await userEvent.keyboard('{ArrowDown}')

      // Enter to select
      await waitFor(() => expect(option('NL')).toHaveFocus())
      await userEvent.keyboard('{Enter}')

      // Expect "Netherlands" to be selected
      await waitFor(() => expect(input()).toHaveValue('Netherlands'))
      expect(input()).toHaveFocus()
    })
  },
}

function FocusAndBlurStory() {
  const [value, setValue] = useState('')
  const [log, setLog] = useState<string[]>([])
  const handleBlur = useCallback(() => setLog((v) => v.concat(['blur'])), [])
  const handleFocus = useCallback(() => setLog((v) => v.concat(['focus'])), [])
  const handleClear = useCallback(() => setLog([]), [])

  return (
    <Box padding={[4, 5, 6]}>
      <Stack space={3}>
        <Autocomplete
          id="focus-and-blur"
          onBlur={handleBlur}
          onChange={setValue}
          onFocus={handleFocus}
          openButton
          options={[{value: 'foo'}, {value: 'bar'}]}
          placeholder="Search"
          value={value}
        />
        <Stack space={3}>
          <Card overflow="auto" padding={3} radius={2} tone="transparent">
            <Code id="focus-and-blur-log" language="json" size={1}>
              {JSON.stringify(log)}
            </Code>
          </Card>

          <Button id="focus-and-blur-clear-btn" mode="ghost" onClick={handleClear} text="Clear" />
        </Stack>
      </Stack>
    </Box>
  )
}

export const FocusAndBlur: Story = {
  parameters: {controls: {include: []}},
  render: () => <FocusAndBlurStory />,
  play: async ({canvasElement, step}) => {
    const doc = canvasElement.ownerDocument
    const input = () => doc.getElementById('focus-and-blur') as HTMLInputElement
    const log = () => doc.getElementById('focus-and-blur-log')

    await step('should trigger focus and blur', async () => {
      // Click to focus
      await userEvent.click(input())
      await waitFor(() => expect(log()).toHaveTextContent('["focus"]'))

      // Click outside to blur
      await userEvent.click(doc.body)
      await waitFor(() => expect(log()).toHaveTextContent('["focus","blur"]'))

      // Clear log
      await userEvent.click(doc.getElementById('focus-and-blur-clear-btn')!)

      // Click to focus
      await userEvent.click(input())

      // Search for "foo"
      await userEvent.type(input(), 'foo')
      await waitFor(() => expect(doc.getElementById('focus-and-blur-listbox')).toBeInTheDocument())
      await userEvent.keyboard('{ArrowDown}')

      const option = doc.querySelector<HTMLElement>('#focus-and-blur-option-foo > div')!

      await waitFor(() => expect(option).toHaveFocus())
      await userEvent.click(option)

      // Expect "foo" to be selected, without the input having lost focus in the meantime
      await waitFor(() => expect(input()).toHaveValue('foo'))
      expect(input()).toHaveFocus()
      expect(log()).toHaveTextContent('["focus"]')

      // Click outside to blur
      await userEvent.click(doc.body)
      await waitFor(() => expect(log()).toHaveTextContent('["focus","blur"]'))
    })
  },
}
