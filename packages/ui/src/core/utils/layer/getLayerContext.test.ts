import {getLayerContext} from './getLayerContext'
import {LayerContextValue} from './types'

describe('getLayerContext', () => {
  describe('0.0', () => {
    it('should convert 0.0 to 0.0', () => {
      const contextValue: LayerContextValue = {
        version: 0.0,
        isTopLayer: true,
        level: 0,
        registerChild: () => () => {
          //
        },
        size: 0,
        zIndex: 0,
      }

      const result = getLayerContext(contextValue)

      expect(result).toEqual({
        version: 0.0,
        isTopLayer: true,
        level: 0,
        registerChild: expect.any(Function),
        size: 0,
        zIndex: 0,
      })
    })
  })
})
