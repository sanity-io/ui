import {ReactNode, useLayoutEffect, useRef, useState} from 'react'
import {Card, Code, Flex, Grid, Stack, Text} from '../../src/primitives'
import {ThemeColorName, ThemeProvider, studioTheme} from '../../src/theme'
import {tonesCssVariables} from '../../src/theme/lib/theme/color/cssVariables/tones'

export function ToneVariables(): ReactNode {
  const cssVarsKeys = Object.keys(tonesCssVariables).sort() as ThemeColorName[]

  return (
    <ThemeProvider theme={studioTheme}>
      <Stack space={5}>
        <Card padding={3} radius={3}>
          <Stack space={3}>
            <Text size={0} weight="medium" muted>
              LIGHT MODE
            </Text>
            <Card border padding={3} radius={3}>
              <Grid columns={6} gap={2}>
                {cssVarsKeys.map((key) => (
                  <CSSVariablesPreview cssVarKey={key} key={key} />
                ))}
              </Grid>
            </Card>
          </Stack>
        </Card>
        <Card padding={3} radius={3} scheme="dark">
          <Stack space={3}>
            <Text size={0} weight="medium" muted>
              DARK MODE
            </Text>
            <Card border padding={3} radius={3}>
              <Grid columns={6} gap={2}>
                {cssVarsKeys.map((key) => (
                  <CSSVariablesPreview cssVarKey={key} key={key} />
                ))}
              </Grid>
            </Card>
          </Stack>
        </Card>
      </Stack>
    </ThemeProvider>
  )
}

function CSSVariablesPreview({cssVarKey}: {cssVarKey: ThemeColorName}) {
  return (
    <Stack space={3}>
      <Text size={1} weight="semibold">
        {cssVarKey}
      </Text>
      <Grid columns={1} gap={1}>
        {Object.entries(tonesCssVariables[cssVarKey])
          .sort()
          .map(([key, value]) => {
            const cssVariableKey = `--${cssVarKey}-${key}`

            return <ColorPreview cssVariableKey={cssVariableKey} key={key} value={value} />
          })}
      </Grid>
    </Stack>
  )
}

function ColorPreview({cssVariableKey, value}: {cssVariableKey: string; value: string}) {
  const cardRef = useRef<HTMLDivElement | null>(null)
  const [propertyValue, setPropertyValue] = useState<string | null>()

  useLayoutEffect(() => {
    if (!cardRef.current) return
    const propertyValue = getComputedStyle(cardRef.current).getPropertyValue(cssVariableKey)

    setPropertyValue(propertyValue)
  }, [cssVariableKey, propertyValue])

  return (
    <Card ref={cardRef}>
      <Flex align="center" gap={2}>
        <Card border padding={1} radius={3} shadow={0} style={{flexShrink: 0}}>
          <Card radius={2} style={{background: value, height: '50px', width: '50px'}} />
        </Card>
        <Stack space={2}>
          <Text size={0} weight="medium">
            {cssVariableKey}
          </Text>
          {propertyValue && <Code size={0}>{propertyValue}</Code>}
        </Stack>
      </Flex>
    </Card>
  )
}
