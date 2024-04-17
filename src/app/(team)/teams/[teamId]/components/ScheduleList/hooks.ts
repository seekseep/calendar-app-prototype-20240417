'use client'

import { add, endOfMonth, format, startOfMonth } from 'date-fns'
import { useMemo } from 'react'

import { CalendarSchedule } from '@/types/schedule'

export function useRows (
  month: string,
  calendarSchedules?: CalendarSchedule[]
) {
  return useMemo(() => {
    const rows: {
      date: Date
      schedules: CalendarSchedule[]
    }[] = []

    const startDate = startOfMonth(new Date(month))
    const endDate = endOfMonth(new Date(month))

    const schedulesByDate: Record<string, CalendarSchedule[]> = {}

    for (const schedule of calendarSchedules ?? []) {
      const date = format(schedule.startedAt, 'yyyy-MM-dd')
      if (!schedulesByDate[date]) schedulesByDate[date] = []
      schedulesByDate[date].push(schedule)
    }

    for (let date = startDate; date <= endDate; date = add(date, { days: 1 })) {
      rows.push({
        date,
        schedules: schedulesByDate[format(date, 'yyyy-MM-dd')] ?? []
      })
    }

    return rows
  }, [calendarSchedules, month])
}
