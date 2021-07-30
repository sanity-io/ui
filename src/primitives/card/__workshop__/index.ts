import {defineScope} from '@sanity/ui-workshop'
import {AllTonesStory} from './allTones'
import {AsButtonStory} from './asButton'
import {InteractiveCardStory} from './interactive'
import {PropsStory} from './props'
import {StyledCardStory} from './styled'

export default defineScope('primitives/card', 'Card', [
  {name: 'props', title: 'Props', component: PropsStory},
  {name: 'styled', title: 'Styled', component: StyledCardStory},
  {name: 'interactive', title: 'Interactive', component: InteractiveCardStory},
  {name: 'tones', title: 'Tones', component: AllTonesStory},
  {name: 'as-button', title: 'As button', component: AsButtonStory},
])
