import {Box, Card, Flex, Grid, Heading, Stack, Text, useToast} from '@sanity/ui'
import {getContrast} from 'polished'
import {ReactElement, useCallback, useMemo} from 'react'
import styled from 'styled-components'
import {color} from '../../color'
import {COLOR_HUES} from '../../constants'
import {hexToRgb, rgbToHsl} from '../../lib/convert'
import {ColorTints, ColorTint} from '../../types'

const AA_CONTRAST_THRESHOLD = 4.5
const AAA_CONTRAST_THRESHOLD = 7

function ucfirst(str: string) {
  return str.slice(0, 1).toUpperCase() + str.slice(1)
}

const clipboard = {
  write(text: string) {
    const type = 'text/plain'
    const blob = new Blob([text], {type})
    const data = [
      new ClipboardItem({
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        [type]: blob as any,
      }),
    ]

    return navigator.clipboard.write(data)
  },
}

export default function ColorOverviewStory(): ReactElement {
  return (
    <Grid columns={[1, 1, 2, 3]} gapX={[4, 4, 5]} gapY={[5, 5, 6]} padding={[4, 5, 6]}>
      {COLOR_HUES.map((hueKey) => (
        <ColorHuePreview tints={color[hueKey]} hueKey={hueKey} key={hueKey} />
      ))}
    </Grid>
  )
}

function ColorHuePreview(props: {hueKey: string; tints: ColorTints}) {
  const {hueKey, tints} = props

  return (
    <Box>
      <Heading as="h2" hidden size={1}>
        {ucfirst(hueKey)}
      </Heading>

      <Stack
        // marginTop={[3, 3, 4]}
        space={1}
      >
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
  const {push: pushToast} = useToast()

  const contrast = useMemo(
    () => ({
      dark: getContrast(tint.hex, color.black.hex),
      light: getContrast(tint.hex, color.white.hex),
    }),
    [tint.hex],
  )

  const handleClick = useCallback(() => {
    clipboard
      .write(tint.hex)
      .then(() => {
        pushToast({
          title: (
            <>
              Copied {tint.title} (<code>{tint.hex}</code>) to clipboard!
            </>
          ),
        })
      })
      .catch((err) => {
        // eslint-disable-next-line no-console
        console.log(err)
        pushToast({
          status: 'error',
          title: <>Copied not write to clipboard!</>,
        })
      })
  }, [pushToast, tint])

  const darkAA = AA_CONTRAST_THRESHOLD <= contrast.dark
  const darkAAA = AAA_CONTRAST_THRESHOLD <= contrast.dark
  const lightAA = AA_CONTRAST_THRESHOLD <= contrast.light
  const lightAAA = AAA_CONTRAST_THRESHOLD <= contrast.light

  return (
    <ColorCard
      $bg={tint.hex}
      $fg={hsl[2] < 50 ? color.white.hex : color.black.hex}
      __unstable_focusRing
      forwardedAs="button"
      onClick={handleClick}
      radius={2}
    >
      <Flex padding={3}>
        <Box flex={1}>
          <Flex gap={2}>
            <Box flex={1}>
              <Text size={1} style={{color: 'inherit'}} weight="medium">
                {tint.title}
              </Text>
            </Box>

            {(darkAA || lightAA) && (
              <Flex gap={1}>
                {darkAAA ? (
                  <Card padding={1} radius={1} scheme="dark" style={{margin: '-3px 0'}}>
                    <Text size={0} weight="bold">
                      AAA &middot; {contrast.dark.toFixed(1)}:1
                    </Text>
                  </Card>
                ) : darkAA ? (
                  <Card padding={1} radius={1} scheme="dark" style={{margin: '-3px 0'}}>
                    <Text size={0} weight="bold">
                      AA &middot; {contrast.dark.toFixed(1)}:1
                    </Text>
                  </Card>
                ) : null}

                {lightAAA ? (
                  <Card padding={1} radius={1} scheme="light" style={{margin: '-3px 0'}}>
                    <Text size={0} weight="bold">
                      AAA &middot; {contrast.light.toFixed(1)}:1
                    </Text>
                  </Card>
                ) : lightAA ? (
                  <Card padding={1} radius={1} scheme="light" style={{margin: '-3px 0'}}>
                    <Text size={0} weight="bold">
                      AA &middot; {contrast.light.toFixed(1)}:1
                    </Text>
                  </Card>
                ) : null}
              </Flex>
            )}
          </Flex>
        </Box>

        {/* <Box>
          <Code size={1} style={{color: 'inherit'}}>
            {tint.hex}
          </Code>
        </Box> */}
      </Flex>
    </ColorCard>
  )
}
