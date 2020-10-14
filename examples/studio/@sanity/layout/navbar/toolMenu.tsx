import {useLocation, useStudioToolPlugins} from '@sanity/base'
import {Button} from '@sanity/ui'
import React from 'react'
import styled from 'styled-components'
import {useResponsiveMenu} from './hooks'

const Root = styled.div`
  padding: 1px;

  & > div {
    margin: -1px;
  }
`

const ButtonContainer = styled.div`
  display: inline-flex;
  vertical-align: top;

  & > * {
    flex-shrink: min-content;
  }

  & > * + * {
    margin-left: 0.5em;
  }
`

export function ToolMenu(props: {onHide: () => void; onShow: () => void}) {
  const {handleLinkClick, segments} = useLocation()
  const tools = useStudioToolPlugins()
  const {onHide, onShow} = props
  const {collapsed, hidden, rootRef, wrapperRef} = useResponsiveMenu({onHide, onShow})
  const activeToolName = segments[0] || tools[0]?.name

  return (
    <Root ref={rootRef}>
      <ButtonContainer ref={wrapperRef}>
        {!hidden && (
          <>
            {tools.map((tool: any, toolIndex: number) => (
              <Button
                as="a"
                icon={tool.icon}
                href={toolIndex === 0 ? '/' : `/${tool.name}`}
                key={tool.name}
                mode="bleed"
                onClick={handleLinkClick}
                selected={activeToolName === tool.name}
                text={collapsed ? undefined : <>{tool.title}</>}
              />
            ))}
          </>
        )}
      </ButtonContainer>
    </Root>
  )
}
