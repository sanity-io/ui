import {MasterDetailIcon} from '@sanity/icons'
import {DeskTool} from './deskTool'

export default (params: {title?: string} = {}) => ({
  type: 'tool',
  name: 'desk',
  icon: MasterDetailIcon,
  title: params.title || 'Desk',
  component: DeskTool,
})
