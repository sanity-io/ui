import {CONTAINER_SIZE, type ContainerSize} from '../../types/Container'
import {type PropDef} from '../../types/PropDef'
import type {Responsive} from '../../types/Responsive'

/** @beta */
export interface DialogProps extends Omit<React.ComponentProps<'dialog'>, 'open'> {
  /**
   * Text for the dialog heading.
   * @remarks Recommended for accessibility. The component sets `aria-labelledby` to the heading when you give this prop.
   */
  header?: string
  /**
   * A function to call alongside the native `close` event.
   * @remarks Use it to set `open` back to `false`. It runs for every close cause: the Escape key, a backdrop click, the close button, or a programmatic close.
   */
  onClose: React.ReactEventHandler<HTMLDialogElement>
  /**
   * Toggles the dialog's open state.
   * @remarks `true` calls `showModal()` on the element. `false` calls `close()`.
   */
  open?: boolean
  /** Sets the max width of the dialog */
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
