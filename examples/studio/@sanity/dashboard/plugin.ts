import {IconSymbol} from '@sanity/ui'
import {DashboardTool} from './dashboardTool'

export default (params: {icon?: IconSymbol; name?: string; title?: string} = {}) => ({
  type: 'tool',
  name: params.name || 'dashboard',
  icon: params.icon || 'dashboard',
  title: params.title || 'Vision',
  component: DashboardTool,
})
