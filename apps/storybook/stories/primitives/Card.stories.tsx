import {EditIcon, PublishIcon} from '@sanity/icons'
import {
  Box,
  Button,
  Card,
  CardTone,
  Container,
  Flex,
  Grid,
  Inline,
  Skeleton,
  Stack,
  Text,
  ThemeProps,
  useRootTheme,
} from '@sanity/ui'
import {getTheme_v2, THEME_COLOR_CARD_TONES, ThemeColorStateToneKey} from '@sanity/ui/theme'
import type {Meta, StoryObj} from '@storybook/react'
import {forwardRef} from 'react'
import {css, styled} from 'styled-components'

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
    // oxlint-disable-next-line no-deprecated
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
            {/* oxlint-disable-next-line no-deprecated */}
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
    // oxlint-disable-next-line no-deprecated
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
          {/* oxlint-disable-next-line no-deprecated */}
          <Grid columns={3} gap={2}>
            <Box>
              <Text align="center" size={1} weight="semibold">
                Enabled
              </Text>
              {/* oxlint-disable-next-line no-deprecated */}
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
                    {/* oxlint-disable-next-line no-deprecated */}
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
              {/* oxlint-disable-next-line no-deprecated */}
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
                    {/* oxlint-disable-next-line no-deprecated */}
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
              {/* oxlint-disable-next-line no-deprecated */}
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
                      {/* oxlint-disable-next-line no-deprecated */}
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

export const Interactive: Story = {
  parameters: {controls: {include: []}},
  render: () => (
    <Flex align="center" height="fill" justify="center">
      <div>
        <Card __unstable_focusRing as="button" padding={3} tabIndex={0}>
          <Stack space={3}>
            <Text>
              Text <code>Code</code>
            </Text>
            <Text muted>Muted</Text>
            <Text accent>Accent</Text>
          </Stack>
        </Card>
      </div>
    </Flex>
  ),
}

function CardListPreview() {
  return (
    <Flex align="center" gap={2}>
      <Skeleton radius="full" style={{width: 33, height: 33}} />
      <Stack flex={1} space={2}>
        <Text size={1} weight="medium">
          Preview
        </Text>
        <Text muted size={1}>
          Preview
        </Text>
      </Stack>
    </Flex>
  )
}

export const ListNavigation: Story = {
  parameters: {controls: {include: []}},
  render: () => (
    <Box height="fill" padding={[3, 4, 5]} sizing="border">
      <Card height="fill" shadow={1}>
        <Flex height="fill">
          <Card flex={1} padding={2}>
            <Stack space={1}>
              <Card __unstable_focusRing as="a" href="#" padding={2} radius={2}>
                <CardListPreview />
              </Card>
              <Card __unstable_focusRing as="a" href="#" padding={2} pressed radius={2}>
                <CardListPreview />
              </Card>
              <Card __unstable_focusRing as="a" href="#" padding={2} radius={2}>
                <CardListPreview />
              </Card>
              <Card __unstable_focusRing as="a" href="#" padding={2} radius={2}>
                <CardListPreview />
              </Card>
              <Card __unstable_focusRing as="a" href="#" padding={2} radius={2}>
                <CardListPreview />
              </Card>
            </Stack>
          </Card>
          <Card borderLeft flex={1} padding={2}>
            <Stack space={1}>
              <Card __unstable_focusRing as="a" href="#" padding={2} radius={2}>
                <CardListPreview />
              </Card>
              <Card __unstable_focusRing as="a" href="#" padding={2} pressed radius={2} selected>
                <CardListPreview />
              </Card>
              <Card __unstable_focusRing as="a" href="#" padding={2} radius={2}>
                <CardListPreview />
              </Card>
              <Card __unstable_focusRing as="a" href="#" padding={2} radius={2}>
                <CardListPreview />
              </Card>
              <Card __unstable_focusRing as="a" href="#" padding={2} radius={2}>
                <CardListPreview />
              </Card>
            </Stack>
          </Card>
        </Flex>
      </Card>
    </Box>
  ),
}

