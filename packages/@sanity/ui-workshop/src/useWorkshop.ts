import {useContext} from 'react'
import {WorkshopContext, WorkshopContextValue} from './WorkshopContext'

export function useWorkshop<CustomMsg = never>(): WorkshopContextValue<CustomMsg> {
  const workshop = useContext(WorkshopContext)

  if (!workshop) {
    throw new Error('Workshop: missing context value')
  }

  return workshop as unknown as WorkshopContextValue<CustomMsg>
}
