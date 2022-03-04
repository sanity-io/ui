import {AxeResults} from 'axe-core'

export interface A11ySetResultsMsg {
  type: 'workshop/a11y/setResults'
  path: string
  results: AxeResults
}

export interface A11ySetErrorMsg {
  type: 'workshop/a11y/setError'
  message: string
}

export type A11yMsg = A11ySetResultsMsg | A11ySetErrorMsg
