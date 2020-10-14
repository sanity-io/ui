import {DeskTool} from './deskTool'

export default (params: {title?: string} = {}) => ({
  type: 'tool',
  name: 'desk',
  icon: 'master-detail',
  title: params.title || 'Desk',
  component: DeskTool,
})
