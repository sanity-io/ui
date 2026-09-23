import {AddIcon} from '@sanity/icons/Add'
import {RestoreIcon} from '@sanity/icons/Restore'
import {Box, Button, Card, Flex, Stack} from '@sanity/ui'

import {useThemer} from './context'
import {ImageFileButton} from './ImageFileButton'
import {optionsFromImagePalette, titleFromFileName} from './imagePalette'
import {ThemeCard} from './ThemeCard'
import {useImagePalette} from './useImagePalette'

/**
 * The flow for picking a theme: one column of theme cards — the configured
 * theme, the presets and the user's own themes — with the entry points to
 * the add and restore flows below.
 *
 * @internal
 */
export function ThemeList() {
  const {themes, removed, active, send} = useThemer()
  const {busy, pickImage} = useImagePalette((palette, file) =>
    send({
      type: 'theme.add',
      title: titleFromFileName(file.name),
      options: optionsFromImagePalette(palette),
      palette,
    }),
  )

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
          <Flex gap={2}>
            <Box flex={1}>
              <Button
                icon={AddIcon}
                mode="ghost"
                onClick={() => send({type: 'theme.add'})}
                text="Add theme"
                title="Add a theme based on the applied one"
                width="fill"
              />
            </Box>
            <ImageFileButton
              loading={busy}
              mode="ghost"
              onFile={pickImage}
              title="Add a theme from the colors of an image"
            />
          </Flex>
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
