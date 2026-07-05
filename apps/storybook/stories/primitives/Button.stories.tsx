import {AddIcon, CloseIcon, RocketIcon, SearchIcon, SquareIcon, UploadIcon} from '@sanity/icons'
import {
  Box,
  Button,
  ButtonOwnProps,
  Card,
  Container,
  Flex,
  Grid,
  Inline,
  Stack,
  Text,
} from '@sanity/ui'
import type {Meta, StoryObj} from '@storybook/react-vite'
import {useCallback, useRef} from 'react'
import {styled} from 'styled-components'

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
    gap: getSpaceControls(),
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
      include: ['icon', 'iconRight', 'mode', 'gap', 'space', 'tone'],
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
        {/* oxlint-disable-next-line no-deprecated */}
        <Grid columns={2} marginY={2}>
          <Text size={0} align={'center'}>
            Default
          </Text>
          <Text size={0} align={'center'}>
            Size small
          </Text>
        </Grid>
        {/* oxlint-disable-next-line no-deprecated */}
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
        {/* oxlint-disable-next-line no-deprecated */}
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
      // oxlint-disable-next-line no-deprecated
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
                  // oxlint-disable-next-line no-deprecated
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
                  // oxlint-disable-next-line no-deprecated
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
        {/* oxlint-disable-next-line no-deprecated */}
        <Stack space={2}>
          {/* oxlint-disable-next-line no-deprecated */}
          <Grid columns={5} gap={1}>
            {BUTTON_TONES.map((tone) => (
              <Button {...props} key={tone} mode="bleed" padding={3} tone={tone} text={undefined}>
                {/* oxlint-disable-next-line no-deprecated */}
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
          {/* oxlint-disable-next-line no-deprecated */}
          <Grid columns={5} gap={1}>
            {BUTTON_TONES.map((tone) => (
              <Button {...props} key={tone} mode="ghost" padding={3} tone={tone} text={undefined}>
                {/* oxlint-disable-next-line no-deprecated */}
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

          {/* oxlint-disable-next-line no-deprecated */}
          <Grid columns={5} gap={1}>
            {BUTTON_TONES.map((tone) => (
              <Button {...props} key={tone} mode="default" padding={3} tone={tone} text={undefined}>
                {/* oxlint-disable-next-line no-deprecated */}
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

export const Stacked: Story = {
  parameters: {controls: {include: ['disabled', 'fontSize', 'icon', 'iconRight', 'mode']}},
  render: (props) => (
    <Card height="fill">
      <Flex align="center" height="fill" justify="center">
        <Container width={0} style={{textAlign: 'center'}}>
          <Box padding={4}>
            {/* oxlint-disable-next-line no-deprecated */}
            <Stack space={1}>
              {BUTTON_TONES.map((tone) => (
                <Button {...props} key={tone} text={tone} tone={tone} />
              ))}
            </Stack>
          </Box>
        </Container>
      </Flex>
    </Card>
  ),
}

export const MixedChildren: Story = {
  parameters: {controls: {include: []}},
  render: () => (
    <Flex align="center" height="fill" justify="center">
      <Button fontSize={[2, 2, 3]} icon={AddIcon} mode="ghost" padding={[3, 3, 4]} text="Create">
        <span style={{display: 'none'}}>test</span>
      </Button>
    </Flex>
  ),
}

function UploadButtonStory() {
  const inputRef = useRef<HTMLInputElement | null>(null)

  const handleKeyDown = useCallback((event: React.KeyboardEvent) => {
    if (event.key === 'Enter' || event.key === ' ') {
      inputRef.current?.click()
    }
  }, [])

  return (
    <Flex align="center" height="fill" justify="center">
      <Button
        as="label"
        onKeyDown={handleKeyDown}
        tabIndex={0}
        text={
          <>
            Upload
            <input id="file" ref={inputRef} type="file" style={{display: 'none'}} />
          </>
        }
      />
    </Flex>
  )
}

export const UploadButton: Story = {
  parameters: {controls: {include: []}},
  render: () => <UploadButtonStory />,
}

const StyledSanityUploadButton = styled(Button).attrs({forwardedAs: 'label'})`
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
    width: -webkit-fill-available;
    width: stretch;
  }

  & span:nth-child(2) {
    width: 0;
    flex: none;
    padding: 0;
  }
`

export const SanityUploadButton: Story = {
  parameters: {controls: {include: []}},
  render: () => (
    <Flex align="center" height="fill" justify="center">
      <StyledSanityUploadButton icon={UploadIcon} tabIndex={0} text="Upload">
        <input type="file" />
      </StyledSanityUploadButton>
    </Flex>
  ),
}

function CustomIcon() {
  return (
    <svg
      stroke="currentColor"
      fill="currentColor"
      strokeWidth="0"
      viewBox="0 0 24 24"
      height="1em"
      width="1em"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path fill="none" d="M0 0h24v24H0z"></path>
      <path d="M16.5 3c-1.74 0-3.41.81-4.5 2.09C10.91 3.81 9.24 3 7.5 3 4.42 3 2 5.42 2 8.5c0 3.78 3.4 6.86 8.55 11.54L12 21.35l1.45-1.32C18.6 15.36 22 12.28 22 8.5 22 5.42 19.58 3 16.5 3zm-4.4 15.55l-.1.1-.1-.1C7.14 14.24 4 11.39 4 8.5 4 6.5 5.5 5 7.5 5c1.54 0 3.04.99 3.57 2.36h1.87C13.46 5.99 14.96 5 16.5 5c2 0 3.5 1.5 3.5 3.5 0 2.89-3.14 5.74-7.9 10.05z"></path>
    </svg>
  )
}

export const CustomIcons: Story = {
  parameters: {controls: {include: []}},
  render: () => (
    <Flex align="center" height="fill" justify="center">
      {/* oxlint-disable-next-line no-deprecated */}
      <Inline space={1}>
        {/* oxlint-disable-next-line no-deprecated */}
        <Button fontSize={1} icon={RocketIcon} padding={2} space={2} text="Rocket" />
        {/* oxlint-disable-next-line no-deprecated */}
        <Button fontSize={1} icon={CustomIcon} padding={2} space={2} text="Heart" />
      </Inline>
    </Flex>
  ),
}

const DISABLED_DEFAULT_PROPS: ButtonOwnProps = {
  icon: SquareIcon,
  iconRight: SquareIcon,
}

function DisabledLayout() {
  return (
    <Container width={2}>
      {/* oxlint-disable-next-line no-deprecated */}
      <Stack space={4}>
        {/* oxlint-disable-next-line no-deprecated */}
        <Grid columns={3} gap={4}>
          <Text size={1} weight="semibold">
            Default
          </Text>
          <Text size={1} weight="semibold">
            Ghost
          </Text>
          <Text size={1} weight="semibold">
            Bleed
          </Text>
        </Grid>

        {/* oxlint-disable-next-line no-deprecated */}
        <Stack space={2}>
          {/* oxlint-disable-next-line no-deprecated */}
          <Grid columns={3} gap={4}>
            {/* oxlint-disable-next-line no-deprecated */}
            <Stack space={2}>
              <Button {...DISABLED_DEFAULT_PROPS} mode="default" text="Enabled" />
              <Button {...DISABLED_DEFAULT_PROPS} disabled mode="default" text="Disabled" />
              <Button
                {...DISABLED_DEFAULT_PROPS}
                disabled
                mode="default"
                muted
                text="Disabled (muted)"
              />
            </Stack>

            {/* oxlint-disable-next-line no-deprecated */}
            <Stack space={2}>
              <Button {...DISABLED_DEFAULT_PROPS} mode="ghost" text="Enabled" />
              <Button {...DISABLED_DEFAULT_PROPS} disabled mode="ghost" text="Disabled" />
              <Button
                {...DISABLED_DEFAULT_PROPS}
                disabled
                mode="ghost"
                muted
                text="Disabled (muted)"
              />
            </Stack>

            {/* oxlint-disable-next-line no-deprecated */}
            <Stack space={2}>
              <Button {...DISABLED_DEFAULT_PROPS} mode="bleed" text="Enabled" />
              <Button {...DISABLED_DEFAULT_PROPS} mode="bleed" disabled text="Disabled" />
              <Button
                {...DISABLED_DEFAULT_PROPS}
                disabled
                mode="bleed"
                muted
                text="Disabled (muted)"
              />
            </Stack>
          </Grid>
        </Stack>
      </Stack>
    </Container>
  )
}

export const Disabled: Story = {
  parameters: {controls: {include: []}},
  render: () => (
    // oxlint-disable-next-line no-deprecated
    <Stack space={4}>
      <Card padding={5} scheme="light">
        <DisabledLayout />
      </Card>

      <Card padding={5} scheme="dark">
        <DisabledLayout />
      </Card>
    </Stack>
  ),
}

const StyledAnchor = styled.a`
  &:hover {
    background-color: red;
    box-shadow: none;
  }
`

const StyledButton = styled(Button)`
  &:hover {
    background-color: red;
    box-shadow: none;
  }
`

export const Styled: Story = {
  parameters: {controls: {include: []}},
  render: () => (
    <Flex align="center" gap={3} height="fill" justify="center">
      <Button as={StyledAnchor} href="#" text="Styled component via `as`" />
      <StyledButton forwardedAs="a" href="#" text="Wrapped in styled()" />
    </Flex>
  ),
}
