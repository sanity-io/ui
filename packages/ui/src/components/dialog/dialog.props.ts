import {type PropDef} from '../../types/PropDef'

/** @public */
export interface DialogProps extends Omit<React.ComponentProps<'dialog'>, 'open'> {
  /** Text to be displayed as the dialog's heading */
  header: string
  /** Whether the dialog is open; defaults to false */
  isOpen?: boolean
  /** Used to set the value of isOpen to false. Fires whenever the dialog is closed, either programmatically or by the user (via Esc key, clicking background, clicking the dialog's close button, or any other means.)  */
  onClose: React.ReactEventHandler<HTMLDialogElement>
}

export const dialogProps: Record<string, PropDef> = {
  header: {
    type: 'string',
  },
  isOpen: {
    type: 'boolean',
  },
}
