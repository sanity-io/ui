import {ArrowLeftIcon} from '@sanity/icons/ArrowLeft'
import {CloseIcon} from '@sanity/icons/Close'
import {CodeBlockIcon} from '@sanity/icons/CodeBlock'
import {Box, Card, Flex, Text} from '@sanity/ui'
import {useState} from 'react'

import {useThemer} from './context'
import {RemovedThemes} from './RemovedThemes'
import {ThemeEditor} from './ThemeEditor'
import {ThemeList} from './ThemeList'
import {ThemeSnippetDialog} from './ThemeSnippetDialog'
import {TooltipButton} from './TooltipButton'

const VIEW_TITLES = {
  list: 'Themer',
  edit: 'Edit theme',
  removed: 'Removed themes',
} as const

/**
 * The themer sidebar: a header that navigates between the flows, the flow
 * itself — picking a theme, editing one, or restoring removed ones — and the
 * dialog with the `buildTheme` snippet of the applied theme.
 *
 * @internal
 */
export function ThemerSidebar() {
  const {active, view, send} = useThemer()
  const [snippetOpen, setSnippetOpen] = useState(false)
  const inList = view.name === 'list'

  return (
    <Card height="fill">
      <Flex direction="column" height="fill">
        {/* No bottom border: the tools' own toolbars come in different heights, so a
            line here would never line up with theirs */}
        <Card padding={2}>
          <Flex align="center" gap={1}>
            {!inList && (
              <TooltipButton
                icon={ArrowLeftIcon}
                mode="bleed"
                onClick={() => send({type: 'flow.list'})}
                padding={2}
                tooltip="Back to the themes"
              />
            )}
            <Box flex={1} paddingLeft={inList ? 1 : 0} style={{minWidth: 0}}>
              <Text size={1} textOverflow="ellipsis" weight="semibold">
                {VIEW_TITLES[view.name]}
              </Text>
            </Box>
            {view.name !== 'removed' && (
              <TooltipButton
                icon={CodeBlockIcon}
                mode="bleed"
                onClick={() => setSnippetOpen(true)}
                padding={2}
                tooltip="Show the code for the applied theme"
              />
            )}
            <TooltipButton
              icon={CloseIcon}
              mode="bleed"
              onClick={() => send({type: 'sidebar.close'})}
              padding={2}
              tooltip="Close themer"
            />
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
