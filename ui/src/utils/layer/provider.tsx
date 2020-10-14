import {useId} from '@reach/auto-id'
import React, {useCallback, useContext, useEffect, useMemo, useRef, useState} from 'react'
import {LayerContext} from './context'

export function LayerProvider({children, id: idProp}: {children: React.ReactNode; id?: string}) {
  const parentLayer = useContext(LayerContext)
  const [size, setSize] = useState(-1)
  const idsRef = useRef<string[]>([])
  const currentId = useId(idProp)

  const mount = useCallback((id: string) => {
    setSize((val) => val + 1)

    if (idsRef.current.includes(id)) {
      throw new Error(`Layer: id already exists ("${id}")`)
    }

    idsRef.current.push(id)

    return () => {
      setSize((val) => val - 1)
      const idx = idsRef.current.indexOf(id)
      if (idx > -1) {
        idsRef.current.splice(idx, 1)
      }
    }
  }, [])

  const layer = useMemo(() => {
    const layerDepth = parentLayer ? parentLayer.depth + 1 : 0
    const layerSize = parentLayer ? parentLayer.size : size
    const _currentId = parentLayer
      ? parentLayer.currentId
      : idsRef.current[idsRef.current.length - 1]

    return {
      currentId: _currentId,
      depth: layerDepth,
      isTopLayer: currentId === _currentId,
      mount: parentLayer?.mount || mount,
      size: layerSize,
    }
  }, [currentId, mount, parentLayer, size])

  const mountFn = layer.mount

  useEffect(() => {
    if (!currentId) return undefined
    return mountFn(currentId)
  }, [currentId, mountFn])

  return <LayerContext.Provider value={layer}>{children}</LayerContext.Provider>
}
