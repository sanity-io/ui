import {breadcrumbsRules} from './components/breadcrumbs/rules'
import {dialogRules} from './components/dialog/rules'
import {menuRules} from './components/menu/rules'
import {skeletonRules} from './components/skeleton/rules'
import {toastRules} from './components/toast/rules'
import {_arrowRules} from './primitives/_arrow/rules'
import {_inputRules} from './primitives/_input/rules'
import {_selectableRules} from './primitives/_selectable/rules'
import {avatarRules} from './primitives/avatar/rules'
import {badgeRules} from './primitives/badge/rules'
import {boxRules} from './primitives/box/rules'
import {buttonRules} from './primitives/button/rules'
import {cardRules} from './primitives/card/rules'
import {checkboxRules} from './primitives/checkbox/rules'
import {codeRules} from './primitives/code/rules'
import {containerRules} from './primitives/container/rules'
import {headingRules} from './primitives/heading/rules'
import {kbdRules} from './primitives/kbd/rules'
import {labelRules} from './primitives/label/rules'
import {popoverRules} from './primitives/popover/rules'
import {radioRules} from './primitives/radio/rules'
import {selectRules} from './primitives/select/rules'
import {spinnerRules} from './primitives/spinner/rules'
import {switchRules} from './primitives/switch/rules'
import {textRules} from './primitives/text/rules'
import {textAreaRules} from './primitives/textArea/rules'
import {textInputRules} from './primitives/textInput/rules'
import {tokenRules} from './primitives/token/rules'
import {tooltipRules} from './primitives/tooltip/rules'
import {borderRules} from './styles/border/rules'
import {displayRules} from './styles/display/rules'
import {flexRules} from './styles/flex/rules'
import {flexItemRules} from './styles/flexItem/rules'
import {fontRules} from './styles/font/rules'
import {gapRules} from './styles/gap/rules'
import {gridRules} from './styles/grid/rules'
import {gridItemRules} from './styles/gridItem/rules'
import {heightRules} from './styles/height/rules'
import {insetRules} from './styles/inset/rules'
import {marginRules} from './styles/margin/rules'
import {maxWidthRules} from './styles/maxWidth/rules'
import {outlineRules} from './styles/outline/rules'
import {overflowRules} from './styles/overflow/rules'
import {paddingRules} from './styles/padding/rules'
import {pointerEventsRules} from './styles/pointerEvents/rules'
import {positionRules} from './styles/position/rules'
import {radiusRules} from './styles/radius/rules'
import {shadowRules} from './styles/shadow/rules'
import {textOverflowRules} from './styles/textOverflow/rules'
import {widthRules} from './styles/width/rules'
import {type Rules} from './types'
import {srOnlyRules} from './utils/srOnly/rules'

export const rules: Rules = {
  // styles
  ...borderRules,
  ...displayRules,
  ...flexItemRules,
  ...flexRules,
  ...fontRules,
  ...gapRules,
  ...gridItemRules,
  ...gridRules,
  ...heightRules,
  ...insetRules,
  ...marginRules,
  ...outlineRules,
  ...overflowRules,
  ...paddingRules,
  ...pointerEventsRules,
  ...positionRules,
  ...radiusRules,
  ...shadowRules,
  ...widthRules,

  // utils
  ...srOnlyRules,

  // primitives
  ..._arrowRules,
  ..._inputRules,
  ..._selectableRules,
  ...avatarRules,
  ...badgeRules,
  ...boxRules,
  ...buttonRules,
  ...cardRules,
  ...checkboxRules,
  ...codeRules,
  ...containerRules,
  ...headingRules,
  ...kbdRules,
  ...labelRules,
  ...maxWidthRules,
  ...popoverRules,
  ...radioRules,
  ...selectRules,
  ...spinnerRules,
  ...switchRules,
  ...textAreaRules,
  ...textInputRules,
  ...textOverflowRules,
  ...textRules,
  ...tokenRules,
  ...tooltipRules,

  // components
  ...breadcrumbsRules,
  ...dialogRules,
  ...menuRules,
  ...skeletonRules,
  ...toastRules,
}
