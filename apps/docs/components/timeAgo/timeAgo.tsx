import {format} from 'date-fns'
import {useEffect, useRef, useState} from 'react'
import {getIntervalTimeout, getTimeDiff, getTimestamp} from './helpers'
import {TimeDiff} from './types'

interface TimeAgoProps {
  date: Date | string | number
}

export function TimeAgo(props: TimeAgoProps) {
  const {date: dateProp} = props
  const date = getTimestamp(dateProp)
  const [diff, setDiff] = useState<TimeDiff>(getTimeDiff(date))
  const intervalRef = useRef<NodeJS.Timeout | null>(null)

  useEffect(() => {
    const tick = () => {
      const newDiff = getTimeDiff(date)

      setDiff(newDiff)

      if (newDiff.years || newDiff.months) {
        return // stop ticker
      }

      intervalRef.current = setTimeout(tick, getIntervalTimeout(newDiff))
    }

    tick()

    return () => {
      if (intervalRef.current !== null) {
        clearInterval(intervalRef.current)
        intervalRef.current = null
      }
    }
  }, [date])

  if (diff.years > 0 || diff.months > 0) {
    return <>{format(date, 'LLL d, yyyy @ hh:mm')}</>
  }

  if (diff.weeks > 0) {
    return <>{diff.weeks}w ago</>
  }

  if (diff.days > 0) {
    return <>{diff.days}d ago</>
  }

  if (diff.hours > 0) {
    return <>{diff.hours}h ago</>
  }

  if (diff.minutes > 0) {
    return <>{diff.minutes}m ago</>
  }

  return <>{diff.seconds}s ago</>
}
