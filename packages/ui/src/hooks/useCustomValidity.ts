import {useEffect} from 'react'

/**
 * @beta
 */
export function useCustomValidity(
  ref: {current: null | {setCustomValidity: (validity: string) => void}},
  customValidity: string | undefined,
): void {
  useEffect(() => {
    ref.current?.setCustomValidity(customValidity || '')
  }, [customValidity, ref])
}
