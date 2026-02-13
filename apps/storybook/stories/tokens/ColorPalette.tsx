import {Box, Card, Code, Flex, Grid, Heading, Stack} from '@sanity/ui'
import {vars} from '@sanity/ui/css'
import {HUES, TINTS} from '@sanity/ui/theme'
import type {ReactNode} from 'react'

function ucfirst(str: string) {
  return str.slice(0, 1).toUpperCase() + str.slice(1)
}

export function ColorPalette(): ReactNode {
  return (
    <Card scheme="light" tone="default">
      <Grid columns={[1, 1, 2, 3]} gapX={[4, 4, 5]} gapY={[5, 5, 6]} padding={[4, 5, 6]}>
        {HUES.map((hue) => (
          <ColorHuePreview hue={hue} key={hue} />
        ))}
      </Grid>
    </Card>
  )
}

function ColorHuePreview(props: {hue: (typeof HUES)[number]}) {
  const {hue} = props

  return (
    <Box>
      <Heading as="h2" size={1}>
        {ucfirst(hue)}
      </Heading>

      <Stack gap={1} marginTop={[3, 3, 4]}>
        {TINTS.map((tint) => {
          return <ColorTintPreview key={tint} hue={hue} tint={tint} />
        })}
      </Stack>
    </Box>
  )
}

function ColorTintPreview(props: {hue: (typeof HUES)[number]; tint: (typeof TINTS)[number]}) {
  const {hue, tint} = props

  return (
    <Card
      __unstable_focusRing
      as="button"
      radius={2}
      style={{
        [vars.color.bg]: vars.color.palette[hue][tint],
        [vars.color.fg]: tint < 500 ? vars.color.palette.black : vars.color.palette.white,
      }}
    >
      <Flex padding={3}>
        <Box flex={1}>
          <Code size={1} style={{color: 'inherit'}}>
            {tint}
          </Code>
        </Box>
        <Box>
          <Code size={1} style={{color: 'inherit'}}>
            {vars.color.palette[hue][tint]}
          </Code>
        </Box>
      </Flex>
    </Card>
  )
}
