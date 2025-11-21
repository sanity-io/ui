/**
 * MIT License
 * Copyright (c) 2024 Motion One

 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:

 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.

 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */

import {invariant, PresenceChild} from 'motion/react'
import {Activity, useState} from 'react'

export interface AnimateActivityProps {
  mode: 'visible' | 'hidden'
  layoutMode: 'default' | 'pop'
  children: React.ReactNode
}

/**
 * This component will become available on `motion/react` in the future, this "fork" is temporary
 */
export function AnimateActivity({mode: modeFromProps, layoutMode, children}: AnimateActivityProps) {
  /**
   * This is the mode that we'll render.
   */
  const [mode, setMode] = useState(modeFromProps)

  /**
   * This is the goal state as defined by props.
   */
  const isPresent = modeFromProps === 'visible'

  /**
   * Immediately switch to mode="visible" when the user
   * changes the mode prop.
   */
  if (isPresent && mode !== 'visible') {
    setMode('visible')
    return null
  }

  /**
   * Set mode to "hidden" only when the exit animation is complete.
   */
  const onExitComplete = () => setMode('hidden')

  invariant(Boolean(Activity), 'Activity component not found - upgrade to React 19.2.0 or higher')

  return (
    <Activity mode={mode}>
      <PresenceChild
        isPresent={isPresent}
        onExitComplete={!isPresent ? onExitComplete : undefined}
        presenceAffectsLayout={false}
        mode={layoutMode === 'pop' ? 'popLayout' : 'sync'}
      >
        {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          children as any
        }
      </PresenceChild>
    </Activity>
  )
}
