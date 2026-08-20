import {type PropDef} from '../../types/PropDef'
import {type BoxProps} from '../box/box.props'

/** @beta */
export interface ModalProps extends Omit<React.ComponentProps<'dialog'>, 'open'> {
  /** Text to be displayed as the modal's heading */
  header?: string
  /** Whether the modal is open; defaults to false */
  isOpen?: boolean
  /** Used to set the value of isOpen to false. Fires whenever the modal is closed, either programmatically or by the user (via Esc key, clicking background, clicking the modal's close button, or any other means.)  */
  onClose: React.ReactEventHandler<HTMLDialogElement>
}

export const modalProps: Record<string, PropDef> = {
  header: {
    type: 'string',
  },
  isOpen: {
    type: 'boolean',
  },
}

/**
 * Main content of the modal. Grows to fill the available space and scrolls if needed.
 *
 * @beta
 */
export type ModalContentProps<T extends React.ElementType = 'div'> = BoxProps<T>

/**
 * Optional footer area, below the modal content.
 *
 * @beta
 */
export type ModalFooterProps<T extends React.ElementType = 'div'> = BoxProps<T>
