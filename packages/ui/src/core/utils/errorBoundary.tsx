// oxlint-disable-next-line no-restricted-imports -- error boundaries require a class component; React has no function-component equivalent for `getDerivedStateFromError`/`componentDidCatch`
import {Component, PropsWithChildren} from 'react'

/**
 * DO NOT USE IN PRODUCTION
 * @beta
 */
export type ErrorBoundaryProps = PropsWithChildren<{
  onCatch: (params: {error: Error; info: React.ErrorInfo}) => void
}>

/**
 * DO NOT USE IN PRODUCTION
 * @beta
 */
export interface ErrorBoundaryState {
  error: Error | null
}

/**
 * DO NOT USE IN PRODUCTION
 * @beta
 */
export class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  state: ErrorBoundaryState = {error: null}

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    // Update state so the next render will show the fallback UI.
    return {error}
  }

  componentDidCatch(error: Error, info: React.ErrorInfo): void {
    this.props.onCatch({error, info})
  }

  render(): React.ReactNode {
    const {error} = this.state

    if (error) {
      const message = typeof error?.message === 'string' ? error.message : 'Error'

      // A plain element rather than the `Code` primitive: `Code` lives on the
      // `@sanity/ui/code` entry point (it lazy-loads `react-refractor`), and
      // the root entry point must not reference that module graph.
      return (
        <pre data-ui="ErrorBoundary">
          <code>{message}</code>
        </pre>
      )
    }

    return this.props.children
  }
}
