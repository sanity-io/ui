import {CloseIcon} from '@sanity/icons'
import clsx from 'clsx'
import {type ReactNode, useEffect, useId, useRef} from 'react'

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

function ModalRoot(props: ModalProps) {
  const {
    children,
    className,
    style,
    header,
    isOpen = false,
    onClose,
    ...rest
  } = getProps(props, modalProps)

  const modalRef = useRef<HTMLDialogElement>(null)
  const headerId = useId()

  const modalClasses = clsx(
    modalClassName,
    'sui-inset0 sui-m-auto sui-radius5 sui-shadow3 sui-p4 sui-flex-direction-column sui-gap4 sui-overflow-y-auto',
  )

  useEffect(() => {
    const modalElement = modalRef.current
    if (!modalElement) return

    if (isOpen) {
      if (!modalElement.open) {
        modalElement.showModal()
      }
    } else {
      if (modalElement.open) {
        modalElement.close()
      }
    }

    return () => {
      modalElement.close()
    }
  }, [isOpen])

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

/** Main content of the modal. Grows to fill the available space and scrolls if needed. */
function ModalContent({children}: {children?: ReactNode}) {
  return (
    <Box className={modalContentClassName} flexGrow={1} overflowY="auto" data-ui="ModalContent">
      {children}
    </Box>
  )
}

/** Optional footer area, below the modal content. */
function ModalFooter({children}: {children?: ReactNode}) {
  return (
    <Box className={modalFooterClassName} flexShrink={0} data-ui="ModalFooter">
      {children}
    </Box>
  )
}

ModalRoot.displayName = 'Modal'

/** @beta */
export const Modal = ModalRoot

ModalRoot.Content = ModalContent
ModalRoot.Footer = ModalFooter

export type {ModalProps}
