import {AddIcon} from '@sanity/icons/Add'
import {RestoreIcon} from '@sanity/icons/Restore'
import {Box, Button, Card, Flex, Stack} from '@sanity/ui'

import {useThemer} from './context'
import {ImageFileButton} from './ImageFileButton'
import {optionsFromImagePalette, titleFromFileName} from './imagePalette'
import {ScrollArea} from './ScrollArea'
import {ThemeCard} from './ThemeCard'
import {TooltipButton} from './TooltipButton'
import {useImagePalette} from './useImagePalette'

import {cardGrid} from './ThemeList.css'

/**
 * One column at the sidebar's default width; wider sidebars — and the
 * overlay on small screens — fit more cards per row
 */
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
      imageUrl: URL.createObjectURL(file),
    }),
  )

  return (
    <>
      <ScrollArea padding={3}>
        <Stack gap={4}>
          <div className={cardGrid}>
            {themes.map((theme) => (
              <ThemeCard active={theme.slug === active.slug} key={theme.slug} theme={theme} />
            ))}
          </div>
          {/* Trails the list rather than sitting in the footer, so the footer
              does not shift when the first theme gets removed */}
          {removed.length > 0 && (
            <Button
              icon={RestoreIcon}
              mode="bleed"
              onClick={() => send({type: 'flow.removed'})}
              text={`Show removed (${removed.length})`}
              width="fill"
            />
          )}
        </Stack>
      </ScrollArea>

      <Card borderTop padding={3}>
        <Flex gap={2}>
          <Box flex={1}>
            <TooltipButton
              icon={AddIcon}
              mode="ghost"
              onClick={() => send({type: 'theme.add'})}
              text="Add theme"
              tooltip="Add a theme based on the applied one"
              width="fill"
            />
          </Box>
          <ImageFileButton
            loading={busy}
            mode="ghost"
            onFile={pickImage}
            tooltip="Add a theme from the colors of an image"
          />
        </Flex>
      </Card>
    </>
  )
}
