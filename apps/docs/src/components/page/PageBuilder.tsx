'use client'

import {WrappedValue} from '@sanity/react-loader/jsx'
import {Card, Code, Text} from '@sanity/ui'
import {ReactElement} from 'react'

import {ScreenData} from '@/lib/data'

import {HeroSection} from './sections/HeroSection'

export function PageBuilder(props: {page: WrappedValue<ScreenData>}): ReactElement {
  const {page} = props

  return (
    <>
      {page.sections?.map((section) => {
        if (section._type === 'screenSection.hero') {
          return <HeroSection data={section} key={section._key} />
        }

        return (
          <Card
            display="flex"
            flexDirection="column"
            gap={4}
            key={section._key}
            padding={5}
            shadow={1}
            tone="default"
          >
            <Text size={1} weight="medium">
              Unknown section type: {section._type}
            </Text>

            <Code language="json" size={1}>
              {JSON.stringify(section, null, 2)}
            </Code>
          </Card>
        )
      })}
    </>
  )
}
