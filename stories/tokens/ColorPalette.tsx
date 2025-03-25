import {COLOR_HUES, ColorTint, ColorTints, black, hues, white} from '@sanity/color'
import {ReactNode} from 'react'
import {styled} from 'styled-components'
import { Box } from '../../src/core/primitives/box/box'
import { Card } from '../../src/core/primitives/card/card'
import { Code } from '../../src/core/primitives/code/code'
import { Flex } from '../../src/core/primitives/flex/flex'
import { Grid } from '../../src/core/primitives/grid/grid'
import { Heading } from '../../src/core/primitives/heading/heading'
import { Stack } from '../../src/core/primitives/stack/stack'
import { ThemeProvider } from '../../src/core/theme/themeProvider'
import { buildTheme } from '../../src/theme/build/buildTheme'
import { hexToRgb, rgbToHsl } from '../../src/theme/build/lib/color-fns/convert'

const theme = buildTheme()

function ucfirst(str: string) {
  return str.slice(0, 1).toUpperCase() + str.slice(1)
}

export function ColorPalette(): ReactNode {
  return (
    <ThemeProvider theme={theme}>
      <Card scheme="light">
        <Grid columns={[1, 1, 2, 3]} gapX={[4, 4, 5]} gapY={[5, 5, 6]} padding={[4, 5, 6]}>
          {COLOR_HUES.map((hueKey) => (
            <ColorHuePreview tints={hues[hueKey]} hueKey={hueKey} key={hueKey} />
          ))}
        </Grid>
      </Card>
    </ThemeProvider>
  )
}

function ColorHuePreview(props: {hueKey: string; tints: ColorTints}) {
  const {hueKey, tints} = props

  return (
    <Box>
      <Heading as="h2" size={1}>
        {ucfirst(hueKey)}
      </Heading>

      <Stack marginTop={[3, 3, 4]} space={1}>
        {Object.entries(tints).map(([tintKey, tint]) => {
          return <ColorTintPreview key={tintKey} tint={tint} />
        })}
      </Stack>
    </Box>
  )
}

const ColorCard = styled(Card)<{$bg: string; $fg: string}>`
  cursor: pointer;

  --card-bg-color: ${({$bg}) => $bg};
  --card-fg-color: ${({$fg}) => $fg};

  &:not(:disabled):active,
  &:not(:disabled):hover {
    --card-bg-color: ${({$bg}) => $bg} !important;
    --card-fg-color: ${({$fg}) => $fg} !important;
  }
`

function ColorTintPreview(props: {tint: ColorTint}) {
  const {tint} = props
  const hsl = rgbToHsl(hexToRgb(tint.hex))

  return (
    <ColorCard
      $bg={tint.hex}
      $fg={hsl.l < 50 ? white.hex : black.hex}
      __unstable_focusRing
      forwardedAs="button"
      radius={2}
    >
      <Flex padding={3}>
        <Box flex={1}>
          <Code size={1} style={{color: 'inherit'}}>
            {tint.title}
          </Code>
        </Box>
        <Box>
          <Code size={1} style={{color: 'inherit'}}>
            {tint.hex}
          </Code>
        </Box>
      </Flex>
    </ColorCard>
  )
}
