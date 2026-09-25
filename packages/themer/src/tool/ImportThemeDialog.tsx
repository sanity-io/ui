import {Box, Button, Card, Dialog, Flex, Stack, Text, TextArea} from '@sanity/ui'
import {useMemo, useRef, useState} from 'react'

import {BuildThemeOptions} from '../theme/options'
import {convertLegacyTheme, LegacyThemeConversion} from './legacyTheme'
import {ThemeThumbnail} from './ThemeThumbnail'

import {preview} from './ImportThemeDialog.css'

/**
 * A place to paste the themer.sanity.build URL that a Studio config imports
 * its theme from — or the whole import line — for touch screens and anyone
 * who would not think of pasting into the sidebar. It previews the converted
 * theme before importing it as one of the user's own themes.
 *
 * @internal
 */
export function ImportThemeDialog(props: {
  onClose: () => void
  onImport: (theme: {title: string; options: BuildThemeOptions}) => void
}) {
  const {onClose, onImport} = props
  const [text, setText] = useState('')
  const textAreaRef = useRef<HTMLTextAreaElement | null>(null)
  const conversion = useMemo(() => convertLegacyTheme(text), [text])

  return (
    <Dialog
      // The field takes the focus instead of the close button, ready for a paste
      __unstable_autoFocus={false}
      animate
      footer={
        <Flex justify="flex-end" padding={3}>
          <Button
            disabled={conversion.status !== 'converted'}
            onClick={() => {
              if (conversion.status === 'converted') onImport(conversion)
            }}
            text="Import"
            tone="primary"
          />
        </Flex>
      }
      header="Import from themer.sanity.build"
      id="themer-import"
      onClickOutside={onClose}
      onClose={onClose}
      onPaste={(event) => {
        // A paste anywhere in the dialog lands in the field, rather than
        // importing right away the way it does elsewhere in the themer
        if (event.target === textAreaRef.current) return

        event.preventDefault()
        setText(event.clipboardData.getData('text/plain'))
        textAreaRef.current?.focus()
      }}
      width={1}
    >
      <Box padding={4}>
        <Stack gap={4}>
          <Text muted size={1}>
            Paste the themer.sanity.build URL that your Studio config imports its theme from — the
            whole import line works too.
          </Text>
          <TextArea
            autoFocus
            fontSize={1}
            onChange={(event) => setText(event.currentTarget.value)}
            placeholder="import {theme} from 'https://themer.sanity.build/api/hues?…'"
            ref={textAreaRef}
            rows={3}
            spellCheck={false}
            value={text}
          />
          {text.trim() !== '' && <ConversionPreview conversion={conversion} />}
        </Stack>
      </Box>
    </Dialog>
  )
}

function ConversionPreview(props: {conversion: LegacyThemeConversion}) {
  const {conversion} = props

  switch (conversion.status) {
    case 'missing':
      return (
        <Text muted size={1}>
          There is no themer.sanity.build URL in there yet — look for the one with{' '}
          <code>/api/hues</code> in it.
        </Text>
      )
    case 'invalid':
      return (
        <Card padding={3} radius={2} tone="critical">
          <Text size={1}>{conversion.message}</Text>
        </Card>
      )
    case 'converted':
      return (
        <Flex
          align={['flex-start', 'flex-start', 'center']}
          direction={['column', 'column', 'row']}
          gap={3}
        >
          <Box className={preview} flex="none">
            <ThemeThumbnail options={conversion.options} />
          </Box>
          <Stack flex={1} gap={2}>
            <Text size={1} textOverflow="ellipsis" weight="medium">
              {conversion.title}
            </Text>
            <Text muted size={1}>
              Its primary and default hues become the accent and text colors, and its lightest and
              darkest colors the backgrounds — the other hues keep the Studio defaults.
            </Text>
          </Stack>
        </Flex>
      )
    default: {
      const exhaustive: never = conversion

      return exhaustive
    }
  }
}
