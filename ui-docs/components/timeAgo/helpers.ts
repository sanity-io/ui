import {
  differenceInSeconds,
  differenceInMinutes,
  differenceInHours,
  differenceInDays,
  differenceInWeeks,
  differenceInMonths,
  differenceInYears,
} from 'date-fns'
import {TimeDiff} from './types'

export function getIntervalTimeout(diff: TimeDiff) {
  // if (diff.years || diff.months) {
  //   return +Infinity
  // }

  if (diff.weeks) {
    return 1000 * 60 * 60 // 1h
  }

  if (diff.days) {
    return 1000 * 60 * 60 // 1h
  }

  if (diff.hours) {
    return 1000 * 60 // 1m
  }

  if (diff.minutes) {
    return 1000 * 20 // 20s
  }

  if (diff.seconds) {
    return 1000 * 1 // 1s
  }

  return +Infinity
}

export function getTimeDiff(date: number): TimeDiff {
  const now = Date.now()

  return {
    seconds: differenceInSeconds(now, date),
    minutes: differenceInMinutes(now, date),
    hours: differenceInHours(now, date),
    days: differenceInDays(now, date),
    weeks: differenceInWeeks(now, date),
    months: differenceInMonths(now, date),
    years: differenceInYears(now, date),
  }
}

export function getTimestamp(date: Date | string | number) {
  if (typeof date === 'string') {
    return Date.parse(date)
  }

  if (typeof date !== 'number') {
    return date.getTime()
  }

  return date
}
