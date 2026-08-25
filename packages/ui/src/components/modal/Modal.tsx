import {CloseIcon} from '@sanity/icons'
import clsx from 'clsx'
import {type ComponentProps, useEffect, useId, useRef} from 'react'

import {getProps} from '../../utils/getProps'
import {suffixClassName} from '../../utils/suffixClassName'
import {Box} from '../box/Box'
import {Flex} from '../flex/Flex'
import {Heading} from '../heading/Heading'
import {IconButton} from '../icon-button/IconButton'
import {type ModalProps, modalProps} from './modal.props'

const modalClassName = suffixClassName('sui-Modal')
const modalContentClassName = suffixClassName('sui-ModalContent')
const modalFooterClassName = suffixClassName('sui-ModalFooter')

function ModalRoot({open = false, size = 0, ...props}: ModalProps) {
  const {children, className, style, header, onClose, ...rest} = getProps(
    {size, ...props},
    modalProps,
  )

  const modalRef = useRef<HTMLDialogElement>(null)
  const headerId = useId()

  const modalClasses = clsx(
    modalClassName,
    'sui-inset0 sui-m-auto sui-radius5 sui-shadow3 sui-p4 sui-flex-direction-column sui-gap4 sui-overflow-y-auto',
  )

  useEffect(() => {
    const dialogElement = modalRef.current
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

    // Ensure the modal is closed (and thus its `open` attribute updated)
    // when the component is unmounted.
    return () => {
      dialogElement.close()
    }
  }, [open])

  return (
    <dialog
      {...rest}
      ref={modalRef}
      closedby="any"
      aria-labelledby={header ? headerId : undefined}
      onClose={onClose}
      className={clsx(modalClasses, className)}
      style={style}
      data-ui="Modal"
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
          onClick={() => modalRef.current?.close()}
        />
      </Flex>
      {children}
    </dialog>
  )
}

function ModalContent(props: ComponentProps<'div'>) {
  const {children, className, style, ...rest} = getProps(props, {})

  return (
    <Box
      {...rest}
      className={clsx(modalContentClassName, className)}
      style={style}
      data-ui="ModalContent"
      flexGrow={1}
      overflowY="auto"
    >
      {children}
    </Box>
  )
}

function ModalFooter(props: ComponentProps<'div'>) {
  const {children, className, style, ...rest} = getProps(props, {})

  return (
    <Box
      {...rest}
      className={clsx(modalFooterClassName, className)}
      style={style}
      data-ui="ModalFooter"
      flexShrink={0}
    >
      {children}
    </Box>
  )
}

ModalRoot.displayName = 'Modal'

/**
 * @beta
 *
 * Renders a modal dialog element — should not be used for nonmodal dialogs.
 * Modal dialogs make their containing documents inert, and render on the topmost
 * layer within that containing document; they must be dimissed before the containing
 * document and its contents become unblocked. They also trap focus within the bounds
 * of the modal element and its descendants.
 *
 * For more on dialogs and modality, refer to the HTML specification for the dialog element:
 * https://html.spec.whatwg.org/dev/interactive-elements.html#the-dialog-element
 */
export const Modal = ModalRoot

ModalRoot.Content = ModalContent
ModalRoot.Footer = ModalFooter

export type {ModalProps}
