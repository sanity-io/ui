import {ClipboardIcon} from '@sanity/icons/Clipboard'
import {Box, Button, Card, Dialog, Flex, Stack, Text} from '@sanity/ui'
import {Code} from '@sanity/ui/code'
import {useToast} from '@sanity/ui/toast'
import {registerLanguage} from 'react-refractor'
import typescript from 'refractor/typescript'

import {createThemeSnippet} from './snippet'
import {displayTitle, ThemerTheme} from './themes'

// `Code` only highlights languages the surrounding app has registered with
// react-refractor, and the Studio registers its own set from an async import
// during startup — a race this dialog keeps losing. Registering the one
// language the snippet needs keeps it highlighted from the first render.
registerLanguage(typescript)

/**
 * Shows the `buildTheme` snippet that makes a theme permanent, in a dialog so
 * that it does not take up sidebar space or make the sidebar scroll as the
 * snippet changes shape with the theme.
 *
 * @internal
 */
export function ThemeSnippetDialog(props: {onClose: () => void; theme: ThemerTheme}) {
  const {onClose, theme} = props
  const toast = useToast()
  const snippet = createThemeSnippet(theme.options)

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(snippet)
      toast.push({status: 'success', title: 'Copied the theme to the clipboard'})
    } catch {
      toast.push({status: 'error', title: 'Could not copy the theme'})
    }
  }

  return (
    <Dialog
      animate
      footer={
        <Flex gap={2} justify="flex-end" padding={3}>
          <Button icon={ClipboardIcon} mode="ghost" onClick={() => void handleCopy()} text="Copy" />
        </Flex>
      }
      header="Add to your config"
      id="themer-snippet"
      onClickOutside={onClose}
      onClose={onClose}
      width={1}
    >
      <Box padding={4}>
        <Stack gap={4}>
          <Text muted size={1}>
            Export this from <code>sanity.config.ts</code> and pass it as the <code>theme</code> of{' '}
            <code>defineConfig</code> to make “{displayTitle(theme.title)}” the Studio theme without
            this tool.
          </Text>
          <Card border overflow="auto" padding={3} radius={2} tone="transparent">
            <Code language="ts" size={1}>
              {snippet}
            </Code>
          </Card>
        </Stack>
      </Box>
    </Dialog>
  )
}
