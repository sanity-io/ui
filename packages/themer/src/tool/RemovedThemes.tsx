import {Box, Button, Flex, Stack, Text} from '@sanity/ui'

import {useThemer} from './context'
import {displayTitle} from './themes'
import {ThemeThumbnail} from './ThemeThumbnail'

/**
 * The flow for restoring removed themes: the presets and custom themes the
 * user took out of the list, each with a button to put it back — and, for
 * custom themes, one to delete it for good. The machine leaves the flow once
 * the last one is gone.
 *
 * @internal
 */
export function RemovedThemes() {
  const {removed, send} = useThemer()

  return (
    <Box flex={1} overflow="auto" padding={3}>
      <Stack gap={5}>
        {removed.map((theme) => (
          <Stack gap={3} key={theme.slug}>
            <Box style={{opacity: 0.6}}>
              <ThemeThumbnail options={theme.options} />
            </Box>
            <Text align="center" size={1} textOverflow="ellipsis">
              {displayTitle(theme.title)}
            </Text>
            <Flex gap={2} justify="center">
              <Button
                fontSize={1}
                mode="ghost"
                onClick={() => send({type: 'theme.restore', slug: theme.slug})}
                padding={2}
                text="Restore"
              />
              {theme.source === 'custom' && (
                <Button
                  fontSize={1}
                  mode="ghost"
                  onClick={() => send({type: 'theme.delete', slug: theme.slug})}
                  padding={2}
                  text="Delete"
                  tone="critical"
                />
              )}
            </Flex>
          </Stack>
        ))}
      </Stack>
    </Box>
  )
}
