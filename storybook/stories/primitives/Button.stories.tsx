import {CloseIcon, SearchIcon, UploadIcon} from '@sanity/icons'
import {Button, Flex, Grid, Stack, Text} from '@sanity/ui'
import {BUTTON_MODES, ELEMENT_TONES, RADIUS} from '@sanity/ui/theme'
import type {Meta, StoryObj} from '@storybook/react-vite'
import {styled} from 'styled-components'

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

const SanityUploadButton = styled(Button).attrs({forwardedAs: 'label'})`
  & input {
    appearance: none;
    overflow: hidden;
    overflow: clip;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    opacity: 0;
    position: absolute;
    max-width: 0;
    width: -moz-available;
    width: -webkit-fill-available;
    width: stretch;
  }

  & > span:nth-child(2) {
    width: 0;
    flex: none;
    padding: 0;
  }
`

export const UploadButton: Story = {
  render: () => (
    <SanityUploadButton icon={UploadIcon} tabIndex={0} text="Upload">
      <input type="file" />
    </SanityUploadButton>
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
      <Stack gap={3}>
        <Flex direction={'row'} wrap={'wrap'} gap={4} align={'center'}>
          {matrixBuilder({
            scheme: 'light',
            columns: [...BUTTON_MODES],
            rows: [...ELEMENT_TONES],
            title: 'Tone / Mode',
            subHeader: <SubHeader />,
            renderItem: ({row, column}) => (
              <Flex align={'center'} gap={1} justify={'center'} key={`${row}-${column}`}>
                <Button {...props} tone={row} mode={column} text={props.text} />

                {column !== 'default' && (
                  <Button {...props} tone={row} mode={column} text={props.text} muted />
                )}
                {/* Small button */}
                <Button {...props} gap={2} padding={2} tone={row} mode={column} text={props.text} />
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
              <Flex align={'center'} gap={1} justify={'center'} key={`${row}-${column}`}>
                <Button {...props} tone={row} mode={column} text={props.text} />

                {column !== 'default' && (
                  <Button {...props} tone={row} mode={column} text={props.text} muted />
                )}
                {/* Small button */}
                <Button {...props} gap={2} padding={2} tone={row} mode={column} text={props.text} />
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
          <Grid columns={ELEMENT_TONES.length} gap={1}>
            {ELEMENT_TONES.map((tone) => (
              <Button {...props} key={tone} mode="bleed" padding={3} tone={tone} text={undefined}>
                <Stack gap={2}>
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
          <Grid columns={ELEMENT_TONES.length} gap={1}>
            {ELEMENT_TONES.map((tone) => (
              <Button {...props} key={tone} mode="ghost" padding={3} tone={tone} text={undefined}>
                <Stack gap={2}>
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

          <Grid columns={ELEMENT_TONES.length} gap={1}>
            {ELEMENT_TONES.map((tone) => (
              <Button {...props} key={tone} mode="default" padding={3} tone={tone} text={undefined}>
                <Stack gap={2}>
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
