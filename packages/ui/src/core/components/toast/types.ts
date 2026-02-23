import type {ReactNode} from 'react'

/**
 * Parameters for creating or updating a toast notification via the
 * {@link ToastContextValue.push} method.
 *
 * @public
 */
export interface ToastParams {
  /**
   * When `true`, renders a close button that allows the user to manually
   * dismiss the toast before the `duration` expires.
   *
   * @type {boolean}
   * @defaultValue undefined
   * @optional
   */
  closable?: boolean

  /**
   * Secondary descriptive content rendered below the `title` inside the toast.
   *
   * @remarks
   * Accepts any React node. Typically a short string providing additional
   * context about the action or event that triggered the toast.
   *
   * @type {ReactNode}
   * @defaultValue undefined
   * @optional
   */
  description?: ReactNode

  /**
   * The duration in milliseconds before the toast is automatically dismissed.
   *
   * @remarks
   * When set to a finite positive number, the toast will auto-dismiss after
   * the specified time. When omitted, `Infinity`, or a very large value,
   * the toast remains visible until the user manually closes it (requires
   * `closable` to be `true`).
   *
   * @type {number}
   * @defaultValue undefined
   * @optional
   */
  duration?: number

  /**
   * A unique identifier for the toast.
   *
   * @remarks
   * When provided, pushing a toast with the same `id` as an existing toast
   * updates that toast in place rather than creating a new one. When omitted,
   * a random identifier is generated automatically.
   *
   * The `id` is also returned by the {@link ToastContextValue.push} method,
   * allowing the consumer to programmatically update the toast later.
   *
   * @type {string}
   * @defaultValue (auto-generated)
   * @optional
   */
  id?: string

  /**
   * Callback fired when the toast is dismissed, either by the user clicking
   * the close button or by the auto-dismiss timer expiring.
   *
   * @type {() => void}
   * @defaultValue undefined
   * @optional
   */
  onClose?: () => void

  /**
   * The primary text content displayed prominently inside the toast.
   *
   * @remarks
   * Accepts any React node. Typically a short string summarizing the action
   * or event (e.g. `"Document published"`, `"Error saving"`).
   *
   * @type {ReactNode}
   * @defaultValue undefined
   * @optional
   */
  title?: ReactNode

  /**
   * Sets the semantic status of the toast, which determines its color tone
   * and ARIA role.
   *
   * @remarks
   * The status maps to a card tone and an ARIA `role` attribute:
   * - `"error"` → `critical` tone, `role="alert"`
   * - `"warning"` → `caution` tone, `role="alert"`
   * - `"success"` → `positive` tone, `role="alert"`
   * - `"info"` → `neutral` tone, `role="alert"`
   *
   * When omitted, the toast renders with the `default` tone and `role="status"`.
   *
   * Accepted values: `"error"` | `"warning"` | `"success"` | `"info"`
   *
   * @type {'error' | 'warning' | 'success' | 'info'}
   * @defaultValue undefined
   * @optional
   */
  status?: 'error' | 'warning' | 'success' | 'info'
}

/**
 * The context value provided by the toast system, used to create and manage
 * toast notifications programmatically.
 *
 * @remarks
 * Access this context via the `useToast` hook. The `push` method creates or
 * updates toast notifications and returns their identifier for subsequent
 * updates.
 *
 * @public
 */
export interface ToastContextValue {
  /**
   * The version of the toast context API.
   *
   * @type {0.0}
   */
  version: 0.0

  /**
   * Creates or updates a toast notification.
   *
   * @remarks
   * If a toast with the same `id` already exists, it will be updated with the
   * new parameters. If an `id` is not provided in the params, a random one
   * will be generated. The returned `id` can be used to programmatically
   * update the toast later by calling `push` again with the same `id`.
   *
   * @param params - The {@link ToastParams} configuration for the toast.
   * @returns The unique identifier of the created or updated toast.
   *
   * @type {(params: ToastParams) => string}
   */
  push: (params: ToastParams) => string
}
