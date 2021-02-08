export interface Runtime {
  onRenderDone: () => void | undefined
}

export const runtime: Runtime = {
  onRenderDone: () => undefined,
}
