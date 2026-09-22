import {AddIcon} from '@sanity/icons/Add'
import {RestoreIcon} from '@sanity/icons/Restore'
import {Box, Button, Card, Stack} from '@sanity/ui'

import {useThemer} from './context'
import {ThemeCard} from './ThemeCard'

/**
 * The flow for picking a theme: one column of theme cards — the configured
 * theme, the presets and the user's own themes — with the entry points to
 * the add and restore flows below.
 *
 * @internal
 */
export function ThemeList() {
  const {themes, removed, active, send} = useThemer()

  return (
    <>
      <Box flex={1} overflow="auto" padding={3}>
        <Stack gap={4}>
          {themes.map((theme) => (
            <ThemeCard active={theme.slug === active.slug} key={theme.slug} theme={theme} />
          ))}
        </Stack>
      </Box>

      <Card borderTop padding={3}>
        <Stack gap={2}>
          <Button
            icon={AddIcon}
            mode="ghost"
            onClick={() => send({type: 'theme.add'})}
            text="Add theme"
            title="Add a theme based on the applied one"
            width="fill"
          />
          {removed.length > 0 && (
            <Button
              icon={RestoreIcon}
              mode="bleed"
              onClick={() => send({type: 'flow.removed'})}
              text={`Removed themes (${removed.length})`}
              width="fill"
            />
          )}
        </Stack>
      </Card>
    </>
  )
}
