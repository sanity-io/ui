import {_mergeStyles} from './_mergeStyles'
import {borderStyle} from './aspects/border/border.style'
import {boxSizingStyle} from './aspects/boxSizing/boxSizing.style'
import {displayStyle} from './aspects/display/display.style'
import {flexAlignStyle} from './aspects/flex/flexAlign.style'
import {flexDirectionStyle} from './aspects/flex/flexDirection.style'
import {flexJustifyStyle} from './aspects/flex/flexJustify.style'
import {flexWrapStyle} from './aspects/flex/flexWrap.style'
import {flexStyle} from './aspects/flexItem/flex.style'
import {fontStyle} from './aspects/font/font.style'
import {gapStyle} from './aspects/gap/gap.style'
import {gridAutoColumnsStyle} from './aspects/grid/gridAutoColumns.style'
import {gridAutoFlowStyle} from './aspects/grid/gridAutoFlow.style'
import {gridAutoRowsStyle} from './aspects/grid/gridAutoRows.style'
import {gridColumnsStyle} from './aspects/grid/gridColumns.style'
import {gridRowsStyle} from './aspects/grid/gridRows.style'
import {gridColumnStyle} from './aspects/gridItem/gridColumn.style'
import {gridColumnEndStyle} from './aspects/gridItem/gridColumnEnd.style'
import {gridColumnStartStyle} from './aspects/gridItem/gridColumnStart.style'
import {gridRowStyle} from './aspects/gridItem/gridRow.style'
import {gridRowEndStyle} from './aspects/gridItem/gridRowEnd.style'
import {gridRowStartStyle} from './aspects/gridItem/gridRowStart.style'
import {heightStyle} from './aspects/height/height.style'
import {insetStyle} from './aspects/inset/inset.style'
import {marginStyle} from './aspects/margin/margin.style'
import {maxWidthStyle} from './aspects/maxWidth/maxWidth.style'
import {minHeightStyle} from './aspects/minHeight/minHeight.style'
import {minWidthStyle} from './aspects/minWidth/minWidth.style'
import {outlineStyle} from './aspects/outline/outline.style'
import {overflowStyle} from './aspects/overflow/overflow.style'
import {paddingStyle} from './aspects/padding/padding.style'
import {pointerEventsStyle} from './aspects/pointerEvents/pointerEvents.style'
import {positionStyle} from './aspects/position/position.style'
import {radiusStyle} from './aspects/radius/radius.style'
import {shadowStyle} from './aspects/shadow/shadow.style'
import {textAlignStyle} from './aspects/textAlign/textAlign.style'
import {textOverflowStyle} from './aspects/textOverflow/textOverflow.style'
import {widthStyle} from './aspects/width/width.style'
import {breadcrumbsStyle} from './components/breadcrumbs/breadcrumbs.style'
import {dialogStyle} from './components/dialog/dialog.style'
import {menuStyle} from './components/menu/menu.style'
import {skeletonStyle} from './components/skeleton/skeleton.style'
import {toastStyle} from './components/toast/toast.style'
import {treeStyle} from './components/tree/tree.style'
import {_arrowStyle} from './primitives/_arrow/_arrow.style'
import {_inputStyle} from './primitives/_input/_input.style'
import {_selectableStyle} from './primitives/_selectable/_selectable.style'
import {avatarStyle} from './primitives/avatar/avatar.style'
import {badgeStyle} from './primitives/badge/badge.style'
import {boxStyle} from './primitives/box/box.style'
import {buttonStyle} from './primitives/button/button.style'
import {cardStyle} from './primitives/card/card.style'
import {checkboxStyle} from './primitives/checkbox/checkbox.style'
import {codeStyle} from './primitives/code/code.style'
import {containerStyle} from './primitives/container/container.style'
import {headingStyle} from './primitives/heading/heading.style'
import {kbdStyle} from './primitives/kbd/kbd.style'
import {labelStyle} from './primitives/label/label.style'
import {popoverStyle} from './primitives/popover/popover.style'
import {radioStyle} from './primitives/radio/radio.style'
import {selectStyle} from './primitives/select/select.style'
import {spinnerStyle} from './primitives/spinner/spinner.style'
import {stackStyle} from './primitives/stack/stack.style'
import {switchStyle} from './primitives/switch/switch.style'
import {textStyle} from './primitives/text/text.style'
import {textAreaStyle} from './primitives/textArea/textArea.style'
import {textInputStyle} from './primitives/textInput/textInput.style'
import {tokenStyle} from './primitives/token/token.style'
import {tooltipStyle} from './primitives/tooltip/tooltip.style'
import {type Style} from './types'
import {srOnlyStyle} from './utils/srOnly/srOnly.style'

/** @internal */
export const _systemStyle: Style = _mergeStyles([
  // NOTE: Order matters in CSS!

  {
    // define order of layers
    layers: {
      palette: {},
      theme: {},
      base: {},
      util: {},
      primitive: {},
    },
  },

  // aspects
  borderStyle,
  boxSizingStyle,
  displayStyle,
  flexStyle,
  flexAlignStyle,
  flexDirectionStyle,
  flexJustifyStyle,
  flexWrapStyle,
  fontStyle,
  gapStyle,
  gridAutoColumnsStyle,
  gridAutoFlowStyle,
  gridAutoRowsStyle,
  gridColumnsStyle,
  gridRowsStyle,
  gridColumnStyle,
  gridColumnStartStyle,
  gridColumnEndStyle,
  gridRowStyle,
  gridRowStartStyle,
  gridRowEndStyle,
  heightStyle,
  insetStyle,
  marginStyle,
  maxWidthStyle,
  minHeightStyle,
  minWidthStyle,
  outlineStyle,
  overflowStyle,
  paddingStyle,
  pointerEventsStyle,
  positionStyle,
  radiusStyle,
  shadowStyle,
  textAlignStyle,
  textOverflowStyle,
  widthStyle,

  // utils
  srOnlyStyle,

  // primitives
  _arrowStyle,
  _inputStyle,
  _selectableStyle,
  avatarStyle,
  badgeStyle,
  boxStyle,
  buttonStyle,
  cardStyle,
  checkboxStyle,
  codeStyle,
  containerStyle,
  headingStyle,
  kbdStyle,
  labelStyle,
  maxWidthStyle,
  popoverStyle,
  radioStyle,
  selectStyle,
  spinnerStyle,
  stackStyle,
  switchStyle,
  textAreaStyle,
  textInputStyle,
  textOverflowStyle,
  textStyle,
  tokenStyle,
  tooltipStyle,

  // components
  breadcrumbsStyle,
  dialogStyle,
  menuStyle,
  skeletonStyle,
  toastStyle,
  treeStyle,
])
