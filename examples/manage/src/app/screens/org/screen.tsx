import {useLocation} from '../../../lib/location'
import {Layout, OrgHeader} from '../../components'

// panels
import {ActivityPanel} from './activity'
import {BillingPanel} from './billing'
import {MembersPanel} from './members'
import {OverviewPanel} from './overview'
import {ProjectsPanel} from './projects'
import {SettingsPanel} from './settings'
import {UsagePanel} from './usage'

export function OrgScreen() {
  const {segments} = useLocation()
  const panelName = segments[2] || 'overview'

  return (
    <Layout>
      <OrgHeader />
      {panelName === 'activity' && <ActivityPanel />}
      {panelName === 'billing' && <BillingPanel />}
      {panelName === 'members' && <MembersPanel />}
      {panelName === 'overview' && <OverviewPanel />}
      {panelName === 'projects' && <ProjectsPanel />}
      {panelName === 'settings' && <SettingsPanel />}
      {panelName === 'usage' && <UsagePanel />}
    </Layout>
  )
}
