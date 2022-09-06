import {WorkshopFrame} from '@sanity/ui-workshop'
import {useApp} from '$components/app'
import {config} from '$workshop/config'

function WorkshopFramePage() {
  const {setColorScheme} = useApp()

  return <WorkshopFrame config={config} setScheme={setColorScheme} />
}

export default WorkshopFramePage
