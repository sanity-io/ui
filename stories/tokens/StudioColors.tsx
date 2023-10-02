import {ReactNode} from 'react'
import {Card, Flex, Grid, Stack, Text} from '../../src/primitives'
import {ThemeProvider, studioTheme} from '../../src/theme'
import {tones} from '../../src/theme/studioTheme/color'
import {ColorKey, getColorHex, getColorValue, colorKeys} from '../../src/theme/studioTheme/tints'

const studioTones = ['default', 'positive', 'critical', 'caution'] as const

// Create a function that transform text_primary to "Text Primary"
function toTitleCase(str: string): string {
  return str
    .split('_')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ')
}

export function StudioColors(): ReactNode {
  return (
    <ThemeProvider theme={studioTheme}>
      <Stack space={5}>
        <Card scheme="light" padding={3} radius={3}>
          <Stack space={3}>
            <Text size={0} weight="medium" muted>
              LIGHT MODE
            </Text>
            <Card padding={3} radius={3} border>
              <Stack space={4}>
                {colorKeys.map((colorKey) => (
                  <ColorPreview key={colorKey} colorKey={colorKey} theme="light" />
                ))}
              </Stack>
            </Card>
          </Stack>
        </Card>
        <Card scheme="dark" padding={3} radius={3}>
          <Stack space={3}>
            <Text size={0} weight="medium" muted>
              DARK MODE
            </Text>
            <Card padding={3} radius={3} border>
              <Stack space={4}>
                {colorKeys.map((colorKey) => (
                  <ColorPreview key={colorKey} colorKey={colorKey} theme="dark" />
                ))}
              </Stack>
            </Card>
          </Stack>
        </Card>
      </Stack>
    </ThemeProvider>
  )
}

function ColorPreview(props: {colorKey: ColorKey; theme: 'light' | 'dark'}) {
  const {colorKey, theme} = props

  return (
    <Stack space={3}>
      <Text size={1} muted>
        {toTitleCase(colorKey)}
      </Text>
      <Grid columns={4} gap={2}>
        {studioTones.map((tone) => (
          <Card radius={3} padding={2} key={tone} border>
            <Flex justify={'flex-start'} gap={3} align={'center'}>
              <div
                style={{
                  flexShrink: 0,
                  height: '48px',
                  width: '48px',
                  borderRadius: '4px',
                  boxShadow: ['Black', 'White'].includes(
                    getColorValue(tones[tone], theme === 'dark', tone, colorKey)?.title,
                  )
                    ? `0 0 0 1px ${getColorHex(
                        tones['default'],
                        theme === 'dark',
                        'default',
                        'border_base',
                      )}`
                    : undefined,
                  backgroundColor: getColorHex(tones[tone], theme === 'dark', tone, colorKey),
                }}
              />
              <Flex
                gap={2}
                direction={'column'}
                height={'fill'}
                justify={'center'}
                align="flex-start"
              >
                <Flex>
                  <Text size={1} weight="medium" style={{textTransform: 'capitalize'}}>
                    {tone}
                    {colorKey.includes('hover')
                      ? ':hover'
                      : colorKey.includes('active')
                      ? ':active'
                      : ''}
                  </Text>
                </Flex>
                <Text size={0} muted>
                  {getColorValue(tones[tone], theme === 'dark', tone, colorKey)
                    .title.split(' ')
                    .join('/')}
                </Text>
              </Flex>
            </Flex>
          </Card>
        ))}
      </Grid>
    </Stack>
  )
}
