import {DashboardIcon} from '@sanity/icons'
import {DashboardTool} from './dashboardTool'

export default (
  params: {icon?: React.ComponentType | React.ReactNode; name?: string; title?: string} = {}
) => ({
  type: 'tool',
  name: params.name || 'dashboard',
  icon: params.icon || DashboardIcon,
  title: params.title || 'Vision',
  component: DashboardTool,
})
