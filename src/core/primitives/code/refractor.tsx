import Refractor from 'react-refractor'

export default function LazyRefractor(
  props: Partial<Pick<React.ComponentProps<typeof Refractor>, 'language'>> & {
    value: React.ReactNode
  },
): React.JSX.Element {
  const {language: languageProp, value} = props
  const language = typeof languageProp === 'string' ? languageProp : undefined
  const registered = language ? Refractor.hasLanguage(language) : false

  return (
    <>
      {!(language && registered) && <code>{value}</code>}
      {language && registered && <Refractor inline language={language} value={String(value)} />}
    </>
  )
}
