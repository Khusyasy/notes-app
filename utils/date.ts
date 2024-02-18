const userLocale = navigator?.language || 'en-US'
const rtf = new Intl.RelativeTimeFormat(userLocale)

export function formatDate(date: Date): string {
  return date.toLocaleString(userLocale, {
    day: 'numeric',
    month: 'numeric',
    year: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
  })
}

export function relativeTime(date: Date, now: number = Date.now()): string {
  const ms = date.getTime() - now
  const value = Math.round(ms / 1000)
  const absValue = Math.abs(value)
  if (absValue < 60) {
    return rtf.format(value, 'second')
  } else if (absValue < 60 * 60) {
    // less than 60 minutes
    return rtf.format(Math.round(value / 60), 'minute')
  } else if (absValue < 60 * 60 * 24) {
    // less than 24 hours
    return rtf.format(Math.round(value / 60 / 60), 'hour')
  } else {
    // more than 24 hours
    return formatDate(date)
  }
}
