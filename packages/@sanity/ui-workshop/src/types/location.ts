/** @public */
export type WorkshopQuery = {
  [key: string]: string | number | boolean | WorkshopQuery | undefined
}

/** @public */
export interface WorkshopLocation {
  type: 'pop' | 'push' | 'replace'
  path: string
  query?: WorkshopQuery
}
