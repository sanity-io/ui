import {isEqual} from 'lodash'
import {memo, startTransition, useCallback, useEffect, useMemo, useRef, useState} from 'react'

import {EMPTY_ARRAY, EMPTY_RECORD} from '../../constants'
import {useWorkshop} from '../../useWorkshop'
import {decodeValue, encodeValue} from './helpers'
import {PropsMsg} from './msg'
import {PropsContext, PropsContextValue} from './PropsContext'
import {propsReducer} from './propsReducer'
import {PropSchema, PropsState} from './types'

/** @internal */
export const PropsProvider = memo(function PropsProvider(props: {
  children?: React.ReactNode
}): React.ReactNode {
  const {children} = props
  const {channel, broadcast, payload} = useWorkshop<PropsMsg>()
  const encodedValue = payload.value
  const encodedValueRef = useRef(encodedValue)

  const [{schemas, value}, setState] = useState<PropsState>(() => ({
    schemas: EMPTY_ARRAY,
    value: decodeValue(String(encodedValue)),
  }))

  const registerProp = useCallback(
    (schema: PropSchema) => {
      broadcast({type: 'workshop/props/registerProp', schema})
    },
    [broadcast],
  )

  const unregisterProp = useCallback(
    (name: string) => {
      broadcast({type: 'workshop/props/unregisterProp', name})
    },
    [broadcast],
  )

  const setPropValue = useCallback(
    (name: string, _value: unknown) => {
      broadcast({type: 'workshop/props/setPropValue', name, value: _value})
    },
    [broadcast],
  )

  const ctx: PropsContextValue = useMemo(
    () => ({registerProp, schemas, setPropValue, unregisterProp, value}),
    [registerProp, schemas, setPropValue, unregisterProp, value],
  )

  // Subscribe to global messages
  useEffect(
    () =>
      channel.subscribe((msg) => {
        setState((prevState) => {
          const nextState =
            msg.type === 'workshop/setPath'
              ? {schemas: EMPTY_ARRAY, value: EMPTY_RECORD}
              : propsReducer(prevState, msg)

          if (isEqual(prevState, nextState)) {
            return prevState
          }

          return nextState
        })
      }),
    [channel],
  )

  useEffect(() => {
    const nextEncodedValue = encodeValue(value)

    if (encodedValueRef.current !== nextEncodedValue) {
      encodedValueRef.current = nextEncodedValue

      broadcast({
        type: 'workshop/setPayloadValue',
        key: 'value',
        value: nextEncodedValue,
      })
    }
  }, [broadcast, value])

  useEffect(() => {
    if (encodedValueRef.current === encodedValue) {
      return
    }

    encodedValueRef.current = encodedValue

    startTransition(() =>
      setState((prevState) => {
        const nextValue = decodeValue(String(encodedValue)) || {}
        if (isEqual(prevState.value, nextValue)) {
          return prevState
        }

        return {
          ...prevState,
          value: nextValue,
        }
      }),
    )
  }, [encodedValue])

  return <PropsContext.Provider value={ctx}>{children}</PropsContext.Provider>
})
