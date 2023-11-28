import {
  Box,
  Card,
  CardTone,
  Flex,
  Grid,
  Stack,
  Text,
  ThemeColorProvider,
  useRootTheme,
} from '@sanity/ui'
import {
  ThemeColor,
  ThemeColorBase,
  ThemeColorButton,
  ThemeColorButtonState,
  ThemeColorButtonStates,
  ThemeColorButtonTones,
  ThemeColorCard,
  ThemeColorScheme,
  ThemeColorSelectable,
  ThemeColorSelectableStates,
  getContrastRatio,
  mix,
  parseColor,
  rgbToHex,
} from '@sanity/ui/theme'
import {useBoolean} from '@sanity/ui-workshop'
import {createContext, useContext} from 'react'

interface Features {
  light: boolean
  dark: boolean

  base: boolean
  button: boolean
  card: boolean
  input: boolean
  selectable: boolean
  spot: boolean
}

const defaultFeatures: Features = {
  light: true,
  dark: false,

  base: false,
  button: false,
  card: false,
  input: false,
  selectable: false,
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
    light: useBoolean('Light', defaultFeatures.light, 'Props') ?? defaultFeatures.light,
    dark: useBoolean('Dark', defaultFeatures.dark, 'Props') ?? defaultFeatures.dark,
    base: useBoolean('Base', defaultFeatures.base, 'Props') ?? defaultFeatures.base,
    button: useBoolean('Button', defaultFeatures.button, 'Props') ?? defaultFeatures.button,
    card: useBoolean('Card', defaultFeatures.card, 'Props') ?? defaultFeatures.card,
    input: useBoolean('Input', defaultFeatures.input, 'Props') ?? defaultFeatures.input,
    // muted: useBoolean('Muted', defaultFeatures.muted, 'Props') ?? defaultFeatures.muted,
    selectable:
      useBoolean('Selectable', defaultFeatures.selectable, 'Props') ?? defaultFeatures.selectable,
    // solid: useBoolean('Solid', defaultFeatures.solid, 'Props') ?? defaultFeatures.solid,
    spot: useBoolean('Avatar', defaultFeatures.spot, 'Props') ?? defaultFeatures.spot,
  }

  return (
    <FeaturesContext.Provider value={features}>
      <Flex>
        {features.light && (
          <ThemeColorProvider scheme="light">
            <ColorScheme scheme={theme.color.light} />
          </ThemeColorProvider>
        )}

        {features.dark && (
          <ThemeColorProvider scheme="dark">
            <ColorScheme scheme={theme.color.dark} />
          </ThemeColorProvider>
        )}
      </Flex>
    </FeaturesContext.Provider>
  )
}

function ColorScheme(props: {scheme: ThemeColorScheme}) {
  const {scheme} = props

  return (
    <Flex direction="column" flex={1}>
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
    <Card padding={[3, 4]} tone={tone}>
      <Stack
        space={[3, 4]}
        // style={{outline: '1px solid #ccc'}}
      >
        {features.base && <ColorBase color={color.base} />}

        {features.button && <ColorButton color={color.button} />}

        {features.card && <ColorCard color={color.card} />}

        {features.input && (
          <Box padding={2} style={{backgroundColor: color.input.default.enabled.bg}}>
            <Text style={{color: 'inherit'}}>Input</Text>
          </Box>
        )}

        {/* {features.muted && <ColorMuted color={color.muted} />} */}

        {/* @todo: remove use of `muted` here */}
        {features.selectable && <ColorSelectable color={color.selectable || color.muted} />}

        {/* {features.solid && <ColorSolid color={color.solid} />} */}

        {features.spot && (
          <Flex gap={1}>
            <Box flex={1} style={{backgroundColor: color.avatar?.blue.bg, width: 25, height: 25}} />
            <Box
              flex={1}
              style={{backgroundColor: color.avatar?.purple.bg, width: 25, height: 25}}
            />
            <Box
              flex={1}
              style={{backgroundColor: color.avatar?.magenta.bg, width: 25, height: 25}}
            />
            <Box flex={1} style={{backgroundColor: color.avatar?.red.bg, width: 25, height: 25}} />
            <Box
              flex={1}
              style={{backgroundColor: color.avatar?.yellow.bg, width: 25, height: 25}}
            />
            <Box
              flex={1}
              style={{backgroundColor: color.avatar?.green.bg, width: 25, height: 25}}
            />
            <Box flex={1} style={{backgroundColor: color.avatar?.cyan.bg, width: 25, height: 25}} />
            <Box flex={1} style={{backgroundColor: color.avatar?.gray.bg, width: 25, height: 25}} />
          </Flex>
        )}
      </Stack>
    </Card>
  )
}

