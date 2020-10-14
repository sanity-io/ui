import React from 'react'
import {ColorSchemeKey} from '../../theme'
import {CardContext} from './cardContext'
import {CardTone} from './types'

export interface CardProviderProps {
  children?: React.ReactNode
  tone?: CardTone
  scheme: ColorSchemeKey
}

export function CardProvider({children, scheme, tone}: CardProviderProps) {
  return <CardContext.Provider value={{scheme, tone}}>{children}</CardContext.Provider>
}
