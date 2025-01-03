import {HTMLProps, ReactElement} from 'react'
import {PopoverProps} from '../../primitives'

/**
 * @beta
 */
export interface PopoverButtonProps
  extends Omit<PopoverProps, 'children' | 'content' | 'open' | 'referenceElement'> {
  /**
   * ARIA attribute for the button element.
   */
  ariaHasPopUp: HTMLProps<HTMLButtonElement>['aria-haspopup']
  /**
   * Callback that is invoked when the popover is closed.
   */
  onClose?: () => void
  /**
   * Callback that is invoked when the popover is opened.
   */
  onOpen?: () => void
  /**
   * Maximum height of the popover.
   */
  maxHeight?: number
  /**
   * Maximum width of the popover.
   */
  maxWidth?: number
  /**
   * Minimum height of the popover.
   */
  minHeight?: number
  /**
   * Minimum width of the popover.
   */
  minWidth?: number
  /**
   * Render callback for the button element.
   *
   * ```tsx
   * <PopoverButton
   *   renderButton={({isOpen}) => <button>{isOpen ? "Close" : "Open"}</button>}
   *   // ... rest of props
   * />
   * ```
   */
  renderButton: (props: {isOpen: boolean}) => ReactElement
  /**
   * Render callback for the popover content.
   *
   * ```tsx
   * <PopoverButton
   *   renderContent={({close}) => (
   *     <div>
   *       <h1>Popover content</h1>
   *       <button onClick={close}>Close</button>
   *     </div>
   *   )}
   *   // ... rest of props
   * />
   * ```
   */
  renderContent: (props: {close: () => void}) => ReactElement
}
