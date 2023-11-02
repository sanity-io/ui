/* eslint-disable react-hooks/rules-of-hooks */
import type {Meta, StoryObj} from '@storybook/react'
import {Box, Grid, Text, TextInput} from '../../src/primitives'
import {FONT_SIZE_CONTROLS, ICON_CONTROLS, RADIUS_CONTROLS, SPACE_CONTROLS} from '../constants'
import {FieldWrapper} from './components/FieldWrapper'

const meta: Meta<typeof TextInput> = {
  args: {
    placeholder: 'Placeholder text...',
  },
  argTypes: {
    fontSize: FONT_SIZE_CONTROLS,
    icon: ICON_CONTROLS,
    iconRight: ICON_CONTROLS,
    radius: RADIUS_CONTROLS,
    space: SPACE_CONTROLS,
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
