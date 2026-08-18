import {CloseIcon} from '@sanity/icons'
import clsx from 'clsx'
import {useEffect, useRef} from 'react'

import {getProps} from '../../utils/getProps'
import {suffixClassName} from '../../utils/suffixClassName'
import {Box} from '../box/Box'
import {Flex} from '../flex/Flex'
import {Heading} from '../heading/Heading'
import {IconButton} from '../icon-button/IconButton'
import {type ModalProps, modalProps} from './modal.props'

const modalClassName = suffixClassName('sui-Modal')

/** @public */
export function Modal(props: ModalProps) {
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

  const modalClasses = clsx(modalClassName, 'sui-inset0 sui-m-auto sui-radius5 sui-shadow3')

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
  }, [isOpen])

  return (
    <dialog
      ref={modalRef}
      closedby="any"
      onClose={onClose}
      className={clsx(modalClasses, className)}
      style={style}
      data-ui="Modal"
      {...rest}
    >
      <Flex justifyContent="space-between" alignItems="center" padding={4}>
        <Heading trim size={1}>
          {header}
        </Heading>
        <IconButton
          aria-label="Close"
          level="tertiary"
          icon={CloseIcon}
          onClick={() => modalRef.current?.close()}
        />
      </Flex>
      <Box flexGrow={1} overflowY="auto" paddingX={4} paddingBottom={4}>
        {children}
      </Box>
    </dialog>
  )
}

export type {ModalProps}
