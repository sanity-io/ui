import {Code} from '@sanity/ui'
import {ScreenHeroSection} from './sections/hero'
import {isArray, isRecord} from '$lib/types'

export function Screen({target}: {target: Record<string, unknown>}) {
  if (!isArray(target.sections)) {
    return <></>
  }

  return (
    <>
      {target.sections.map((section, sectionIndex) => {
        if (isRecord(section) && section._type === 'screenSection.hero') {
          return <ScreenHeroSection key={sectionIndex} data={section} />
        }

        return (
          <Code key={sectionIndex}>Unexpected section: {JSON.stringify(section, null, 2)}</Code>
        )
      })}
    </>
  )
}
