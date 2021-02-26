import React, {createElement, forwardRef} from 'react'
import {icons} from './icons'
import type {IconSymbol} from './icons'

interface IconProps {
  symbol: IconSymbol
}

export const Icon = forwardRef(
  (
    props: IconProps & Omit<React.SVGProps<SVGSVGElement>, 'ref'>,
    ref: React.Ref<SVGSVGElement>
  ) => {
    const {symbol, ...restProps} = props
    const iconComponent = icons[symbol]

    if (!iconComponent) {
      return null
    }

    return createElement(iconComponent, {...restProps, ref})
  }
)

Icon.displayName = 'Icon'
