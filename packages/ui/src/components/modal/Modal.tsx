import {CloseIcon} from '@sanity/icons'
import clsx from 'clsx'
import {type ComponentPropsWithRef, type ElementType, useEffect, useId, useRef} from 'react'

import {getProps} from '../../utils/getProps'
import {suffixClassName} from '../../utils/suffixClassName'
import {Box} from '../box/Box'
import {Flex} from '../flex/Flex'
import {Heading} from '../heading/Heading'
import {IconButton} from '../icon-button/IconButton'
import {
  type ModalContentProps,
  type ModalFooterProps,
  type ModalProps,
  modalProps,
} from './modal.props'

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

function ModalContent<T extends ElementType = 'div'>(
  props: ModalContentProps<T> & Omit<ComponentPropsWithRef<T>, keyof ModalContentProps<T>>,
) {
  const {children, className, style, ...rest} = getProps(props, {})

  return (
    <Box
      {...rest}
      flexGrow={1}
      overflowY="auto"
      className={clsx(modalContentClassName, className)}
      style={style}
      data-ui="ModalContent"
    >
      {children}
    </Box>
  )
}

function ModalFooter<T extends ElementType = 'div'>(
  props: ModalFooterProps<T> & Omit<ComponentPropsWithRef<T>, keyof ModalFooterProps<T>>,
) {
  const {children, className, style, ...rest} = getProps(props, {})

  return (
    <Box
      flexShrink={0}
      {...rest}
      className={clsx(modalFooterClassName, className)}
      style={style}
      data-ui="ModalFooter"
    >
      {children}
    </Box>
  )
}

ModalRoot.displayName = 'Modal'

/** @beta */
export const Modal = ModalRoot

ModalRoot.Content = ModalContent
ModalRoot.Footer = ModalFooter

export type {ModalContentProps, ModalFooterProps, ModalProps}
