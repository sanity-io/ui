import dynamic from 'next/dynamic'
import React from 'react'
import {AppLayout} from '~/components'

const ArcadeApp = dynamic(import('~/components/arcade/app'), {ssr: false})

function ArcadePage() {
  return (
    <AppLayout>
      <ArcadeApp />
    </AppLayout>
  )
}

export default ArcadePage
