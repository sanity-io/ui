import {LocationProvider, StudioProvider, useLocation, useStudioToolPlugins} from '@sanity/base'
import dashboardTool from '@sanity/dashboard/plugin'
import deskTool from '@sanity/desk-tool/plugin'
import {Layout} from '@sanity/layout'
import {CardProvider, studioTheme, Theme, ThemeProvider} from '@sanity/ui'
import visionTool from '@sanity/vision/plugin'
import React, {createElement} from 'react'
import {hot} from 'react-hot-loader/root'
import {createGlobalStyle, css} from 'styled-components'

const GlobalStyle = createGlobalStyle(({mode, theme}: {mode: 'light' | 'dark'; theme: Theme}) => {
  const tone = theme.color[mode].card.tones.transparent

  return css`
    html,
    body,
    #root {
      height: 100%;
    }

    body {
      -webkit-font-smoothing: antialiased;
      background-color: ${tone.enabled.bg};
      color: ${tone.enabled.fg};
      margin: 0;
    }
  `
})

const plugins = [
  deskTool({title: 'Content'}),
  dashboardTool({icon: 'chart-upward', name: 'analytics', title: 'Analytics'}),
  visionTool(),
]

function ActiveTool() {
  const {segments} = useLocation()
  const tools = useStudioToolPlugins()
  const activeToolName = segments[0] || tools[0]?.name

  const activeTool = tools.find((t: any) => t.name === activeToolName)

  if (activeTool) {
    return createElement(activeTool.component)
  }

  return <div>Unknown tool: {activeToolName}</div>
}

function RootComponent() {
  const themeMode = 'light'

  return (
    <StudioProvider dataset="production" plugins={plugins} projectId="foo">
      <LocationProvider>
        <ThemeProvider theme={studioTheme}>
          <CardProvider scheme={themeMode}>
            <GlobalStyle mode={themeMode} />
            <Layout projectName="Sanity.io">
              <ActiveTool />
            </Layout>
          </CardProvider>
        </ThemeProvider>
      </LocationProvider>
    </StudioProvider>
  )
}

export const Root = hot(RootComponent)
