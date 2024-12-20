import {
  cloneElement,
  FocusEvent,
  ForwardedRef,
  forwardRef,
  HTMLProps,
  KeyboardEvent,
  useCallback,
  useEffect,
  useId,
  useImperativeHandle,
  useRef,
  useState,
} from 'react'
import {css, styled} from 'styled-components'
import {focusFirstDescendant, focusLastDescendant} from '../../helpers'
import {useClickOutsideEvent} from '../../hooks'
import {Popover} from '../../primitives'
import {PopoverButtonProps} from './types'

interface StyledPopoverProps {
  $maxHeight?: number
  $maxWidth?: number
  $minHeight?: number
  $minWidth?: number
}

const StyledPopover = styled(Popover)<StyledPopoverProps>((props) => {
  const {$maxHeight, $maxWidth, $minHeight, $minWidth} = props

  return css`
    ${$maxHeight && `max-height: ${$maxHeight}px;`}
    ${$maxWidth && `max-width: ${$maxWidth}px;`}
    ${$minHeight && `min-height: ${$minHeight}px;`}
    ${$minWidth && `min-width: ${$minWidth}px;`}
  `
})

/**
 * A wrapper around the `Popover` primitive that handles:
 * - Opening and closing the popover when the button is clicked
 * - Focusing the first element in the popover when it opens
 * - Focusing the button when the popover closes with the Escape key
 * - Locking focus within the popover when it is open
 * - Closing the popover when a click occurs outside the button or popover
 * - Sets appropriate ARIA attributes on the button and popover content
 *
 * @beta
 */
export const PopoverButton = forwardRef(function PopoverButton(
  props: PopoverButtonProps,
  forwardedRef: ForwardedRef<HTMLButtonElement | null>,
) {
  const {
    ariaHasPopUp,
    maxHeight,
    maxWidth,
    minHeight,
    minWidth,
    onClose,
    onOpen,
    renderButton,
    renderContent,
    ...popoverProps
  } = props

  const [open, setOpen] = useState<boolean>(false)

  const [popoverElement, setPopoverElement] = useState<HTMLDivElement | null>(null)
  const [buttonElement, setButtonElement] = useState<HTMLButtonElement | null>(null)
  const [contentElement, setContentElement] = useState<HTMLDivElement | null>(null)

  const focusGuardPreRef = useRef<HTMLDivElement | null>(null)
  const focusGuardPostRef = useRef<HTMLDivElement | null>(null)

  const buttonId = useId()

  const handleClose = useCallback(() => {
    if (!open) return

    setOpen(false)
    onClose?.()

    buttonElement?.focus()
  }, [buttonElement, onClose, open])

  const handleOpen = useCallback(() => {
    if (open) return

    setOpen(true)
    onOpen?.()
  }, [onOpen, open])

  const handleButtonClick = useCallback(() => {
    if (open) {
      handleClose()
    } else {
      handleOpen()
    }
  }, [handleClose, handleOpen, open])

  const handlePopoverKeyDown = useCallback(
    (e: KeyboardEvent<HTMLDivElement>) => {
      if (e.key === 'Escape' && open) {
        handleClose()
      }
    },
    [handleClose, open],
  )

  const handlePopoverFocus = useCallback(
    (event: FocusEvent<HTMLDivElement>) => {
      const target = event.target

      if (contentElement && target === focusGuardPreRef.current) {
        focusLastDescendant(contentElement)

        return
      }

      if (contentElement && target === focusGuardPostRef.current) {
        focusFirstDescendant(contentElement)

        return
      }
    },
    [contentElement],
  )

  // Expose the button element to the parent component
  useImperativeHandle<HTMLButtonElement | null, HTMLButtonElement | null>(
    forwardedRef,
    () => buttonElement,
    [buttonElement],
  )

  useEffect(() => {
    if (open && contentElement) {
      focusFirstDescendant(contentElement)
    }
  }, [contentElement, open])

  useClickOutsideEvent(
    () => handleClose(),
    () => [buttonElement, popoverElement],
  )

  // Button
  const buttonProps: HTMLProps<HTMLButtonElement> & {'data-ui': string} = {
    'aria-controls': `content-${buttonId}`,
    'aria-expanded': open,
    'aria-haspopup': ariaHasPopUp,
    'data-ui': 'PopoverButton',
    'id': buttonId,
    'onClick': handleButtonClick,
    'ref': setButtonElement,
    'selected': open,
  }

  const renderedButton = renderButton({isOpen: open})

  const button = cloneElement(renderedButton, buttonProps)

  // Content
  const contentProps: HTMLProps<HTMLDivElement> = {
    'aria-labelledby': buttonProps.id,
    'id': buttonProps['aria-controls'],
    'ref': setContentElement,
  }

  const renderedContent = renderContent({close: handleClose})

  const content = (
    <>
      <div aria-hidden="true" ref={focusGuardPreRef} tabIndex={0} />

      {cloneElement(renderedContent, contentProps)}

      <div aria-hidden="true" ref={focusGuardPostRef} tabIndex={0} />
    </>
  )

  return (
    <StyledPopover
      {...popoverProps}
      $maxHeight={maxHeight}
      $maxWidth={maxWidth}
      $minHeight={minHeight}
      $minWidth={minWidth}
      content={content}
      data-ui="PopoverButton__popover"
      onFocus={handlePopoverFocus}
      onKeyDown={handlePopoverKeyDown}
      open={open}
      ref={setPopoverElement}
    >
      {button}
    </StyledPopover>
  )
})
