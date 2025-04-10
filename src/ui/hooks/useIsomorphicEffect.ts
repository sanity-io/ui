import {useEffect, useLayoutEffect} from 'react'

/**
 * @beta
 * @deprecated use `useLayoutEffect` instead, or `useEffect` if possible
 */
export const useIsomorphicEffect = typeof window !== 'undefined' ? useLayoutEffect : useEffect
