import {CloseIcon, SearchIcon, UploadIcon} from '@sanity/icons'
// import {Button, Flex, Grid, Stack, Text} from '@sanity/ui'
import {Button} from '@sanity/ui/primitives/button'
import {Flex} from '@sanity/ui/primitives/flex'
import {Grid} from '@sanity/ui/primitives/grid'
import {Stack} from '@sanity/ui/primitives/stack'
import {Text} from '@sanity/ui/primitives/text'
import {BUTTON_MODES, ELEMENT_TONES, RADIUS} from '@sanity/ui/tokens'
import type {Meta, StoryObj} from '@storybook/react-vite'

import {
  BUTTON_MODE_CONTROLS,
  BUTTON_WIDTH_CONTROLS,
  ELEMENT_TONES_CONTROLS,
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
    mode: BUTTON_MODE_CONTROLS,
    padding: SPACE_CONTROLS,
    radius: RADIUS_CONTROLS,
    gap: SPACE_CONTROLS,
    text: {control: 'text'},
    tone: ELEMENT_TONES_CONTROLS,
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

export const AsLink: Story = {
  render: (props) => <Button {...props} as="a" href="#" text="As link" />,
}

export const UploadButton: Story = {
  render: () => (
    <Button as="label" icon={UploadIcon} tabIndex={0} text="Upload">
      <input hidden type="file" />
    </Button>
  ),
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
      include: ['icon', 'iconRight', 'mode', 'gap', 'tone'],
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
        rows: [...BUTTON_MODES],
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
        rows: [...ELEMENT_TONES],
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
        <Grid gap={2} marginY={2}>
          <Text align={'center'} size={0}>
            Default
          </Text>
          <Text align={'center'} size={0}>
            Size small
          </Text>
        </Grid>
        <Grid gap={3} marginY={2}>
          <Text align={'center'} size={0}>
            Default
          </Text>
          <Text align={'center'} size={0}>
            Muted
          </Text>
          <Text align={'center'} size={0}>
            {' '}
            Size small
          </Text>
        </Grid>
        <Grid gap={3} marginY={2}>
          <Text align={'center'} size={0}>
            Default
          </Text>
          <Text align={'center'} size={0}>
            Muted
          </Text>

          <Text align={'center'} size={0}>
            {' '}
            Size small
          </Text>
        </Grid>
      </>
    )

    return (
      <Stack gap={3}>
        <Flex align={'center'} direction={'row'} gap={4} wrap={'wrap'}>
          {matrixBuilder({
            scheme: 'light',
            columns: [...BUTTON_MODES],
            rows: [...ELEMENT_TONES],
            title: 'Tone / Mode',
            subHeader: <SubHeader />,
            renderItem: ({row, column}) => (
              <Flex key={`${row}-${column}`} align={'center'} gap={1} justify={'center'}>
                <Button {...props} mode={column} text={props.text} tone={row} />

                {column !== 'default' && (
                  <Button {...props} mode={column} muted text={props.text} tone={row} />
                )}
                {/* Small button */}
                <Button {...props} gap={2} mode={column} padding={2} text={props.text} tone={row} />
              </Flex>
            ),
          })}
          {matrixBuilder({
            scheme: 'dark',
            columns: [...BUTTON_MODES],
            rows: [...ELEMENT_TONES],
            title: 'Tone / Mode',
            subHeader: <SubHeader />,

            renderItem: ({row, column}) => (
              <Flex key={`${row}-${column}`} align={'center'} gap={1} justify={'center'}>
                <Button {...props} mode={column} text={props.text} tone={row} />

                {column !== 'default' && (
                  <Button {...props} mode={column} muted text={props.text} tone={row} />
                )}
                {/* Small button */}
                <Button {...props} gap={2} mode={column} padding={2} text={props.text} tone={row} />
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
        <Stack gap={2}>
          <Grid gap={1} gridTemplateColumns={ELEMENT_TONES.length}>
            {ELEMENT_TONES.map((tone) => (
              <Button {...props} key={tone} mode="bleed" padding={3} text={undefined} tone={tone}>
                <Stack gap={2}>
                  <Text>Text ({tone})</Text>
                  <Text muted>Muted</Text>
                  <Text>
                    <code>Code</code>
                  </Text>
                </Stack>
              </Button>
            ))}
          </Grid>
          <Grid gap={1} gridTemplateColumns={ELEMENT_TONES.length}>
            {ELEMENT_TONES.map((tone) => (
              <Button {...props} key={tone} mode="ghost" padding={3} text={undefined} tone={tone}>
                <Stack gap={2}>
                  <Text>Text: ({tone})</Text>
                  <Text muted>Muted</Text>
                  <Text>
                    <code>Code</code>
                  </Text>
                </Stack>
              </Button>
            ))}
          </Grid>

          <Grid gap={1} gridTemplateColumns={ELEMENT_TONES.length}>
            {ELEMENT_TONES.map((tone) => (
              <Button {...props} key={tone} mode="default" padding={3} text={undefined} tone={tone}>
                <Stack gap={2}>
                  <Text>Text: ({tone})</Text>
                  <Text muted>Muted</Text>
                  <Text>
                    <code>Code</code>
                  </Text>
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
