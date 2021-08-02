import {
  Box,
  Card,
  CardTone,
  Flex,
  Grid,
  Stack,
  Text,
  ThemeColor,
  ThemeColorButton,
  ThemeColorButtonState,
  ThemeColorButtonStates,
  ThemeColorButtonTones,
  ThemeColorProvider,
  ThemeColorScheme,
  useRootTheme,
} from '@sanity/ui'
import {useBoolean} from '@sanity/ui-workshop'
import React, {createContext, useContext} from 'react'
import {ThemeColorMenuItem, ThemeColorMenuItemStates} from '../lib/theme/color/menuItem'

interface Features {
  button: boolean
  card: boolean
  menuItem: boolean
  input: boolean
  spot: boolean
}

const defaultFeatures: Features = {
  button: true,
  card: false,
  input: false,
  menuItem: false,
  spot: false,
}

const FeaturesContext = createContext<Features>(defaultFeatures)

function useFeatures() {
  return useContext(FeaturesContext)
}

export default function CanvasStory() {
  const {theme} = useRootTheme()
  const features: Features = {
    ...defaultFeatures,
    button: useBoolean('Show button', defaultFeatures.button, 'Props') ?? defaultFeatures.button,
    card: useBoolean('Show card', defaultFeatures.card, 'Props') ?? defaultFeatures.card,
    input: useBoolean('Show input', defaultFeatures.input, 'Props') ?? defaultFeatures.input,
    menuItem:
      useBoolean('Show menuItem', defaultFeatures.menuItem, 'Props') ?? defaultFeatures.menuItem,
    spot: useBoolean('Show spot', defaultFeatures.spot, 'Props') ?? defaultFeatures.spot,
  }

  return (
    <FeaturesContext.Provider value={features}>
      <Flex gap={1}>
        <ThemeColorProvider scheme="light">
          <ColorScheme scheme={theme.color.light} />
        </ThemeColorProvider>

        <ThemeColorProvider scheme="dark">
          <ColorScheme scheme={theme.color.dark} />
        </ThemeColorProvider>
      </Flex>
    </FeaturesContext.Provider>
  )
}

function ColorScheme(props: {scheme: ThemeColorScheme}) {
  const {scheme} = props

  return (
    <Flex direction="column" flex={1} gap={1}>
      <Color color={scheme.default} tone="default" />
      <Color color={scheme.transparent} tone="transparent" />
      <Color color={scheme.primary} tone="primary" />
      <Color color={scheme.positive} tone="positive" />
      <Color color={scheme.caution} tone="caution" />
      <Color color={scheme.critical} tone="critical" />
    </Flex>
  )
}

function Color(props: {color: ThemeColor; tone: CardTone}) {
  const {color, tone} = props
  const features = useFeatures()

  return (
    <Card padding={[3, 4, 5]} tone={tone}>
      <Stack
        marginBottom={4}
        padding={3}
        space={2}
        style={{
          borderRadius: 3,
          boxShadow: `inset 0 0 0 1px ${color.base.border}`,
        }}
      >
        <Text>Text</Text>
        <Text muted>Muted</Text>
        <Text accent>Accent</Text>
        <Text>
          <a href="#">Link</a>
        </Text>
        <Text>
          <code>Code</code>
        </Text>
      </Stack>

      {features.button && <ColorButton color={color.button} />}

      {features.card && (
        <Box padding={2} style={{backgroundColor: color.card.enabled.bg}}>
          <Text style={{color: 'inherit'}}>Card</Text>
        </Box>
      )}

      {features.input && (
        <Box padding={2} style={{backgroundColor: color.input.default.enabled.bg}}>
          <Text style={{color: 'inherit'}}>Input</Text>
        </Box>
      )}

      {features.menuItem && <ColorMenuItem color={color.menuItem} />}

      {features.spot && (
        <Flex gap={1} padding={2}>
          <Box flex={1} style={{backgroundColor: color.spot.blue, width: 25, height: 25}} />
          <Box flex={1} style={{backgroundColor: color.spot.purple, width: 25, height: 25}} />
          <Box flex={1} style={{backgroundColor: color.spot.magenta, width: 25, height: 25}} />
          <Box flex={1} style={{backgroundColor: color.spot.red, width: 25, height: 25}} />
          <Box flex={1} style={{backgroundColor: color.spot.yellow, width: 25, height: 25}} />
          <Box flex={1} style={{backgroundColor: color.spot.green, width: 25, height: 25}} />
          <Box flex={1} style={{backgroundColor: color.spot.cyan, width: 25, height: 25}} />
          <Box flex={1} style={{backgroundColor: color.spot.gray, width: 25, height: 25}} />
        </Flex>
      )}
    </Card>
  )
}

