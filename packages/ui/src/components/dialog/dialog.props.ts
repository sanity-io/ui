import {CONTAINER_SIZE, type ContainerSize} from '../../types/Container'
import {type PropDef} from '../../types/PropDef'
import type {Responsive} from '../../types/Responsive'

/** @beta */
export interface DialogProps extends Omit<React.ComponentProps<'dialog'>, 'open'> {
  /** Text to be displayed as the dialog's heading; optional but recommended for optimal accessibility and presentation */
  header?: string
  /** Used to set the value of open to false. Fires whenever the dialog is closed, either programmatically or by the user (via Esc key, clicking background, clicking the dialog's close button, or any other means.)  */
  onClose: React.ReactEventHandler<HTMLDialogElement>
  /** Whether the dialog is open; defaults to false. */
  open?: boolean
  /** Max width of the dialog */
  size?: Responsive<ContainerSize>
}

export const dialogProps: Record<string, PropDef> = {
  header: {
    type: 'string',
  },
  open: {
    type: 'boolean',
  },
  size: {
    type: 'union',
    className: 'container',
    values: CONTAINER_SIZE,
  },
}
