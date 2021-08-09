import {WorkshopFrame} from '@sanity/ui-workshop'
import React from 'react'
import {scopes} from '../../workshopScopes'
import {useApp} from '$components/app'

function WorkshopFramePage() {
  const {setColorScheme} = useApp()

  return (
    <WorkshopFrame
      frameUrl="/frame/"
      scopes={scopes}
      setScheme={setColorScheme}
      title="Sanity UI"
    />
  )
}

export default WorkshopFramePage
