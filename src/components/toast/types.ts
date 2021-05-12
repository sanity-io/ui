export interface ToastParams {
  closable?: boolean
  description?: React.ReactNode
  duration?: number
  id?: string
  onClose?: () => void
  title?: React.ReactNode
  status?: 'error' | 'warning' | 'success' | 'info'
}
