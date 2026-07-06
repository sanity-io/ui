import type {Meta, StoryObj} from '@storybook/react-vite'
import {useCallback, useState} from 'react'
import {expect, userEvent, waitFor} from 'storybook/test'

import {
  Box,
  Container,
  Flex,
  Grid,
  Text,
  TextInput,
} from '../../../../packages/ui/src/core/primitives'
import {RADII} from '../constants'
import {
  getFontSizeControls,
  getIconControls,
  getRadiusControls,
  getSpaceControls,
} from '../controls'
import {rowBuilder} from '../helpers/rowBuilder'
import {FieldWrapper} from './components/FieldWrapper'

const meta: Meta<typeof TextInput> = {
  args: {
    placeholder: 'Placeholder text...',
  },
  argTypes: {
    fontSize: getFontSizeControls('text'),
    icon: getIconControls(),
    iconRight: getIconControls(),
    radius: getRadiusControls(),
    space: getSpaceControls(),
  },
  component: TextInput,
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof TextInput>

export const Default: Story = {
  render: (props) => {
    return <TextInput {...props} />
  },
}

export const CustomValidity: Story = {
  args: {
    customValidity: 'Invalid input',
  },
  parameters: {
    controls: {
      include: ['customValidity'],
    },
  },
  render: (props) => {
    return <TextInput {...props} />
  },
}

export const Radius: Story = {
  parameters: {
    controls: {
      include: ['fontSize', 'padding', 'tone'],
    },
  },
  render: (props) => {
    return (
      <>
        {rowBuilder({
          renderItem: ({value}) => (
            <TextInput {...props} key={value} radius={value} value={value} />
          ),
          rows: RADII,
        })}
      </>
    )
  },
}

export const WithClearButton: Story = {
  render: (props) => {
    const [value, setValue] = useState('')

    const handleChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
      setValue(event.currentTarget.value)
    }, [])

    const handleClear = useCallback(() => {
      setValue('')
    }, [])

    return (
      <Container>
        <Box padding={4}>
          <TextInput
            {...props}
            clearButton
            customValidity={props.customValidity}
            onChange={handleChange}
            onClear={handleClear}
            placeholder={props.placeholder}
            value={value}
          />
        </Box>
      </Container>
    )
  },
}

export const InputStates: Story = {
  parameters: {
    controls: {
      include: [],
    },
  },
  render: (props) => {
    return (
      <Grid columns={[1, 1, 4]} gapX={3} gapY={5}>
        <Box columnStart={1} columnEnd={[1, 1, 5]}>
          <Text weight="medium">Without error</Text>
        </Box>

        <FieldWrapper title="Enabled">
          <TextInput {...props} />
        </FieldWrapper>
        <FieldWrapper title="Disabled">
          <TextInput {...props} disabled />
        </FieldWrapper>
        <FieldWrapper title="Read-only">
          <TextInput {...props} readOnly />
        </FieldWrapper>
        <FieldWrapper title="Disabled + read-only">
          <TextInput {...props} disabled readOnly />
        </FieldWrapper>

        <FieldWrapper title="Enabled (with value)">
          <TextInput {...props} defaultValue="Existing value" />
        </FieldWrapper>
        <FieldWrapper title="Disabled (with value)">
          <TextInput {...props} defaultValue="Existing value" disabled />
        </FieldWrapper>
        <FieldWrapper title="Read-only (with value)">
          <TextInput {...props} defaultValue="Existing value" readOnly />
        </FieldWrapper>
        <FieldWrapper title="Disabled + read-only (with value)">
          <TextInput {...props} defaultValue="Existing value" disabled readOnly />
        </FieldWrapper>

        <Box columnStart={1} columnEnd={[1, 1, 5]}>
          <Text weight="medium">With error</Text>
        </Box>

        <FieldWrapper title="Enabled">
          <TextInput {...props} customValidity="error" />
        </FieldWrapper>
        <FieldWrapper title="Disabled">
          <TextInput {...props} customValidity="error" disabled />
        </FieldWrapper>
        <FieldWrapper title="Read-only">
          <TextInput {...props} customValidity="error" readOnly />
        </FieldWrapper>
        <FieldWrapper title="Disabled + read-only">
          <TextInput {...props} customValidity="error" disabled readOnly />
        </FieldWrapper>

        <FieldWrapper title="Enabled (with value)">
          <TextInput {...props} customValidity="error" defaultValue="Existing value" />
        </FieldWrapper>
        <FieldWrapper title="Disabled (with value)">
          <TextInput {...props} customValidity="error" defaultValue="Existing value" disabled />
        </FieldWrapper>
        <FieldWrapper title="Read-only (with value)">
          <TextInput {...props} customValidity="error" defaultValue="Existing value" readOnly />
        </FieldWrapper>
        <FieldWrapper title="Disabled + read-only (with value)">
          <TextInput
            {...props}
            customValidity="error"
            defaultValue="Existing value"
            disabled
            readOnly
          />
        </FieldWrapper>
      </Grid>
    )
  },
}

export const ReadOnly: Story = {
  // The interaction test for this story asserts on light-scheme focus ring colors
  parameters: {controls: {include: []}, themes: {themeOverride: 'light'}},
  render: () => (
    <Flex padding={4}>
      <TextInput id="text-input-example" readOnly />
    </Flex>
  ),
  play: async ({canvasElement, step}) => {
    const doc = canvasElement.ownerDocument

    await step('read-only input should have focus styling', async () => {
      await userEvent.click(doc.getElementById('text-input-example')!)

      const span = doc.querySelector('#text-input-example + span')!

      await waitFor(() =>
        expect(getComputedStyle(span).boxShadow).toBe(
          'rgb(85, 107, 252) 0px 0px 0px 1px inset, rgb(227, 228, 232) 0px 0px 0px 1px inset',
        ),
      )
    })
  },
}
