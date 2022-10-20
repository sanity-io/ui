import {useToast} from '@sanity/ui'
import axe from 'axe-core'
import {useEffect, useState} from 'react'

const IGNORE_VIOLATION_IDS = ['landmark-one-main', 'page-has-heading-one']

/** @internal */
export function useAxeResults(props: {
  enabled: boolean
  key: string | null
}): axe.AxeResults | null {
  const {enabled = true, key} = props
  const [results, setResults] = useState<axe.AxeResults | null>(null)
  const {push: pushToast} = useToast()

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
          // eslint-disable-next-line no-console
          console.error(err)

          pushToast({
            title: 'Axe: failed to run',
            description: err.message,
            status: 'error',
          })
        })
    } catch (axeRunError) {
      // eslint-disable-next-line no-console
      console.error(axeRunError)

      if (axeRunError instanceof Error) {
        pushToast({
          title: 'Axe: unknown error',
          description: axeRunError.message,
          status: 'error',
        })
      } else {
        pushToast({
          title: 'Axe: unknown error',
          description: String(axeRunError),
          status: 'error',
        })
      }
    }
  }, [enabled, key, pushToast])

  return results
}
