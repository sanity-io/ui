export interface ToastParams {
  closable?: boolean
  description?: React.ReactNode
  duration?: number
  onClose?: () => void
  title?: React.ReactNode
  status?: 'error' | 'warning' | 'success' | 'info'
}
