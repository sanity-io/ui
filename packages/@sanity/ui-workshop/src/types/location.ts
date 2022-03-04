export type WorkshopQuery = {
  [key: string]: string | number | boolean | WorkshopQuery | undefined
}

export interface WorkshopLocation {
  type: 'pop' | 'push' | 'replace'
  path: string
  query?: WorkshopQuery
}
