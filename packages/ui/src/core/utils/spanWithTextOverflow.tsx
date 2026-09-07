import {spanWithTextOverflow} from './spanWithTextOverflow.css'

/** @internal */
export function SpanWithTextOverflow(props: {children?: React.ReactNode}): React.JSX.Element {
  return <span className={spanWithTextOverflow}>{props.children}</span>
}
