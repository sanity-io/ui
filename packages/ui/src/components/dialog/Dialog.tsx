import {CloseIcon} from '@sanity/icons'
import clsx from 'clsx'
import {useEffect, useRef} from 'react'

import {getProps} from '../../utils/getProps'
import {suffixClassName} from '../../utils/suffixClassName'
import {Box} from '../box/Box'
import {Flex} from '../flex/Flex'
import {Heading} from '../heading/Heading'
import {IconButton} from '../icon-button/IconButton'
import {type DialogProps, dialogProps} from './dialog.props'

const dialogClassName = suffixClassName('sui-Dialog')

/** @public */
export function Dialog(props: DialogProps) {
  const {
    children,
    className,
    style,
    header,
    isOpen = false,
    onClose,
    ...rest
  } = getProps(props, dialogProps)

  const dialogRef = useRef<HTMLDialogElement>(null)

  const dialogClasses = clsx(
    dialogClassName,
    'sui-inset0 sui-m-auto sui-radius5 sui-shadow3 sui-position-relative',
  )

  useEffect(() => {
    const dialogElement = dialogRef.current
    if (!dialogElement) return

    if (isOpen) {
      if (!dialogElement.open) {
        dialogElement.showModal()
      }
    } else {
      if (dialogElement.open) {
        dialogElement.close()
      }
    }
  }, [isOpen])

  return (
    <dialog
      ref={dialogRef}
      closedby="any"
      onClose={onClose}
      className={clsx(dialogClasses, className)}
      style={style}
      data-ui="Dialog"
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
          onClick={() => dialogRef.current?.close()}
        />
      </Flex>
      <Box flexGrow={1} overflowY="auto" paddingX={4} paddingBottom={4}>
        {children}
      </Box>
    </dialog>
  )
}

export type {DialogProps}
