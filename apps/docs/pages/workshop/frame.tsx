import {WorkshopFrame} from '@sanity/ui-workshop'
import React from 'react'
import {scopes} from '../../workshopScopes'
import {useApp} from '$components/app'
import {app} from '$config'

function WorkshopFramePage() {
  const {setColorScheme} = useApp()

  return (
    <WorkshopFrame
      frameUrl="/frame/"
      scopes={scopes}
      setScheme={setColorScheme}
      title={app.siteName}
    />
  )
}

export default WorkshopFramePage
