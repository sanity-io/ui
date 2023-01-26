import {Code, useLayer} from '@sanity/ui'

export function LayerDebugInfo(props: {id?: string}) {
  const {id} = props
  const layer = useLayer()

  return (
    <Code id={id}>
      {[
        //
        `isTopLayer=${layer.isTopLayer}`,
        `size=${layer.size}`,
        `zIndex=${layer.zIndex}`,
      ].join('\n')}
    </Code>
  )
}
