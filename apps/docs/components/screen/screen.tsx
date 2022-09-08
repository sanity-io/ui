import {Code} from '@sanity/ui'
import React from 'react'
import {isArray, isRecord} from '../../lib/types'
import {ScreenHeroSection} from './sections/hero'

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
