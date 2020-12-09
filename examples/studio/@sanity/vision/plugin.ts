import {EyeOpenIcon} from '@sanity/icons'
import {VisionTool} from './visionTool'

export default () => ({
  type: 'tool',
  name: 'vision',
  icon: EyeOpenIcon,
  title: 'Vision',
  component: VisionTool,
})
