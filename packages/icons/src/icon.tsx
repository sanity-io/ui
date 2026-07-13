import type {ComponentPropsWithRef, ReactElement} from 'react'
import {Suspense} from 'react'

import {icons} from './icons'
import type {IconSymbol} from './icons'

/**
 * @public
 */
export interface IconProps {
  symbol: IconSymbol
}

/**
 * Renders the icon for the given `symbol` from the lazy `icons` map.
 *
 * The searchable icon catalog at {@link https://icons.sanity.dev} helps finding the right
 * icon – each one is shown with a copyable import snippet.
 *
 * While the icon chunk loads, a fallback svg with the exact same shell as every generated
 * icon (`data-sanity-icon`, `width`/`height` of `1em`, the shared `viewBox`, and the spread
 * props) is rendered, so the icon slot reserves its final size and responds to the same
 * styling from the first paint – the way an `<img>` with intrinsic dimensions behaves while
 * its `src` is still downloading.
 *
 * @public
 */
export function Icon(props: IconProps & ComponentPropsWithRef<'svg'>): ReactElement | null {
  const {symbol, ...restProps} = props
  const IconComponent = icons[symbol]

  if (!IconComponent) {
    return null
  }

  return (
    <Suspense
      fallback={
        <svg
          data-sanity-icon={symbol}
          width="1em"
          height="1em"
          viewBox="0 0 25 25"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          {...restProps}
        />
      }
    >
      <IconComponent {...restProps} />
    </Suspense>
  )
}