function ColorButton(props: {color: ThemeColorButton}) {
  const {color} = props

  return (
    <Stack space={3}>
      <ColorButtonMode color={color.default} />
      <ColorButtonMode color={color.ghost} />
      <ColorButtonMode color={color.bleed} />
    </Stack>
  )
}

function ColorButtonMode(props: {color: ThemeColorButtonTones}) {
  const {color} = props

  return (
    <Stack space={1}>
      <Grid columns={5} marginBottom={1} gap={1}>
        <Box>
          <Text align="center" muted size={1}>
            Enabled
          </Text>
        </Box>
        <Box>
          <Text align="center" muted size={1}>
            Hovered
          </Text>
        </Box>
        <Box>
          <Text align="center" muted size={1}>
            Pressed
          </Text>
        </Box>
        <Box>
          <Text align="center" muted size={1}>
            Selected
          </Text>
        </Box>
        <Box>
          <Text align="center" muted size={1}>
            Disabled
          </Text>
        </Box>
      </Grid>
      <ColorButtonModeStates color={color.default} />
      <ColorButtonModeStates color={color.primary} />
      <ColorButtonModeStates color={color.positive} />
      <ColorButtonModeStates color={color.caution} />
      <ColorButtonModeStates color={color.critical} />
    </Stack>
  )
}

function ColorButtonModeStates(props: {color: ThemeColorButtonStates}) {
  const {color} = props

  return (
    <Grid columns={5} gap={1}>
      <ColorGenericState color={color.enabled} />
      <ColorGenericState color={color.hovered} />
      <ColorGenericState color={color.pressed} />
      <ColorGenericState color={color.selected} />
      <ColorGenericState color={color.disabled} />
    </Grid>
  )
}

function ColorGenericState(props: {color: ThemeColorButtonState}) {
  const {color} = props

  return (
    <Stack
      padding={2}
      space={2}
      style={{
        backgroundColor: color.bg,
        border: `1px solid ${color.border}`,
        borderRadius: 3,
      }}
    >
      <Text align="center" style={{color: color.fg}}>
        Text
      </Text>
      <Text align="center" size={1} style={{color: color.muted.fg}}>
        Muted
      </Text>
      <Text align="center" size={1} style={{color: color.link.fg}}>
        Link
      </Text>
      <Text align="center" size={1} style={{color: color.accent.fg}}>
        Accent
      </Text>
      <Text align="center" size={1} style={{color: color.code.fg}}>
        <span style={{backgroundColor: color.code.bg}}>Code</span>
      </Text>
    </Stack>
  )
}

function ColorMenuItem(props: {color: ThemeColorMenuItem}) {
  const {color} = props

  return (
    <Stack space={1}>
      <ColorMenuItemTone color={color.default} />
      <ColorMenuItemTone color={color.primary} />
      <ColorMenuItemTone color={color.positive} />
      <ColorMenuItemTone color={color.caution} />
      <ColorMenuItemTone color={color.critical} />
    </Stack>
  )
}

function ColorMenuItemTone(props: {color: ThemeColorMenuItemStates}) {
  const {color} = props

  return (
    <Grid columns={5} gap={1}>
      <ColorGenericState color={color.enabled} />
      <ColorGenericState color={color.hovered} />
      <ColorGenericState color={color.pressed} />
      <ColorGenericState color={color.selected} />
      <ColorGenericState color={color.disabled} />
    </Grid>
  )
}
