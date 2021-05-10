import {useContext} from 'react'
import {WorkshopContextValue} from './types'
import {WorkshopContext} from './workshopContext'

export function useWorkshop(): WorkshopContextValue {
  const studio = useContext(WorkshopContext)

  if (!studio) {
    throw new Error('Workshop: missing context value')
  }

  return studio
}
