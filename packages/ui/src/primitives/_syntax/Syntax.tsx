import {_syntax} from '@sanity/ui/css'
import {hasLanguage, Refractor} from 'react-refractor'

export interface SyntaxProps {
  /**
   * The programming language to use for syntax highlighting.
   */
  language?: string
  /**
   * The code content to render with syntax highlighting.
   */
  value: React.ReactNode
}

export default function Syntax(props: SyntaxProps): React.JSX.Element {
  const {language: languageProp, value} = props
  const language = typeof languageProp === 'string' ? languageProp : undefined
  const registered = language ? hasLanguage(language) : false

  if (!language || !registered) {
    return <code>{value}</code>
  }

  return (
    <Refractor
      className={_syntax()}
      inline
      language={language}
      value={typeof value === 'string' ? value : ''}
    />
  )
}
