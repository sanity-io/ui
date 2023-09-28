import {CloseIcon, SearchIcon} from '@sanity/icons'
import type {Meta, StoryObj} from '@storybook/react'
import {
  WORKSHOP_BUTTON_MODE_OPTIONS,
  WORKSHOP_BUTTON_TONE_OPTIONS,
} from '../../src/__workshop__/constants'
import {Button, Flex, Grid, Stack, Text} from '../../src/primitives'
import {FONT_SIZE_CONTROLS, ICON_CONTROLS, RADIUS_CONTROLS, SPACE_CONTROLS} from '../constants'
import {matrixBuilder} from '../helpers/matrixBuilder'
import {capitalize} from '../helpers/utils'

const meta: Meta<typeof Button> = {
  args: {
    text: 'Label',
  },
  argTypes: {
    fontSize: FONT_SIZE_CONTROLS,
    icon: ICON_CONTROLS,
    iconRight: ICON_CONTROLS,
    padding: SPACE_CONTROLS,
    radius: RADIUS_CONTROLS,
    space: SPACE_CONTROLS,
    text: {control: 'text'},
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

const buttonModes = Object.values(WORKSHOP_BUTTON_MODE_OPTIONS)
const buttonTones = Object.values(WORKSHOP_BUTTON_TONE_OPTIONS)

export const MultipleStyles: Story = {
  args: {
    text: '',
  },
  parameters: {
    controls: {
      include: ['fontSize', 'padding', 'radius', 'icon', 'iconRight', 'text'],
    },
  },
  render: (props) => (
    <Flex direction={'row'} wrap={'wrap'} gap={4} align={'center'}>
      {matrixBuilder({
        scheme: 'light',
        columns: buttonModes,
        rows: buttonTones,
        title: 'Tone / Mode',
        renderItem: ({row, column}) => (
          <Button {...props} tone={row} mode={column} text={props.text || capitalize(column)} />
        ),
      })}
      {matrixBuilder({
        scheme: 'dark',
        columns: buttonModes,
        rows: buttonTones,
        title: 'Tone / Mode',
        renderItem: ({row, column}) => (
          <Button {...props} tone={row} mode={column} text={props.text || capitalize(column)} />
        ),
      })}
    </Flex>
  ),
}

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
        Font secondary
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
        Font secondary
      </Text>

      <Text size={0} align={'center'}>
        {' '}
        Size small
      </Text>
    </Grid>
  </>
)

const keys = ['primary', 'secondary', 'default']
const modesConversion: {
  [key in (typeof keys)[number]]: (typeof WORKSHOP_BUTTON_MODE_OPTIONS)[number]
} = {
  primary: 'default',
  secondary: 'ghost',
  default: 'bleed',
} as const
const rows: Array<(typeof buttonTones)[number]> = ['default', 'positive', 'caution', 'critical']
export const StudioButtons: Story = {
  args: {
    // Defaults button props.
    padding: 3,
    space: 3,
    fontSize: 1,
    radius: 2,
    // Small buttons:
    // space: 2,
    // padding: 2,

    text: 'Button',
    icon: 'square',
    iconRight: 'square',
  },
  parameters: {
    controls: {
      include: ['text', 'icon', 'iconRight', 'fontSize'],
    },
  },
  render: (props) => (
    <Stack space={3}>
      <Flex direction={'row'} wrap={'wrap'} gap={4} align={'center'}>
        {matrixBuilder({
          scheme: 'light',
          columns: keys,
          rows: rows,
          title: 'Tone / Mode',
          subHeader: <SubHeader />,
          renderItem: ({row, column}) => (
            <Flex gap={1} justify={'center'} align={'center'} wrap={'wrap'}>
              <Button
                {...props}
                tone={row}
                mode={modesConversion[column]}
                text={props.text}
                textStyle="primary"
              />

              {column !== 'primary' && (
                <Button
                  {...props}
                  tone={row}
                  mode={modesConversion[column]}
                  text={props.text}
                  textStyle="secondary"
                />
              )}
              {/* Small button */}
              <Button
                {...props}
                space={2}
                padding={2}
                tone={row}
                mode={modesConversion[column]}
                text={props.text}
              />
            </Flex>
          ),
        })}
        {matrixBuilder({
          scheme: 'dark',
          columns: keys,
          rows: rows,
          title: 'Tone / Mode',
          subHeader: <SubHeader />,

          renderItem: ({row, column}) => (
            <Flex gap={1} justify={'center'} align={'center'} wrap={'wrap'}>
              <Button
                {...props}
                tone={row}
                mode={modesConversion[column]}
                text={props.text}
                textStyle="primary"
              />

              {column !== 'primary' && (
                <Button
                  {...props}
                  tone={row}
                  mode={modesConversion[column]}
                  text={props.text}
                  textStyle="secondary"
                />
              )}
              {/* Small button */}
              <Button
                {...props}
                space={2}
                padding={2}
                tone={row}
                mode={modesConversion[column]}
                text={props.text}
              />
            </Flex>
          ),
        })}
      </Flex>
    </Stack>
  ),
}
