export interface _Observable<T> {
  subscribe: (observer: {next: (value: T) => void}) => {
    unsubscribe: () => void
  }
}
