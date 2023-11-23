import {ReactNode, useCallback, useEffect, useRef, useState} from 'react'
import {Box, Button} from '../../../primitives'
import {LayerProvider, useLayer} from '../../../utils'
import {Dialog, DialogProps} from '../dialog'

export default function WrappedStory() {
  return (
    <LayerProvider zOffset={100}>
      <Box padding={4}>
        <DialogButton level={0} />
      </Box>
    </LayerProvider>
  )
}

function DialogButton(props: {level: number}) {
  const {level} = props
  const [open, setOpen] = useState(false)

  const openRef = useRef(open)
  const buttonRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    if (openRef.current !== open) {
      openRef.current = open

      if (!open) {
        // focus the button that opened the dialog
        // buttonRef.current?.focus()
      }
    }
  }, [open])

  return (
    <>
      <Button onClick={() => setOpen(true)} ref={buttonRef} text={`Open dialog ${level + 1}`} />

      {open && (
        <WrappedDialog
          header={`WrappedDialog ${level + 1}`}
          id={`wrapped-${level + 1}`}
          onClickOutside={() => setOpen(false)}
          onClose={() => setOpen(false)}
        >
          <Box padding={4}>
            <DialogButton level={level + 1} />
          </Box>
        </WrappedDialog>
      )}
    </>
  )
}

function WrappedDialog(props: DialogProps & {children?: ReactNode}) {
  const layer = useLayer()
  const isTopLayer = layer.size === 1

  const dialogRef = useRef<HTMLDivElement>(null)

  const [lastFocusedElement, setLastFocusedElement] = useState<HTMLElement | null>(null)

  const handleContentFocus = useCallback(() => {
    const containsActiveElement = dialogRef.current?.contains(document.activeElement)

    if (containsActiveElement) {
      setLastFocusedElement(document.activeElement as HTMLElement)
    }
  }, [])

  // Set focus on the last focused element when the dialog becomes the top layer.
  useEffect(() => {
    if (isTopLayer && lastFocusedElement) {
      lastFocusedElement.focus()
    }
  }, [isTopLayer, lastFocusedElement])

  return <Dialog {...props} data-size={layer.size} onFocus={handleContentFocus} ref={dialogRef} />
}
