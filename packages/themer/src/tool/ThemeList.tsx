import {AddIcon} from '@sanity/icons/Add'
import {ClipboardIcon} from '@sanity/icons/Clipboard'
import {RestoreIcon} from '@sanity/icons/Restore'
import {Box, Button, Card, Flex, Stack} from '@sanity/ui'
import {MotionConfig, Reorder} from 'motion/react'
import {useState} from 'react'

import {useThemer} from './context'
import {ImageFileButton} from './ImageFileButton'
import {optionsFromImagePalette, titleFromFileName} from './imagePalette'
import {PasteThemeDialog} from './PasteThemeDialog'
import {ScrollArea} from './ScrollArea'
import {ThemeCard} from './ThemeCard'
import {TooltipButton} from './TooltipButton'
import {useImagePalette} from './useImagePalette'
import {usePasteThemeCodes, useThemeCodes} from './useThemeCodes'

import {cardGrid} from './ThemeList.css'

/**
 * One column at the sidebar's default width; wider sidebars — and the
 * overlay on small screens — fit more cards per row
 */
/**
 * The flow for picking a theme: a grid of theme cards — the configured theme,
 * the presets and the user's own themes — that drag into the order the user
 * wants, with the entry points to the add and restore flows below. A theme
 * code someone shared pastes right into the list, or through the paste button.
 *
 * @internal
 */
export function ThemeList() {
  const {themes, removed, active, send} = useThemer()
  const {addThemeFromClipboard} = useThemeCodes()
  const [pasting, setPasting] = useState(false)

  usePasteThemeCodes()

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
          {/* The group tells a column from a grid by measuring the cards, and
              lets go of the layout animations for users who prefer reduced motion */}
          <MotionConfig reducedMotion="user">
            <Reorder.Group
              as="div"
              className={cardGrid}
              onReorder={(order: string[]) => send({type: 'theme.reorder', order})}
              values={themes.map((theme) => theme.slug)}
            >
              {themes.map((theme) => (
                <ThemeCard active={theme.slug === active.slug} key={theme.slug} theme={theme} />
              ))}
            </Reorder.Group>
          </MotionConfig>
          {/* Trails the list rather than sitting in the footer, so the footer
              does not shift when the first theme gets removed */}
          {removed.length > 0 && (
            <Button
              gap={2}
              icon={RestoreIcon}
              mode="bleed"
              onClick={() => send({type: 'flow.removed'})}
              padding={2}
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
              onClick={() => send({type: 'theme.add'})}
              text="Add theme"
              tooltip="Add a theme based on the applied one"
              width="fill"
            />
          </Box>
          <ImageFileButton
            loading={busy}
            onFile={pickImage}
            tooltip="Add a theme from the colors of an image"
          />
          <TooltipButton
            icon={ClipboardIcon}
            onClick={async () => {
              // Straight from the clipboard where the browser allows; by hand otherwise
              if ((await addThemeFromClipboard()) !== 'added') setPasting(true)
            }}
            tooltip="Add a theme from a code someone shared"
          />
        </Flex>
      </Card>

      {pasting && <PasteThemeDialog onClose={() => setPasting(false)} />}
    </>
  )
}
