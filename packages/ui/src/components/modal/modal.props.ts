import {type PropDef} from '../../types/PropDef'
import {type BoxProps} from '../box/box.props'

/** @public */
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
 * Scrolling region of the modal. Grows to fill the space between the header and the footer.
 *
 * @public
 */
export type ModalContentProps<T extends React.ElementType = 'div'> = BoxProps<T>

/**
 * Region pinned below the content. Sets no alignment of its own.
 *
 * @public
 */
export type ModalFooterProps<T extends React.ElementType = 'div'> = BoxProps<T>
