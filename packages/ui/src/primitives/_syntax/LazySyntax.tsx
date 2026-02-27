import {_syntax} from '@sanity/ui/css'
import {hasLanguage, Refractor} from 'react-refractor'

export default function LazySyntax(
  props: Partial<Pick<React.ComponentProps<typeof Refractor>, 'language'>> & {
    value: React.ReactNode
  },
): React.JSX.Element {
  const {language: languageProp, value} = props
  const language = typeof languageProp === 'string' ? languageProp : undefined
  const registered = language ? hasLanguage(language) : false

  return (
    <>
      {!(language && registered) && <code>{value}</code>}
      {language && registered && (
        <Refractor
          className={_syntax()}
          inline
          language={language}
          value={typeof value === 'string' ? value : ''}
        />
      )}
    </>
  )
}
