import {LocationProvider, StudioProvider, useLocation, useStudioToolPlugins} from '@sanity/base'
import dashboardTool from '@sanity/dashboard/plugin'
import deskTool from '@sanity/desk-tool/plugin'
import {ChartUpwardIcon} from '@sanity/icons'
import {Layout} from '@sanity/layout'
import {studioTheme, Theme, ThemeProvider} from '@sanity/ui'
import visionTool from '@sanity/vision/plugin'
import React, {createElement} from 'react'
import {hot} from 'react-hot-loader/root'
import {createGlobalStyle, css} from 'styled-components'

const GlobalStyle = createGlobalStyle(({theme}: {theme: Theme}) => {
  const color = theme.sanity.color.base

  return css`
    html,
    body,
    #root {
      height: 100%;
    }

    body {
      -webkit-font-smoothing: antialiased;
      background-color: ${color.bg};
      color: ${color.fg};
      margin: 0;
    }
  `
})

const plugins = [
  deskTool({title: 'Content'}),
  dashboardTool({icon: ChartUpwardIcon, name: 'analytics', title: 'Analytics'}),
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

  const commands = [
    {
      name: 'log-active-element',
      shortcut: ['mod', 'shift', 'f'],
      title: 'Log active element',
      handle() {
        console.log(document.activeElement)
      },
    },
    {
      name: 'sign-out',
      shortcut: ['mod', 'shift', 'l'],
      title: 'Sign out',
      handle() {
        console.log('@todo: sign out')
      },
    },
  ]

  return (
    <StudioProvider commands={commands} dataset="production" plugins={plugins} projectId="foo">
      <LocationProvider>
        <ThemeProvider theme={studioTheme} scheme={themeMode}>
          <GlobalStyle />
          <Layout projectName="Sanity.io">
            <ActiveTool />
          </Layout>
        </ThemeProvider>
      </LocationProvider>
    </StudioProvider>
  )
}

export const Root = hot(RootComponent)
