import { format } from 'date-fns'

export function getMonthLabel (dateString: string) {
  const date = new Date(dateString)
  return format(date, 'M月')
}
