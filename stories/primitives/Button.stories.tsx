import {CloseIcon, SearchIcon} from '@sanity/icons'
import {RADIUS, THEME_COLOR_BUTTON_MODES, THEME_COLOR_STATE_TONES} from '@sanity/ui/theme'
import type {Meta, StoryObj} from '@storybook/react'

import {Button, Flex, Grid, Stack, Text} from '../../src/ui'
import {
  BUTTON_WIDTH_CONTROLS,
  FONT_TEXT_SIZE_CONTROLS,
  ICON_CONTROLS,
  RADIUS_CONTROLS,
  SPACE_CONTROLS,
} from '../controls'
import {matrixBuilder} from '../helpers/matrixBuilder'
import {rowBuilder} from '../helpers/rowBuilder'

const meta: Meta<typeof Button> = {
  args: {
    text: 'Label',
  },
  argTypes: {
    disabled: {control: 'boolean'},
    fontSize: FONT_TEXT_SIZE_CONTROLS,
    icon: ICON_CONTROLS,
    iconRight: ICON_CONTROLS,
    padding: SPACE_CONTROLS,
    radius: RADIUS_CONTROLS,
    space: SPACE_CONTROLS,
    text: {control: 'text'},
    width: BUTTON_WIDTH_CONTROLS,
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
    <>
      {rowBuilder({
        renderItem: ({value}) => <Button {...props} key={value} radius={value} text={value} />,
        rows: [...RADIUS],
      })}
    </>
  ),
}

export const Modes: Story = {
  parameters: {
    controls: {
      include: ['fontSize', 'padding', 'radius', 'tone'],
    },
  },
  render: (props) => (
    <>
      {rowBuilder({
        renderItem: ({value}) => <Button {...props} key={value} mode={value} text={value} />,
        rows: [...THEME_COLOR_BUTTON_MODES],
      })}
    </>
  ),
}

export const Tones: Story = {
  parameters: {
    controls: {
      include: ['fontSize', 'mode', 'padding', 'radius'],
    },
  },
  render: (props) => (
    <>
      {rowBuilder({
        renderItem: ({value}) => <Button {...props} key={value} text={value} tone={value} />,
        rows: [...THEME_COLOR_STATE_TONES],
      })}
    </>
  ),
}

export const MultipleStyles: Story = {
  args: {
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
            columns: [...THEME_COLOR_BUTTON_MODES],
            rows: [...THEME_COLOR_STATE_TONES],
            title: 'Tone / Mode',
            subHeader: <SubHeader />,
            renderItem: ({row, column}) => (
              <Flex align={'center'} gap={1} justify={'center'} key={`${row}-${column}`}>
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
            columns: [...THEME_COLOR_BUTTON_MODES],
            rows: [...THEME_COLOR_STATE_TONES],
            title: 'Tone / Mode',
            subHeader: <SubHeader />,

            renderItem: ({row, column}) => (
              <Flex align={'center'} gap={1} justify={'center'} key={`${row}-${column}`}>
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

export const CustomButton: Story = {
  render: (props) => {
    return (
      <Flex align="center" height="fill" justify="center">
        <Stack space={2}>
          <Grid columns={THEME_COLOR_STATE_TONES.length} gap={1}>
            {THEME_COLOR_STATE_TONES.map((tone) => (
              <Button {...props} key={tone} mode="bleed" padding={3} tone={tone} text={undefined}>
                <Stack space={2}>
                  <Text>Text ({tone})</Text>
                  <Text muted>Muted</Text>
                  <Text>
                    <code>Code</code>
                  </Text>
                  <Text accent>Accent</Text>
                </Stack>
              </Button>
            ))}
          </Grid>
          <Grid columns={THEME_COLOR_STATE_TONES.length} gap={1}>
            {THEME_COLOR_STATE_TONES.map((tone) => (
              <Button {...props} key={tone} mode="ghost" padding={3} tone={tone} text={undefined}>
                <Stack space={2}>
                  <Text>Text: ({tone})</Text>
                  <Text muted>Muted</Text>
                  <Text>
                    <code>Code</code>
                  </Text>
                  <Text accent>Accent</Text>
                </Stack>
              </Button>
            ))}
          </Grid>

          <Grid columns={THEME_COLOR_STATE_TONES.length} gap={1}>
            {THEME_COLOR_STATE_TONES.map((tone) => (
              <Button {...props} key={tone} mode="default" padding={3} tone={tone} text={undefined}>
                <Stack space={2}>
                  <Text>Text: ({tone})</Text>
                  <Text muted>Muted</Text>
                  <Text>
                    <code>Code</code>
                  </Text>
                  <Text accent>Accent</Text>
                </Stack>
              </Button>
            ))}
          </Grid>
        </Stack>
      </Flex>
    )
  },
}

export const FullWidth: Story = {
  args: {
    text: 'Full width',
    width: 'fill',
  },
  render: (props) => <Button {...props} />,
}
