import {black, COLOR_HUES, ColorTint, ColorTints, hues, white} from '@sanity/color'
import {
  Box,
  Card,
  Code,
  Flex,
  Grid,
  Heading,
  Stack,
  Text,
  ThemeProvider,
  ToastProvider,
  useToast,
} from '@sanity/ui'
import {buildTheme, hexToRgb, rgbToHsl} from '@sanity/ui/theme'
import {ReactNode} from 'react'
import {styled} from 'styled-components'

const theme = buildTheme()

const AA_CONTRAST_THRESHOLD = 4.5
const AAA_CONTRAST_THRESHOLD = 7

function ucfirst(str: string) {
  return str.slice(0, 1).toUpperCase() + str.slice(1)
}

/** WCAG 2.x relative luminance (https://www.w3.org/TR/WCAG22/#dfn-relative-luminance) */
function luminance(hex: string): number {
  const {r, g, b} = hexToRgb(hex)
  const [lr, lg, lb] = [r, g, b].map((channel) => {
    const s = channel / 255
    return s <= 0.03928 ? s / 12.92 : ((s + 0.055) / 1.055) ** 2.4
  })
  return 0.2126 * lr + 0.7152 * lg + 0.0722 * lb
}

/** WCAG 2.x contrast ratio (https://www.w3.org/TR/WCAG22/#dfn-contrast-ratio) */
function getContrast(hexA: string, hexB: string): number {
  const a = luminance(hexA)
  const b = luminance(hexB)

  return (Math.max(a, b) + 0.05) / (Math.min(a, b) + 0.05)
}

export function ColorPalette(): ReactNode {
  return (
    <ThemeProvider theme={theme}>
      <ToastProvider>
        <Card scheme="light">
          {/* oxlint-disable-next-line no-deprecated */}
          <Grid columns={[1, 1, 2, 3]} gapX={[4, 4, 5]} gapY={[5, 5, 6]} padding={[4, 5, 6]}>
            {COLOR_HUES.map((hueKey) => (
              <ColorHuePreview tints={hues[hueKey]} hueKey={hueKey} key={hueKey} />
            ))}
          </Grid>
        </Card>
      </ToastProvider>
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

      {/* oxlint-disable-next-line no-deprecated */}
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

/** AA/AAA contrast badge, shown when the tint passes WCAG AA against the given scheme */
function ContrastBadge(props: {contrast: number; scheme: 'dark' | 'light'}) {
  const {contrast, scheme} = props

  if (contrast < AA_CONTRAST_THRESHOLD) return null

  return (
    <Card padding={1} radius={1} scheme={scheme} style={{margin: '-3px 0'}}>
      <Text size={0} weight="bold">
        {contrast >= AAA_CONTRAST_THRESHOLD ? 'AAA' : 'AA'} &middot; {contrast.toFixed(1)}:1
      </Text>
    </Card>
  )
}

function ColorTintPreview(props: {tint: ColorTint}) {
  const {tint} = props
  const hsl = rgbToHsl(hexToRgb(tint.hex))
  const toast = useToast()

  const contrast = {
    dark: getContrast(tint.hex, black.hex),
    light: getContrast(tint.hex, white.hex),
  }

  const handleClick = () => {
    navigator.clipboard.writeText(tint.hex).then(
      () =>
        toast.push({
          title: (
            <>
              Copied {tint.title} (<code>{tint.hex}</code>) to clipboard
            </>
          ),
        }),
      () => toast.push({status: 'error', title: 'Could not write to clipboard'}),
    )
  }

  return (
    <ColorCard
      $bg={tint.hex}
      $fg={hsl.l < 50 ? white.hex : black.hex}
      __unstable_focusRing
      forwardedAs="button"
      onClick={handleClick}
      radius={2}
    >
      <Flex align="center" gap={2} padding={3}>
        <Box flex={1}>
          <Code size={1} style={{color: 'inherit'}}>
            {tint.title}
          </Code>
        </Box>

        {(contrast.dark >= AA_CONTRAST_THRESHOLD || contrast.light >= AA_CONTRAST_THRESHOLD) && (
          <Flex gap={1}>
            <ContrastBadge contrast={contrast.dark} scheme="dark" />
            <ContrastBadge contrast={contrast.light} scheme="light" />
          </Flex>
        )}

        <Box>
          <Code size={1} style={{color: 'inherit'}}>
            {tint.hex}
          </Code>
        </Box>
      </Flex>
    </ColorCard>
  )
}
