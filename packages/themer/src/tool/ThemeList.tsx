import {AddIcon} from '@sanity/icons/Add'
import {LinkIcon} from '@sanity/icons/Link'
import {RestoreIcon} from '@sanity/icons/Restore'
import {Box, Button, Card, Flex, Stack} from '@sanity/ui'
import {MotionConfig, Reorder} from 'motion/react'
import {useState} from 'react'

import {useThemer} from './context'
import {ImageFileButton} from './ImageFileButton'
import {optionsFromImagePalette, titleFromFileName} from './imagePalette'
import {ImportThemeDialog} from './ImportThemeDialog'
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
 * The flow for picking a theme: a grid of theme cards — the configured theme,
 * the presets and the user's own themes — that drag into the order the user
 * wants, with the entry points to the add, import and restore flows below.
 *
 * @internal
 */
export function ThemeList() {
  const {themes, removed, active, send} = useThemer()
  const [importOpen, setImportOpen] = useState(false)
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
          {/* These trail the list rather than sitting in the footer, so the
              footer does not shift when the first theme gets removed, and its
              buttons keep their room at the narrowest sidebar width */}
          <Stack gap={1}>
            {removed.length > 0 && (
              <Button
                icon={RestoreIcon}
                mode="bleed"
                onClick={() => send({type: 'flow.removed'})}
                text={`Show removed (${removed.length})`}
                width="fill"
              />
            )}
            <TooltipButton
              icon={LinkIcon}
              mode="bleed"
              onClick={() => setImportOpen(true)}
              text="Import from URL"
              tooltip="Import a themer.sanity.build theme — or paste its URL anywhere in the themer"
              width="fill"
            />
          </Stack>
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

      {importOpen && (
        <ImportThemeDialog
          onClose={() => setImportOpen(false)}
          onImport={({title, options}) => {
            setImportOpen(false)
            send({type: 'theme.add', title, options})
          }}
        />
      )}
    </>
  )
}
