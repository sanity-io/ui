import {HTMLProps, ReactElement} from 'react'
import {PopoverProps} from '../../primitives'

/**
 * @beta
 */
export interface PopoverButtonProps
  extends Omit<PopoverProps, 'content' | 'open' | 'referenceElement'> {
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
   *  renderButton={({isOpen}) => <Button mode="bleed" text={isOpen ? "Close" : "Open"} />}
   *  // rest of props ...
   * />
   * ```
   */
  renderButton: (props: {isOpen: boolean}) => ReactElement
  /**
   * Render callback for the popover content.
   *
   * ```tsx
   * <PopoverButton
   * renderContent={({close}) => (
   *  <Stack>
   *    <h1>Popover content</h1>
   *    <Button mode="bleed" text="Close" onClick={close} />
   * </Stack>
   * )}
   * // rest of props ...
   * />
   * ```
   */
  renderContent: (props: {close: () => void}) => ReactElement
}
