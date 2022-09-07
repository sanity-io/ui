import {useLocation} from '../lib/location'
import {OrgScreen} from './screens/org'
import {ProjectScreen} from './screens/project'

export function App() {
  const {path, segments} = useLocation()

  if (segments.length === 0) {
    return <OrgScreen />
  }

  if (segments[0] === 'org' && segments[2] === 'project') {
    return <ProjectScreen />
  }

  if (segments[0] === 'org') {
    return <OrgScreen />
  }

  return <div>Not found: {path}</div>
}
