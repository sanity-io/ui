import {Code} from '@sanity/ui'
import dynamic from 'next/dynamic'
import React from 'react'
import {ScreenHeroSection} from './sections/hero'

const ArcadeApp = dynamic(import('$components/arcade/app'), {ssr: false})

export function Screen({target}: {target: any}) {
  if (!target.sections) {
    return null
  }

  return target.sections.map((section: any, sectionIndex: number) => {
    if (section._type === 'screenSection.arcade') {
      return <ArcadeApp key={sectionIndex} />
    }

    if (section._type === 'screenSection.hero') {
      return <ScreenHeroSection key={sectionIndex} data={section} />
    }

    return <Code key={sectionIndex}>Unexpected section: {JSON.stringify(section, null, 2)}</Code>
  })
}
