import {hasLanguage, Refractor, type RefractorProps} from 'react-refractor'

export default function LazyRefractor({language, value, inline}: RefractorProps) {
  if (!hasLanguage(language)) {
    return inline ? value : <code>{value}</code>
  }

  return <Refractor inline={inline} language={language} value={value} />
}
