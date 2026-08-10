import {Code} from '@sanity/ui/code'
import type {StegaBranded} from 'next-sanity'
import {ReactElement} from 'react'

import type {TargetByPathQueryResult} from '#sanity.types'

import {HeroSection} from './sections/HeroSection'

export function PageBuilder(props: {
  page: StegaBranded<Extract<NonNullable<TargetByPathQueryResult>, {_type: 'screen'}>>
}): ReactElement {
  const {page} = props

  return (
    <>
      {page.sections?.map((section) => {
        if (section._type === 'screenSection.hero') {
          return <HeroSection data={section} key={section._key} />
        }

        return (
          <div key={section._key}>
            <Code size={1}>{JSON.stringify(section, null, 2)}</Code>
          </div>
        )
      })}
    </>
  )
}
