import {Box, Button, Flex, Stack, Text} from '@sanity/ui'

import {useThemer} from './context'
import {ScrollArea} from './ScrollArea'
import {displayTitle} from './themes'
import {ThemeThumbnail} from './ThemeThumbnail'

import {removedThumbnail} from './RemovedThemes.css'

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
    <ScrollArea padding={3}>
      <Stack gap={5}>
        {removed.map((theme) => (
          <Stack gap={3} key={theme.slug}>
            <Box className={removedThumbnail}>
              <ThemeThumbnail options={theme.options} />
            </Box>
            <Text align="center" size={1} textOverflow="ellipsis">
              {displayTitle(theme.title)}
            </Text>
            <Flex gap={2} justify="center">
              <Button
                mode="ghost"
                onClick={() => send({type: 'theme.restore', slug: theme.slug})}
                padding={2}
                text="Restore"
              />
              {theme.source === 'custom' && (
                <Button
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
    </ScrollArea>
  )
}
