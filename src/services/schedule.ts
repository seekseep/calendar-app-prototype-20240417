import { v4 as uuid } from 'uuid'

import {
  DailyRepeatedScheduleByCount,
  DailyRepeatedScheduleByEndDate,
  NotRepeatedSchedule,
  Schedule,
  ScheduleBase,
  WeeklyRepeatedScheduleByCount,
  WeeklyRepeatedScheduleByEndDate
} from '@/types/schedule'

import { db } from '../db'

function isNumberArray (value: any): value is number[] {
  if (!Array.isArray(value)) return false
  for (const item of value) if (typeof item !== 'number') return false
  return true
}

function parseScheduleBase (row: any): ScheduleBase {
  const id = row.id
  const accountId = row.accountId
  const teamId = row.teamId
  const startedAt = row.startedAt
  const finishedAt = row.finishedAt
  if (typeof id !== 'string') throw new Error(`Invalid schedule.id: ${id}`)
  if (typeof accountId !== 'string') throw new Error(`Invalid schedule.accountId: ${accountId}`)
  if (typeof teamId !== 'string') throw new Error(`Invalid schedule.teamId: ${teamId}`)
  if (typeof startedAt !== 'string') throw new Error(`Invalid schedule.startedAt: ${startedAt}`)
  if (typeof finishedAt !== 'string') throw new Error(`Invalid schedule.finishedAt: ${finishedAt}`)
  return { id, accountId, teamId, startedAt, finishedAt }
}

function parseNotRepeatedSchedule (row: any): NotRepeatedSchedule {
  const base = parseScheduleBase(row)
  return {
    ...base,
    repeatType        : 'none',
    repeatFinishType  : null,
    repeatFinishedDate: null,
    repeatInterval    : null,
    repeatCount       : null,
    repeatWeekdays    : null,
  }
}

function parseDailyRepeatedScheduleByCount (row: any): DailyRepeatedScheduleByCount {
  const base = parseScheduleBase(row)
  const repeatCount = row.repeatCount
  if (typeof repeatCount !== 'number') throw new Error(`Invalid schedule.repeatCount: ${repeatCount}`)
  return {
    ...base,
    repeatType        : 'daily',
    repeatFinishType  : 'count',
    repeatFinishedDate: null,
    repeatInterval    : null,
    repeatCount       : repeatCount,
    repeatWeekdays    : null,
  }
}

function parseDailyRepeatedScheduleByEndDate (row: any): DailyRepeatedScheduleByEndDate {
  const base = parseScheduleBase(row)
  const repeatFinishedDate = row.repeatFinishedDate
  const repeatInterval = row.repeatInterval

  if (typeof repeatFinishedDate !== 'string') throw new Error(`Invalid schedule.repeatFinishedDate: ${repeatFinishedDate}`)
  if (typeof repeatInterval !== 'number') throw new Error(`Invalid schedule.repeatInterval: ${repeatInterval}`)

  return {
    ...base,
    repeatType      : 'daily',
    repeatFinishType: 'date',
    repeatFinishedDate,
    repeatInterval  : null,
    repeatCount     : null,
    repeatWeekdays  : null
  }
}

function parseWeeklyRepeatedScheduleByCount (row: any): WeeklyRepeatedScheduleByCount {
  const base = parseScheduleBase(row)
  const repeatInterval = row.repeatInterval
  const repeatWeekdays = row.repeatWeekdays
  const repeatCount = row.repeatCount
  if (typeof repeatCount !== 'number') throw new Error(`Invalid schedule.repeatCount: ${repeatCount}`)
  if (typeof repeatInterval !== 'number') throw new Error(`Invalid schedule.repeatInterval: ${repeatInterval}`)
  if (isNumberArray(repeatWeekdays)) throw new Error(`Invalid schedule.repeatWeekdays: ${repeatWeekdays}`)
  return {
    ...base,
    repeatType        : 'weekly',
    repeatFinishType  : 'count',
    repeatFinishedDate: null,
    repeatInterval,
    repeatCount       : repeatCount,
    repeatWeekdays,
  }
}

function parseWeeklyRepeatedScheduleByEndDate (row: any): WeeklyRepeatedScheduleByEndDate {
  const base = parseScheduleBase(row)
  const repeatFinishedDate = row.repeatFinishedDate
  const repeatInterval = row.repeatInterval
  const repeatWeekdays = row.repeatWeekdays
  if (
    typeof repeatFinishedDate !== 'string'
    && repeatFinishedDate !== null
  ) throw new Error(`Invalid schedule: ${repeatFinishedDate}`)
  if (typeof repeatInterval !== 'number') throw new Error(`Invalid schedule.repeatInterval: ${repeatInterval}`)

  if (!isNumberArray(repeatWeekdays)) throw new Error(`Invalid schedule.repeatWeekdays: ${repeatWeekdays}`)

  return {
    ...base,
    repeatType      : 'weekly',
    repeatFinishType: 'date',
    repeatFinishedDate,
    repeatInterval,
    repeatCount     : null,
    repeatWeekdays,
  }
}

function parseSchedule (row: any): Schedule {
  const repeatType = row.repeatType
  const repeatFinishType = row.repeatFinishType
  switch (repeatType) {
    case 'none':
      return parseNotRepeatedSchedule(row)
    case 'daily':
      return repeatFinishType === 'count'
        ? parseDailyRepeatedScheduleByCount(row)
        : parseDailyRepeatedScheduleByEndDate(row)
    case 'weekly':
      return repeatFinishType === 'count'
        ? parseWeeklyRepeatedScheduleByCount(row)
        : parseWeeklyRepeatedScheduleByEndDate(row)
    default:
      throw new Error(`Invalid schedule.repeatType: ${repeatType}`)
  }
}

export async function createSchedule (schedule: (
  (Omit<Schedule, 'id'>) & Partial<{ id: string }>
)) {
  const row = db.schedule.create({
    id: schedule?.id ?? uuid(),
    ...schedule,
  })
  return parseSchedule(row)
}

export async function listSchedules () {
  const rows = db.schedule.getAll()
  const schedules: Schedule[] = []
  for (const row of rows) schedules.push(parseSchedule(row))
  return schedules
}

export async function listSchedulesByAccountId (accountId: string) {
  const rows = db.schedule.findMany({ where: { accountId: { equals: accountId } } })
  const schedules: Schedule[] = []
  for (const row of rows) schedules.push(parseSchedule(row))
  return schedules
}

export async function getSchedule (id: string) {
  const row = db.schedule.findFirst({ where: { id: { equals: id } } })
  if (!row) throw new Error('Schedule not found')
  return parseSchedule(row)
}

export async function updateSchedule ({ id, ...data }: Partial<Omit<Schedule, 'id'>> & Pick<Schedule, 'id'>) {
  const row = db.schedule.update({
    where: { id: { equals: id } },
    data : data,
  })
  return parseSchedule(row)
}

export async function deleteSchedule (id: string) {
  const row = db.schedule.delete({ where: { id: { equals: id } } })
  return parseSchedule(row)
}
