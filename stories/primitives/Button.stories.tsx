import {CloseIcon, SearchIcon} from '@sanity/icons'
import type {Meta, StoryObj} from '@storybook/react'
import {Button, Flex, Grid, Stack, Text} from '../../src/primitives'
import {ButtonMode, ButtonTone} from '../../src/types'
import {
  getFontSizeControls,
  getIconControls,
  getRadiusControls,
  getSpaceControls,
} from '../controls'
import {matrixBuilder} from '../helpers/matrixBuilder'
import {radiusBuilder} from '../helpers/radiusBuilder'

const meta: Meta<typeof Button> = {
  args: {
    text: 'Label',
  },
  argTypes: {
    fontSize: getFontSizeControls('text'),
    icon: getIconControls(),
    iconRight: getIconControls(),
    padding: getSpaceControls(),
    radius: getRadiusControls(),
    space: getSpaceControls(),
    text: {control: 'text'},
    disabled: {control: 'boolean'},
  },
  component: Button,
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof Button>

export const Default: Story = {
  render: (props) => <Button {...props} />,
}

export const Loading: Story = {
  args: {loading: true},
  render: (props) => <Button {...props} />,
}

export const WithIcons: Story = {
  args: {
    icon: SearchIcon,
    iconRight: CloseIcon,
  },
  parameters: {
    controls: {
      include: ['icon', 'iconRight', 'mode', 'space', 'tone'],
    },
  },
  render: (props) => <Button {...props} />,
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
        renderItem: ({radius}) => <Button {...props} radius={radius} text={radius} />,
      })}
    </Flex>
  ),
}

export const Modes: Story = {
  parameters: {
    controls: {
      include: ['fontSize', 'padding', 'radius', 'tone'],
    },
  },
  render: (props) => (
    <Flex gap={2}>
      <Button {...props} text="Default" />
      <Button {...props} mode="bleed" text="Bleed" />
      <Button {...props} mode="ghost" text="Default" />
    </Flex>
  ),
}

export const Tones: Story = {
  parameters: {
    controls: {
      include: ['fontSize', 'mode', 'padding', 'radius'],
    },
  },
  render: (props) => (
    <Flex gap={2}>
      <Button {...props} text="Default" />
      <Button {...props} text="Primary" tone="primary" />
      <Button {...props} text="Positive" tone="positive" />
      <Button {...props} text="Caution" tone="caution" />
      <Button {...props} text="Critical" tone="critical" />
    </Flex>
  ),
}

export const MultipleStyles: Story = {
  args: {
    // Defaults button props.
    padding: 3,
    space: 3,
    fontSize: 1,
    radius: 2,
    icon: 'square',
    iconRight: 'square',
    text: 'Button',
  },
  parameters: {
    controls: {
      include: ['text', 'icon', 'iconRight', 'disabled'],
    },
  },
  render: (props) => {
    const buttonModes: ButtonMode[] = ['default', 'ghost', 'bleed']
    const buttonTones: ButtonTone[] = ['default', 'primary', 'positive', 'caution', 'critical']

    const SubHeader = () => (
      <>
        <div />
        <Grid columns={2} marginY={2}>
          <Text size={0} align={'center'}>
            Default
          </Text>
          <Text size={0} align={'center'}>
            Size small
          </Text>
        </Grid>
        <Grid columns={3} marginY={2}>
          <Text size={0} align={'center'}>
            Default
          </Text>
          <Text size={0} align={'center'}>
            Muted
          </Text>
          <Text size={0} align={'center'}>
            {' '}
            Size small
          </Text>
        </Grid>
        <Grid columns={3} marginY={2}>
          <Text size={0} align={'center'}>
            Default
          </Text>
          <Text size={0} align={'center'}>
            Muted
          </Text>

          <Text size={0} align={'center'}>
            {' '}
            Size small
          </Text>
        </Grid>
      </>
    )

    return (
      <Stack space={3}>
        <Flex direction={'row'} wrap={'wrap'} gap={4} align={'center'}>
          {matrixBuilder({
            scheme: 'light',
            columns: buttonModes,
            rows: buttonTones,
            title: 'Tone / Mode',
            subHeader: <SubHeader />,
            renderItem: ({row, column}) => (
              <Flex gap={1} justify={'center'} align={'center'}>
                <Button {...props} tone={row} mode={column} text={props.text} />

                {column !== 'default' && (
                  <Button {...props} tone={row} mode={column} text={props.text} muted />
                )}
                {/* Small button */}
                <Button
                  {...props}
                  space={2}
                  padding={2}
                  tone={row}
                  mode={column}
                  text={props.text}
                />
              </Flex>
            ),
          })}
          {matrixBuilder({
            scheme: 'dark',
            columns: buttonModes,
            rows: buttonTones,
            title: 'Tone / Mode',
            subHeader: <SubHeader />,

            renderItem: ({row, column}) => (
              <Flex gap={1} justify={'center'} align={'center'}>
                <Button {...props} tone={row} mode={column} text={props.text} />

                {column !== 'default' && (
                  <Button {...props} tone={row} mode={column} text={props.text} muted />
                )}
                {/* Small button */}
                <Button
                  {...props}
                  space={2}
                  padding={2}
                  tone={row}
                  mode={column}
                  text={props.text}
                />
              </Flex>
            ),
          })}
        </Flex>
      </Stack>
    )
  },
}
