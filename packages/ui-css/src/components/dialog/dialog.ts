import {_composeClassNames} from '../../_composeClassNames'
import {inset} from '../../props/inset/inset'
import {
  card,
  container,
  content,
  footer,
  header,
  root,
  scroller,
  scrollerShadowBottom,
  scrollerShadowTop,
} from './dialog.css'

/** @public */
export function dialog(props: {className?: string}): string | undefined {
  return _composeClassNames(props.className, root, inset({inset: 0}))
}

/** @public */
export function dialog_card(): string | undefined {
  return card
}

/** @public */
export function dialog_container(): string | undefined {
  return container
}

/** @public */
export function dialog_header(): string | undefined {
  return header
}

/** @public */
export function dialog_content(): string | undefined {
  return content
}

/** @public */
export function dialog_scroller(): string | undefined {
  return scroller
}

/** @public */
export function dialog_scrollerShadowTop(): string | undefined {
  return scrollerShadowTop
}

/** @public */
export function dialog_scrollerShadowBottom(): string | undefined {
  return scrollerShadowBottom
}

/** @public */
export function dialog_footer(): string | undefined {
  return footer
}
