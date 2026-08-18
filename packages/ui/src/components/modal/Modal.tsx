import {CloseIcon} from '@sanity/icons'
import clsx from 'clsx'
import {useEffect, useId, useRef} from 'react'

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
  const headerId = useId()

  const modalClasses = clsx(modalClassName, 'sui-inset0 sui-m-auto sui-radius5 sui-shadow3 sui-p4')

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
      {header && (
        <Flex justifyContent="space-between" alignItems="center">
          <Heading trim size={1} id={headerId}>
            {header}
          </Heading>
          <IconButton
            aria-label="Close"
            level="tertiary"
            icon={CloseIcon}
            onClick={() => modalRef.current?.close()}
          />
        </Flex>
      )}
      <Box flexGrow={1} overflowY="auto">
        {children}
      </Box>
    </dialog>
  )
}

export type {ModalProps}
