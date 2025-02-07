import Refractor from 'react-refractor'

export default function LazyRefractor(
  props: Partial<Pick<React.ComponentProps<typeof Refractor>, 'language'>> &
    Pick<React.ComponentProps<typeof Refractor>, 'value'>,
) {
  const {language: languageProp, value} = props
  const language = typeof languageProp === 'string' ? languageProp : undefined
  const registered = language ? Refractor.hasLanguage(language as any) : false

  return (
    <>
      {!(language && registered) && <code>{value}</code>}
      {language && registered && <Refractor inline language={language} value={value} />}
    </>
  )
}

LazyRefractor.displayName = 'LazyRefractor'
