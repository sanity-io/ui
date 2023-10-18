import type {Meta, StoryObj} from '@storybook/react'
import {Box, Button, Card, Container, Flex, Grid, Stack, Text} from '../../src/primitives'
import {CardTone} from '../../src/types'
import {CARD_TONES, RADII} from '../constants'
import {getRadiusControls, getShadowControls, getSpaceControls} from '../controls'
import {matrixBuilder} from '../helpers/matrixBuilder'
import {rowBuilder} from '../helpers/rowBuilder'

const meta: Meta<typeof Card> = {
  args: {
    children: <Text>Nested text</Text>,
    padding: 4,
  },
  argTypes: {
    padding: getSpaceControls(),
    paddingBottom: getSpaceControls(),
    paddingLeft: getSpaceControls(),
    paddingRight: getSpaceControls(),
    paddingTop: getSpaceControls(),
    radius: getRadiusControls(),
    shadow: getShadowControls(),
  },
  component: Card,
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof Card>

export const Default: Story = {
  render: (props) => {
    return <Card {...props} />
  },
}

/**
 * Displays focus ring, hover styles and receives focus events. Requires `__unstable_focusRing`.
 */
export const AsButton: Story = {
  args: {
    __unstable_focusRing: true,
    as: 'button',
    children: <Text>Card as a button</Text>,
    tone: 'transparent',
  },
  render: (props) => (
    <Flex gap={2}>
      <Card {...props} />
      <Card {...props} />
      <Card {...props} />
    </Flex>
  ),
}

export const Borders: Story = {
  args: {
    tone: 'transparent',
  },
  parameters: {
    controls: {
      include: ['fontSize', 'padding', 'radius', 'shadow'],
    },
  },
  render: (props) => (
    <Flex gap={2}>
      <Card {...props} borderTop>
        <Text>Top</Text>
      </Card>
      <Card {...props} borderBottom>
        <Text>Bottom</Text>
      </Card>
      <Card {...props} borderLeft>
        <Text>Left</Text>
      </Card>
      <Card {...props} borderRight>
        <Text>Right</Text>
      </Card>
      <Card {...props} border>
        <Text>Full</Text>
      </Card>
    </Flex>
  ),
}

export const Radius: Story = {
  args: {
    shadow: 1,
    tone: 'transparent',
  },
  parameters: {
    controls: {
      include: ['fontSize', 'padding', 'shadow', 'tone'],
    },
  },
  render: (props) => (
    <>
      {rowBuilder({
        renderItem: ({value}) => (
          <Card {...props} key={value} radius={value}>
            <Text>{value}</Text>
          </Card>
        ),
        rows: RADII,
      })}
    </>
  ),
}

export const Shadows: Story = {
  args: {
    tone: 'transparent',
  },
  parameters: {
    controls: {
      include: ['fontSize', 'padding'],
    },
  },
  render: (props) => (
    <Flex gap={7} padding={5} wrap="wrap">
      <Card {...props} shadow={0}>
        <Text>0</Text>
      </Card>
      <Card {...props} shadow={1}>
        <Text>1</Text>
      </Card>
      <Card {...props} shadow={2}>
        <Text>2</Text>
      </Card>
      <Card {...props} shadow={3}>
        <Text>3</Text>
      </Card>
      <Card {...props} shadow={4}>
        <Text>4</Text>
      </Card>
      <Card {...props} shadow={5}>
        <Text>5</Text>
      </Card>
    </Flex>
  ),
}

export const Schemes: Story = {
  args: {
    scheme: 'light',
    tone: 'transparent',
  },
  parameters: {
    controls: {
      include: ['fontSize', 'padding', 'radius', 'shadow'],
    },
  },
  render: (props) => (
    <Grid columns={5} gapX={2} gapY={3}>
      <Card {...props}>
        <Text>Light (Default)</Text>
      </Card>
      <Card {...props} tone="primary">
        <Text>Light (Primary)</Text>
      </Card>
      <Card {...props} tone="positive">
        <Text>Light (Positive)</Text>
      </Card>
      <Card {...props} tone="caution">
        <Text>Light (Caution)</Text>
      </Card>
      <Card {...props} tone="critical">
        <Text>Light (Critical)</Text>
      </Card>
      <Card {...props} scheme="dark">
        <Text>Dark (Default)</Text>
      </Card>
      <Card {...props} scheme="dark" tone="primary">
        <Text>Dark (Primary)</Text>
      </Card>
      <Card {...props} scheme="dark" tone="positive">
        <Text>Dark (Positive)</Text>
      </Card>
      <Card {...props} scheme="dark" tone="caution">
        <Text>Dark (Caution)</Text>
      </Card>
      <Card {...props} scheme="dark" tone="critical">
        <Text>Dark (Critical)</Text>
      </Card>
    </Grid>
  ),
}

export const Tones: Story = {
  args: {
    radius: 1,
    shadow: 1,
  },
  parameters: {
    controls: {
      include: ['fontSize', 'padding', 'radius', 'shadow'],
    },
  },
  render: (props) => (
    <>
      {rowBuilder({
        renderItem: ({value}) => (
          <Card {...props} key={value} tone={value}>
            <Text>{value}</Text>
          </Card>
        ),
        rows: CARD_TONES,
      })}
    </>
  ),
}
export const WithButtonsAndTones: Story = {
  args: {
    radius: 1,
    shadow: 1,
  },
  parameters: {
    controls: {
      include: ['fontSize', 'padding', 'radius', 'shadow'],
    },
  },
  render: (props) => (
    <>
      {rowBuilder({
        renderItem: ({value}) => (
          <Card {...props} key={value} tone={value}>
            <Stack space={4}>
              <Text>{value}</Text>
              <Button text={'Primary'} tone="primary" />
              <Button text={'Positive'} tone="positive" />
              <Button text={'Caution'} tone="caution" />
            </Stack>
          </Card>
        ),
        rows: CARD_TONES,
      })}
    </>
  ),
}

export const MultipleStyles: Story = {
  args: {
    radius: 1,
    shadow: 1,
  },
  parameters: {
    controls: {
      include: ['fontSize', 'padding', 'radius', 'shadow'],
    },
  },

  render: (props) => (
    <Stack space={4}>
      {matrixBuilder({
        columns: ['card', 'enabled button', 'disabled button', 'selected button'],
        rows: CARD_TONES,
        title: 'State / Tone',
        renderItem: ({row, column}) => (
          <Card
            {...props}
            key={row + column}
            as={column !== 'card' ? 'button' : undefined}
            tone={row}
            disabled={column === 'disabled button'}
            selected={column === 'selected button'}
          >
            <Text>{column !== 'card' ? 'As <button>' : 'Card'}</Text>
          </Card>
        ),
      })}
      {matrixBuilder({
        columns: ['card', 'enabled link', 'disabled link', 'selected link'],
        rows: CARD_TONES,
        title: 'State / Tone',
        renderItem: ({row, column}) => (
          <Card
            {...props}
            key={row + column}
            as={column !== 'card' ? 'a' : undefined}
            tone={row}
            disabled={column === 'disabled link'}
            selected={column === 'selected link'}
          >
            <Text>{column !== 'card' ? 'As <a>' : 'Card'}</Text>
          </Card>
        ),
      })}
    </Stack>
  ),
}

export const MatrixAsButton: Story = {
  render: () => {
    return (
      <Flex align="center" height="fill" justify="center" padding={[4, 5, 6]} sizing="border">
        <Container>
          <Grid columns={3} gap={2}>
            <Box>
              <Text align="center" size={1} weight="semibold">
                Enabled
              </Text>
              <Stack marginTop={3} space={2}>
                {CARD_TONES.map((tone) => (
                  <Card
                    __unstable_focusRing
                    as="button"
                    key={tone}
                    padding={4}
                    style={{textAlign: 'center'}}
                    tone={tone}
                  >
                    <Stack space={2}>
                      <Text weight="semibold">{tone}</Text>
                      <Text muted>Muted</Text>
                      <Text accent>Accent</Text>
                    </Stack>
                  </Card>
                ))}
              </Stack>
            </Box>

            <Box>
              <Text align="center" size={1} weight="semibold">
                Disabled
              </Text>
              <Stack marginTop={3} space={2}>
                {CARD_TONES.map((tone) => (
                  <Card
                    __unstable_focusRing
                    as="button"
                    disabled
                    key={tone}
                    padding={4}
                    style={{textAlign: 'center'}}
                    tone={tone}
                  >
                    <Stack space={2}>
                      <Text weight="semibold">{tone}</Text>
                      <Text muted>Muted</Text>
                      <Text accent>Accent</Text>
                    </Stack>
                  </Card>
                ))}
              </Stack>
            </Box>

            <Box>
              <Text align="center" size={1} weight="semibold">
                Selected
              </Text>
              <Stack marginTop={3} space={2}>
                {CARD_TONES.map((tone) => (
                  <div aria-selected key={tone}>
                    <Card
                      __unstable_focusRing
                      as="button"
                      padding={4}
                      style={{textAlign: 'center'}}
                      tone={tone}
                    >
                      <Stack space={2}>
                        <Text weight="semibold">{tone}</Text>
                        <Text muted>Muted</Text>
                        <Text accent>Accent</Text>
                      </Stack>
                    </Card>
                  </div>
                ))}
              </Stack>
            </Box>
          </Grid>
        </Container>
      </Flex>
    )
  },
}

export const NestedSchemeChanges: Story = {
  render: () => {
    return (
      <Flex gap={4} wrap={'wrap'}>
        <Card scheme="light" padding={4} margin={4} shadow={1}>
          <Text>Light default</Text>
          <Card tone="inherit" scheme="dark" padding={4} margin={4} shadow={1}>
            <Text>Dark inherit</Text>
            <Card tone="inherit" scheme="light" padding={4} margin={4} shadow={1}>
              <Text>Light inherit</Text>
            </Card>
          </Card>
        </Card>
        <Card scheme="light" tone="caution" padding={4} margin={4} shadow={1}>
          <Text>Light caution</Text>
          <Card tone="inherit" scheme="dark" padding={4} margin={4} shadow={1}>
            <Text>Dark inherit</Text>
            <Card tone="inherit" scheme="light" padding={4} margin={4} shadow={1}>
              <Text>Light inherit</Text>
            </Card>
          </Card>
        </Card>
        <Card scheme="light" tone="primary" padding={4} margin={4} shadow={1}>
          <Text>Primary caution</Text>
          <Card tone="inherit" scheme="dark" padding={4} margin={4} shadow={1}>
            <Text>Dark inherit</Text>
            <Card tone="inherit" scheme="light" padding={4} margin={4} shadow={1}>
              <Text>Light inherit</Text>
            </Card>
          </Card>
        </Card>
      </Flex>
    )
  },
}

export const NestedToneChanges: Story = {
  render: () => {
    const TONES: (CardTone | undefined)[] = [
      'critical',
      'inherit',
      undefined,
      'caution',
      'inherit',
      undefined,
      'primary',
      'inherit',
      undefined,
      'positive',
      'inherit',
      undefined,
      'default',
      'inherit',
      undefined,
    ]

    const renderCard = (tones: (CardTone | undefined)[]) => {
      const currentTone = tones[0]

      return (
        <Card border margin={3} padding={3} tone={currentTone}>
          <Text muted={!currentTone} size={1}>
            {currentTone ?? <em>(empty)</em>}
          </Text>
          {tones.length > 1 && renderCard(tones.slice(1))}
        </Card>
      )
    }

    return (
      <Flex gap={4} wrap={'wrap'}>
        {renderCard(TONES)}
      </Flex>
    )
  },
}
