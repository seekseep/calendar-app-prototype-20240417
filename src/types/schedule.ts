export type ScheduleBase = {
  id: string
  accountId: string
  teamId: string
  startedAt: string
  finishedAt: string
}

export type NotRepeatedSchedule = ScheduleBase & {
  repeatType: 'none'
  repeatFinishType: null
  repeatFinishedDate: null
  repeatInterval: null
  repeatCount: null
  repeatWeekdays: null
}

export type DailyRepeatedScheduleByCount = ScheduleBase & {
  repeatType: 'daily'
  repeatFinishType: 'count'
  repeatFinishedDate: null
  repeatInterval: null
  repeatCount: number
  repeatWeekdays: null
}

export type DailyRepeatedScheduleByEndDate = ScheduleBase & {
  repeatType: 'daily'
  repeatFinishType: 'date'
  repeatFinishedDate: string | null
  repeatInterval: null
  repeatCount: null
  repeatWeekdays: null
}

export type DailyRepeatedSchedule = (
  DailyRepeatedScheduleByCount
  | DailyRepeatedScheduleByEndDate
)

export type WeeklyRepeatedScheduleByCount = ScheduleBase & {
  repeatType: 'weekly'
  repeatFinishType: 'count'
  repeatFinishedDate: null
  repeatInterval: number
  repeatCount: number
  repeatWeekdays: number[]
}

export type WeeklyRepeatedScheduleByEndDate = ScheduleBase & {
  repeatType: 'weekly'
  repeatFinishType: 'date'
  repeatFinishedDate: string | null
  repeatInterval: number
  repeatCount: null
  repeatWeekdays: number[]
}

export type WeeklyRepeatedSchedule = (
  WeeklyRepeatedScheduleByCount
  | WeeklyRepeatedScheduleByEndDate
)

export type Schedule = (
  NotRepeatedSchedule
  | DailyRepeatedSchedule
  | WeeklyRepeatedSchedule
)

export type CalendarSchedule = {
  id: string
  startedAt: Date
  finishedAt: Date
  original: Schedule
}
