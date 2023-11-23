import {CloseIcon, SearchIcon} from '@sanity/icons'
import type {Meta, StoryObj} from '@storybook/react'
import {Button, Flex, Grid, Stack, Text} from '../../src/core/primitives'
import {BUTTON_MODES, BUTTON_TONES, RADII} from '../constants'
import {
  getButtonWidthControls,
  getFontSizeControls,
  getIconControls,
  getRadiusControls,
  getSpaceControls,
} from '../controls'
import {matrixBuilder} from '../helpers/matrixBuilder'
import {rowBuilder} from '../helpers/rowBuilder'

const meta: Meta<typeof Button> = {
  args: {
    text: 'Label',
  },
  argTypes: {
    disabled: {control: 'boolean'},
    fontSize: getFontSizeControls('text'),
    icon: getIconControls(),
    iconRight: getIconControls(),
    padding: getSpaceControls(),
    radius: getRadiusControls(),
    space: getSpaceControls(),
    text: {control: 'text'},
    width: getButtonWidthControls(),
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
        rows: RADII,
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
        rows: BUTTON_MODES,
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
        rows: BUTTON_TONES,
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
            columns: BUTTON_MODES,
            rows: BUTTON_TONES,
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
            columns: BUTTON_MODES,
            rows: BUTTON_TONES,
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
          <Grid columns={5} gap={1}>
            {BUTTON_TONES.map((tone) => (
              <Button {...props} key={tone} mode="bleed" padding={3} tone={tone} text={undefined}>
                <Stack space={2}>
                  <Text>{tone}</Text>
                  <Text muted>Muted</Text>
                  <Text muted>
                    <a href="">Link</a>
                  </Text>
                  <Text>
                    <code>Code</code>
                  </Text>
                  <Text accent>Accent</Text>
                </Stack>
              </Button>
            ))}
          </Grid>
          <Grid columns={5} gap={1}>
            {BUTTON_TONES.map((tone) => (
              <Button {...props} key={tone} mode="ghost" padding={3} tone={tone} text={undefined}>
                <Stack space={2}>
                  <Text>{tone}</Text>
                  <Text muted>Muted</Text>
                  <Text muted>
                    <a href="">Link</a>
                  </Text>
                  <Text>
                    <code>Code</code>
                  </Text>
                  <Text accent>Accent</Text>
                </Stack>
              </Button>
            ))}
          </Grid>

          <Grid columns={5} gap={1}>
            {BUTTON_TONES.map((tone) => (
              <Button {...props} key={tone} mode="default" padding={3} tone={tone} text={undefined}>
                <Stack space={2}>
                  <Text>{tone}</Text>
                  <Text muted>Muted</Text>
                  <Text muted>
                    <a href="">Link</a>
                  </Text>
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