function ColorBase(props: {color: ThemeColorBase}) {
  const {color} = props

  return (
    <Stack
      padding={3}
      space={2}
      style={{
        borderRadius: 3,
        boxShadow: `inset 0 0 0 1px ${color.border}`,
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
      <div
        style={{
          height: 9,
          background: `linear-gradient(to right, ${color.skeleton?.from}, ${color.skeleton?.to})`,
        }}
      />
    </Stack>
  )
}

function ColorCard(props: {color: ThemeColorCard}) {
  const {color} = props

  return (
    <Box style={{backgroundColor: color.enabled.bg}}>
      <ColorGenericStates color={color} />
    </Box>
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
      <ColorGenericStates color={color.default} />
      <ColorGenericStates color={color.primary} />
      <ColorGenericStates color={color.positive} />
      <ColorGenericStates color={color.caution} />
      <ColorGenericStates color={color.critical} />
    </Stack>
  )
}

function ColorGenericStates(props: {color: ThemeColorButtonStates}) {
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

function _contrast(baseBg: string, bg: string, fg: string) {
  const baseBgRgb = parseColor(baseBg)
  let bgRgb = parseColor(bg)

  if (typeof bgRgb.a === 'number') {
    bgRgb = mix(baseBgRgb, bgRgb, bgRgb.a)
  }

  return getContrastRatio(rgbToHex(bgRgb), fg)
}

function ColorGenericState(props: {color: ThemeColorButtonState}) {
  const {color} = props

  return (
    <Stack
      padding={2}
      space={2}
      style={{
        backgroundColor: color.bg,
        color: color.fg,
        border: `1px solid ${color.border}`,
        borderRadius: 3,
      }}
    >
      <Flex style={{border: `1px solid ${color.border}`}}>
        <Box flex={1} padding={3} style={{backgroundColor: color.bg}}>
          <Text align="center" size={1} style={{color: 'inherit'}}>
            bg
          </Text>
        </Box>
        <Box flex={1} padding={3} style={{backgroundColor: color.bg2}}>
          <Text align="center" size={1} style={{color: 'inherit'}}>
            bg2
          </Text>
        </Box>
      </Flex>

      <Text align="center" size={1} style={{color: 'inherit'}}>
        Text &ndash; {_contrast(color.bg, color.bg, color.fg).toFixed(2)}
      </Text>
      <Text align="center" size={1} style={{color: color.muted.fg}}>
        Muted &ndash; {_contrast(color.bg, color.bg, color.muted.fg).toFixed(2)}
      </Text>
      <Text align="center" size={1} style={{color: color.link.fg}}>
        Link &ndash; {_contrast(color.bg, color.bg, color.link.fg).toFixed(2)}
      </Text>
      <Text align="center" size={1} style={{color: color.accent.fg}}>
        Accent &ndash; {_contrast(color.bg, color.bg, color.accent.fg).toFixed(2)}
      </Text>
      <Text align="center" size={1} style={{color: color.code.fg}}>
        <span style={{backgroundColor: color.code.bg}}>Code</span> &ndash;{' '}
        {_contrast(color.bg, color.code.bg, color.code.fg).toFixed(2)}
      </Text>
      <div
        style={{
          height: 9,
          background: `linear-gradient(to right, ${color.skeleton?.from}, ${color.skeleton?.to})`,
        }}
      />
    </Stack>
  )
}

function ColorSelectable(props: {color: ThemeColorSelectable}) {
  const {color} = props

  return (
    <Stack space={1}>
      <ColorSelectableTone color={color.default} />
      <ColorSelectableTone color={color.primary} />
      <ColorSelectableTone color={color.positive} />
      <ColorSelectableTone color={color.caution} />
      <ColorSelectableTone color={color.critical} />
    </Stack>
  )
}

function ColorSelectableTone(props: {color: ThemeColorSelectableStates}) {
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
