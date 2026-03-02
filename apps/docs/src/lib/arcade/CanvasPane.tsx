import {EditIcon} from '@sanity/icons'
import {
  Box,
  Button,
  Card,
  Container,
  Flex,
  Inline,
  Popover,
  Stack,
  Text,
  TextArea,
  TextInput,
  useClickOutsideEvent,
  useGlobalKeyDown,
  useLayer,
  useToast,
} from '@sanity/ui'
import React, {ReactElement, useCallback, useEffect, useRef, useState} from 'react'

import {ArcadeFrame} from './ArcadeFrame'
import {SIZES} from './constants'
import {ArcadeMeta, CanvasWidth} from './types'

function MetaEditor({
  onCancel,
  onChange,
  value,
}: {
  onCancel: () => void
  onChange: (data: ArcadeMeta) => void
  value: ArcadeMeta
}) {
  const toast = useToast()
  const [formTitle, setFormTitle] = useState(value.title)
  const [formDescription, setFormDescription] = useState(value.description)
  const titleInputRef = useRef<HTMLInputElement | null>(null)
  const {isTopLayer} = useLayer()

  const handleEditorSubmit = useCallback(
    (event: React.FormEvent) => {
      event.preventDefault()
      onChange({title: formTitle, description: formDescription})
      toast.push({
        status: 'success',
        title: 'Successfully updated meta data!',
      })
    },
    [formTitle, formDescription, onChange, toast],
  )

  useEffect(() => {
    titleInputRef.current?.focus()
  }, [])

  useEffect(() => setFormTitle(value.title), [value.title])

  useEffect(() => setFormDescription(value.description), [value.description])

  const handleGlobalKeyDown = useCallback(
    (event: KeyboardEvent) => {
      if (isTopLayer && event.key === 'Escape') {
        event.stopPropagation()
        onCancel()
      }
    },
    [isTopLayer, onCancel],
  )

  useGlobalKeyDown(handleGlobalKeyDown)

  return (
    <Stack as="form" padding={4} onSubmit={handleEditorSubmit} gap={4}>
      <Stack gap={3}>
        <Text size={1} weight="semibold">
          Title
        </Text>
        <TextInput
          onChange={(event) => setFormTitle(event.currentTarget.value)}
          padding={2}
          placeholder="Empty"
          ref={titleInputRef}
          value={formTitle}
        />
      </Stack>
      <Stack gap={3}>
        <Text size={1} weight="semibold">
          Description
        </Text>
        <TextArea
          onChange={(event) => setFormDescription(event.currentTarget.value)}
          padding={2}
          placeholder="Empty"
          rows={4}
          value={formDescription}
        />
      </Stack>
      <Flex gap={2}>
        <Stack flex={1}>
          <Button mode="default" padding={2} text="Update" type="submit" />
        </Stack>
        <Stack flex={1}>
          <Button mode="ghost" onClick={onCancel} padding={2} text="Cancel" type="reset" />
        </Stack>
      </Flex>
    </Stack>
  )
}

export function CanvasPane(props: {
  hookCode: string
  jsxCode: string
  meta: ArcadeMeta
  onMetaChange: (value: ArcadeMeta) => void
  onWidthChange: (v: CanvasWidth | null) => void
  width: CanvasWidth | null
}): ReactElement {
  const {hookCode, jsxCode, meta, onMetaChange, onWidthChange, width} = props
  const [editorOpen, setEditorOpen] = useState(false)
  const [popoverElement, setPopoverElement] = useState<HTMLDivElement | null>(null)
  const [editButtonElement, setEditButtonElement] = useState<HTMLButtonElement | null>(null)

  const handleMetaChange = useCallback(
    (value: ArcadeMeta) => {
      setEditorOpen(false)
      onMetaChange(value)
    },
    [onMetaChange],
  )

  const handleMetaCancel = useCallback(() => {
    setEditorOpen(false)
  }, [])

  const handleMetaEditorClickOutside = () => setEditorOpen(false)

  const handleEditButtonClick = useCallback(() => {
    setEditorOpen((v) => !v)
  }, [])

  useClickOutsideEvent(handleMetaEditorClickOutside, () => [popoverElement, editButtonElement])

  return (
    <Flex direction="column" height="fill">
      <Card padding={2} shadow={1} style={{minHeight: 'auto', zIndex: 2}}>
        <Flex>
          <Flex flex={1} paddingRight={4}>
            <Popover
              content={
                <MetaEditor onCancel={handleMetaCancel} onChange={handleMetaChange} value={meta} />
              }
              fallbackPlacements={['bottom-start']}
              open={editorOpen}
              placement="bottom"
              portal
              preventOverflow
              ref={setPopoverElement}
            >
              <Box padding={2} paddingRight={1}>
                <Text muted={!meta.title} size={1} weight="semibold">
                  <span
                    style={{
                      display: 'block',
                      whiteSpace: 'nowrap',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                    }}
                  >
                    {meta.title || <em>Untitled</em>}
                  </span>
                </Text>
              </Box>
            </Popover>
            <Button
              fontSize={1}
              icon={EditIcon}
              mode="bleed"
              padding={2}
              onClick={handleEditButtonClick}
              ref={setEditButtonElement}
            />
          </Flex>

          <Inline gap={1}>
            <Button
              fontSize={1}
              mode="bleed"
              onClick={() => onWidthChange(null)}
              padding={2}
              selected={width === null}
              style={{verticalAlign: 'top'}}
              text="Full"
            />
            <Button
              fontSize={1}
              mode="bleed"
              onClick={() => onWidthChange(2)}
              padding={2}
              selected={width === 2}
              style={{verticalAlign: 'top'}}
              text={SIZES[2]}
            />
            <Button
              fontSize={1}
              mode="bleed"
              onClick={() => onWidthChange(1)}
              padding={2}
              selected={width === 1}
              style={{verticalAlign: 'top'}}
              text={SIZES[1]}
            />
            <Button
              fontSize={1}
              mode="bleed"
              onClick={() => onWidthChange(0)}
              padding={2}
              selected={width === 0}
              style={{verticalAlign: 'top'}}
              text={SIZES[0]}
            />
          </Inline>
        </Flex>
      </Card>

      <Card flex={1} padding={width === null ? 0 : 2} tone="transparent">
        <Container
          height="fill"
          style={{
            position: 'relative',
            maxWidth: width === null ? undefined : SIZES[width],
          }}
          width="auto"
        >
          <Card height="fill" shadow={1}>
            <ArcadeFrame hookCode={hookCode} jsxCode={jsxCode} />
          </Card>
        </Container>
      </Card>
    </Flex>
  )
}
