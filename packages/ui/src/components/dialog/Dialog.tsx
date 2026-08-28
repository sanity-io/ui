import {CloseIcon} from '@sanity/icons/Close'
import clsx from 'clsx'
import {type ComponentProps, useEffect, useId, useRef} from 'react'

import {getProps} from '../../utils/getProps'
import {suffixClassName} from '../../utils/suffixClassName'
import {Box} from '../box/Box'
import {Flex} from '../flex/Flex'
import {Heading} from '../heading/Heading'
import {IconButton} from '../icon-button/IconButton'
import {type DialogProps, dialogProps} from './dialog.props'

const dialogClassName = suffixClassName('sui-Dialog')
const dialogContentClassName = suffixClassName('sui-DialogContent')
const dialogFooterClassName = suffixClassName('sui-DialogFooter')

function DialogRoot({open = false, size = 0, ...props}: DialogProps) {
  const {children, className, style, header, onClose, ...rest} = getProps(
    {size, ...props},
    dialogProps,
  )

  const dialogRef = useRef<HTMLDialogElement>(null)
  const headerId = useId()

  const dialogClasses = clsx(
    dialogClassName,
    'sui-inset0 sui-m-auto sui-radius5 sui-shadow3 sui-p4 sui-flex-direction-column sui-gap4 sui-overflow-y-auto',
  )

  useEffect(() => {
    const dialogElement = dialogRef.current
    if (!dialogElement) return

    // `open` = `open` prop
    // dialogElement.open = the `open` attribute on the HTML dialog element
    // The prop and the attribute are manipulated independently, thus they
    // can get out of sync if not handled within this effect.
    if (open) {
      if (!dialogElement.open) {
        dialogElement.showModal()
      }
    } else {
      if (dialogElement.open) {
        dialogElement.close()
      }
    }

    // Ensure the dialog is closed (and thus its `open` attribute updated)
    // when the component is unmounted.
    return () => {
      dialogElement.close()
    }
  }, [open])

  return (
    <dialog
      {...rest}
      ref={dialogRef}
      closedby="any"
      aria-labelledby={header ? headerId : undefined}
      onClose={onClose}
      className={clsx(dialogClasses, className)}
      style={style}
      data-ui="Dialog"
    >
      <Flex flexShrink={0} justifyContent="space-between" alignItems="center">
        {header ? (
          <Heading trim size={1} id={headerId}>
            {header}
          </Heading>
        ) : (
          <div />
        )}
        <IconButton
          aria-label="Close"
          level="tertiary"
          icon={CloseIcon}
          onClick={() => dialogRef.current?.close()}
        />
      </Flex>
      {children}
    </dialog>
  )
}

function DialogContent(props: ComponentProps<'div'>) {
  const {children, className, style, ...rest} = getProps(props, {})

  return (
    <Box
      {...rest}
      className={clsx(dialogContentClassName, className)}
      style={style}
      data-ui="DialogContent"
      flexGrow={1}
      overflowY="auto"
    >
      {children}
    </Box>
  )
}

function DialogFooter(props: ComponentProps<'div'>) {
  const {children, className, style, ...rest} = getProps(props, {})

  return (
    <Box
      {...rest}
      className={clsx(dialogFooterClassName, className)}
      style={style}
      data-ui="DialogFooter"
      flexShrink={0}
    >
      {children}
    </Box>
  )
}

DialogRoot.displayName = 'Dialog'

/**
 * @beta
 *
 * Renders a modal dialog element — should not be used for nonmodal dialogs.
 * Modal dialogs make their containing documents inert, and render on the topmost
 * layer within that containing document; they must be dimissed before the containing
 * document and its contents become unblocked. They also trap focus within the bounds
 * of the dialog element and its descendants.
 *
 * For more on dialogs and modality, refer to the HTML specification for the dialog element:
 * https://html.spec.whatwg.org/dev/interactive-elements.html#the-dialog-element
 */
export const Dialog = DialogRoot

DialogRoot.Content = DialogContent
DialogRoot.Footer = DialogFooter

export type {DialogProps}
