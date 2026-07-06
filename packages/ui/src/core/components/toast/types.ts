/**
 * @public
 */
export interface ToastParams {
  closable?: boolean
  description?: React.ReactNode
  duration?: number
  id?: string
  onClose?: () => void
  title?: React.ReactNode
  status?: 'error' | 'warning' | 'success' | 'info'
}

/**
 * @public
 */
export interface ToastContextValue {
  version: 0.0
  /**
   * Creates or updates a toast notification.
   * If a toast with the same ID already exists, it will be updated.
   * If an ID is not provided, a random one will be generated.
   * The returned ID can be used to programatically update a toast.
   */
  push: (params: ToastParams) => string
}
