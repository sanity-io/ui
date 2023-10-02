import type {Meta, StoryObj} from '@storybook/react'
import {Box, Card, Flex, Grid, Text, TextArea} from '../../src/primitives'
import {getFontSizeControls, getRadiusControls, getSpaceControls} from '../controls'
import {radiusBuilder} from '../helpers/radiusBuilder'
import {FieldWrapper} from './components/FieldWrapper'

const meta: Meta<typeof TextArea> = {
  args: {
    placeholder: 'Placeholder text...',
  },
  argTypes: {
    fontSize: getFontSizeControls('text'),
    padding: getSpaceControls(),
    radius: getRadiusControls(),
  },
  component: TextArea,
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof TextArea>

export const Default: Story = {
  render: (props) => {
    return (
      <Card padding={3}>
        <TextArea {...props} />
      </Card>
    )
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
    return <TextArea {...props} />
  },
}

export const Radius: Story = {
  parameters: {
    controls: {
      include: ['fontSize', 'padding', 'tone'],
    },
  },
  render: (props) => (
    <Flex gap={2} wrap="wrap">
      {radiusBuilder({
        renderItem: ({radius}) => (
          <TextArea {...props} radius={radius}>
            {radius}
          </TextArea>
        ),
      })}
    </Flex>
  ),
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
          <TextArea {...props} />
        </FieldWrapper>
        <FieldWrapper title="Disabled">
          <TextArea {...props} disabled />
        </FieldWrapper>
        <FieldWrapper title="Read-only">
          <TextArea {...props} readOnly />
        </FieldWrapper>
        <FieldWrapper title="Disabled + read-only">
          <TextArea {...props} disabled readOnly />
        </FieldWrapper>

        <FieldWrapper title="Enabled (with value)">
          <TextArea {...props} defaultValue="Existing value" />
        </FieldWrapper>
        <FieldWrapper title="Disabled (with value)">
          <TextArea {...props} defaultValue="Existing value" disabled />
        </FieldWrapper>
        <FieldWrapper title="Read-only (with value)">
          <TextArea {...props} defaultValue="Existing value" readOnly />
        </FieldWrapper>
        <FieldWrapper title="Disabled + read-only (with value)">
          <TextArea {...props} defaultValue="Existing value" disabled readOnly />
        </FieldWrapper>

        <Box columnStart={1} columnEnd={[1, 1, 5]}>
          <Text weight="medium">With error</Text>
        </Box>

        <FieldWrapper title="Enabled">
          <TextArea {...props} customValidity="error" />
        </FieldWrapper>
        <FieldWrapper title="Disabled">
          <TextArea {...props} customValidity="error" disabled />
        </FieldWrapper>
        <FieldWrapper title="Read-only">
          <TextArea {...props} customValidity="error" readOnly />
        </FieldWrapper>
        <FieldWrapper title="Disabled + read-only">
          <TextArea {...props} customValidity="error" disabled readOnly />
        </FieldWrapper>

        <FieldWrapper title="Enabled (with value)">
          <TextArea {...props} customValidity="error" defaultValue="Existing value" />
        </FieldWrapper>
        <FieldWrapper title="Disabled (with value)">
          <TextArea {...props} customValidity="error" defaultValue="Existing value" disabled />
        </FieldWrapper>
        <FieldWrapper title="Read-only (with value)">
          <TextArea {...props} customValidity="error" defaultValue="Existing value" readOnly />
        </FieldWrapper>
        <FieldWrapper title="Disabled + read-only (with value)">
          <TextArea
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
