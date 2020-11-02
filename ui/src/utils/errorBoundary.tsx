import React from 'react'
import {Code} from '../atoms'

interface ErrorBoundaryProps {
  onCatch: (params: {error: Error; info: React.ErrorInfo}) => void
}

interface ErrorBoundaryState {
  error: Error | null
}

export class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  state: ErrorBoundaryState = {error: null}

  static getDerivedStateFromError(error: Error) {
    // Update state so the next render will show the fallback UI.
    return {error}
  }

  componentDidCatch(error: Error, info: React.ErrorInfo) {
    this.props.onCatch({error, info})
  }

  render() {
    const {error} = this.state

    if (error) {
      return <Code>{error.message}</Code>
    }

    return this.props.children
  }
}
