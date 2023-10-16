import {ReactNode, useLayoutEffect, useRef, useState} from 'react'
import {Card, Code, Flex, Grid, Stack, Text} from '../../src/primitives'
import {ThemeProvider, studioTheme} from '../../src/theme'
import {ThemeColorSpotKey, spotCssVariables} from '../../src/theme/lib/theme/color/cssVariables'

export function SpotVariables(): ReactNode {
  const cssVarsKeys = Object.keys(spotCssVariables).sort() as ThemeColorSpotKey[]

  return (
    <ThemeProvider theme={studioTheme}>
      <Stack space={5}>
        <Card padding={3} radius={3}>
          <Stack space={3}>
            <Text size={0} weight="medium" muted>
              LIGHT MODE
            </Text>
            <Grid columns={5} gap={2}>
              {cssVarsKeys.map((key) => (
                <ColorPreview key={key} spotColor={key} value={spotCssVariables[key]} />
              ))}
            </Grid>
          </Stack>
        </Card>
        <Card padding={3} radius={3} scheme="dark">
          <Stack space={3}>
            <Text size={0} weight="medium" muted>
              DARK MODE
            </Text>
            <Card border padding={3} radius={3}>
              <Grid columns={5} gap={2}>
                {cssVarsKeys.map((key) => (
                  <ColorPreview key={key} spotColor={key} value={spotCssVariables[key]} />
                ))}
              </Grid>
            </Card>
          </Stack>
        </Card>
      </Stack>
    </ThemeProvider>
  )
}

function ColorPreview({spotColor, value}: {spotColor: ThemeColorSpotKey; value: string}) {
  const cardRef = useRef<HTMLDivElement | null>(null)
  const [propertyValue, setPropertyValue] = useState<string | null>()

  const cssVariableKey = `--spot-${spotColor}`

  useLayoutEffect(() => {
    if (!cardRef.current) return
    const propertyValue = getComputedStyle(cardRef.current).getPropertyValue(cssVariableKey)

    setPropertyValue(propertyValue)
  }, [spotColor, propertyValue, cssVariableKey])

  return (
    <Card ref={cardRef}>
      <Flex align="center" gap={2}>
        <Card border padding={1} radius={3} shadow={0} style={{flexShrink: 0}}>
          <Card radius={2} style={{background: value, height: '75px', width: '75px'}} />
        </Card>
        <Stack space={2}>
          <Text size={0} weight="medium">
            {spotColor}
          </Text>
          {propertyValue && <Code size={0}>{propertyValue}</Code>}
        </Stack>
      </Flex>
    </Card>
  )
}
