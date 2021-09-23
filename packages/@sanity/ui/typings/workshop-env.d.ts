declare module '$packages' {
  export const packages: Record<
    string,
    | {
        name: string
        version: string
        description: string
      }
    | undefined
  >
}
