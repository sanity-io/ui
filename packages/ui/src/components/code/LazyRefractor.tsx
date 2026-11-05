import {hasLanguage, Refractor, type RefractorProps} from 'react-refractor'

export default function LazyRefractor({language, value}: RefractorProps) {
  if (!hasLanguage(language)) {
    return <code>{value}</code>
  }

  return <Refractor inline language={language} value={value} />
}
