import type {ReactNode} from 'react'

/**
 * Parameters for creating a toast notification via the {@link ToastContextValue.push} method.
 *
 * @public
 */
export interface ToastParams {
  /**
   * When `true`, renders a close button that allows the user to
   * dismiss the toast manually.
   */
  closable?: boolean

  /**
   * Secondary descriptive content displayed below the title.
   */
  description?: ReactNode

  /**
   * The duration in milliseconds before the toast auto-dismisses.
   *
   * @remarks
   * When set to `Infinity`, the toast will not auto-dismiss and must
   * be closed manually via the close button.
   */
  duration?: number

  /**
   * A unique identifier for the toast. When a toast with the same ID
   * already exists, it will be updated rather than creating a duplicate.
   *
   * @remarks
   * If not provided, a random ID will be generated.
   */
  id?: string

  /**
   * A callback that fires when the toast is dismissed.
   */
  onClose?: () => void

  /**
   * The primary text content displayed in the toast.
   */
  title?: ReactNode

  /**
   * The semantic status of the toast, which determines the color
   * tone and ARIA role applied.
   */
  status?: 'error' | 'warning' | 'success' | 'info'
}

/**
 * The context value provided by the {@link ToastProvider}, used to
 * programmatically create and manage toast notifications.
 *
 * @public
 */
export interface ToastContextValue {
  version: 0.0

  /**
   * Creates or updates a toast notification.
   *
   * @remarks
   * If a toast with the same ID already exists, it will be updated.
   * If an ID is not provided, a random one will be generated.
   * The returned ID can be used to programmatically update a toast
   * by calling `push` again with the same ID.
   *
   * @returns The ID of the created or updated toast.
   */
  push: (params: ToastParams) => string
}
