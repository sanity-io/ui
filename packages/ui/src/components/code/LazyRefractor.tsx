import type {ReactNode} from 'react'
import {hasLanguage, Refractor, type RefractorProps} from 'react-refractor'

export default function LazyRefractor({
  language,
  value,
  inline,
  fallback,
}: RefractorProps & {fallback: ReactNode}) {
  if (!hasLanguage(language)) {
    return fallback
  }

  return <Refractor inline={inline} language={language} value={value} />
}
