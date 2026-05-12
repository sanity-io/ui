import type {PropsWithChildren} from 'react'
import {registerLanguage} from 'react-refractor'
import css from 'refractor/css'
import js from 'refractor/javascript'
import jsx from 'refractor/jsx'

export function RefractorLanguage({children}: PropsWithChildren) {
  registerLanguage(css)
  registerLanguage(js)
  registerLanguage(jsx)

  return children
}
