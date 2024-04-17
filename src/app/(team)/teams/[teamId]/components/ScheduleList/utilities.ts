import { add, set } from 'date-fns'

import { v4 as uuid } from'uuid'

import {
  CalendarSchedule,
  DailyRepeatedScheduleByCount,
  DailyRepeatedScheduleByEndDate,
  NotRepeatedSchedule,
  Schedule,
  WeeklyRepeatedScheduleByCount,
  WeeklyRepeatedScheduleByEndDate
} from '@/types/schedule'

type Duration = [Date, Date]

export function createCalendarSchedulesFromNotRepeatedSchedule(
  schedule: NotRepeatedSchedule,
  [durationStartedAt, durationFinishedAt]: Duration
): CalendarSchedule[] {
  const schedules: CalendarSchedule[] = []
  const baseStartedAt = new Date(schedule.startedAt)
  const baseFinishedAt = new Date(schedule.finishedAt)

  if (
    baseFinishedAt < durationStartedAt
    || durationFinishedAt < baseStartedAt) {
    return schedules
  }

  return [{
    id        : uuid(),
    startedAt : baseStartedAt,
    finishedAt: baseFinishedAt,
    original  : schedule,
  }]
}

export function createCalendarSchedulesFromDailyRepeatedScheduleByCount(
  schedule: DailyRepeatedScheduleByCount,
  [durationStartedAt, durationFinishedAt]: Duration
): CalendarSchedule[] {
  const schedules: CalendarSchedule[] = []

  const baseStartedAt = new Date(schedule.startedAt)
  const baseFinishedAt = new Date(schedule.finishedAt)
  const startHours = baseStartedAt.getHours()
  const startMinutes = baseFinishedAt.getMinutes()
  const durationAsMinutes = (baseFinishedAt.getTime() - baseStartedAt.getTime()) / 1000 / 60

  let count = 0
  let date = baseStartedAt
  while (
    count < schedule.repeatCount
    && date <= durationFinishedAt
  ) {
    if (date >= durationStartedAt) {
      const startedAt = set(date, { hours: startHours, minutes: startMinutes })
      const finishedAt = add(startedAt, { minutes: durationAsMinutes })

      schedules.push({
        id        : uuid(),
        startedAt : startedAt,
        finishedAt: finishedAt,
        original  : schedule,
      })
    }

    count++
    date = add(new Date(date), { days: 1 })
  }

  return schedules
}

export function createCalendarSchedulesFromDailyRepeatedScheduleByEndDate(
  schedule: DailyRepeatedScheduleByEndDate,
  [durationStartedAt, durationFinishedAt]: Duration
): CalendarSchedule[] {
  const schedules: CalendarSchedule[] = []

  const baseStartedAt = new Date(schedule.startedAt)
  const baseFinishedAt = new Date(schedule.finishedAt)
  const startHours = baseStartedAt.getHours()
  const startMinutes = baseFinishedAt.getMinutes()
  const durationAsMinutes = (baseFinishedAt.getTime() - baseStartedAt.getTime()) / 1000 / 60

  let date = baseStartedAt
  const repeatEndDate = typeof schedule.repeatFinishedDate === 'string' ? (
    new Date(schedule.repeatFinishedDate)
  ) : (
    durationFinishedAt
  )
  while (date <= repeatEndDate) {
    if (date >= durationStartedAt) {
      const startedAt = set(date, { hours: startHours, minutes: startMinutes })
      const finishedAt = add(startedAt, { minutes: durationAsMinutes })

      schedules.push({
        id        : uuid(),
        startedAt : startedAt,
        finishedAt: finishedAt,
        original  : schedule,
      })
    }

    date = add(new Date(date), { days: 1 })
  }

  return schedules
}

