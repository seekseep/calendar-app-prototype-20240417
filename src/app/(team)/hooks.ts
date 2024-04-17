'use client'

import { endOfMonth, format, isValid, startOfMonth } from 'date-fns'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { useCallback, useMemo } from 'react'

import { CalendarSchedule, Schedule } from '@/types/schedule'

import { createCalendarSchedules } from './teams/[teamId]/components/ScheduleList/utilities'

export function useMonth () {
  const searchParams =  useSearchParams()

  const month = useMemo(() => {
    const now = new Date()
    const defaultMonth = format(now, 'yyyy-MM')

    const m = searchParams.get('m')
    if (m === null) return defaultMonth
    const date = new Date(m)
    if (!isValid(date)) return defaultMonth

    return format(date, 'yyyy-MM')

  }, [searchParams])

  return month
}

export function useGoToMonth () {
  const router = useRouter()
  const searchParams = useSearchParams()
  const pathname = usePathname()

  return useCallback((nextMonth: string) => {
    const nextSearchparams = new URLSearchParams(searchParams)
    nextSearchparams.set('m', nextMonth)
    router.push(`${pathname}?${nextSearchparams}`, { scroll: true })
  }, [pathname, router, searchParams])
}

export function useCalendarSchedules (
  month: string,
  schedules?: Schedule[]
) {
  return useMemo(() => {
    const startDate = startOfMonth(new Date(month))
    const endDate = endOfMonth(new Date(month))

    const calendarSchedules: CalendarSchedule[] = []
    const duration: Parameters<typeof createCalendarSchedules>[1] = [startDate, endDate]

    for (const schedule of (schedules ?? [])) {
      calendarSchedules.push(...createCalendarSchedules(schedule, duration))
    }

    return calendarSchedules
  }, [month, schedules])
}
