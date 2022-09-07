import {COLOR_HUES, COLOR_TINTS, hues} from '@sanity/color'
import {ClipboardIcon} from '@sanity/icons'
import {Box, Button, Code, Flex, Grid, Heading, Stack, Text, useToast} from '@sanity/ui'
import {readableColor} from 'polished'

export function ColorGrid() {
  const toast = useToast()

  return (
    <Grid columns={[1, 1, 1, 3]} gap={5}>
      {COLOR_HUES.map((hueKey) => (
        <Stack key={hueKey} space={3}>
          <Heading as="h2" size={[0, 0, 1, 2]}>
            {hueKey}
          </Heading>

          <Box>
            {COLOR_TINTS.map((tintKey) => {
              const tint = hues[hueKey][tintKey]

              return (
                <Flex align="center" key={tintKey}>
                  <Box
                    flex={1}
                    padding={3}
                    style={{backgroundColor: tint.hex, color: readableColor(tint.hex)}}
                  >
                    <Flex justify="space-between">
                      <Text size={1} weight="semibold">
                        {tint.title}
                      </Text>
                      <Code size={1}>{tint.hex}</Code>
                    </Flex>
                  </Box>
                  <Box marginLeft={2}>
                    <Button
                      icon={ClipboardIcon}
                      mode="bleed"
                      onClick={() => {
                        navigator.clipboard.writeText(tint.hex)
                        toast.push({
                          title: (
                            <>
                              Copied <em>{tint.title}</em> to clipboard
                            </>
                          ),
                          status: 'info',
                        })
                      }}
                      padding={2}
                      size={1}
                      title="Copy hex value"
                    />
                  </Box>
                </Flex>
              )
            })}
          </Box>
        </Stack>
      ))}
    </Grid>
  )
}
