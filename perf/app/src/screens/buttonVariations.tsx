import {Card, CardTone, Button, ButtonMode, ButtonTone, ThemeColorProvider} from '@sanity/ui'
import React, {useEffect, useState} from 'react'

declare global {
  interface Window {
    onRenderDone?: () => void
  }
}

const cardTones: CardTone[] = [
  'default',
  'transparent',
  'primary',
  'positive',
  'caution',
  'critical',
]

const modes: ButtonMode[] = ['default', 'ghost', 'bleed']

const tones: ButtonTone[] = ['default', 'primary', 'positive', 'caution', 'critical']

export function ButtonVariationsScreen() {
  const [render, setRender] = useState(false)

  useEffect(() => {
    if (render && typeof window.onRenderDone !== 'undefined') {
      window.onRenderDone()
    }
  }, [render])

  if (!render) {
    return (
      <button data-test="render-button" onClick={() => setRender(true)}>
        Render
      </button>
    )
  }

  return (
    <div style={{display: 'flex'}}>
      <div style={{flex: 1}}>
        {cardTones.map((cardTone, cardToneIndex) => (
          <Card key={cardToneIndex} padding={4} tone={cardTone}>
            {modes.map((mode, modeIndex) => (
              <div key={modeIndex}>
                {tones.map((tone, toneIndex) => (
                  <Button key={toneIndex} mode={mode} text="Label" tone={tone} />
                ))}
              </div>
            ))}
          </Card>
        ))}
      </div>

      <div style={{flex: 1}}>
        <ThemeColorProvider scheme="dark">
          {cardTones.map((cardTone, cardToneIndex) => (
            <Card key={cardToneIndex} padding={4} tone={cardTone}>
              {modes.map((mode, modeIndex) => (
                <div key={modeIndex}>
                  {tones.map((tone, toneIndex) => (
                    <Button key={toneIndex} mode={mode} text="Label" tone={tone} />
                  ))}
                </div>
              ))}
            </Card>
          ))}
        </ThemeColorProvider>
      </div>
    </div>
  )
}
