import {ArrowLeftIcon} from '@sanity/icons/ArrowLeft'
import {CloseIcon} from '@sanity/icons/Close'
import {CodeBlockIcon} from '@sanity/icons/CodeBlock'
import {SplitVerticalIcon} from '@sanity/icons/SplitVertical'
import {Box, Card, Flex, Text} from '@sanity/ui'
import {useState} from 'react'

import {useThemer} from './context'
import {RemovedThemes} from './RemovedThemes'
import {ThemeEditor} from './ThemeEditor'
import {ThemeList} from './ThemeList'
import {ThemeSnippetDialog} from './ThemeSnippetDialog'
import {TooltipButton} from './TooltipButton'
import {useLegacyThemePaste} from './useLegacyThemePaste'

import {title} from './ThemerSidebar.css'

const VIEW_TITLES = {
  list: 'Themer',
  edit: 'Edit theme',
  removed: 'Removed themes',
} as const

/**
 * The themer sidebar: a header that navigates between the flows and toggles
 * the split preview, the flow itself — picking a theme, editing one, or
 * restoring removed ones — and the dialog with the `buildTheme` snippet of
 * the applied theme. While it shows, pasting a themer.sanity.build URL
 * imports its theme — the sidebar is kept mounted but hidden while closed,
 * which lets go of the paste listener along with its other effects.
 *
 * @internal
 */
export function ThemerSidebar() {
  const {active, split, view, navbarHeight, send} = useThemer()
  const [snippetOpen, setSnippetOpen] = useState(false)
  const inList = view.name === 'list'

  useLegacyThemePaste()

  return (
    <Card height="fill">
      <Flex direction="column" height="fill">
        {/* The header sits next to the Studio navbar and takes its height, so
            the two bottom borders line up — whatever height the Studio, its
            breakpoint or a custom navbar gives it */}
        <Card
          borderBottom
          padding={3}
          sizing="border"
          style={navbarHeight === null ? undefined : {height: navbarHeight}}
        >
          <Flex align="center" gap={1} height="fill">
            {!inList && (
              <TooltipButton
                icon={ArrowLeftIcon}
                mode="bleed"
                onClick={() => send({type: 'flow.list'})}
                padding={2}
                tooltip="Back to the themes"
              />
            )}
            <Box className={title} flex={1}>
              <Text size={1} textOverflow="ellipsis" weight="semibold">
                {VIEW_TITLES[view.name]}
              </Text>
            </Box>
            {/* Packed without gaps, so the title still fits next to them at the
                narrowest sidebar width */}
            <Flex>
              {view.name !== 'removed' && (
                <>
                  <TooltipButton
                    aria-pressed={split}
                    icon={SplitVerticalIcon}
                    mode="bleed"
                    onClick={() => send({type: 'preview.toggle'})}
                    padding={2}
                    selected={split}
                    tooltip="Show light and dark side by side"
                  />
                  <TooltipButton
                    icon={CodeBlockIcon}
                    mode="bleed"
                    onClick={() => setSnippetOpen(true)}
                    padding={2}
                    tooltip="Show the code for the applied theme"
                  />
                </>
              )}
              <TooltipButton
                icon={CloseIcon}
                mode="bleed"
                onClick={() => send({type: 'sidebar.close'})}
                padding={2}
                tooltip="Close themer"
              />
            </Flex>
          </Flex>
        </Card>

        {view.name === 'list' && <ThemeList />}
        {view.name === 'edit' && <ThemeEditor focusTitle={view.focusTitle} slug={view.slug} />}
        {view.name === 'removed' && <RemovedThemes />}
      </Flex>

      {snippetOpen && <ThemeSnippetDialog onClose={() => setSnippetOpen(false)} theme={active} />}
    </Card>
  )
}
