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
  useClickOutside,
  useGlobalKeyDown,
  useLayer,
  useToast,
} from '@sanity/ui'
import {useCallback, useEffect, useRef, useState} from 'react'
import {SIZES} from './constants'
import {ArcadeFrame} from './frame'
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
      toast.push({status: 'success', title: 'Successfully updated meta data!'})
    },
    [formTitle, formDescription, onChange, toast]
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
    [isTopLayer, onCancel]
  )

  useGlobalKeyDown(handleGlobalKeyDown)

  return (
    <Stack as="form" padding={3} onSubmit={handleEditorSubmit} space={4}>
      <Stack space={2}>
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
      <Stack space={2}>
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
      <Stack space={2}>
        <Button padding={2} tone="primary" text="Update" type="submit" />
        <Button mode="ghost" onClick={onCancel} padding={2} text="Cancel" type="reset" />
      </Stack>
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
}) {
  const {hookCode, jsxCode, meta, onMetaChange, onWidthChange, width} = props
  const [editorOpen, setEditorOpen] = useState(false)
  const [popoverElement, setPopoverElement] = useState<HTMLDivElement | null>(null)
  const [editButtonElement, setEditButtonElement] = useState<HTMLButtonElement | null>(null)

  const handleMetaChange = useCallback(
    (value: ArcadeMeta) => {
      setEditorOpen(false)
      onMetaChange(value)
    },
    [onMetaChange]
  )

  const handleMetaCancel = useCallback(() => {
    setEditorOpen(false)
  }, [])

  const handleMetaEditorClickOutside = () => setEditorOpen(false)

  const handleEditButtonClick = useCallback(() => {
    setEditorOpen((v) => !v)
  }, [])

  useClickOutside(handleMetaEditorClickOutside, [editButtonElement, popoverElement])

  return (
    <Flex direction="column" height="fill">
      <Card borderBottom padding={2} style={{minHeight: 'auto'}}>
        <Flex>
          <Flex flex={1} paddingRight={4}>
            <Popover
              content={
                <MetaEditor onCancel={handleMetaCancel} onChange={handleMetaChange} value={meta} />
              }
              open={editorOpen}
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

          <Inline space={1}>
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

      <Card flex={1} padding={2} tone="transparent">
        <Container
          height="fill"
          style={{position: 'relative', maxWidth: width === null ? undefined : SIZES[width]}}
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
