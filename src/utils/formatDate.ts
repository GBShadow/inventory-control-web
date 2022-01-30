import { zonedTimeToUtc, format } from 'date-fns-tz'

export function dateToString(date: string) {
  if (!date) {
    return ''
  }

  const Date = format(zonedTimeToUtc(date, 'America/Sao_Paulo'), 'dd/MM/yyyy')

  return Date
}

export function dateToString2(date: string) {
  if (!date) {
    return ''
  }

  const Date = format(zonedTimeToUtc(date, 'America/Sao_Paulo'), 'yyyy-MM-dd')

  return Date
}