export function createCalendarSchedulesFromWeeklyRepeatedScheduleByCount(
  schedule: WeeklyRepeatedScheduleByCount,
  [durationStartedAt, durationFinishedAt]: Duration
): CalendarSchedule[] {
  const schedules: CalendarSchedule[] = []

  const baseStartedAt = new Date(schedule.startedAt)
  const baseFinishedAt = new Date(schedule.finishedAt)
  const startHours = baseStartedAt.getHours()
  const startMinutes = baseFinishedAt.getMinutes()
  const durationAsMinutes = (baseFinishedAt.getTime() - baseStartedAt.getTime()) / 1000 / 60

  const enabledByDay: Record<number, boolean> = {}
  for (let day of schedule.repeatWeekdays) enabledByDay[day] = true

  let count = 0
  let weekStartDate = baseStartedAt
  while (
    count < schedule.repeatCount
    && weekStartDate <= durationFinishedAt
  ) {
    for (let i = 0; i < 7; i++) {
      const date = add(new Date(weekStartDate), { days: i })
      const day = date.getDay()
      if (!enabledByDay[day]) continue

      if (date >= durationStartedAt) {
        const startedAt = set(date, { hours: startHours, minutes: startMinutes })
        const finishedAt = add(startedAt, { minutes: durationAsMinutes })

        schedules.push({
          id        : uuid(),
          startedAt : startedAt,
          finishedAt: finishedAt,
          original  : schedule,
        })
      }

      count++
    }

    weekStartDate = add(new Date(weekStartDate), { weeks: 1 })
  }

  return schedules
}

export function createCalendarSchedulesFromWeeklyRepeatedScheduleByEndDate(
  schedule: WeeklyRepeatedScheduleByEndDate,
  [durationStartedAt, durationFinishedAt]: Duration
): CalendarSchedule[] {
  const schedules: CalendarSchedule[] = []

  const baseStartedAt = new Date(schedule.startedAt)
  const baseFinishedAt = new Date(schedule.finishedAt)
  const startHours = baseStartedAt.getHours()
  const startMinutes = baseFinishedAt.getMinutes()
  const durationAsMinutes = (baseFinishedAt.getTime() - baseStartedAt.getTime()) / 1000 / 60

  const enabledByDay: Record<number, boolean> = {}
  for (let day of schedule.repeatWeekdays) enabledByDay[day] = true

  let weekStartDate = baseStartedAt
  const endDate = typeof schedule.repeatFinishedDate === 'string' ? (
    new Date(schedule.repeatFinishedDate)
  ) : (
    durationFinishedAt
  )
  while (weekStartDate <= endDate) {
    for (let i = 0; i < 7; i++) {
      const date = add(new Date(weekStartDate), { days: i })
      const day = date.getDay()
      if (!enabledByDay[day]) continue

      if (date >= durationStartedAt) {
        const startedAt = set(date, { hours: startHours, minutes: startMinutes })
        const finishedAt = add(startedAt, { minutes: durationAsMinutes })

        schedules.push({
          id        : uuid(),
          startedAt : startedAt,
          finishedAt: finishedAt,
          original  : schedule,
        })
      }
    }

    weekStartDate = add(new Date(weekStartDate), { weeks: 1 })
  }

  return schedules
}

export function createCalendarSchedules (
  schedule: Schedule,
  duration: Duration
) {
  switch (schedule.repeatType) {
    case 'none': return createCalendarSchedulesFromNotRepeatedSchedule(schedule, duration)
    case 'daily':
      switch (schedule.repeatFinishType) {
        case 'count': return createCalendarSchedulesFromDailyRepeatedScheduleByCount(schedule, duration)
        case 'date': return createCalendarSchedulesFromDailyRepeatedScheduleByEndDate(schedule, duration)
      }
    case 'weekly':
      switch (schedule.repeatFinishType) {
        case 'count': return createCalendarSchedulesFromWeeklyRepeatedScheduleByCount(schedule, duration)
        case 'date': return createCalendarSchedulesFromWeeklyRepeatedScheduleByEndDate(schedule, duration)
      }
  }
}
