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
export function dialogCard(): string | undefined {
  return card
}

/** @public */
export function dialogContainer(): string | undefined {
  return container
}

/** @public */
export function dialogHeader(): string | undefined {
  return header
}

/** @public */
export function dialogContent(): string | undefined {
  return content
}

/** @public */
export function dialogScroller(): string | undefined {
  return scroller
}

/** @public */
export function dialogScrollerShadowTop(): string | undefined {
  return scrollerShadowTop
}

/** @public */
export function dialogScrollerShadowBottom(): string | undefined {
  return scrollerShadowBottom
}

/** @public */
export function dialogFooter(): string | undefined {
  return footer
}
