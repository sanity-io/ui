import axe from 'axe-core'
import {useEffect, useState} from 'react'

const IGNORE_VIOLATION_IDS = ['landmark-one-main', 'page-has-heading-one']

export function useAxeResults(props: {
  enabled: boolean
  key: string | null
}): axe.AxeResults | null {
  const {enabled = true, key} = props
  const [results, setResults] = useState<axe.AxeResults | null>(null)

  useEffect(() => {
    if (!enabled) return

    try {
      setResults(null)

      axe
        .run()
        .then((results) => {
          // Remove ignored violations
          for (let i = 0; results.violations.length; i += 1) {
            const v = results.violations[i]

            if (v && IGNORE_VIOLATION_IDS.includes(v.id)) {
              results.violations.splice(i, 1)
              i -= 1
            }
          }

          setResults(results)
        })
        .catch((err) => {
          console.error('Something bad happened:', err.message)
        })
    } catch (axeRunError) {
      if (axeRunError instanceof Error) {
        console.log('could not run axe:', axeRunError.message)
      } else {
        console.log('could not run axe:', axeRunError)
      }
    }
  }, [enabled, key])

  return results
}
