'use client'

// The `@sanity/ui/toast` entry point. Toasts are animated with `motion`, so
// they live on their own subpath to keep that dependency out of the root
// entry point (`useToast` is included because it is only useful together with
// `ToastProvider`).
export {Toast, type ToastProps} from '../core/components/toast/toast'
export {ToastProvider, type ToastProviderProps} from '../core/components/toast/toastProvider'
export type {ToastContextValue, ToastParams} from '../core/components/toast/types'
export {useToast} from '../core/components/toast/useToast'