export const Checkered: Story = {
  parameters: {controls: {include: []}},
  render: () => (
    <Flex align="center" height="fill" justify="center" padding={[4, 5, 6]} sizing="border">
      <Stack space={1}>
        {THEME_COLOR_CARD_TONES.map((tone) => (
          <Card
            __unstable_checkered
            border
            key={tone}
            padding={3}
            sizing="border"
            style={{width: 120, height: 60}}
            tone={tone}
          >
            <Text muted size={1}>
              {tone}
            </Text>
          </Card>
        ))}
      </Stack>
    </Flex>
  ),
}

const CustomCardLink = forwardRef(function CustomCardLink(
  props: {req: string} & Omit<React.HTMLProps<HTMLAnchorElement>, 'as' | 'href'>,
  ref: React.ForwardedRef<HTMLAnchorElement>,
): React.JSX.Element {
  const {children, req, ...restProps} = props

  return (
    <a data-required={req} {...restProps} ref={ref}>
      {children}
    </a>
  )
})

export const AsComponent: Story = {
  parameters: {controls: {include: []}},
  render: () => {
    const props = {href: '#'}

    return (
      <Flex align="center" height="fill" justify="center">
        <Card as={CustomCardLink} data-as="a" {...props} padding={3} req="example">
          <Text size={1}>As component</Text>
        </Card>
      </Flex>
    )
  },
}

const TextWithTone = styled(Text)<{$tone: ThemeColorStateToneKey}>((
  props: {
    $tone: ThemeColorStateToneKey
  } & ThemeProps,
) => {
  const {$tone} = props
  const {color} = getTheme_v2(props.theme)
  const tone = color.button.default[$tone]

  return css`
    &:not([data-selected]) {
      --card-fg-color: ${tone.enabled.bg};
      --card-muted-fg-color: ${tone.enabled.bg};
    }

    [data-ui='Card']:disabled & {
      --card-fg-color: inherit;
      --card-muted-fg-color: inherit;
    }
  `
})

function SelectedStoryPreview({selected}: {selected: boolean}) {
  const rootTheme = useRootTheme()

  return (
    <Flex>
      <Box flex={1}>
        <Text size={1}>Title</Text>
      </Box>
      <Inline space={3}>
        <TextWithTone
          data-selected={selected ? '' : undefined}
          muted
          size={1}
          weight="medium"
          $tone={rootTheme.tone === 'default' ? 'caution' : 'default'}
        >
          <EditIcon />
        </TextWithTone>
        <TextWithTone
          data-selected={selected ? '' : undefined}
          muted
          size={1}
          $tone={rootTheme.tone === 'default' ? 'positive' : 'default'}
        >
          <PublishIcon />
        </TextWithTone>
      </Inline>
    </Flex>
  )
}

function SelectedStory({disabled, selected}: {disabled: boolean; selected: boolean}) {
  return (
    <Flex align="center" height="fill" justify="center" padding={4} sizing="border">
      <Container width={0}>
        <Stack space={1}>
          <Card
            __unstable_focusRing
            as="button"
            disabled={disabled}
            padding={3}
            radius={2}
            selected={selected}
          >
            <SelectedStoryPreview selected={selected} />
          </Card>

          <Card
            __unstable_focusRing
            as="button"
            disabled={disabled}
            padding={3}
            radius={2}
            selected={selected}
            tone="critical"
          >
            <SelectedStoryPreview selected={selected} />
          </Card>
        </Stack>
      </Container>
    </Flex>
  )
}

export const Selected: Story = {
  parameters: {controls: {include: []}},
  render: () => (
    <Stack space={4}>
      <SelectedStory disabled={false} selected={false} />
      <SelectedStory disabled={false} selected />
      <SelectedStory disabled selected={false} />
    </Stack>
  ),
}

const StyledCard = styled(Card).attrs({forwardedAs: 'ol'})``

export const Styled: Story = {
  parameters: {controls: {include: []}},
  render: () => (
    <Flex align="center" height="fill" justify="center">
      <StyledCard>
        <Text as="li">Styled</Text>
      </StyledCard>
    </Flex>
  ),
}
