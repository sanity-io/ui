import icons, {IconSymbol} from '@sanity/icons'
import React, {createElement, forwardRef} from 'react'

export type {IconSymbol}

interface IconProps {
  symbol: IconSymbol
}

export const Icon = forwardRef(
  (props: IconProps & Omit<React.SVGProps<SVGElement>, 'ref'>, ref) => {
    const {symbol, ...restProps} = props

    if (!icons[symbol]) {
      return null
    }

    return createElement(icons[symbol], {...restProps, ref: ref as any})
  }
)

Icon.displayName = 'Icon'
